import Vue from 'vue';
import {getStore, setStore, removeStore} from '../../utils/storage.js';
import {
  REGISTER
} from '../mutation_types.js';

const state = {
  loginName: '',
  memberId: '',
  invitCode: ''
};

const getters = {
  loginName: state => state.loginName,
  memberId: state => state.memberId,
  userInvitCode: state => state.invitCode
};

const actions = {
  register({commit, state}, data) {
    setStore("memberId", data.memberId);
    commit(REGISTER, data);
  }
};

const mutations = {
  // 注册
  [REGISTER](state, data) {
    state.loginName = data.loginName;
    state.memberId = data.memberId;
    state.invitCode = data.invitationCode;
  }
};

export default {
  state,
  getters,
  actions,
  mutations
};