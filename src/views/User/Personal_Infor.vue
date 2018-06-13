<template>
  <div class="gyl-personalInfor">
    <div v-title>个人信息</div>
    <Header title="个人信息" :border="true" :backFun="headBack"></Header>
    <section class="content">
      <div class="menue" @click="uploadHeader"><div><p>头像</p><span class="icon-box"><i class="ico-arrow-r"></i></span><span class="img-box"><img :src="headPortrait" alt=""></span></div></div>
      <div class="menue"><div><p>手机号</p><span class="text-box">{{mobile | mobileFilter}}</span></div></div>
      <div class="menue" @click="changeNickName"><div><p>昵称</p><span class="icon-box"><i class="ico-arrow-r"></i></span><input  class="text-box" type="text" placeholder="未设置" :value="nickName" readonly></div></div>
    </section>
    <transition name="fade" mode="out-in" appear>
      <div class="updImg" v-show="uploadShow" @click="closeMask">
        <section class="updImg-mask" @click.stop="stopPop">
          <div class="pic-box">
            <span><i class="ico-pic"></i></span><span>照片库</span>
            <uploader class="btn-upload" ref="upload" :maximum="1" @input="uploadImage"></uploader>
          </div>
          <div @click="closeMask">取消</div>
        </section>
      </div>
    </transition>
    <!-- <uploadImg @getUploadImg="getImg" ref="uoloadImg"></uploadImg> -->
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Header from "@/components/common/Header";
import Uploader from "vue-upload-component";
import { showMsg, loading, valid, readFile } from "@/utils/common.js";
import apiUrl from "@/config/apiUrl.js";
export default {
  data() {
    return {
      headPortrait: require("../../assets/images/Svg/ico-head-sm.svg"), // 头像
      headPortraitUp:'',
      nickName: "", // 昵称
      mobile: "", // 手机号
      uploadShow: false // 上传图片蒙版
    };
  },
  components: {
    Header,
    Uploader
  },
  computed: {
    ...mapGetters({
      getLoginUser: "getLoginUser"
    })
  },
  methods: {
    headBack: function() {
      // 返回
      this.$router.replace("mine");
    },
    getUserInfor() {
      // 获取用户信息
      let _id = this.getLoginUser.id;
      let param = {
        id: _id
      };
      this.$httpPost(apiUrl.selectByPrimaryKey, param)
        .then(res => {
          if (res.data && res.data.status === "1000") {
            this.nickName = res.data.baseModel.nickName;
            this.headPortrait = res.data.baseModel.headPortrait
              ? res.data.baseModel.headPortrait
              : this.headPortrait;
            this.mobile = res.data.baseModel.mobile;
          } else {
            showMsg(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    uploadHeader() {
      // 上传头像
      this.uploadShow = true;
    },
    // getImg: function(url) {
    //   this.headPortrait = url;
    //   this.$refs.uoloadImg.closeMask();
    //   this.saveheadPortrait();
    // },
    saveheadPortrait() {
      // 保存头像接口
      let param = {
        headPortrait: this.headPortraitUp
      };
      this.$httpPost(apiUrl.updateByPrimaryKeySelective, param)
        .then(res => {
          if (res.data && res.data.status === "1000") {
            showMsg(res.data.msg);
          } else {
            showMsg(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    uploadImage(formData) {
      // 上传图片
      this.closeMask();
      let params = {
        formFile: formData[0].file
      };
      this.$httpPost(apiUrl.imgFileUpload, params).then((res) => {
        if(res.data&&res.data.status==="1000") {
          let data = res.data;
          this.headPortrait = data.fileUrls;
          this.headPortraitUp = data.fileUrl;
          this.saveheadPortrait();
        } else {
          showMsg(res.data.msg);
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    closeMask() {
      // 关闭蒙层
      this.uploadShow = false;
      this.frontImgUrl = "";
    },
    changeNickName() {
      // 修改昵称
      this.$router.push({path:'nick_name', query:{nickName:this.nickName}});
      // this.$router.push('/nick_name?nickName='+encodeURI(this.nickName));
    },
    stopPop() {
      // 阻止冒泡
    }
  },
  mounted() {
    this.getUserInfor();
  }
};
</script>
  
<style lang="less">
html,
body,
.gyl-personalInfor {
  width: 100%;
  height: 100%;
}
.gyl-personalInfor {
  background: #f5f5f7;
  header {
    background: #fff;
  }
  .content {
    margin-top: 20px;
    background: #fff;
    .menue {
      padding-left: 30px;
      div {
        padding: 17px 40px 17px 0;
        border-bottom: 1px solid #e2e2e2; /*no*/
        overflow: hidden;
        &.no-border {
          border-bottom: 0;
        }
        p {
          float: left;
          line-height: 66px;
          font-size: 32px;
          color: #333646;
        }
        span {
          display: block;
          float: right;
        }
        input {
          display: block;
          float: right;
          text-align: right;
        }
        ::-webkit-input-placeholder { /* WebKit browsers */
          color:#9FA2AE;
        }
　　    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
          color:#9FA2AE;
        }
        ::-moz-placeholder { /* Mozilla Firefox 19+ */
          color:#9FA2AE;
        }
        :-ms-input-placeholder { /* Internet Explorer 10+ */
          color:#9FA2AE;
        }
        .text-box {
          height: 66px;
          line-height: 66px;
          font-size: 24px;
          color: #9fa2ae;
          &.col-tips {
            color: #f9615c;
          }
        }
        .img-box {
          width: 64px;
          height: 64px;
          border-radius: 50%;
          border: 1px solid #e2e2e2; /*no*/
          overflow: hidden;
        }
        img {
          width: 64px;
          height: 64px;
        }
        .icon-box {
          width: 42px;
          height: 66px;
          text-align: right;
          i {
            display: inline-block;
            width: 14px;
            height: 24px;
            vertical-align: middle;
            margin-top: 21px;
          }
        }
      }
    }
  }
  .updImg {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;
    background-color: rgba(0,0,0,.5);
    .updImg-mask{
      width: 750px;
      height: 220px;
      position: absolute;
      bottom: 0;
      background: #F5F5F7;
      div{
        height: 100px;
        line-height: 100px;
        text-align: center;
        font-size: 32px;
        color: #F9615C;
        margin-bottom: 20px;
        background: #fff;
        &.pic-box{
          color: #282D43;
          position: relative;
          .uploader{
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            opacity: 0;
            .weui-uploader__input-box,input{
              display: block;
              width: 100%;
              height: 100%;
            }
          }
        }

        span{
          width: 32px;
          height: 26px;
          margin-right: 20px;
          i{
            width: 32px;
            height: 26px;
          }
        }
      }
    }
  }
}
</style>
