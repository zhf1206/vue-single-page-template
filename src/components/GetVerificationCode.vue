<template>
  <div class="gyl-getCode"  @click="getSmsCode">
    <input id="btnCode" :disabled="codeDisable" class="sms-code" :class="codeDisable?'disabled':''" type="button" :value="codeText">
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import { showMsg, valid } from '@/utils/common.js';
import apiUrl from '@/config/apiUrl.js';
export default {
  data() {
    return {
      smsCode: '',
      invitationCode: '',
      smsNumber: '',
      codeDisable: false,
      codeText: '获取验证码',
      time: 60
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
          this.$emit("sms-num", this.smsNumber);
          showMsg(res.data.msg);
        }else{
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
  .gyl-getCode{
    width: 160px;
    height: 100%;
    input{
      width: 160px;
      line-height: 66px;
      text-align: center;
      font-size: 28px;
      color: #D7AE5C;
      background: #fff;
    }
  }
</style>
