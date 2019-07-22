import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

const router = new Router({
  base: process.env.BASE_URL,
  mode: 'history',
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
router.beforeEach((to, from, next) => {
  console.log('BASE ' + process.env.BASE_URL);
  next()
})
export default router;