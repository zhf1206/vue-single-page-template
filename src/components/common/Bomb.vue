<template>
  <div class="gyl-bomb" v-show="show" @click="maskClose">
    <div class="bomb-box" @click.stop="stopPop">
       <div class="bomb-title" v-if="title" v-text="title.name" :style="title.titStyle"></div>
       <div class="bomb-text" v-html="bombText"></div>
       <div class="bomb-btn" v-show="showBombBtn">
           <a href="javascript:;" v-for="(btn, idx) in bombBtns" :key="idx" v-text="btn.name ? btn.name : '确定'"  @click="bombFun(idx)" :style="btn.btnStyle" :class="bombBtns.length==2 ? 'two-btn' : 'one-btn'"></a>  
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show:false
    };
  },
  watch:{
    title:function() {},
    bombText:function() {},
    bombBtns:function() {}
  },
  props: {
    isMaskClose:{  // 点击蒙版关闭弹框
      type:Boolean,
      default:false
    },
    title:{
      type:Object,
      default:function() {
        return {
          name:{
            type:String,
            default:''
          },
          titStyle:{
            type:Object,
            default:null
          }
        };
      }
    },
    bombText:{
      type:String,
      default:''
    },
    showBombBtn:{
      type:Boolean,
      default:true
    },
    bombBtns:{
      type:Array,
      default:function() {
        return [
          {
            name:{
              type:String,
              default:'确定'
            },
            btnFun:{
              type:Function,
              default:null
            },
            btnStyle:{
              type:String,
              default:''
            }
          }
        ];
      }
    }
  },
  methods: {
    showBomb:function() {
      this.show = true;
    },
    closeBomb:function() {
      this.show = false;
    },
    bombFun:function(idx) {
      this.bombBtns[idx].btnFun();
    },
    maskClose:function() {
      if(this.isMaskClose) {
        this.show = false;
      }
    },
    stopPop:function() {
      // 组织冒泡
    }
  },
  mounted() {
    // console.log(this.title.titStyle);
  }
};
</script>
<style lang="less" scoped>
.gyl-bomb {
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
    position: fixed;
    left: 0;
    top: 0;
    z-index: 999;
    .bomb-box{
        width: 610px;
        min-height: 250px;
        padding-top: 50px;
        text-align: center;
        background-color: #fff;
        border-radius: 20px;    
        overflow: hidden;
        position: absolute;
        left: 70px;
        top: 35%;
        .bomb-title{
            padding: 0 50px;
            font-size: 36px;
            color: #F9615C;
            line-height: 36px;  
            margin-bottom: 30px;
        }
        .bomb-text{
            padding: 0 50px;
            font-size: 32px;
            color: #222;
            line-height: 45px;
            margin-bottom: 52px;
        }
        .bomb-btn{
            height: 90px;
            overflow: hidden;
            a{
                display: block;
                height: 90px;
                text-align: center;
                line-height: 90px;
                font-size: 32px;
                color: #6F7281;
                text-decoration: none;
                float: left;
            }
            .one-btn{
                width: 100%;
            }
            .two-btn{
                width: 50%;
            }
        }
    }
}
</style>
