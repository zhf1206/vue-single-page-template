<template>
  <div class="pop-page" v-if="show">
    <header class="head" :class="border?'border-b':''">
      <div class="head-l">
        <span v-if="left.className!=''" @click="backTo"><i :class="left.className"></i></span>
        <a href="javascript:;" v-text="left.label"></a>
      </div>
      <div class="head-title" v-text="title"></div>
      <div class="head-r" @click="rightFn">
        <span v-if="right.className!=''"><i :class="right.className"></i></span>
      </div>
    </header>
    <section class="contents">
      <slot></slot>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false
    };
  },
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
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
    openWin: function() {
      //TODO 打开
      this.show = true;
    },
    closeWin: function() {
      //TODO 关闭
      this.show = false;
    },
    backTo: function() {
      //TODO 返回关闭
      this.closeWin();
    }
  },
  mounted () {
    this.show = this.isShow;
  }
};
</script>
<style lang="less">
.pop-page{
  position: absolute;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 999;
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
    &.fixed {
      position: fixed;
    }
    &.border-b {
      border-bottom: 1px solid #dddddd;/*no*/
    }
    .head-l {
      width: 130px;
      padding-left: 40px;
      font-size: 32px;
      overflow: hidden;
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
        width:20px;
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
    .head-title {
      flex: 1;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: bold;
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
        margin-bottom: -8px;
        width:20px;
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
  .contents{
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 0 30px;
    padding-bottom:100px;
    .prot-title{
      font-size: 36px;
      color: #222222;
      text-align: center;
      font-weight: bold;
      margin-top:60px;
      margin-bottom:40px;
    }
    .prot-info{
      p{
        font-size: 28px;
        color: #666666;
        line-height: 40px;
      }
      h2{
        margin-top:20px;
        margin-bottom:18px;
        font-size: 32px;
        color: #222222;
        font-weight: bold;
      }
    }
  }
}
</style>
