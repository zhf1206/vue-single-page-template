<template>
  <div v-show="isShow" class="gyl-comming-son" @click="close">
    <img class="comming-son-img" :src="imgUrl" >
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow:false
    };
  },
  props: {
    imgUrl:{
      type:String,
      default:''
    }
  },
  computed: {
  },
  methods: {
    show:function() {
      this.isShow = true;
    },
    close:function() {
      this.isShow = false;
    }
  },
  mounted () {}
};
</script>
<style lang="less">
.gyl-comming-son{
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  background-color: rgba(0,0,0,0.5);
  .comming-son-img{
    display: block;
    width: 510px;
    height: 712px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
}
</style>
