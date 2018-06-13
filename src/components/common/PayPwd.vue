<template>
  <div class="eru-pwd">
    <section class="pay-mask" v-show="payShow">
      <div class="pay">
        <div class="pay-title" v-text="title"></div>
        <div class="pay-content" @click="showKeyNum">
          <div class="ipt-pay" v-for="(item,i) in arrIpt" v-bind:key="i">
            <input type="password" maxlength="1" :value="item" disabled>
          </div>
        </div>
      </div>
      <footer v-show="keyNum">
        <ul class="pay-btn">
          <li @click="btnPassword($event)">1</li>
          <li @click="btnPassword($event)">2</li>
          <li @click="btnPassword($event)">3</li>
          <li @click="btnPassword($event)">4</li>
          <li @click="btnPassword($event)">5</li>
          <li @click="btnPassword($event)">6</li>
          <li @click="btnPassword($event)">7</li>
          <li @click="btnPassword($event)">8</li>
          <li @click="btnPassword($event)">9</li>
          <li class="b9"></li>
          <li @click="btnPassword($event)">0</li>
          <li class="b9" @click="btnDelete"><i class="ico-delete"></i></li>
        </ul>
      </footer>
    </section>
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type:String,
      default: "请设置6位数字的交易密码"
    },
    payShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      index: -1,
      keyNum: false,
      arrIpt: ["", "", "", "", "", ""]
    };
  },
  created() {},
  methods: {
    showKeyNum: function() {
      this.keyNum = true;
    },
    hideKeyNum: function() {
      this.keyNum = false;
    },
    btnPassword(e) {
      let pwd = "";
      let obj = e.currentTarget;
      if (this.index < 5) {
        this.index++;
        this.$set(this.arrIpt, this.index, obj.innerText);
      }
      if (this.index == 5) {
        pwd = this.arrIpt.join("");
        this.keyNum = false;
        this.$emit("save-pwd", pwd);
      }
    },
    btnDelete() {
      if (this.index >= 0) {
        this.$set(this.arrIpt, this.index, "");
        this.index--;
        // let pwd = this.arrIpt.join("");
        // this.$emit("save-pwd", pwd);
      }
    },
    clearData:function() {
      this.arrIpt = ["", "", "", "", "", ""];
      this.index = -1;
    },
    closeMask() {
      this.payShow = false;
    }
  },
  mounted() {
    if(this.payShow) {
      this.keyNum = true;
    }
  },
  watch: {
    payShow: function(newVal, oldVal) {
      console.log(newVal);
    }
  }
};
</script>
<style lang="less" scope>
.eru-pwd {
  width: 100%;
  .pay {
    margin-top: 80px;
    background: #fff;
  }

  .pay-title {
    font-size: 32px;
    text-align: center;
    color: #333646;
    height: 32px;
    line-height: 32px;
  }

  .close {
    position: absolute;
    right: 0.2rem;
    top: 0.2rem;
    width: 0.72rem;
    height: 0.72rem;
  }

  .pay-content {
    width: 614px;
    height: 140px;
    padding: 0;
    margin: 0 auto;
    margin-top: 60px;
    border-top: 1px solid #bcbfc9;/*no*/
    border-bottom: 1px solid #bcbfc9;/*no*/
    border-right: 1px solid #bcbfc9;/*no*/
    overflow: hidden;
  }

  .ipt-pay {
    width: 100px;
    height: 140px;
    padding: 0;
    float: left;
    border-left: 1px solid #bcbfc9;/*no*/
  }

  .ipt-pay input {
    display: inline-block;
    border: 0;
    height: 100%;
    width: 100%;
    text-align: center;
    font-size: 48px;
    background: #fff;
  }

  footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    font-weight: 500;
    z-index: 999;
  }
  .pay-btn {
    height: auto;
    overflow: hidden;
  }
  .pay-btn li {
    box-sizing: border-box;
    width: 33.3333%;
    float: left;
    height: 80px;
    line-height: 80px;
    text-align: center;
    background: #fff;
    list-style-type: none;
    font-size: 36px;
    border-right: 1px solid #ddd;/*no*/
    border-top: 1px solid #ddd;/*no*/
    &:nth-child(3n) {
      border-right: none;
    }
  }

  .pay-btn li:active {
    background: #c2c2c2;
  }

  .b9:active {
    background: #fff !important;
  }

  .b9 {
    background: #c2c2c2 !important;
  }
  .ico-delete{
    width: 47px;
    height: 47px;
    margin-top: 15px;
  }
}
</style>