<template>
  <div class="gyl-verify-code-model" v-if="showModel" @click="closeModel">
    <div class="code-box" @click.stop="stopPop">
      <div class="code-top">
        <p>已发送短信验证码到手机</p>
        <p v-text="labMobile"></p>
        <div>
          <input class="sms-code" placeholder="请输入短信验证码" type="text" v-model="smsCode">
          <input id="btnCode" :disabled="codeDisable" class="sms-get" :class="codeDisable?'disabled':''" type="button" :value="codeText" @click="getSmsCode">
        </div>
      </div>
      <input class="sms-next" type="button" value="下一步" @click="nextStep">
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { showMsg, valid } from '@/utils/common.js';
import apiUrl from '@/config/apiUrl.js';
export default {
  data() {
    return {
      labMobile: "",
      smsCode: '',
      invitationCode: '',
      smsNumber: '',
      codeDisable: false,
      codeText: '获取验证码',
      time: 60,
      showModel:false
    };
  },
  props: {
    smstype:{
      type: String,
      default: ""
    },
    mobile:{
      type: String,
      default: ""
    }
  },
  methods:{
    handleMobile: function(val) {
      let mobile = val.replace(/(\d{3})\d{4}(\d{4})/, '$1'+"****"+'$2');
      return mobile;
    },
    openModel:function() {
      // 打开弹窗层
      this.showModel = true;
    },
    closeModel:function() {
      // 关闭弹窗层
      this.showModel = false;
      this.smsCode = '';
    },
    stopPop:function() {
      // 阻止冒泡
    },
    countDown: function() {
      // TODO 倒计时
      let _this = this;
      let count = 60;
      this.codeDisable = true;
      let t = setInterval(() => {
        if(_this.time>0) {
          _this.time--;
          _this.codeText = _this.time + "s后重新获取";
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
      if(!valid.phone(this.mobile)) {
        showMsg("请输入11位手机号码");
        return;
      }
      this.countDown();
      let param = {
        mobile: this.mobile,
        smstype: this.smstype
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
    nextStep:function() {
      if(!this.smsCode) {
        showMsg("请输入短信验证码");
        return;
      }
      this.$emit("sms-next", this.smsNumber, this.smsCode);
    }
  },
  mounted() {
  },
  watch: {
    mobile: function(newVal, val) {
      this.labMobile = this.handleMobile(this.mobile);
    }
  }
};
</script>
<style lang="less" scoped>
  .gyl-verify-code-model{
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.50);
    position: fixed;
    top: 0;
    z-index: 5;
    ::-webkit-input-placeholder { /* WebKit browsers */
      color: #9FA2AE;
    }
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      color: #9FA2AE;
    }
    ::-moz-placeholder { /* Mozilla Firefox 19+ */
      color: #9FA2AE;
    }
    :-ms-input-placeholder { /* Internet Explorer 10+ */
      color: #9FA2AE;
    }
    .code-box{
      background: #fff;
      border-radius: 20px;
      overflow: hidden;
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -170px 0 0 -305px;
      .code-top{
        padding: 30px 30px 0 30px;
        p{
          font-size: 28px;
          color: #333646;
          line-height: 40px;
          text-align: center;
        }
        div{
          width: 550px;
          height: 80px;
          background: #F7F7F7;
          border-radius: 12px;
          overflow: hidden;
          margin: 30px 0;
          input{
            background: #F7F7F7;
          }
          .sms-code{
            width: 280px;
            padding: 26px 0 26px 20px;
            line-height: 28px;
            font-size: 28px;
            color: #9FA2AE;
          }
          .sms-get{
            width: 190px;
            line-height: 80px;
            text-align: center;
            font-size: 28px;
            color: #D7AE5C;
            float: right;
            margin-right: 20px;
            &.disabled{
            color: #9FA2AE;
            }
          }
        }
      }
      .sms-next{
        width: 100%;
        height: 90px;
        text-align: center;
        line-height: 90px;
        font-size: 32px;
        color: #D7AE5C;
        background: #fff;
        border-top: 1px solid #E2E2E2;/*no*/
      }
    }

  }
</style>
