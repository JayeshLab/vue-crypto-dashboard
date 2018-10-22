import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import "./assets/vendor/font-awesome/css/font-awesome.css";
import "./assets/app.scss"

import clickOutside from "./directives/click-ouside"

Vue.config.productionTip = false;
Vue.directive("click-outside", clickOutside);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
