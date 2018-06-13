<template>
  <div class="gyl-footer" :class="fixed?'fixed':''">
    <footer class="footer">
      <input type="button" v-for="(foo,idx) in footerList" v-bind:key="idx" @click="foo.event" :style="foo.style" :value="foo.name">
    </footer>
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
    footerList:{
      type:Array,
      default:function() {
        return [{
          name:{
            // 按钮-名字
            type:String,
            default:''
          },
          event:{
            // 按钮-点击事件
            type:Function,
            default:function () {
              return function() {};
            }
          },
          style:{
            // 按钮-样式
            type:String,
            default:''
          }
        }];
      }
    }
  },
  mounted() {}
};
</script>
<style lang="less" scoped>
  .gyl-footer{
    width: 100%;
    .footer{
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
    // -webkit-flex-wrap: wrap;
    // -moz-flex-wrap: wrap;
    // -ms-flex-wrap: wrap;
    // -o-flex-wrap: wrap;
    // flex-wrap: wrap;
    justify-content: space-around;
    align-items: stretch;
    width: 100%;
    height: 100px;
    box-sizing: border-box;
    
    
      input{
        display: block;
        width: 100%;
        line-height: 100px;
        font-size: 36px;
        text-align: center;
        border-radius: 0;
      }
    }
    &.fixed {
      position: fixed;
      bottom: 0;
    }
  }

</style>
