import is from 'electron-is'
import Vue from 'vue'
import Resource from 'vue-resource'
import axios from 'axios'

import App from './App.vue'
import router from './router'
import store from './store'

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css'
import locale from 'view-design/src/locale/lang/en-US'

if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

function init(config){
  if (is.renderer()) Vue.use(require('vue-electron'))
  Vue.http = Vue.prototype.$http = axios
  Vue.config.productionTip = false
  Vue.use(ViewUI, { locale })
  Vue.use(Resource)
  /* eslint-disable no-new */
  new Vue({
    components: { App },
    router,
    store,
    template: '<App/>'
  }).$mount('#app')

}

store.dispatch('preference/fetchPreference')
.then((config) => {
  console.info('[Dockeron] load preference:', config)
  init(config)
})
.catch((err) => {
  alert(err)
})
