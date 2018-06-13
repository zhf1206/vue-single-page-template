<template>
  <div class="gyl-login">
    <div v-title>{{title}}</div>
    <div class="top-bg">
      <header class="head">
        <div class="head-l"><span class="exit" @click="backTo"><i class="ico-exit"></i></span></div>
        <div class="head-title"></div>
        <div class="head-r"><router-link to="register">立即注册</router-link></div>
      </header>
    </div>
    <section class="content">
      <div class="title">登录</div>
      <div class="login">
        <div class="row"><i class="ico-phone"></i><input class="phone" type="text" name="userName" id="userName" autocomplete="off" @focus="nameClear=true" @blur="nameClear=false" v-model="userName" placeholder="请输入注册手机号"><span v-show="nameClear" @click="clearClick(1)" class="txt-clear ico-clear"></span></div>
        <div class="row"><i class="ico-password"></i><input class="password" type="password" name="userPwd" id="userPwd" autocomplete="off" @focus="pwdClear=true" @blur="pwdClear=false" v-model="userPwd" placeholder="请输入登录密码"><span v-show="pwdClear" @click="clearClick(2)" class="txt-clear ico-clear"></span></div>
        <div class="forget"><router-link :to="{path:'loginpwd_edit'}">忘记密码?</router-link></div>
      </div>
      <div class="btn-login"><input class="logining" type="button" value="登录" @click="loginClick"></div>
    </section>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { showMsg, loading, valid } from '@/utils/common.js';
import apiUrl from '@/config/apiUrl.js';
import { md5 } from 'vux';
export default {
  data() {
    return {
      title: "登录",
      userName: "",
      userPwd: "",
      nameClear: false,
      pwdClear: false
    };
  },
  components: {},
  computed: {
    ...mapGetters(["loginToken", "loginInfo", "userInfo"])
  },
  methods: {
    ...mapActions({
      login: "login"
    }),
    backTo: function() {
      // 返回
      this.$router.back();
    },
    getWeekDay(num) {
      let weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
      return weeks[num];
    },
    clearClick: function(flag) {
      if(flag==1) {
        this.userName = "";
      }
      if(flag==2) {
        this.userPwd = "";
      }
    },
    loginClick() {
      //TODO 登录
      // loading(true);
      if(!valid.phone(this.userName)) {
        showMsg("请输入11位手机号码");
        return;
      }
      if(!valid.password(this.userPwd)) {
        showMsg("请输入正确的密码规则");
        return;
      }
      let param = {
        loginName: this.userName,
        loginPwd: md5(this.userPwd)
      };
      this.$httpPost(apiUrl.userLogin, param).then((res) => {
        if(res.data&&res.data.status==="1000") {
          let data = res.data;
          this.login(data);
          let redirect = this.$route.query.redirect;
          if(redirect) {
            this.$router.replace(decodeURIComponent(redirect));
          } else {
            this.$router.replace("/");
          }
        } else {
          showMsg(res.data.msg);
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
html,body{
  height: 100%;
  overflow: hidden;
}

.gyl-login{
  width:100%;
  height:100%;
  .top-bg{
    width:100%;
    height:225px;
  }
  .head{
    display: box;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: row;
    -moz-flex-direction: row;
    -ms-flex-direction: row;
    -o-flex-direction: row;
    flex-direction: row;
    -webkit-flex-wrap: wrap;
    -moz-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    -o-flex-wrap: wrap;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: stretch;
    width:100%;
    height:80px;
    line-height: 80px;
    font-size: 32px;
    color:#191919;
    box-sizing: border-box;
    .head-l{
      width:130px;
      padding-left:50px;
      font-size: 32px;
      .exit{
        display: block;
        width:50px;
        height: 80px;
        line-height: 80px;
      }
      i{
        font-size:0;
        width:32px;
        height:32px;
        margin-bottom:-4px;
      }
    }
    .head-title{
      flex:1;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .head-r{
      width:140px;
      padding-right:50px;
      font-size: 32px;
      a{
        color: #FFFFFF;
        text-decoration:none;
      }
    }
  }
  .content{
    width:100%;
    height: auto;
    .title{
      width:100%;
      height: 42px;
      line-height: 42px;
      margin-top:70px;
      font-size: 42px;
      color: #282D43;
      text-align: center;
    }
    .login{
      margin-top:60px;
      padding: 0 100px;
      .row{
        height: 68px;
        line-height: 68px;
        margin-top:20px;
        border-bottom:1px solid #E2E2E2;/*no*/
        text-align: left;
        i{
          margin-left:20px;
          margin-bottom:-4px;
          width:32px;
          height:32px;
        }
        input{
          margin-left:40px;
          width:70%;
          height: 60px;
          line-height: 60px;
          font-size:28px;
        }
        .txt-clear{
          display: inline-block;
          width:18px;
          height:18px;
          margin-top:26px;
          margin-right:20px;
          float:right;
        }
      }
      .forget{
        height: 24px;
        line-height: 24px;
        margin-top:16px;
        font-size:24px;
        color: #9FA2AE;
        text-align: right;
        a{
          color: #9FA2AE;
          text-decoration:none;
        }
      }
    }
    .btn-login{
      width:100%;
      height: 90px;
      line-height: 90px;
      margin-top:40px;
      text-align: center;
      .logining{
        width:550px;
        height: 90px;
        line-height: 90px;
        background: #EBC97F;
        border-radius: 90px;
        font-size: 36px;
        color: #624621;
      }
    }
  }
}
</style>
