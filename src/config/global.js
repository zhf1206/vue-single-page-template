/**
 * 全局加载
 */
// 重置样式
import '../assets/css/common.less';
import '../assets/js/flexible.js';
import {
  ToastPlugin,
  LoadingPlugin,
  ConfirmPlugin
} from 'vux';
import Vue from 'vue';
import FastClick from 'fastclick';
import http from './http.js';
import '../utils/filter';

Vue.use(ToastPlugin);
Vue.use(LoadingPlugin);
// 封装axios
Vue.use(http);

// 解决click点击300毫秒延时问题
FastClick.attach(document.body);

// 标题指令
Vue.directive('title', {
  inserted: function(el) {
    document.title = el.innerText;
    el.remove();
  }
});

// 描述指令
Vue.directive('desc', {
  inserted: function(el) {
    document.getElementsByTagName('meta')['description'].content = el.innerText;
    el.remove();
  }
});

Vue.directive('focus', {
  inserted: function(el) {
    el.focus();
  }
});