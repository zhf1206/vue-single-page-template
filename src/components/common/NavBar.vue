<template>
  <div class="gyl-navbar fixed" v-show="isShow">
    <div :class="currPath=='home'||currPath=='index'?'active':''" @click="homeClick">
      <p class="icon"><i class="ico-home"></i></p>
    </div>
    <div :class="currPath=='order'?'active':''" @click="orderClick">
      <p class="icon"><i class="ico-order"></i></p>
    </div>
    <div :class="currPath=='mine'?'active':''" @click="mineClick">
      <p class="icon"><i class="ico-my"></i></p>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currPath: ''
    };
  },
  components: {},
  props: {
    isShow: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    homeClick: function() {
      //TODO 首页
      this.$router.replace("/");
    },
    orderClick: function() {
      //TODO 订单
      this.$router.push("order");
    },
    mineClick: function() {
      //TODO 我的
      this.$router.push("mine");
    }
  },
  mounted() {
    this.currPath = this.$route.name;
  }
};
</script>
<style lang="less">
.ico-home{
  display: inline-block;
  background-image: url('../../assets/images/Svg/ico-home-nocheck.svg');
  background-size:70px 70px;
  width:70px;
  height:70px;
}
.ico-order{
  display: inline-block;
  background-image: url('../../assets/images/Svg/ico-order-nocheck.svg');
  background-size:70px 70px;
  width:70px;
  height:70px;
}
.ico-my{
  display: inline-block;
  background-image: url('../../assets/images/Svg/ico-my-nocheck.svg');
  background-size:70px 70px;
  width:70px;
  height:70px;
}
.gyl-navbar {
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
  padding: 0 30px;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  height: 98px;
  line-height: 98px;
  // font-size: 32px;
  // color: #191919;
  background-color: #FFFFFF;
  box-sizing: border-box;
  -moz-box-shadow: 0 -10px 10px rgba(0,0,0,0.05); /* 老的 Firefox */
  box-shadow: 0 -10px 10px rgba(0,0,0,0.05);  
  &.fixed{
    position: fixed;
    bottom:0;
    left: 0;
    right:0;
    z-index: 99;
  }
  div {
    width: 33.3333%;
    height: 98px;
    flex: 1;
    border-top: 1px solid #cccccc;/*no*/
    text-align: center;
    &.active{
      .ico-home{
        background-image: url('../../assets/images/Svg/ico-home.svg');
      }
      .ico-hight-fina{
        background-image: url('../../assets/images/Svg/ico-order.svg');
      }
      .ico-my{
        background-image: url('../../assets/images/Svg/ico-my.svg');
      }
    }
  }
  .icon{
    height: 70px;
    line-height: 70px;
    margin-top:14px;
    font-size:0;
  }
}
</style>
