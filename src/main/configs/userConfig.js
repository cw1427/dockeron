import { app } from 'electron'
import is from 'electron-is'
import {
  getLogPath,
  getSessionPath
} from '../utils/index'


export default {
  'auto-check-update': is.windows(),
  'auto-hide-window': false,
  'hide-app-menu': is.windows() || is.linux(),
  'keep-window-state': false,
  'last-check-update-time': 0,
  'locale': app.getLocale(),
  'log-path': getLogPath(),
  'open-at-login': false,
  'window-state': {},
  'allow-menu-expand': true
}
