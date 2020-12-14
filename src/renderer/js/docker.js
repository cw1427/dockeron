import Docker from 'dockerode'
import fs from 'fs'
import { resolve, join } from 'path'
import notify from './notify'
import { DOCKER_ENGINE_UNIX_SOCKET } from './constants/DockerConstants'
import { remote } from 'electron'
import is from 'electron-is'
import store from '@/store'

var socket = process.env.DOCKER_SOCKET || DOCKER_ENGINE_UNIX_SOCKET
var stats
var docker
try {
  // let basePath = resolve(remote.app.getAppPath(), '..')
  // if (is.dev()) {
  //   basePath = resolve(__dirname, `../../shared`)
  // }
  let config  = JSON.parse(localStorage.getItem('config'))
  docker = new Docker({
    protocol: 'https', //you can enforce a protocol
    host: config.host,
    port: config.port,
    ca: fs.readFileSync(config.ca),
    cert: fs.readFileSync(config.cert),
    key: fs.readFileSync(config.key)
  })

} catch (e) {
  console.log(e)
  notify(e)
}
// notify('New Docker Engine Obtained.')
export default docker
