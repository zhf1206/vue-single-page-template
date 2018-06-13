import Vue from 'vue';
import {getStore, setStore, removeStore} from '../../utils/storage.js';
import {
  LOGOUT,
  USER_LOGIN,
  USER_LOGIN_OUT,
  SET_TOKEN,
  SET_USER
} from '../mutation_types.js';

function handleUser(data) {
  let user = {};
  user.id = data.bean.id||data.bean.id;
  user.mobile = data.bean.mobile||data.bean.mobile;
  user.loginName = data.bean.loginName||data.bean.loginName;
  user.nickName = data.bean.nickName||data.bean.nickName;
  // user.email = data.bean.email||data.bean.email;
  user.isIdentification = data.bean.isIdentification||data.bean.isIdentification;
  user.referraCode = data.bean.referraCode||data.bean.referraCode;
  user.invitationCode = data.bean.invitationCode||data.bean.invitationCode;
  user.status = data.bean.status||data.bean.status;
  user.isPayPwd = data.isPayPwd;
  user.isGesturePwd = data.isGesturePwd;
  user.isBindCard = data.isBindCard;
  return user;
}

const state = {
  userInfo: [],
  loginInfo: []
};

const getters = {
  loginInfo: state => state.loginInfo,
  userInfo: state => state.userInfo
};

const actions = {
  login({commit, state}, data) {
    let user = handleUser(data);
    commit(USER_LOGIN, data);
    commit(SET_TOKEN, {id:user.id, token:data.token});
    commit(SET_USER, user);
  },
  loginOut({commit, state, rootState}, data) {
    commit(LOGOUT, data);
  }
};

const mutations = {
  // 登录
  [USER_LOGIN](state, data) {
    let user = handleUser(data);
    state.userInfo = user;
    state.loginInfo = data.bean;
    setStore("MemberId", user.id);
    setStore("Token", data.token);
    setStore("User", JSON.stringify(user));
  },
  // 注销
  [USER_LOGIN_OUT](state, data ) {
    removeStore("MemberId");
    removeStore("Token");
    removeStore("User");
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};