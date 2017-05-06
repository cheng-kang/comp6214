import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'
import IsCommonPage from '@/pages/IsCommonPage'
import IsMorePage from '@/pages/IsMorePage'
import DetailPage from '@/pages/DetailPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: HomePage
    },
    {
      path: '/is-my-name-common',
      name: 'is-common-page',
      component: IsCommonPage
    },
    {
      path: '/is-more',
      name: 'is-more-page',
      component: IsMorePage
    },
    {
      path: '/name/:name',
      name: 'detail-page',
      component: DetailPage
    }
  ]
})
