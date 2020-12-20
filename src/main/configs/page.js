import is from 'electron-is'

export default {
  index: {
    attrs: {
      title: 'ELEVA',
      width: 1024,
      height: 768,
      minWidth: 400,
      minHeight: 420,
      backgroundColor: '#FFFFFF',
      transparent: !is.windows()
    },
    bindCloseToHide: false,
    url: is.dev() ? 'http://localhost:9080' : `file://${__dirname}/index.html`
  }
}
