<template>
  <div class="gyl-login-pwd">
    <div v-title>修改登录密码</div>
    <Header title="修改登录密码" :border="true"></Header>
    <section class="content">
      <div class="con-row">
        <label>手机号：</label><input class="txt-mobile" type="text" @focus="phoneClear=true" @blur="phoneClear=false" v-model="mobile" placeholder="请输入手机号"><span @click="clearClick(1)" v-show="phoneClear" class="txt-clear ico-clear"></span>
      </div>
      <div class="con-row">
        <label>短信验证：</label><input class="txt-code" @focus="smsClear=true" @blur="smsClear=false" v-model="smsCode" type="text" placeholder="请输入短信验证码"><span @click="clearClick(2)" v-show="smsClear" class="txt-code-clear ico-clear"></span>
        <GetVerifyCode :smstype="'findPwd'" :mobile="mobile" v-on:sms-num="setSmsNum"></GetVerifyCode>
      </div>
      <div class="con-row">
        <label>设置新密码：</label><input class="txt-pwd" @focus="pwdClear=true" @blur="pwdClear=false" v-model="newPwd" type="password" placeholder="6-20位字母、数字、字符组合"><span @click="clearClick(3)" v-show="pwdClear" class="txt-clear ico-clear"></span>
      </div>
    </section>
    <footer class="gyl-footer m-t160">
      <input class="eru-btn btn-l btn-primary" type="button" @click="confirmClick" value="确认">
    </footer>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Header from "@/components/common/Header";
import GetVerifyCode from "@/components/GetVerificationCode";
import { showMsg, loading, valid } from "@/utils/common.js";
import apiUrl from "@/config/apiUrl.js";
import { md5 } from 'vux';
export default {
  data() {
    return {
      mobile: "",
      smsCode: "",
      newPwd: "",
      smsNumber: "",
      user: null,
      phoneClear: false,
      smsClear: false,
      pwdClear: false
    };
  },
  components: {
    Header, GetVerifyCode
  },
  computed:{
    ...mapGetters(["getLoginUser"])
  },
  methods: {
    clearClick: function(flag) {
      //TODO 清空
      if(flag==1) {
        this.mobile = "";
      }
      if(flag==2) {
        this.smsCode = "";
      }
      if(flag==3) {
        this.newPwd = "";
      }
    },
    setSmsNum: function(val) {
      //TODO 验证码标识
      this.smsNumber = val;
    },
    confirmClick: function() {
      //TODO 确认提交
      if(!valid.phone(this.mobile)) {
        showMsg("手机号输入错误");
        return;
      }
      if(this.smsCode==""||this.smsNumber=="") {
        showMsg("请先获取验证码");
        return;
      }
      if(!valid.password(this.newPwd)) {
        showMsg("请输入正确的密码");
        return;
      }
      let param = {
        mobile: this.mobile,
        smsCode: this.smsCode,
        loginPwd: md5(this.newPwd),
        smsNumber: this.smsNumber
      };
      this.$httpPost(apiUrl.findLoginPwd, param).then((res) => {
        if(res.data&&res.data.status==="1000") {
          let data = res.data;
          showMsg(res.data.msg);
          this.$router.replace("setting");
        } else {
          showMsg(res.data.msg);
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  },
  mounted () {
    this.mobile = this.getLoginUser?this.getLoginUser.mobile:"";
  }
};
</script>
<style lang="less">
html,body{
  height: 100%;
  overflow: hidden;
}
.gyl-login-pwd{
  height:100%;
  background-color: #F5F5F7;
  .content{
    background-color: #fff;
    margin-top:20px;
    .con-row{
      height: 100px;
      line-height: 100px;
      margin: 0 30px;
      border-bottom:1px solid #E2E2E2;/*no*/
      text-align: left;
      label{
        display: inline-block;
        width:180px;
      }
      .txt-mobile{
        width:60%;
        height: 80px;
        line-height: 80px;
        font-size: 28px;
        color: #393649;
        padding:10px 0px;
      }
      .txt-code{
        width:45%;
        height: 80px;
        line-height: 80px;
        font-size: 28px;
        color: #9FA2AE;
        padding:8px 0px;
      }
      .txt-pwd{
        width:60%;
        height: 80px;
        line-height: 80px;
        font-size: 28px;
        color: #9FA2AE;
        padding:8px 0px;
      }
      .gyl-getCode{
        float:right;
      }
      .txt-clear{
        display: inline-block;
        width:18px;
        height:18px;
        margin-top:41px;
        margin-right:20px;
        float:right;
      }
      .txt-code-clear{
        display: inline-block;
        width:18px;
        height:18px;
        margin-top:41px;
        margin-right:20px;
      }
    }
    :last-child{
      border-bottom:none;
    }
  }
}
</style>
