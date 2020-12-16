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

  loadEngines() {
    const result = localStorage.engines
    return result ? JSON.parse(result) : {}
  }

  fetchPreference () {
    return new Promise((resolve) => {
      this.loadConfig()
      resolve(this.config)
    })
  }

  fetchEngines () {
    return new Promise((resolve) => {
      resolve( this.loadEngines())
    })
  }

  savePreference (params = {}) {
      return this.savePreferenceToLocalStorage(params)
  }

  saveEngines (params = {}){
    localStorage.engines = JSON.stringify(params)
    return true
  }

  savePreferenceToLocalStorage (params) {
     localStorage.config = JSON.stringify(params)
     return true
  }

}
