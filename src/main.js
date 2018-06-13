import 'babel-polyfill';
import Vue from 'vue';
import store from './store';
import router from './router';
import App from './App';
import './config/global.js';

Vue.config.productionTip = false;
// 开启debug模式
Vue.config.debug = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
});
