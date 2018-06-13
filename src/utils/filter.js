import Vue from 'vue';
var moment = require('moment');
// 日期格式化
Vue.filter('format', function(date, formate) {
  return moment(new Date(date)).format(formate);
});
// 银行卡类型
Vue.filter('bankTypeFilter', function(val) {
  let str = "";
  switch(val) {
  case 1:
    str = "借记卡";
    break;
  case 2:
    str = "贷记卡";
    break;
  case 3:
    str = "准贷记卡";
    break;
  default:
    str = "未知";
  }
  return str;
});
// 手机号处理
Vue.filter('mobileFilter', function(val, symbol = '*') {
  if(val&&val!="") {
    val = val.replace(/(\d{3})\d{4}(\d{4})/, '$1'+symbol+symbol+symbol+symbol+'$2');
  }
  return val;
});
// 银行卡号处理
Vue.filter('bankNoFilter', function(val="") {
  let str = "**** ";
  if(val&&val!="") {
    str += val.substr(-4);
  }
  return str;
});
// 银行卡号后四位
Vue.filter('bankNoFourFilter', function(val="") {
  let str = "";
  if(val&&val!="") {
    str = val.substr(-4);
  }
  return str;
});
// 金额格式化2位小数
Vue.filter('moneyFilter', function(val=0.00) {
  let str = "0.00";
  if(val&&val!="") {
    str = parseFloat(val).toFixed(2);
  }
  return str;
});