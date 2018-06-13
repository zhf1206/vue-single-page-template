<template>
  <div class="gyl-header" :class="[fixed?'fixed':'',bgCss]" v-show="show">
    <header class="head" :class="border?'border-b':''">
      <div class="head-l">
        <span v-if="left.className!=''" @click="backTo"><i :class="left.className"></i></span>
        <a href="javascript:;" v-text="left.label"></a>
      </div>
      <div class="head-title" v-text="title"></div>
      <div class="head-r" @click="rightFn">
        <a href="javascript:;" v-text="right.label"></a>
        <span v-if="right.className!=''"><i :class="right.className"></i></span>
      </div>
    </header>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    fixed: {
      type: Boolean,
      default: false
    },
    bgCss: {
      type: String,
      default: "white"
    },
    border: {
      type: Boolean,
      default: false
    },
    show: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ""
    },
    left: {
      type: Object,
      default: function() {
        return {
          label: "",
          className: "ico-back"
        };
      }
    },
    right: {
      type: Object,
      default: function() {
        return {
          label: "",
          className: ""
        };
      }
    },
    linkTo: {
      type: String,
      default: ""
    },
    backFun: {
      type: Function,
      default: null
    },
    rightFn:{
      type: Function,
      default: function() {
      }
    }
  },
  methods: {
    backTo: function() {
      // 返回功能
      if(this.$route.query.redirect) {
        this.$router.push(this.$route.query.redirect);
        return;
      }
      if (this.linkTo) {
        this.$router.push(this.linkTo);
      } else if (this.backFun) {
        this.backFun();
      }else{
        this.$router.back();
      }
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
.ico-back{
  display: inline-block;
  background-image: url('../../assets/images/Svg/ico-back.svg');
  background-size:cover;
  width:20px;
  height:36px;
}
.ico-back-white{
  display: inline-block;
  background-image: url('../../assets/images/Svg/ico-back-white.svg');
  background-size:cover;
  width:20px;
  height:36px;
}
.gyl-header {
  width: 100%;
  &.white{
    background-color: #fff;
  }
  &.fixed {
    position: fixed;
    z-index: 999;
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
    font-size: 32px;
    color: #191919;
    box-sizing: border-box;
    &.border-b {
      border-bottom: 1px solid #dddddd;/*no*/
    }
    .head-l {
      width: 130px;
      padding-left: 40px;
      font-size: 32px;
      overflow: hidden;
      color: #000;
      span {
        display: block;
        width: 50px;
        height: 88px;
        line-height: 88px;
        float: left;
      }
      i {
        font-size: 0;
        margin-bottom: -8px;
      }
      a {
        display: inline-block;
        text-decoration: none;
        height: 88px;
        line-height: 88px;
      }
    }
    .head-title {
      flex: 1;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: bold;
      font-size: 32px;
    }
    .head-r {
      width: 130px;
      padding-right: 40px;
      font-size: 32px;
      overflow: hidden;
      color: #000;
      span {
        display: block;
        width: 50px;
        height: 88px;
        line-height: 88px;
        float: right;
      }
      i {
        font-size: 0;
        margin-bottom: -8px;
      }
      a {
        display: inline-block;
        text-decoration: none;
        height: 88px;
        line-height: 88px;
      }
    }
  }
}
</style>
