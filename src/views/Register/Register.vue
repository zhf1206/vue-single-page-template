<template>
  <div class="gyl-register">
    <div v-title>注册</div>
    <Header title="注册"></Header>
    <section class="content">
      <div class="reg-row">
        <div class="row"><i class="ico-phone"></i><input class="txt-phone" type="text" name="" id="txtPhone" @focus="phoneClear=true" @blur="phoneClear=false"  v-model="userName" placeholder="请输入手机号" /><span @click="clearClick(1)" v-show="phoneClear" class="txt-clear ico-clear"></span></div>
        <div class="row"><i class="ico-note"></i><input class="txt-code" type="text" name="" id="txtSms" @focus="smsClear=true" @blur="smsClear=false" v-model="smsCode" placeholder="请输入短信验证码" /><span @click="clearClick(2)" v-show="smsClear" class="txt-code-clear ico-clear"></span><input id="btnCode" :disabled="codeDisable" class="sms-code" :class="codeDisable?'disabled':''" type="button" :value="codeText" @click="getSmsCode"></div>
        <div class="row"><i class="ico-password"></i><input class="txt-pwd" type="password" name="" id="txtPwd" @focus="pwdClear=true" @blur="pwdClear=false" v-model='userPwd' placeholder="请输入登录密码"/><span @click="clearClick(3)" v-show="pwdClear" class="txt-clear ico-clear"></span></div>
        <div class="tip"><i class="ico-tip"></i><span>6-12位字母、数字、字符组合</span></div>
      </div>
      <div class="invite">我有邀请码</div>
      <div class="invite-txt">
        <input type="text" name="" id="" v-model="invitationCode" placeholder="输入邀请码，领取专属优惠">
      </div>
      <div class="agree">注册及同意<a href="javascript:;" @click="openProtocol">《欧罗巴聚财用户协议》</a></div>
      <div class="reg-btn">
        <input class="register" type="button" value="注册" @click="registerClick"/>
      </div>
    </section>
    <RegistAgreement ref="userProtocol" :isShow="false" :title="'协议'"></RegistAgreement>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import RegistAgreement from '@/components/protocol/RegistAgreement';
import { showMsg, valid } from '@/utils/common.js';
import apiUrl from '@/config/apiUrl.js';
import Header from '@/components/common/Header';
import { md5 } from 'vux';
export default {
  data() {
    return {
      userName: '',
      userPwd: '',
      smsCode: '',
      invitationCode: '',
      codeDisable: false,
      codeText: '获取验证码',
      smsNumber: '',
      time: 60,
      phoneClear: false,
      smsClear: false,
      pwdClear: false
    };
  },
  components: {
    Header, RegistAgreement
  },
  methods: {
    ...mapActions({
      register: "register",
      login: "login"
    }),
    countDown: function() {
      // TODO 倒计时
      let _this = this;
      let count = 60;
      this.codeDisable = true;
      let t = setInterval(() => {
        if(_this.time>0) {
          _this.time--;
          _this.codeText = _this.time + "s后获取";
        } else {
          clearInterval(t);
          _this.time = 60;
          _this.codeDisable = false;
          _this.codeText = "获取验证码";
        }
      }, 1000);
    },
    getSmsCode: function() {
      // TODO 获取短信验证码
      if(!valid.phone(this.userName)) {
        showMsg("手机号输入错误");
        return;
      }
      this.countDown();
      let param = {
        mobile: this.userName,
        smstype: 'register'
      };
      this.$httpPost(apiUrl.sendSmsCode, param).then((res) => {
        if(res.data&&res.data.status=='1000') {
          let data = res.data;
          this.smsNumber = res.data.smsNumber;
          showMsg(res.data.msg);
        }else{
          showMsg(res.data.msg);
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    openProtocol: function() {
      //TODO 打开用户协议
      this.$refs.userProtocol.openWin();
    },
    clearClick: function(flag) {
      //TODO 清空
      if(flag==1) {
        this.userName = "";
      }
      if(flag==2) {
        this.smsCode = "";
      }
      if(flag==3) {
        this.userPwd = "";
      }
    },
    registerClick: function() {
      // TODO 注册
      if(!valid.phone(this.userName)) {
        showMsg("手机号输入错误");
        return;
      }
      if(this.smsNumber=="") {
        showMsg("请先获取验证码");
        return;
      }
      if(!valid.password(this.userPwd)) {
        showMsg("请输入正确的密码");
        return;
      }
      let param = {
        mobile: this.userName,
        smsCode: this.smsCode,
        password: md5(this.userPwd),
        inviteCode: this.invitationCode,
        smsNumber: this.smsNumber
      };
      this.$httpPost(apiUrl.userRegister, param).then((res) => {
        if(res.data&&res.data.status==="1000") {
          let data = res.data;
          this.register(data);
          this.autoLogin();
        } else {
          showMsg(res.data.msg);
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    autoLogin() {
      //TODO 注册后登录
      let param = {
        loginName: this.userName,
        loginPwd: md5(this.userPwd)
      };
      this.$httpPost(apiUrl.userLogin, param, { isLoading: false }).then((res) => {
        if(res.data&&res.data.status==="1000") {
          this.login(res.data);
          this.$router.push('register_succ');
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
<style lang="less">
html,body{
  height: 100%;
  overflow: hidden;
}

.gyl-register{
  height: 100%;
  overflow: hidden;
  .content{
    box-sizing:border-box;
    width:100%;
    height:100%;
    padding-bottom:342px;
    overflow-x: hidden;
    overflow-y: auto;
    .reg-row{
      margin-top:50px;
      padding:0 100px;
      text-align: left;
      .row{
        margin-top:20px;
        padding:20px 0;
        height: 56px;
        line-height: 56px;
        border-bottom: 1px solid #E2E2E2;/*no*/
        i{
          margin-left:20px;
          font-size:0;
          margin-bottom:-4px;
          width:32px;
          height:32px;
        }
        .txt-phone{
          width:60%;
          height: 56px;
          line-height: 56px;
          margin-left:40px;
          font-size: 28px;
          color: #9FA2AE;
        }
        .txt-code{
          width:45%;
          height: 56px;
          line-height: 56px;
          margin-left:40px;
          font-size: 28px;
          color: #9FA2AE;
        }
        .txt-pwd{
          width:60%;
          height: 56px;
          line-height: 56px;
          margin-left:40px;
          font-size: 28px;
          color: #9FA2AE;
        }
        .sms-code{
          display: inline-block;
          margin-left:10px;
          padding:0;
          width:160px;
          height: 56px;
          line-height: 56px;
          font-size: 28px;
          color: #D1AD71;
          background-color: #fff;
          float:right;
          &.disabled{
            color:#9fa2ae
          }
        }
        .txt-clear{
          display: inline-block;
          width:18px;
          height:18px;
          margin-top:20px;
          margin-right:20px;
          float:right;
        }
        .txt-code-clear{
          display: inline-block;
          width:18px;
          height:18px;
          margin-top:20px;
          margin-right:20px;
        }
      }
      .tip{
        display: inline-block;
        height: 30px;
        margin-top:20px;
        font-size: 22px;
        color: #9FA2AE;
        vertical-align: middle;
        i{
          position: relative;
          margin-left:80px;
          width:20px;
          height:20px;
          float:left;
        }
        span{
          display:block;
          margin-left:120px;
        }
      }
    }
    .invite{
      height: 45px;
      line-height: 45px;
      margin-top:70px;
      padding:0 120px;
      font-size: 32px;
      color: #393649;
      text-align: left;
    }
    .invite-txt{
      width:550px;
      height:90px;
      line-height:90px;
      margin:0 auto;
      margin-top:24px;
      border: 1px solid #EBC97F;/*no*/
      border-radius: 90px;
      text-align: center;
      input[type='text']{
        width:336px;
        height: 50px;
        line-height:50px;
        margin:0 auto;
        font-size: 28px;
        color: #9FA2AE;
      }
    }
    .agree{
      width:100%;
      padding:0 120px;
      font-size: 22px;
      margin-top:70px;
      color: #999999;
      text-align: left;
      a{
        color:#EBC97F;
        text-decoration: none;
      }
    }
    .reg-btn{
      width:100%;
      height: 90px;
      margin-top:24px;
      text-align: center;
      .register{
        width:550px;
        height: 90px;
        line-height: 90px;
        background: #EBC97F;
        background-image: linear-gradient(-7deg, #F4CF7F 0%, #F9D893 100%);
        border-radius: 90px;
        font-size: 36px;
        color: #624621;
      }
    }
  }
}
</style>
