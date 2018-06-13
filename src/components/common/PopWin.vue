<template>
  <div class="pop-win" v-if="show" @click="maskClick($event)">
    <div class="pop-content">
      <div class="pop-row" v-if="datas&&datas.length>0" v-for="(item,i) in datas" v-bind:key="i">
        <a v-if="item.type=='tel'" :href="'tel:'+item.text">{{item.text}}</a>
        <span v-else v-text="item.text" @click="callFun"></span>
      </div>
      <slot v-if="!datas"></slot>
      <div class="gap"></div>
      <div class="cancel" @click="closeWin">取消</div>
    </div>
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
    datas: {
      type: Array,
      default: [{
        type: {
          type: String,
          default: "tel"//tel:电话 text:文本
        },
        text: {
          type: String,
          default: ""
        },
        callFun: {
          type: Function,
          default: function() {
            return null;
          }
        }
      }]
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
    setData: function(data) {
      //TODO 赋值数据
      this.datas = data;
    },
    maskClick: function(event) {
      //TODO 遮罩层关闭
      if(event.target.className == 'pop-win') {
        this.closeWin();
      }
    }
  },
  mounted () {
    this.show = this.isShow;
  }
};
</script>
<style lang="less">
.pop-win{
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
    .pop-row{
      height: 100px;
      line-height: 100px;
      margin: 0 30px;
      border-bottom: 1px solid #E2E2E2;/*no*/
      text-align: center;
      background-color: #fff;
      font-size: 32px;
      color: #222222;
      a{
        text-decoration: none;
        font-weight: bold;
        color: #222222;
      }
    }
    &:last-child .pop-row{
      border-bottom:none;
    }
    .gap{
      height: 10px;
      line-height: 10px;
      background-color: #F5F5F7;
    }
  }
  .cancel{
    height: 100px;
    line-height: 100px;
    font-size: 32px;
    color: #F9615C;
    background-color: #fff;
    text-align: center;
  }
}
</style>
