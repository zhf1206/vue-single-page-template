<template>
  <div class="gyl-my">
    <div v-title>我的</div>
    <div class="gyl-my-scroller">
      <div class="assets">
        <header class="head">
          <div class="head-l">
            <span class="" @click="personalClick">
              <img v-if="headImg" :src="headImg" alt="">
              <!-- <img v-else src="../../assets/images/Svg/ico-head-sm.svg" alt=""> -->
            </span>
            <a href="javascript:;"></a>
          </div>
          <div class="head-title">我的</div>
          <div class="head-r">
            <a href="javascript:;"></a>
            <span @click="settingClick"><i class="ico-setting"></i></span>
          </div>
        </header>
        <!-- <div class="title" @click="eyeClick"><p>总资产(元）</p><i :class="showEye?'ico-eye-show':'ico-eye-hide'"></i></div>
        <div class="money" v-text="showEye?totalAssets:'******'"></div> -->
      </div>
      <section class="content">
        <div class="financing">
          <div class="f-row"><div class="icon"><i class="ico-xianjinbao"></i></div><div class="cont-r"><span class="title">我的产品</span><span class="money"><b></b><i class="ico-arrow-r"></i></span></div></div>
          <div class="f-row"><div class="icon"><i class="ico-dingqi"></i></div><div class="cont-r"><span class="title">我的订单</span><span class="money"><b></b><i class="ico-arrow-r"></i></span></div></div>
        </div>
        <div class="card">
          <div class="f-row"><div class="icon"><i class="ico-bank"></i></div><div class="cont-r"><span class="title">银行卡</span><span class="money"><b class="word">张</b><i class="ico-arrow-r"></i></span></div></div>
          <div class="f-row" @click="cardClick"><div class="icon"><i class="ico-card"></i></div><div class="cont-r"><span class="title">卡券包</span><span class="money"><b class="word">张可用</b><i class="ico-arrow-r"></i></span></div></div>
          <div class="f-row" @click="shareClick"><div class="icon"><i class="ico-invite"></i></div><div class="cont-r"><span class="title">邀请有礼</span><span class="money"><b class="word">{{reward}}</b><i class="ico-arrow-r"></i></span></div></div>
        </div>
        <div class="risk">
          <div class="f-row"><div class="icon"><i class="ico-evaluating"></i></div><div class="cont-r"><span class="title">关于我们</span><span class="money"><b class="word"></b><i class="ico-arrow-r"></i></span></div></div>
        </div>
      </section>
    </div>
    <NavBar :isShow="true"></NavBar>
    <CommingSon ref="comson" :imgUrl="imgUrl"></CommingSon>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import NavBar from '@/components/common/NavBar';
import CommingSon from '@/components/common/CommingSon';
import { showMsg, loading, valid } from "@/utils/common.js";
import apiUrl from "@/config/apiUrl.js";
export default {
  data() {
    return {
      userId: '',
      showEye: false,
      headImg: '',
      isBindCard: false,
      isAuthentic: false,
      totalAssets: 0,
      latelyIncome: 0,
      totalIncome: 0,
      cashBalance: 0,
      regularFina: 0,
      highFina: 0,
      employeeLoan: 0,
      bankCardCount: 0,
      couponsCount: 0,
      reward: "",
      riskAssess: "",
      fundOpen: -2,
      imgUrl:""
    };
  },
  components: {
    NavBar, CommingSon
  },
  computed:{
    ...mapGetters(["getLoginUser", "getUserInfo"])
  },
  methods: {
    ...mapActions({
      saveUserInfo: 'saveUserInfo'
    }),
    eyeClick: function() {
      this.showEye = !this.showEye;
    },
    personalClick: function() {
      //TODO 个人信息
      this.$router.push("personal_infor");
    },
    settingClick: function() {
      //TODO 设置
      this.$router.push("setting");
    },
    cardClick: function() {
      //TODO 卡券包
      this.$router.push("cards");
    },
    shareClick:function() {
      //TODO 邀请有礼
      // this.$router.push({path: "/invite", query: {userId: this.userId}});
      location.href = "?#/invite?userId=" + this.userId;
    },
    initUserInfo:function() {
      //TODO 查询用户信息
      let param = {
        id: this.userId
      };
      this.$httpPost(apiUrl.selectByPrimaryKey, param).then((res) => {
        if(res.data&&res.data.status==="1000") {
          this.headImg = res.data.baseModel?res.data.baseModel.headPortrait:"";
          this.isBindCard = res.data.isBindCard;
          this.isAuthentic = res.data.isAuthentic;
          this.saveUserInfo(res.data);
        } else {
          showMsg(res.data.msg);
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    initUserAsset:function() {
      //TODO 查询用户资产信息
      let param = {};
      this.$httpPost(apiUrl.queryMemberAssetStatis, param).then((res) => {
        if(res.data&&res.data.status==="1000") {
          this.totalAssets = res.data.totalAssets.toFixed(2);
          this.latelyIncome = res.data.latelyIncome.toFixed(2);
          this.totalIncome = res.data.totalIncome.toFixed(2);
          this.cashBalance = res.data.cashBalance.toFixed(2);
          this.regularFina = res.data.regularFina.toFixed(2);
          this.highFina = res.data.highFina.toFixed(2);
          this.employeeLoan = res.data.employeeLoan.toFixed(2);
          this.bankCardCount = res.data.bankCardCount;
          this.couponsCount = res.data.couponsCount;
          this.reward = res.data.reward;
          this.riskAssess = res.data.riskAssess;
          this.fundOpen = res.data.fundOpen;
        } else {
          showMsg(res.data.msg);
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  },
  mounted() {
    this.userId = this.getLoginUser?this.getLoginUser.id:"";
  }
};
</script>
<style lang="less">
html,body{
  height: 100%;
}
.gyl-my{
  box-sizing: border-box;
  width:100%;
  height: 100%;
  padding-bottom:100px;
  // height: calc(~"100% - 98px");
  background-color:  #F5F5F7;
  .gyl-my-scroller{
    width:100%;
    height: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    position: relative;
    top: 0;
    z-index: 2;
  }
  .head {
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
    width: 100%;
    height: 88px;
    line-height: 88px;
    font-size: 36px;
    color: #FFFFFF ;
    box-sizing: border-box;
    background-color: #ff0000;
    &.fixed {
      position: fixed;
    }
    &.border-b {
      border-bottom: 1px solid #dddddd;/*no*/
    }
    &.bg-col{
      background-color: #D5B77C;
    }
    &.bg{
      background-color:rgba(0,0,0,0)
    }
    .head-l {
      width: 130px;
      padding-left: 40px;
      font-size: 32px;
      overflow: hidden;
      span {
        display: block;
        width: 66px;
        height: 88px;
        line-height: 88px;
        float: left;
      }
      img {
        font-size: 0;
        margin-bottom: -22px;
        width:66px;
        height:66px;
        border-radius: 100px;
      }
      a {
        display: inline-block;
        text-decoration: none;
        height: 88px;
        line-height: 88px;
        color: #000;
      }
    }
    .head-title {
      flex: 1;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: bold;
      font-size:36px;
    }
    .head-r {
      width: 130px;
      padding-right: 40px;
      font-size: 32px;
      overflow: hidden;
      span {
        display: block;
        width: 50px;
        height: 88px;
        line-height: 88px;
        float: right;
      }
      i {
        font-size: 0;
        margin-bottom: -6px;
        width:36px;
        height:36px;
      }
      a {
        display: inline-block;
        text-decoration: none;
        height: 88px;
        line-height: 88px;
        color: #000;
      }
    }
  }
  .assets{
    .title{
      position: relative;
      width:100%;
      margin-top:30px;
      text-align: center;
      p{
        display: inline-block;
        height: 28px;
        line-height: 28px;
        font-size: 28px;
        color: #FFFFFF;
      }
      i{
        position: absolute;
        margin-left:10px;
        width:32px;
        height:32px;
        margin-bottom:-8px;
      }
    }
    .money{
      margin-top:20px;
      font-size: 48px;
      color: #FFFFFF;
      text-align: center;
    }
  }
  .content{
    width:100%;
    .financing,.card,.risk{
      background-color: #fff;
      padding-left:30px;
      .f-row{
        height: 100px;
        line-height:100px;
        .icon{
          display: block;
          width:36px;
          height: 100px;
          line-height: 100px;
          float:left;
          i{
            width:36px;
            height: 36px;
            margin-bottom:-10px;
          }
        }
        &:last-child .cont-r{
          border-bottom: none;
        }
        .cont-r{
          display: block;
          width:90%;
          height: 100px;
          line-height: 100px;
          margin-left:10%;
          text-align: left;
          border-bottom:1px solid #E2E2E2;/*no*/
          .title{
            font-size: 32px;
            color: #333646;
          }
          .money{
            float:right;
            margin-right:40px;
            clear:right;
            .word{
              font-size: 24px;
              color: #9FA2AE;
            }
            b{
              font-size: 24px;
              color: #F9615C;
              margin-right:30px;
            }
            i{
              margin-bottom:-2px;
              width:14px;
              height:24px;
            }
          }
        }
      }
    }
    .card{
      margin-top:20px;
    }
    .risk{
      margin-top:20px;
    }
  }
}
</style>
