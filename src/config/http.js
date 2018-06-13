import axios from 'axios';
import qs from 'qs';
import {base64, md5} from 'vux';
import Promise from 'es6-promise';
import store from '../store';
import { loading, showMsg, versions, objKeySort } from '@/utils/common.js';
Promise.polyfill();

let env = require('../../config/dev.env');
if (process.env.NODE_ENV === 'development') {
  env = require('../../config/dev.env');
} else if (process.env.NODE_ENV === 'testing') {
  env = require('../../config/test.env');
} else if (process.env.NODE_ENV === 'product') {
  env = require('../../config/prod.env');
} else {
  env.NODE_ENV = "production";
  env.API_SERVER = "";
}

// axios 配置
axios.defaults.timeout = 300000;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = env.API_SERVER;

// POST传参序列化
axios.interceptors.request.use((config) => {
  let oldParams = config.data;
  let device = {type: '', deviceModel: '', deviceName: ''};
  if (versions.gyl_android) {
    device.type = "Android";
    device.deviceModel = 'Android';
    device.deviceName = 'Android';
  } else if (versions.gyl_ios) {
    device.type = "IOS";
    device.deviceModel = 'IOS';
    device.deviceName = 'IOS';
  }else{
    device.type = "H5";
    device.deviceModel = 'H5';
    device.deviceName = 'Browser';
  }
  let user = {
    token:store.state.token,
    memberId:store.state.memberId
  };
  config.data = Object.assign({}, device, user, config.data);
  config.data = objKeySort(config.data);
  config.data.sign = getSign(config.data);
  config.data = Object.assign({}, config.data);
  if (config.method === 'post') {
    config.data = qs.stringify(config.data);
  }
  return config;
}, (error) => {
  showMsg('请求参数错误');
  return Promise.reject(error);
});

// 返回状态判断
axios.interceptors.response.use((res) => {
  let baseData = res.data.data?JSON.parse(base64.decode(res.data.data)):"";
  res.data.data = baseData;
  if (res.data.code === 200) {
    return res;
  }
  showMsg(res.data.msg);
  return Promise.reject(res);
}, (error) => {
  // 提示
  showMsg("返回错误："+error.message);
  return Promise.reject(error);
});

function parseParam(param, key) {
  let paramStr="";
  if(typeof (param) == "string" || typeof (param) == "number" || typeof (param) == "boolean") {
    paramStr+="&" + key + "=" + param;
  } else {
    for(let i in param) {
      var k=key==null?i:key+(param instanceof Array ? "["+i+"]" : "."+i);
      paramStr += '&'+parseParam(param[i], k);
    }
  }
  return paramStr.substr(1);
};

function getSign(param, key) {
  let url = parseParam(param);
  let urlStr = url.split("&").sort().join("&");
  let urlParam = urlStr.split("&");
  let theRequest = [];
  let newStr = "";
  for(let i = 0; i < urlParam.length; i++) {
    newStr += urlParam[i].split("=")[1];
  }
  return md5(newStr);
}

export default {
  get(url, params, options) {
    var option = {
      isLoading: true
    };
    options = Object.assign(option, options);
    return new Promise((resolve, reject) => {
      if(options.isLoading) loading(true);
      axios({method:"GET", url:url, data:params})
        .then(response => {
          if(options.isLoading) loading(false);
          resolve(response.data);
        }, (err) => {
          if(options.isLoading) loading(false);
          reject(err);
        })
        .catch((error) => {
          if(options.isLoading) loading(false);
          reject(error);
        });
    });
  },
  post(url, params, options) {
    var option = {
      isLoading: true
    };
    options = Object.assign(option, options);
    return new Promise((resolve, reject) => {
      if(options.isLoading) loading(true);
      axios({method:"POST", url:url, data:params})
        .then(response => {
          if(options.isLoading) loading(false);
          resolve(response.data);
        }, (err) => {
          if(options.isLoading) loading(false);
          reject(err);
        })
        .catch((error) => {
          if(options.isLoading) loading(false);
          reject(error);
        });
    });
  },
  install: function (Vue) {
    Object.defineProperty(Vue.prototype, '$httpGet', {
      value: this.get
    });
    Object.defineProperty(Vue.prototype, '$httpPost', {
      value: this.post
    });
    Object.defineProperty(Vue.prototype, '$axios', {
      value: axios
    });
  }
};