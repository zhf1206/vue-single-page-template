<template>
  <div class="pop-page-user-pro" v-if="show">
    <header class="head" :class="border?'border-b':''">
      <div class="head-l">
        <span v-if="left.className!=''" @click="backTo"><i :class="left.className"></i></span>
        <a href="javascript:;" v-text="left.label"></a>
      </div>
      <div class="head-title" >协议</div>
      <div class="head-r" @click="rightFn">
        <span v-if="right.className!=''"><i :class="right.className"></i></span>
      </div>
    </header>
    <section class="contents scroller">
      <div class="prot-title">证券投资基金投资人权益须知</div>
      <div class="prot-info">
        <br>
        <p class="fontBold">尊敬的基金投资人：</p>
        <p class="fontBold">&nbsp;&nbsp;&nbsp;&nbsp;基金投资在获取收益的同时存在投资风险。为了保护您的合法权益，请在投资基金前认真阅读以下内容：</p>
        <br>
        <h2>一、基金的基本知识  </h2>
        <p>（一）什么是基金</p>
        <p>证券投资基金（简称基金）是指通过发售基金份额，将众多投资者的资金集中起来，形成独立财产，由基金托管人托管，基金管理人管理，以投资组合的方法进行证券投资的一种利益共享、风险共担的集合投资方式。</p>
        <p>（二）基金与股票、债券、储蓄存款等其它金融工具的区别</p>
        <img src="../../assets/images/protocol/investorsKnow1.png" >
        <p>（三）基金的分类</p>
        <p>1、依据运作方式的不同，可分为封闭式基金与开放式基金。
封闭式基金是指基金份额在基金合同期限内固定不变，基金份额可以在依法设立的证券交易所交易，但基金份额持有人不得申请赎回的一种基金运作方式。
开放式基金是指基金份额不固定，基金份额可以在基金合同约定的时间和场所进行申购和赎回的一种基金运作方式。</p>
        <p>2、依据投资对象的不同，可分为股票基金、债券基金、货币市场基金、混合基金
根据《证券投资基金运作管理办法》对基金类别的分类标准,60%以上的基金资产投资于股票的为股票基金；80%以上的基金资产投资于债券的为债券基金；仅投资于货币市场工具的为货币市场基金；投资于股票、债券和货币市场工具，但股票投资和债券投资的比例不符合股票基金、债券基金规定的为混合基金。这些基金类别按收益和风险由高到低的排列顺序为：股票基金、混合基金、债券基金、货币市场基金，即股票基金的风险和收益最高，货币市场基金的风险和收益最低。</p>
        <p>3、特殊类型基金</p>
        <p>（1）系列基金。又被称为伞型基金，是指多个基金共用一个基金合同,子基金独立运作,子基金之间可以进行相互转换的一种基金结构形式。<br>（2）保本基金。是指通过采用投资组合保险技术,保证投资者的投资目标是在锁定下跌风险的同时力争有机会获得潜在的高回报。<br>（3）交易型开放式指数基金(ETF)与上市开放式基金(LOF)。交易型开放式指数基金,通常又被称为交易所交易基金(Exchange Traded Funds,简称“ETF”),是一种在交易所上市交易的、基金份额可变的一种开放式基金。上市开放式基金(Listed Open-ended Funds,简称“LOF”)是一种既可以在场外市场进行基金份额申购赎回，又可以在交易所（场内市场）进行基金份额交易、申购或赎回的开放式基金。<br>（4）QDII基金。是一种以境外证券市场为主要投资区域的证券投资基金，投资者可以用人民币或美元等外汇进行认购和申购，在承担境外市场相应投资风险的同时获取相应的投资收益。QDII基金与普通证券投资基金的最大区别在于投资范围不同。</p>
        <p>（四）基金评级</p>
        <p>基金评级是依据一定标准对基金产品进行分析从而做出优劣评价。投资人在投资基金时，可以适当参考基金评级结果，但切不可把基金评级作为选择基金的唯一依据。此外，基金评级是对基金管理人过往的业绩表现做出评价，并不代表基金未来长期业绩的表现。</p>
        <p>本行将根据销售适用性原则，对基金管理人进行审慎调查，并对基金产品进行风险评价。</p>
        <p>（五）基金费用</p>
        <p>基金费用一般包括两大类：一类是在基金销售过程中发生的由基金投资人自己承担的费用，主要包括认购费、申购费、赎回费和基金转换费。这些费用一般直接在投资人认购、申购、赎回或转换时收取。其中申购费可在投资人购买基金时收取，即前端申购费；也可在投资人卖出基金时收取，即后端申购费，其费率一般按持有期限递减。另一类是在基金管理过程中发生的费用，主要包括基金管理费、基金托管费、信息披露费等，这些费用由基金承担，从基金资产中提取。对于不收取申购、赎回费的货币市场基金和部分债券基金，还可按不高于2.5‰的比例从基金资产中计提一定的销售服务费。</p>
        <h2>二、基金份额持有人的权利</h2>
        <p>根据《证券投资基金法》第70条的规定，基金份额持有人享有下列权利：</p>
        <p>（一）分享基金财产收益；</p>
        <p>（二）参与分配清算后的剩余基金财产；</p>
        <p>（三）依法转让或申请赎回其持有的基金份额；</p>
        <p>（四）按照规定要求召开基金份额持有人大会；</p>
        <p>（五）对基金份额持有人大会审议事项行使表决权；</p>
        <p>（六）查阅或者复制公开披露的基金信息资料；</p>
        <p>（七）对基金管理人、基金托管人、基金份额发售机构损害其合法权益的行为依法提起诉讼；</p>
        <p>（八）基金合同约定的其它权利。</p>
        <h2>三、基金投资风险提示</h2>
        <p>（一）证券投资基金是一种长期投资工具，其主要功能是分散投资，降低投资单一证券所带来的个别风险。基金不同于银行储蓄和债券等能够提供固定收益预期的金融工具，投资人购买基金，既可能按其持有份额分享基金投资所产生的收益，也可能承担基金投资所带来的损失。</p>
        <p>（二）基金在投资运作过程中可能面临各种风险，既包括市场风险，也包括基金自身的管理风险、技术风险和合规风险等。巨额赎回风险是开放式基金所特有的一种风险，即当单个交易日基金的净赎回申请超过基金总份额的百分之十时，投资人将可能无法及时赎回持有的全部基金份额。</p>
        <p>（三）基金投资人应当充分了解基金定期定额投资和零存整取等储蓄方式的区别。定期定额投资是引导投资人进行长期投资、平均投资成本的一种简单易行的投资方式，但并不能规避基金投资所固有的风险，不能保证投资人获得收益，也不是替代储蓄的等效理财方式。</p>
        <p>（四）基金管理人承诺以诚实守信、勤勉尽责的原则管理和运用基金资产，但不保证旗下基金一定盈利，也不保证最低收益。旗下基金的过往业绩及其净值高低并不预示其未来业绩表现。基金管理人提醒投资人基金投资的“买者自负”原则，在做出投资决策后，基金运营状况与基金净值变化引致的投资风险，由投资人自行负担。</p>
        <p>（五）本行将对基金投资人的风险承受能力进行调查和评价，并根据基金投资人的风险承受能力推荐相应的基金品种，但我行所做的推荐仅供投资人参考，投资人应根据自身风险承受能力选择基金产品并自行承担投资基金的风险。</p>
        <h2>四、服务内容和收费方式</h2>
        <p>我行向基金投资人提供以下服务：</p>
        <p>（一）对基金投资人的风险承受能力进行调查和评价;</p>
        <p>（二）基金销售业务，包括基金（资金）账户开户、基金申（认）购、基金赎回、基金转换、定期定额投资、修改基金分红方式等。我行根据每只基金的发行公告及基金管理公司发布的其它相关公告收取相应的申（认）购、赎回费和转换费;</p>
        <p>（三）网上银行基金交易服务;</p>
        <p>（四）基金投资咨询服务;</p>
        <p>（五）基金净值、分红提示、交易确认等对账服务;</p>
        <p>（六）电话银行基金自助交易服务；</p>
        <p>（七）基金知识普及和风险教育</p>
        <h2>五、基金交易业务流程</h2>
        <img src="../../assets/images/protocol/investorsKnow2.png" >
        <h2>六、投诉处理和联系方式</h2>
        <p>基金投资人可以通过拨打我行客户服务中心电话（95594），对营业网点所提供的服务提出建议或投诉。对于工作日受理的投诉，原则上当日回复，不能当日回复的，在3个工作日内回复。对于非工作日受理的投诉，原则上在顺延的第一个工作日回复，不能及时回复的，在顺延的3个工作日内回复。</p>
        <p>投资人也可通过书信、传真、电子邮件等方式，向中国证监会和中国证券业协会投诉。联系方式如下：</p>
        <p>中国证券监督管理委员会</p>
        <p>网址：www.csrc.gov.cn</p>
        <p>地址:中国北京西城区金融大街19号富凯大厦</p>
        <p>邮编(Zip):100033</p>
        <p>信访投诉电话:010－66210182、66210166</p>
        <br>
        <p>中国证券业协会</p>
        <p>网址：www.sac.net.cn</p>
        <p>地址：中国北京西城区金融大街19号富凯大厦B座二层</p>
        <p>邮编：100032</p>
        <p>传真：010-66575896</p>
        <br>
        <p>中国证监会上海监管局：</p>
        <p>总    机: 021-50121111</p>
        <p>热线电话：021-50121047</p>
        <p>地址：上海市浦东新区迎春路555号</p>
        <p>邮编：200135 </p>
        <br>
        <h2>投资者在投资基金前应认真阅读《基金合同》、《招募说明书》等基金法律文件，选择与自身风险承受能力相适应的基金。我行和基金管理人承诺投资人利益优先，以诚实信用、勤勉尽责的态度为投资人提供服务，但不能保证基金一定盈利，也不能保证基金的最低收益。投资人可登录中国证监会网站（www.csrc.gov.cn）或中国证券业协会网站（www.sac.net.cn）查询基金销售机构名录，核实我公行基金销售资格。</h2>
        <br>
      </div>
    </section>
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
    fixed: {
      type: Boolean,
      default: false
    },
    bgCss: {
      type: String,
      default: "white"
    },
    border: {
      type: Boolean,
      default: true
    },
    left: {
      type: Object,
      default: function() {
        return {
          label: "",
          className: "ico-back"
        };
      }
    },
    right: {
      type: Object,
      default: function() {
        return {
          label: "",
          className: ""
        };
      }
    },
    backFun: {
      type: Function,
      default: null
    },
    rightFn:{
      type: Function,
      default: function() {
      }
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
    backTo: function() {
      //TODO 返回关闭
      this.closeWin();
    }
  },
  mounted () {
    this.show = this.isShow;
  }
};
</script>
<style lang="less">
.pop-page-user-pro{
  position: absolute;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
  z-index: 999;
  overflow: hidden;
  .head {
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
    -webkit-flex-wrap: wrap;
    -moz-flex-wrap: wrap;
    -ms-flex-wrap: wrap;
    -o-flex-wrap: wrap;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: stretch;
    width: 100%;
    height: 88px;
    line-height: 88px;
    font-size: 32px;
    color: #191919;
    box-sizing: border-box;
    &.fixed {
      position: fixed;
    }
    &.border-b {
      border-bottom: 1px solid #dddddd;/*no*/
    }
    .head-l {
      width: 130px;
      padding-left: 40px;
      font-size: 32px;
      overflow: hidden;
      span {
        display: block;
        width: 50px;
        height: 88px;
        line-height: 88px;
        float: left;
      }
      i {
        font-size: 0;
        margin-bottom: -8px;
        width:20px;
        height:36px;
      }
      a {
        display: inline-block;
        text-decoration: none;
        height: 88px;
        line-height: 88px;
        color: #000;
      }
    }
    .head-title {
      flex: 1;
      text-align: center;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: bold;
    }
    .head-r {
      width: 130px;
      padding-right: 40px;
      font-size: 32px;
      overflow: hidden;
      span {
        display: block;
        width: 50px;
        height: 88px;
        line-height: 88px;
        float: right;
      }
      i {
        font-size: 0;
        margin-bottom: -8px;
        width:20px;
        height:36px;
      }
      a {
        display: inline-block;
        text-decoration: none;
        height: 88px;
        line-height: 88px;
        color: #000;
      }
    }
  }
  .contents{
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    padding: 0 30px;
    padding-bottom:100px;
    .prot-title{
      font-size: 36px;
      color: #222222;
      text-align: center;
      font-weight: bold;
      margin-top:60px;
      margin-bottom:40px;
    }
    .prot-info{
      p{
        font-size: 28px;
        color: #666666;
        line-height: 40px;
      }
      img{
        display: block;
        width: 100%;
        height: auto;
      }
      h2{
        margin-top:20px;
        margin-bottom:18px;
        font-size: 32px;
        color: #222222;
        font-weight: bold;
      }
      .fontBold{
        color: #222222;
        font-weight: bold;
      }
    }
  }
}
</style>
