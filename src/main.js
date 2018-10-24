// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueFire from 'vuefire'
import Chart from 'chart.js';
import VueChartkick from 'vue-chartkick'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


import cBM_Industries from './components/cBM_Industries.vue'
import I_O_overview from './components/I_O_overview.vue'

Vue.config.productionTip = false

Vue.use(VueChartkick, {adapter: Chart});
Vue.use(VueFire)
Vue.use(router)
Vue.use(BootstrapVue)


Vue.component('app-I_O_overview', I_O_overview)
Vue.component('app-cbm_industries', cBM_Industries);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
