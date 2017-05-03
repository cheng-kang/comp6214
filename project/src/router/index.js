import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/HomePage'
import IsCommonPage from '@/components/IsCommonPage'
import DetailPage from '@/components/DetailPage'

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
      path: '/name/:name',
      name: 'detail-page',
      component: DetailPage
    }
  ]
})
