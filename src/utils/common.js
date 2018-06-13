import Vue from 'vue';
export const inBrowser = typeof window !== 'undefined';
/**
 * 移动终端浏览器版本信息
 */
export const versions = {
  ios: !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), // ios终端
  android: navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1, // android终端或uc浏览器
  gyl_android: navigator.userAgent.indexOf('gyl_android') > -1,
  gyl_ios: navigator.userAgent.indexOf('gyl_ios') > -1,
  wx: !!navigator.userAgent.match(/MicroMessenger/), // weixin
  safari: navigator.userAgent.indexOf('Safari') > -1,
  weibo: navigator.userAgent.match(/WeiBo/i)
};

/**
 * 调用APP方法
 * @param {*} actionName
 * @param {*} params
 */
export function callAction(actionName, params) {
  let json = {
    action: actionName,
    params: params
  };
  if (navigator.userAgent.indexOf('gyl_ios') > -1) {
    return window.webkit.messageHandlers.postMessage(json);
  }
  if (navigator.userAgent.indexOf('gyl_android') > -1) {
    return LocalNative.execute(JSON.stringify(json));
  }
};

/**
 * 显示信息框
 * @param {*} msg
 * @param {*} callback
 */
export function showMsg(msg, callback) {
  new Vue().$vux.toast.show({
    width: '180px',
    text: msg,
    position: 'bottom',
    type: 'text',
    time: 3000,
    onHide () {
      if(callback) {
        callback();
      }
    }
  });
};

/**
 * 显示加载框Loading
 * @param {*} isShow
 * @param {*} msg
 */
export function loading(isShow = false, msg = "加载中") {
  if (isShow) {
    new Vue().$vux.loading.show({
      text: msg
    });
  } else {
    new Vue().$vux.loading.hide();
  }
};

/**
 * 获取指定的URL参数值
 * URL:http://www.europa.com/index?name=aaa
 * 调用方法:getQueryString["name"]
 * @param {*} locUrl
 */
export const getQueryString = (locUrl) => {
  let url = locUrl || location.hash; //获取url中"?"符后的字串
  let theRequest = [];
  if (url.indexOf("?") != -1) {
    let str = url.split("?")[1];
    let strs = str.split("&");
    for(var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
    }
  }
  return theRequest;
};

/**
 * 浏览器定位
 */
export const getLocation = (callback) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition, showError, {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 3000
    });
  } else {
    showMsg("浏览器不支持地理定位。");
  }
  function showPosition(position) {
    var lat = position.coords.latitude; //纬度
    var lag = position.coords.longitude; //经度
    if(window.localStorage) {
      localStorage.setItem("coords", lat+","+lag);
    }
    if(callback) {
      callback();
    }
  };
  function showError(error) {
    switch(error.code) {
    case error.PERMISSION_DENIED:
      showMsg("定位失败,用户拒绝请求地理定位");
      break;
    case error.POSITION_UNAVAILABLE:
      showMsg("定位失败,位置信息是不可用");
      break;
    case error.TIMEOUT:
      showMsg("定位失败,请求获取用户位置超时");
      break;
    case error.UNKNOWN_ERROR:
      showMsg("定位失败,定位系统失效");
      break;
    }
  };
};

/**
 * 字符串长度
 * @param {*} str
 */
export const strlen = str => {
  let charCode = -1;
  const len = str.length;
  let realLength = 0;
  for (let i = 0; i < len; i++) {
    charCode = str.charCodeAt(i);
    if (charCode >= 0 && charCode <= 128) {
      realLength += 1;
    } else {
      realLength += 2;
    }
  }
  return realLength;
};

/**
 * 格式化时间
 * @param {String} str
 * @returns 格式化后的时间
 */
export const formatDate = (str) => {
  if (!str) return '';
  var date = new Date(str);
  // 现在的时间-传入的时间 = 相差的时间（单位 = 毫秒）
  var time = new Date().getTime() - date.getTime();
  if (time < 0) {
    return '';
  } else if ((time / 1000 < 30)) {
    return '刚刚';
  } else if (time / 1000 < 60) {
    return parseInt((time / 1000)) + '秒前';
  } else if ((time / 60000) < 60) {
    return parseInt((time / 60000)) + '分钟前';
  } else if ((time / 3600000) < 24) {
    return parseInt(time / 3600000) + '小时前';
  } else if ((time / 86400000) < 31) {
    return parseInt(time / 86400000) + '天前';
  } else if ((time / 2592000000) < 12) {
    return parseInt(time / 2592000000) + '月前';
  } else {
    return parseInt(time / 31536000000) + '年前';
  }
};

/**
 * 排序的函数
 * @param {*} obj
 */
export const objKeySort = (obj) => {
  var newkey = Object.keys(obj).sort();
  // 先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
  var newObj = {};
  for (var i = 0; i < newkey.length; i++) {
    // 向新创建的对象中按照排好的顺序依次增加键值对
    newObj[newkey[i]] = obj[newkey[i]];
  }
  return newObj;
};

/**
 * 图片转换Base64
 * @param {*} file
 * @param {*} callback
 */
export const readFile = (file, callback) => {
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function(e) {
    callback(this.result);
  };
};

/**
 * 去除字符串首尾空白
 * @param {*} str
 */
export const strTrim = (str) => {
  return str.replace(/(^\s*)|(\s*$)/g, "");
};

/**
 * 转换银行卡类型字符串
 * @param {*} val
 */
export const bankTypeStr = (val) => {
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
};

/**
 * 文本验证
 * 2017-12-20
 */
export const valid = {
  phone: function(val) {
    // 手机号
    const reg = /^1[34578]\d{9}$/;
    return reg.test(val);
  },
  password: function(val) {
    // 密码(字母、数字、特殊符号任意两种组合)
    const reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,12}$/;
    return reg.test(val);
  },
  email: function(val) {
    // 邮箱
    const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    return reg.test(val);
  },
  money: function(val) {
    // 金额，最多两位小数
    const reg = /^([0-9]*)+(.[0-9]{1,2})?$/;
    return reg.test(val);
  },
  number: function(val) {
    // 整数数字
    const reg = /^[0-9]*$/;
    return reg.test(val);
  },
  numpwd: function(val) {
    // 整数数字-支付密码
    const reg = /^[0-9]{6}$/;
    return reg.test(val);
  },
  date: function(val) {
    // 日期yyyy-MM-dd
    const reg = /^\d{4}-\d{1,2}-\d{1,2}/;
    return reg.test(val);
  },
  telephone: function(val) {
    // 国内电话
    const reg = /\d{3}-\d{8}|\d{4}-\{7,8}/;
    return reg.test(val);
  },
  zipcode: function(val) {
    // 邮编
    const reg = /[1-9]\d{5}(?!\d)/;
    return reg.test(val);
  },
  idCard: function(val) {
    // 身份证
    const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
    return reg.test(val);
  },
  characters: function(val) {
    // 汉字
    const reg = /^[u4e00-u9fa5],{0,}$/;
    return reg.test(val);
  },
  bankNo: function(val) {
    // 银行卡号
    const reg = /^(\d{16}|\d{19})$/;
    return reg.test(val);
  },
  idCodeValid: function(code) {
    // 身份证规则校验
    var city = {11:"北京", 12:"天津", 13:"河北", 14:"山西", 15:"内蒙古", 21:"辽宁", 22:"吉林", 23:"黑龙江 ", 31:"上海", 32:"江苏", 33:"浙江", 34:"安徽", 35:"福建", 36:"江西", 37:"山东", 41:"河南", 42:"湖北 ", 43:"湖南", 44:"广东", 45:"广西", 46:"海南", 50:"重庆", 51:"四川", 52:"贵州", 53:"云南", 54:"西藏 ", 61:"陕西", 62:"甘肃", 63:"青海", 64:"宁夏", 65:"新疆", 71:"台湾", 81:"香港", 82:"澳门", 91:"国外 "};
    var tip = "";
    var pass= true;
    if(!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
      tip = "身份证号格式错误";
      pass = false;
    } else if(!city[code.substr(0, 2)]) {
      tip = "身份证地址编码错误";
      pass = false;
    } else {
      //18位身份证需要验证最后一位校验位
      if (code.length == 18) {
        code = code.split('');
        //∑(ai×Wi)(mod 11)
        //加权因子
        var factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ];
        //校验位
        var parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ];
        var sum = 0;
        var ai = 0;
        var wi = 0;
        for (var i = 0; i < 17; i++) {
          ai = code[i];
          wi = factor[i];
          sum += ai * wi;
        }
        var last = parity[sum % 11];
        if (parity[sum % 11] != code[17]) {
          tip = "身份证校验位错误";
          pass =false;
        }
      }
    }
    if(!pass) console.log(tip);
    return pass;
  }
};