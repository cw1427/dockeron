import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
import ViewUI from 'view-design';

Vue.use(Router)

const router =  new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

router.beforeEach((to, from, next) => {
  ViewUI.LoadingBar.start()
  next()
})

router.afterEach((to, from, next) => {
  ViewUI.LoadingBar.finish()
})

export default router
