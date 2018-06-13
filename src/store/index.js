import Vue from 'vue';
import Vuex from 'vuex';
import {
  LOGOUT,
  SET_TOKEN,
  GET_TOKEN,
  SET_USER,
  GET_USER,
  SET_LOCAL_URL
} from './mutation_types';
import { getStore, setStore, removeStore } from '../utils/storage.js';
import login from './modules/login';
import register from './modules/register';
import user from './modules/user';
// import { userInfo } from 'os';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

const state = {
  loading: false,
  showMsg: false,
  loginUser: null,
  token: '',
  memberId: '',
  localUrl: ''
};

const getters = {
  getToken: state => state.token,
  getLoginUser: state => state.loginUser,
  getLocalUrl: state => state.localUrl
};

const mutations = {
  [SET_LOCAL_URL](state, data) {
    state.localUrl = data;
    setStore("LocalUrl", data);
  },
  [LOGOUT](state, data) {
    state.memberId = "";
    state.token = "";
    state.loginUser = null;
    removeStore("MemberId");
    removeStore("Token");
    removeStore("User");
  },
  [SET_TOKEN](state, data) {
    state.memberId = data.id;
    state.token = data.token;
  },
  [GET_TOKEN](state, data) {
    state.token = getStore("Token");
  },
  [SET_USER](state, data) {
    if (typeof (data) == "string") {
      state.loginUser = JSON.parse(data);
    } else {
      state.loginUser = data;
    }
  },
  [GET_USER](state, data) {
    let userJSON = getStore("User");
    state.loginUser = userJSON ? JSON.parse(userJSON) : null;
  }
};

export default new Vuex.Store({
  modules: {
    register,
    login,
    user
  },
  state: state,
  mutations: mutations,
  getters: getters,
  strict: debug,
  middlewares: debug ? [] : []
});