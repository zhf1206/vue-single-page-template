<template>
  <div id="app" class="container">
    <transition name="slide-left">
        <router-view></router-view>
    </transition>  
  </div>
</template>

<script>
export default {
  name: 'app'
};
</script>
<style lang="less">
.container {
  width:100%;
  height:100%;
  overflow: hidden;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  // 渐变动效
  .slide-left-enter-active,
  .slide-left-leave-active {
    transition: opacity .1s ease-in;
  }
  .slide-left-enter,
  .slide-left-leave-active {
    opacity: 0;
  }

  // .slide-left-enter-active,
  // .slide-left-leave-active {
  //   transition: all .1s ease-in;
  //   transform: translate3d(0, 0, 0);
  // }
  // .slide-left-enter,
  // .slide-left-leave-active {
  //   transform: translate3d(100%, 0, 0);
  // }

  //左滑动效
  .move-enter-active {
    animation: slideLeft .3s;
  }
}
@keyframes opacity {
  from {
    opacity: 0;
  }
  to{
    opacity: 1;
  }
}
@keyframes slideLeft {
  from {
    transform: translate3d(100%, 0, 0);
    visibility: visible;
  }
  to {
    transform: translate3d(0, 0, 0);
  }
}
</style>
