import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage'
import IsMorePage from '@/pages/IsMorePage'
import RankMyNamePage from '@/pages/RankMyNamePage'
import DetailPage from '@/pages/DetailPage'
import StatisticsPage from '@/pages/StatisticsPage'
import ArticlesPage from '@/pages/ArticlesPage'
import ArticlePage from '@/pages/ArticlePage'
import MeaningPage from '@/pages/MeaningPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home-page',
      component: HomePage
    },
    {
      path: '/meaning',
      name: 'meaning-page',
      component: MeaningPage
    },
    {
      path: '/statistics',
      name: 'statistics-page',
      component: StatisticsPage
    },
    {
      path: '/is-more',
      name: 'is-more-page',
      component: IsMorePage
    },
    {
      path: '/rank-my-name',
      name: 'rank-my-name-page',
      component: RankMyNamePage
    },
    {
      path: '/name/:name',
      name: 'detail-page',
      component: DetailPage
    },
    {
      path: '/articles',
      name: 'articles-page',
      component: ArticlesPage
    },
    {
      path: '/article/:id',
      name: 'article-page',
      component: ArticlePage
    }
  ]
})
