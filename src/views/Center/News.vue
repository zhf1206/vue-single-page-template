<template>
  <div class="gyl-news">
    <div v-title>消息</div>
    <Header title="消息" :border="true"></Header>
    <section class="content" v-show="newList&&newList.length>0">
      <Scroller lock-x height="100%" @on-pullup-loading="onPullup" ref="scroller" v-model="status" :use-pullup="usePullup" :pullup-config="pullupConfig">
        <div>
          <div class="new-row" v-for="(item,i) in newList" v-bind:key="i">
            <div class="new-date">{{item.createTime|format("YYYY-MM-DD HH:mm")}}</div>
            <div class="new-info">
              <div class="title">{{item.messageTitle}}</div>
              <div class="info">{{item.messageContent}}</div>
              <div v-if="item.messageContent.length>60" class="see">查看详情<span><i class="ico-arrow-r"></i></span></div>
            </div>
          </div>
        </div>
      </Scroller>
    </section>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Header from "@/components/common/Header";
import { Scroller } from 'vux';
import { showMsg, loading, readFile, valid } from "@/utils/common.js";
import apiUrl from "@/config/apiUrl.js";
export default {
  data() {
    return {
      newList: [],
      pageSize: 10,
      pageIndex: 1,
      scrollTop: 0,
      pullupConfig:{
        content: '上拉加载更多',
        pullUpHeight: 60,
        height: 40,
        autoRefresh: false,
        downContent: '释放刷新',
        upContent: '上拉加载更多',
        loadingContent: '加载中...',
        clsPrefix: 'xs-plugin-pullup-'
      },
      usePullup: true,
      status: {
        pullupStatus: 'disabled'
      }
    };
  },
  components: {
    Header, Scroller
  },
  methods: {
    initNews: function() {
      //TODO 查询消息列表
      let param = {
        pageSize:this.pageSize,
        currentPage:this.pageIndex
      };
      this.$httpPost(apiUrl.queryMessage, param).then((res) => {
        if(res.data&&res.data.status==="1000") {
          this.totalPage = res.data.pages||0;
          let list = res.data.list||[];
          if(list.length < this.pageSize) {
            this.newList = this.newList.concat(list);
            setTimeout(() => {
              this.$refs.scroller.disablePullup();
            }, 10);
          }else {
            this.newList = this.newList.concat(list);
            this.$refs.scroller.donePullup();
          }
        } else {
          showMsg(res.data.msg);
        }
      }).catch((err) => {
        console.log(err);
      });
    },
    onPullup:function() {
      //TODO 上拉加载数据
      if(this.pageIndex<this.totalPage) {
        this.pageIndex += 1;
        this.initNews();
      } else {
        this.$refs.scroller.disablePullup();
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.initNews();
    });
  }
};
</script>
<style lang="less">
.gyl-news{
  height:100%;
  width:100%;
  overflow: hidden;
  background: #F5F5F7;
  .content{
    box-sizing:border-box;
    height:auto;
    width:100%;
    height:100%;
    overflow-y:auto;
    -webkit-overflow-scrolling: touch;
    padding-bottom:110px;
    .new-row{
      .new-date{
        height: 70px;
        line-height: 70px;
        font-size: 24px;
        color: #AAAAAA;
        text-align: center;
      }
      .new-info{
        background-color: #fff;
        padding:30px;
        .title{
          font-size: 28px;
          color: #222222;
        }
        .info{
          line-height: 34px;
          margin-top:20px;
          font-size: 24px;
          color: #AAAAAA;
          max-height:68px;
          overflow: hidden;
        }
        .see{
          height: 80px;
          line-height: 80px;
          font-size: 24px;
          color: #AAAAAA;
          border-top: 1px solid #E2E2E2;/*no*/
          span{
            float:right;
            margin-right:10px;
            i{
              width:14px;
              height:24px;
            }
          }
        }
      }
    }
    .xs-plugin-pullup-container{
      line-height: 60px;
      font-size: 28px;
      color: #6F7281;
      background: #F5F5F7;
    }
  }
}
</style>
