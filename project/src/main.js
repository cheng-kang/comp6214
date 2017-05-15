// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Trend from 'vuetrend'
import SocialSharing from 'vue-social-sharing'
import VueFire from 'vuefire'
import VueCookie from 'vue-cookie'

Vue.config.productionTip = false
Vue.use(Trend)
Vue.use(SocialSharing)
Vue.use(VueFire)
Vue.use(VueCookie)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
