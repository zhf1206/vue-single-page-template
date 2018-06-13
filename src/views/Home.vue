<template>
  <div class="gyl-home">
      <div v-title>{{title}}</div>
      <header class="head fixed" :class="scrollFixed ? 'head-default' : ''">
        <div class="head-l" @click="showService">
          <span><i class="ico-service"></i></span>
          <a href="javascript:;"></a>
        </div>
        <div class="head-title" v-text="title"></div>
        <div class="head-r" @click="newsClick">
          <a href="javascript:;"></a>
          <span><i class="ico-news"></i></span>
        </div>
      </header>
      <section class="content" @scroll="handleScroll()">
        <div class="top-bg">
          <div class="login" v-if="!getToken">
            <input class="top-login" type="button" @click="login" value="登录 / 注册" />
          </div>
        </div>
      </section>
      <NavBar :isShow="true"></NavBar>
      <PopWin ref="service" :isShow="false" :datas="serviceData"></PopWin>
      <CommingSon ref="comson" :imgUrl="imgurl"></CommingSon>
  </div>
</template>
<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import PopWin from '@/components/common/PopWin';
import NavBar from '@/components/common/NavBar';
import CommingSon from '@/components/common/CommingSon';
import { showMsg, loading, valid, versions } from '@/utils/common.js';
import apiUrl from '@/config/apiUrl.js';
var moment = require("moment");
export default {
  data() {
    return {
      title: "宝贝记",
      scrollFixed:false,  // 头部滚动固定
      isOpenCash: false,
      serviceData: [{
        type: "tel",
        text: "010-77788899",
        callFun: null
      }],
      experience: 10000,
      bbinStatus: "0",
      userId: "",
      isBindCard: false,
      isAuthentic: false,
      imgurl:''
    };
  },
  components: { NavBar, PopWin, CommingSon },
  computed: {
    ...mapGetters({
      getToken: 'getToken',
      getLoginUser: 'getLoginUser'
    })
  },
  methods: {
    ...mapMutations({}),
    ...mapActions({
      saveUserInfo: 'saveUserInfo'
    }),
    handServiceTel: function() {
      //TODO 处理服务电话信息
      this.serviceData.push({
        type: "tel",
        text: "010-52361111",
        callFun: null
      });
    },
    showService: function() {
      //TODO 显示客服信息
      this.$refs.service.openWin();
    },
    newsClick: function() {
      //TODO 显示消息信息
      this.$router.push("news");
    },
    login: function() {
      //TODO 登录/注册
      this.$router.push("login");
    },
    register:function() {
      //TODO 注册
      this.$router.push("register");
    },
    handleScroll:function() {
      // var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
      // console.log(scrollTop);
      let tpScrollTop = document.querySelector('.content').scrollTop;
      if(tpScrollTop>120) {
        this.scrollFixed = true;
      }else{
        this.scrollFixed = false;
      }
    },
    initUserInfo:function() {
      //TODO 查询用户信息
      this.userId = this.getLoginUser?this.getLoginUser.id:"";
      let param = {
        id: this.userId
      };
      this.$httpPost(apiUrl.selectByPrimaryKey, param, {isLoading:false}).then((res) => {
        if(res.data&&res.data.status==="1000") {
          this.isBindCard = res.data.isBindCard;
          this.isAuthentic = res.data.isAuthentic;
          this.saveUserInfo(res.data);
        } else {
          showMsg(res.data.msg);
        }
      }).catch((err) => {
        console.log(err);
      });
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    window.localStorage.setItem("Token", "test");
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>
<style lang="less">
html,body{
  height: 100%;
  overflow: hidden;
}
.gyl-home{
  height: 100%;
  overflow: hidden;
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
    height:90px;
    line-height: 90px;
    font-size: 36px;
    color: #fff;
    box-sizing: border-box;
    background-color: #ff0000;
    &.fixed{
      position: fixed;
      z-index: 9;
    }
    &.border-b{
      border-bottom:1px solid #DDDDDD;/*no*/
    }
    &.head-default{
      color: #333;
      background-color: #fff;
      border-bottom:1px solid #DDDDDD;/*no*/
      .head-l .ico-service{
        background-image: url('../assets/images/Svg/ico-service-black.svg');
      }
      .head-r .ico-news{
        background-image: url('../assets/images/Svg/ico-news-check.svg');
        background-size: 36px 36px;
      }
    }
    .head-l{
      width:130px;
      padding-left:40px;
      font-size: 32px;
      overflow: hidden;
      span{
        display: block;
        width:50px;
        height: 90px;
        line-height: 90px;
        float:left;
      }
      i{
        font-size:0;
        margin-bottom:-8px;
        width: 36px;
        height: 36px;
      }
      a{
        display: inline-block;
        text-decoration: none;
        height: 90px;
        line-height: 90px;
        color:#000;
      }
    }
    .head-title{
      flex:1;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: bold;
    }
    .head-r{
      width:130px;
      padding-right:40px;
      font-size: 32px;
      overflow: hidden;
      span{
        display: block;
        width:50px;
        height: 90px;
        line-height: 90px;
        float:right;
      }
      i{
        font-size:0;
        margin-bottom:-8px;
        width: 36px;
        height: 36px;
      }
      a{
        display: inline-block;
        text-decoration: none;
        height: 90px;
        line-height: 90px;
        color:#000;
      }
    }
  }
  .content{
    box-sizing:border-box;
    position: relative;
    width:100%;
    height: 100%;
    padding-bottom:118px;
    background-color: #F3F3F4;
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
    .top-bg{
      display: block;
      position: absolute;
      width:100%;
      height: 490px;
      .login{
        position: relative;
        top:145px;
        span{
          display: inline-block;
          position: absolute;
          width:120px;
          left: 51px;
          height: 80px;
          line-height:80px;
          font-size: 28px;
          color: #FFFFFF;
        }
        .top-login{
          display:block;
          width:240px;
          height: 80px;
          margin:0 auto;
          border: 1px solid #FFFFFF;/*no*/
          border-radius: 80px;
          font-size: 28px;
        }
      }
    }
  }
}
</style>