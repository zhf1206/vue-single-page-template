<template>
  <div class="reg-suss">
    <div v-title>注册</div>
    <Header title="注册" :border="true"></Header>
    <section class="content">
      <div class="succ"><img src="../../assets/images/Svg/ico-succeed.svg" alt=""></div>
      <div class="succ-tip">注册成功</div>
      <div class="gold">您已获得{{experience}}元储金宝体验金，开通储金宝即可获得收益</div>
      <div class="bind-card"><input type="button" name="" value="去绑卡体验" @click="bindCardClick"/></div>
      <div class="other"><input type="button" value="以后再说" @click="HomeClick"/></div>
    </section>
  </div>
</template>
<script>
import Header from "@/components/common/Header";
import { showMsg, loading, valid } from '@/utils/common.js';
import apiUrl from '@/config/apiUrl.js';
export default {
  data() {
    return {
      bbinStatus: "0",
      experience: 10000
    };
  },
  components: {
    Header
  },
  methods: {
    getExperienceGold: function() {
      //TODO 获取体验金
      let param = {};
      this.$httpPost(apiUrl.queryExperienceGold, param).then((res) => {
        if(res.data&&res.data.status==="1000") {
          this.bbinStatus = res.data.fundstatus||this.bbinStatus;
          this.experience = res.data.experience||this.experience;
        } else {
          showMsg(res.data.msg);
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    bindCardClick:function() {
      this.$router.push({name:'bank_add', query:{redirect:'/'}});
    },
    HomeClick:function() {
      this.$router.push('/');
    }
  },
  mounted() {
    this.getExperienceGold();
  }
};
</script>
<style lang="less">
.reg-suss{
  .content{
    width:100%;
    padding-top:120px;
    .succ{
      width:120px;
      height: 120px;
      margin:0 auto;
      img{
        width:100%;
        height:100%;
      }
    }
    .succ-tip{
      width:100%;
      height: 40px;
      line-height:40px;
      margin-top:40px;
      font-size: 40px;
      color: #F9615C;
      text-align: center;
    }
    .gold{
      width:471px;
      margin:0 auto;
      margin-top:60px;
      line-height:42px;
      font-size: 28px;
      color: #393649;
    }
    .bind-card{
      width:100%;
      height:90px;
      margin-top:251px;
      text-align: center;
      input[type='button']{
        width:550px;
        height: 90px;
        line-height:90px;
        background: #EBC97F;
        background-image: linear-gradient(-7deg, #F4CF7F 0%, #F9D893 100%);
        border-radius: 90px;
        font-size: 36px;
        color: #624621;
        margin:0 auto;
      }
    }
    .other{
      width:100%;
      height:90px;
      margin-top:60px;
      text-align: center;
      input[type='button']{
        width:360px;
        height: 90px;
        line-height:90px;
        background: #fff;
        border: 1px solid #EBC97F;/*no*/
        border-radius: 90px;
        font-size: 36px;
        color: #624621;
        margin:0 auto;
      }
    }
  }
}
</style>
