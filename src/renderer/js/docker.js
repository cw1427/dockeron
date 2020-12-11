import Docker from 'dockerode'
import fs from 'fs'
import { resolve, join } from 'path'
import notify from './notify'
import { DOCKER_ENGINE_UNIX_SOCKET } from './constants/DockerConstants'
import { remote } from 'electron'
import is from 'electron-is'

var socket = process.env.DOCKER_SOCKET || DOCKER_ENGINE_UNIX_SOCKET
var stats
var docker
try {
  // stats = fs.statSync(socket)
  let basePath = resolve(remote.app.getAppPath(), '..')

  if (is.dev()) {
    basePath = resolve(__dirname, `../../shared`)
  }
  docker = new Docker({
    protocol: 'https', //you can enforce a protocol
    host: '10.125.159.18',
    port: process.env.DOCKER_PORT || 2376,
    ca: fs.readFileSync(`${basePath}/ca.pem`),
    cert: fs.readFileSync(`${basePath}/cert.pem`),
    key: fs.readFileSync(`${basePath}/key.pem`)
  })

} catch (e) {
  console.log(e)
  notify(e)
}
// notify('New Docker Engine Obtained.')
export default docker
