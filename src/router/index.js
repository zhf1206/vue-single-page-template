import Vue from 'vue';
import VueRouter from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import store from '../store';
import * as types from '../store/mutation_types';
NProgress.configure({ showSpinner: false });
const TestIndex = resolve => require(['@/views/Test/test'], resolve);
const Home = resolve => require(['@/views/Home'], resolve);
const Login = resolve => require(['@/views/Login'], resolve);
const Register = resolve => require(['@/views/Register/Register'], resolve);
const RegisterSucc = resolve => require(['@/views/Register/Register_Succ'], resolve);
const Mine = resolve => require(['@/views/Center/Mine'], resolve);
const News = resolve => require(['@/views/Center/News'], resolve);
const PersonalInfor = resolve => require(['@/views/User/Personal_Infor'], resolve);
const NickName = resolve => require(['@/views/User/Nick_name'], resolve);
const Setting = resolve => require(['@/views/SetUp/Setting'], resolve);
const LoginPwdEdit = resolve => require(['@/views/SetUp/LoginPwd_Edit'], resolve);
Vue.use(VueRouter);
const routes = [{
  path: '/test',
  name: 'test',
  component: TestIndex
}, {
  path: '/',
  name: 'home',
  component: Home
}, {
  path: '/home',
  name: 'home',
  component: Home
}, {
  path: '/login',
  name: 'Login',
  component: Login
}, {
  path: '/register',
  name: 'register',
  component: Register
}, {
  path: '/register_succ',
  name: 'register_succ',
  component: RegisterSucc
}, {
  path: '/mine',
  name: 'mine',
  component: Mine
}, {
  path: '/news',
  name: 'news',
  component: News
}, {
  path: '/personal_infor',
  name: 'personal_infor',
  component: PersonalInfor,
  meta: { requiresAuth: true }
}, {
  path: '/nick_name',
  name: 'nick_name',
  component: NickName,
  meta: { requiresAuth: true }
}, {
  path: '/setting',
  name: 'setting',
  component: Setting
}, {
  path: '/loginpwd_edit',
  name: 'loginpwd_edit',
  component: LoginPwdEdit
}];
// 页面刷新时，重新赋值token
if (window.localStorage && window.localStorage.getItem('Token')) {
  let id = window.localStorage.getItem('MemberId');
  let token = window.localStorage.getItem('Token');
  store.commit(types.SET_TOKEN, { id: id, token: token });
  store.commit(types.SET_USER, window.localStorage.getItem('User'));
  store.commit(types.SET_LOCAL_URL, document.URL);
} else {
  console.log("不支持本地存储，没有Token");
}

const router = new VueRouter({
  mode: 'hash',
  routes
});

router.beforeEach((to, from, next) => {
  //保存当前URL
  store.commit(types.SET_LOCAL_URL, document.URL);
  if (to.matched.some(r => r.meta.requiresAuth)) {
    if (store.state.token) {
      NProgress.start();
      next();
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      });
    }
  } else {
    NProgress.start();
    next();
  }
});

router.afterEach(transition => {
  NProgress.done();
});

export default router;