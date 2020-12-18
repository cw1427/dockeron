import Docker from 'dockerode'
import fs from 'fs'
import { resolve, join } from 'path'
import { DOCKER_ENGINE_UNIX_SOCKET } from './constants/DockerConstants'
import { remote } from 'electron'
import _ from 'lodash'

var socket = process.env.DOCKER_SOCKET || DOCKER_ENGINE_UNIX_SOCKET
// notify('New Docker Engine Obtained.')
export function createDockerEngine(name) {
  let engineHash = JSON.parse(localStorage.getItem('engines'))
  let docker = null
  let originConf = {protocol: 'https'}
  try {
    // let basePath = resolve(remote.app.getAppPath(), '..')
    // if (is.dev()) {
    //   basePath = resolve(__dirname, `../../shared`)
    // }
    if (_.has(engineHash,name)){
      let conf = engineHash[name]
      conf['ca'] = fs.readFileSync(conf['ca'])
      conf['cert'] = fs.readFileSync(conf['cert'])
      conf['key'] = fs.readFileSync(conf['key'])
      docker = new Docker({
        ...originConf, ...conf
      })
      return docker
    }else{
      // goes to use global config
      return null
    }
  } catch (e) {
    console.log(e)
    return docker
  }
}
