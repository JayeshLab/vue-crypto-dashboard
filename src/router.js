import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: '/vue-crypto-dashboard/',
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: () => import('./views/Dashboard.vue')
    },
    {
      path: '/view/:symbol',
      name: 'infoview',
      component: () => import('./views/InfoView.vue'),
      props: true
    }
  ]
})
