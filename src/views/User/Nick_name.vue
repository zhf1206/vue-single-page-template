<template>
  <div class="gyl-nick-name">
    <div v-title>个人信息</div>
    <Header title="个人信息" :border="true"></Header>
    <section class="content">
      <div>
        <input type="text" placeholder="取一个你喜欢的昵称吧，2-8个字" v-model="nickName" @blur="saveNickName">
      </div>
    </section>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Header from "@/components/common/Header";
import { showMsg, loading } from "@/utils/common.js";
import apiUrl from "@/config/apiUrl.js";
export default {
  data() {
    return {
      nickName:'' // 昵称
    };
  },
  components: {
    Header
  },
  computed: {
    ...mapGetters({
      getLoginUser: "getLoginUser"
    })
  },
  methods: {
    saveNickName() {
      // 保存昵称
      if(this.nickName == undefined || this.nickName == undefined || this.nickName == '') {
        return false;
      }else if(this.nickName.length<2 || this.nickName.length>8) {
        showMsg("请输入2-8个字的昵称");
        return false;
      }
      let param = {
        nickName: this.nickName
      };
      this.$httpPost(apiUrl.updateByPrimaryKeySelective, param)
        .then(res => {
          if (res.data && res.data.status === "1000") {
            showMsg(res.data.msg, () => {
              this.$router.replace("personal_infor");
            });
          } else {
            showMsg(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.nickName = this.$route.query.nickName;
  }
};
</script>
  
<style lang="less">
.gyl-nick-name {
  height: 100%;
  background: #f5f5f7;
  header {
    background: #fff;
  }
  .content {
    margin-top: 20px;
    background: #fff;
    div {
      margin-top: 20px;
      padding-left: 30px;
      input {
        display: block;
        width: 100%;
        padding: 33px 0;
        line-height: 32px;
        font-size: 32px;
        color: #222;
        border-bottom: 1px solid #e2e2e2; /*no*/
      }
      ::-webkit-input-placeholder { /* WebKit browsers */
        color:#aaa;
      }
　　    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
        color:#aaa;
      }
      ::-moz-placeholder { /* Mozilla Firefox 19+ */
        color:#aaa;
      }
      :-ms-input-placeholder { /* Internet Explorer 10+ */
        color:#aaa;
      }
    }
  }
}
</style>
