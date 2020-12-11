import { ipcRenderer, remote } from 'electron'
import is from 'electron-is'
import { isEmpty } from 'lodash'

export default class Api {
  constructor (options = {}) {
    this.options = options
    this.init()
  }

  init () {
    this.loadConfig()
  }

  loadConfigFromLocalStorage () {
    const result = localStorage.config
    return result ? JSON.parse(result) : {}
  }

  loadConfig () {
    let result = this.loadConfigFromLocalStorage()
    this.config = result
  }

  fetchPreference () {
    return new Promise((resolve) => {
      this.loadConfig()
      resolve(this.config)
    })
  }

  savePreference (params = {}) {
      return this.savePreferenceToLocalStorage(params)
  }

  savePreferenceToLocalStorage (params) {
     localStorage.config = JSON.stringify(params)
     return true
  }

}
