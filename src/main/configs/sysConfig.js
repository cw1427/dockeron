import { app } from 'electron'
import is from 'electron-is'
import {
  getLogPath
} from '../utils/index'

export default {
  'locale': app.getLocale(),
  'log-path': getLogPath(),
  'dir': app.getPath('downloads'),
  'auto-check-update': is.windows(),
  'auto-hide-window': false,
  'hide-app-menu': is.windows() || is.linux(),
  'keep-window-state': false,
  'last-check-update-time': 0,
  'open-at-login': false,
  'admin-group': 'admin',
  'default-user-group': 'public',
  'admin-role': 'admin',
  'default-role': 'public'
}
