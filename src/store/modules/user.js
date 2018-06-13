import Vue from 'vue';
import { getStore, setStore, removeStore } from '../../utils/storage.js';
import {
  USER_NICK_EDIT,
  USER_INFO_SAVE
} from '../mutation_types.js';

const state = {
  userInfo: null
};

const getters = {
  getUserInfo: state => state.userInfo
};

const actions = {
  saveUserInfo({ commit, state }, data) {
    commit(USER_INFO_SAVE, data);
  }
};

const mutations = {
  // 编辑用户昵称
  [USER_NICK_EDIT](state, data) {
  },
  // 保存用户信息
  [USER_INFO_SAVE](state, data) {
    state.userInfo = {};
    state.userInfo.isPayPwd = data.isPayPwd;
    state.userInfo.isGesturePwd = data.isGesturePwd;
    state.userInfo.isBindCard = data.isBindCard;
    state.userInfo.baseModel = data.baseModel;
    state.userInfo.certifiModel = data.certifiModel;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};