import is from 'electron-is'
import logger from 'electron-log'

logger.transports.file.level = is.production() ? 'warn' : 'silly'
logger.transports.file.maxSize = 50 * 1024 * 1024;
logger.info('[Dockeron] Logger init')
logger.warn('[Dockeron] Logger init')

export default logger
