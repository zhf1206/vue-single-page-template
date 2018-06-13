<template>
  <div class="gyl-setting">
    <div v-title>设置</div>
    <Header title="设置" :border="true" :backFun="headBack"></Header>
    <section class="content">
      <div class="con-row"><span class="title">消息推送</span><span class="con-r"><label class="gyl-label"><input class="mui-switch" type="checkbox"></label></span></div>
      <div class="con-row"><span class="title">指纹解锁</span><span class="con-r"><label class="gyl-label"><input class="mui-switch" type="checkbox"></label></span></div>
      <div class="con-row" @click="loginPwdClick"><span class="title">登录密码</span><span class="con-r"><i class="ico-arrow-r"></i></span></div>
      <div class="con-row" @click="showPopPayPwd"><span class="title">交易密码</span><span class="con-r"><i class="ico-arrow-r"></i></span></div>
      <div class="con-row"><span class="title">当前版本</span><span class="con-r"><p v-if="isVerTip" class="ver-tip">有新版本更新</p><p :class="!isVerTip?'no-tip':'version'">v1.0.0</p><i class="ico-arrow-r"></i></span></div>
    </section>
    <footer class="gyl-footer">
      <input class="eru-btn" type="button" @click="loginOutClick" value="安全退出">
    </footer>
    <div class="pop-paypwd" v-if="popPayPwdShow" @click="closeClick($event)">
      <div class="pop-content">
        <div class="pop-row" @click="editPayPwdClick">修改交易密码</div>
        <div class="pop-row no-border" @click="backPayPwdClick">找回交易密码</div>
        <div class="cancel" @click="cancelPopPayPwd">取消</div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Header from "@/components/common/Header";
import { showMsg, loading, valid } from "@/utils/common.js";
import apiUrl from "@/config/apiUrl.js";
import { setTimeout } from 'timers';
export default {
  data() {
    return {
      popPayPwdShow: false,
      isPayPwd: false,
      isVerTip: false
    };
  },
  components: {
    Header
  },
  computed:{
    ...mapGetters(["getLoginUser", "getUserInfo"])
  },
  methods: {
    ...mapActions({
      loginOut: "loginOut"
    }),
    headBack: function() {
      this.$router.replace("mine");
    },
    loginPwdClick: function() {
      //TODO 登录密码
      this.$router.push("loginpwd_edit");
    },
    showPopPayPwd: function() {
      //TODO 显示交易密码
      if(this.isPayPwd) {
        this.popPayPwdShow = true;
      }else {
        this.$router.push("pay_pwd");
      }
    },
    closeClick: function(event) {
      //TODO 遮罩层关闭
      if(event.target.className == 'pop-paypwd') {
        this.popPayPwdShow = false;
      }
    },
    cancelPopPayPwd: function() {
      //TODO 关闭交易密码
      this.popPayPwdShow = false;
    },
    editPayPwdClick: function() {
      //TODO 修改交易密码
      this.$router.push("paypwd_edit");
    },
    backPayPwdClick: function() {
      //TODO 找回交易密码
      this.$router.push("paypwd_back");
    },
    loginOutClick: function() {
      //TODO 退出登录
      let param = {};
      this.$httpPost(apiUrl.loginOut, param).then((res) => {
        if(res.data&&res.data.status==="1000") {
          this.loginOut(res.data);
          showMsg(res.data.msg);
          setTimeout(() => {
            this.$router.replace("/");
          }, 3000);
        } else {
          showMsg(res.data.msg);
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    initUserInfo:function() {
      //TODO 查询用户信息
      let _id = this.getLoginUser.id;
      let param = {
        id: _id
      };
      this.$httpPost(apiUrl.selectByPrimaryKey, param).then((res) => {
        if(res.data&&res.data.status==="1000") {
          this.isPayPwd = res.data.isPayPwd;
        } else {
          showMsg(res.data.msg);
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  },
  mounted () {
  }
};
</script>
<style lang="less">
html,body{
  height: 100%;
  overflow: hidden;
}
.gyl-setting{
  height:100%;
  overflow-y: auto;
  background-color: #F5F5F7;
  .head{
    background-color: #ff0000;
  }
  .content{
    background-color: #fff;
    margin-top:20px;
    .con-row{
      height: 100px;
      line-height: 100px;
      margin-left:30px;
      border-bottom: 1px solid  #E2E2E2;/*no*/
      text-align: left;
      .title{
        font-size: 32px;
        color: #333646;
      }
      .con-r{
        position: relative;
        display: inline-block;
        float:right;
        margin-right:40px;
        .ver-tip{
          font-size: 24px;
          color: #F9615C;
          margin-right:30px;
          float: left;
        }
        .version{
          position: absolute;
          height: 24px;
          line-height: 24px;
          bottom:0px;
          right:60px;
        }
        .no-tip{
          margin-right: 0.4rem;
          float: left;
        }
        label{
          margin-top:19px;
        }
        i{
          width:13px;
          height:26px;
          margin-bottom:-7px;
        }
      }
    }
  }
  .gyl-footer{
    margin-top:240px;
    text-align: center;
    .eru-btn{
      width:360px;
      border: 4px solid #FDC1BF;
      font-size: 32px;
      color: #F9615C;
      background-color: #F5F5F7;
    }
  }
}
.pop-paypwd{
  position: absolute;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0,0,0,0.5);
  z-index: 999;
  .pop-content{
    position: absolute;
    width:100%;
    bottom:0;
    background-color: #fff;
    text-align: center;
    .pop-row{
      height: 100px;
      line-height: 100px;
      font-size: 32px;
      color: #282D43;
      margin:0 30px;
      border-bottom: 1px solid #E2E2E2;/*no*/
      &.no-border{
        border-bottom: none;
      }
    }
    .cancel{
      height: 100px;
      line-height: 100px;
      font-size: 32px;
      color: #F9615C;
      border-top:10px solid #F5F5F7;
    }
  }
}
</style>
