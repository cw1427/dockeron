import { EventEmitter } from 'events'
import { app, shell, dialog, ipcMain } from 'electron'
import is from 'electron-is'
import { readFile } from 'fs'
import { extname, basename } from 'path'
import { isEmpty } from 'lodash'

import logger from './core/Logger'
import ConfigManager from './core/ConfigManager'
import AutoLaunchManager from './core/AutoLaunchManager'
import UpdateManager from './core/UpdateManager'
import WindowManager from './core/WindowManager'

import { AUTO_CHECK_UPDATE_INTERVAL } from '@/utils/constants.js'
import { checkIsNeedRun } from '@/utils/index.js'

export default class Application extends EventEmitter {
  constructor () {
    super()
    this.isReady = false
    this.init()
  }

  init () {
    this.configManager = new ConfigManager()
    this.locale = this.configManager.getLocale()
    this.initWindowManager()
    this.autoLaunchManager = new AutoLaunchManager()
    this.initUpdaterManager()

    this.handleEvents()
    this.handleIpcMessages()
  }

  initWindowManager () {
    this.windowManager = new WindowManager({
      userConfig: this.configManager.getUserConfig()
    })

    this.windowManager.on('window-resized', (data) => {
      this.storeWindowState(data)
    })
    this.windowManager.on('window-moved', (data) => {
      this.storeWindowState(data)
    })
    this.windowManager.on('window-closed', (data) => {
      this.storeWindowState(data)
    })
  }

  storeWindowState (data = {}) {
    const enabled = this.configManager.getUserConfig('keep-window-state')
    if (!enabled) {
      return
    }

    const state = this.configManager.getUserConfig('window-state', {})
    const { page, bounds } = data
    const newState = {
      ...state,
      [page]: bounds
    }
    this.configManager.setUserConfig('window-state', newState)
  }

  start (page, options = {}) {
    const win = this.showPage(page, options)

    win.once('ready-to-show', () => {
      this.isReady = true
      this.emit('ready')
    })
    if (is.macOS()) {
      this.touchBarManager.setup(page, win)
    }
  }

  showPage (page, options = {}) {
    const { openedAtLogin } = options
    const autoHideWindow = this.configManager.getUserConfig('auto-hide-window')
    return this.windowManager.openWindow(page, {
      hidden: openedAtLogin || autoHideWindow
    })
  }

  show (page = 'index') {
    this.windowManager.showWindow(page)
  }

  hide (page) {
    if (page) {
      this.windowManager.autoHideWindow(page)
    } else {
      this.windowManager.hideAllWindow()
    }
  }

  toggle (page = 'index') {
    this.windowManager.toggleWindow(page)
  }

  closePage (page) {
    this.windowManager.destroyWindow(page)
  }

  async stop () {
    try {
      logger.info('----deal with Application stop event')
    } catch (err) {
      logger.warn('[Motrix] stop error: ', err.message)
    }
  }

  async quit () {
    await this.stop()
    app.exit()
  }

  sendCommand (command, ...args) {
    if (!this.emit(command, ...args)) {
      const window = this.windowManager.getFocusedWindow()
      if (window) {
        this.windowManager.sendCommandTo(window, command, ...args)
      }
    }
  }

  sendCommandToAll (command, ...args) {
    if (!this.emit(command, ...args)) {
      this.windowManager.getWindowList().forEach(window => {
        this.windowManager.sendCommandTo(window, command, ...args)
      })
    }
  }

  sendMessageToAll (channel, ...args) {
    this.windowManager.getWindowList().forEach(window => {
      this.windowManager.sendMessageTo(window, channel, ...args)
    })
  }

  handleFile (filePath) {
    if (!filePath) {
      return
    }

    if (extname(filePath).toLowerCase() !== '.torrent') {
      return
    }

    this.show()

    const fileName = basename(filePath)
    readFile(filePath, (err, data) => {
      if (err) {
        logger.warn(`[Dockeron] read file error: ${filePath}`, err.message)
        return
      }
      const file = Buffer.from(data).toString('base64')
      const args = [fileName, file]
      this.sendCommandToAll('application:new-bt-task-with-file', ...args)
    })
  }

  initUpdaterManager () {
    if (is.mas()) {
      return
    }
    const enable = this.configManager.getUserConfig('auto-check-update')
    const lastTime = this.configManager.getUserConfig('last-check-update-time')
    this.updateManager = new UpdateManager({
      autoCheck: checkIsNeedRun(enable, lastTime, AUTO_CHECK_UPDATE_INTERVAL)
    })
    this.handleUpdaterEvents()
  }

  handleUpdaterEvents () {
    this.updateManager.on('checking', (event) => {
      this.configManager.setUserConfig('last-check-update-time', Date.now())
    })

    this.updateManager.on('download-progress', (event) => {
      const win = this.windowManager.getWindow('index')
      win.setProgressBar(event.percent / 100)
    })

    this.updateManager.on('update-not-available', (event) => {
    })

    this.updateManager.on('update-downloaded', (event) => {
      const win = this.windowManager.getWindow('index')
      win.setProgressBar(0)
    })

    this.updateManager.on('will-updated', (event) => {
      this.windowManager.setWillQuit(true)
    })

    this.updateManager.on('update-error', (event) => {
    })
  }

  relaunch () {
    this.stop()
    app.relaunch()
    app.exit()
  }

  savePreference (config = {}) {
    logger.info('[Dockeron] save preference:', config)
    const { system, user } = config
    if (!isEmpty(system)) {
      console.info('[Dockeron] main save system config: ', system)
      this.configManager.setSystemConfig(system)
      this.engineClient.changeGlobalOption(system)
    }

    if (!isEmpty(user)) {
      console.info('[Dockeron] main save user config: ', user)
      this.configManager.setUserConfig(user)
    }
  }

  handleEvents () {
    this.on('application:save-preference', this.savePreference)

    this.on('application:relaunch', () => {
      this.relaunch()
    })

    this.on('application:quit', () => {
      this.quit()
    })

    this.on('application:open-at-login', (openAtLogin) => {
      if (is.linux()) {
        return
      }

      if (openAtLogin) {
        this.autoLaunchManager.enable()
      } else {
        this.autoLaunchManager.disable()
      }
    })

    this.on('application:show', (page) => {
      this.show(page)
    })

    this.on('application:hide', (page) => {
      this.hide(page)
    })

    this.on('application:reset', () => {
      this.configManager.reset()
      this.relaunch()
    })

    this.on('application:check-for-updates', () => {
      this.updateManager.check()
    })

    // this.on('application:change-locale', (locale) => {
    //   this.localeManager.changeLanguageByLocale(locale)
    //     .then(() => {
    //       this.menuManager.setup(locale)
    //       this.trayManager.setup(locale)
    //     })
    // })

    this.on('application:auto-hide-window', (hide) => {
      if (hide) {
        this.windowManager.handleWindowBlur()
      } else {
        this.windowManager.unbindWindowBlur()
      }
    })

  }

  handleIpcMessages () {
    ipcMain.on('event', (event, eventName, ...args) => {
      logger.log('[Dockeron] ipc receive event', eventName, ...args)
      this.emit(eventName, ...args)
    })
  }
}
