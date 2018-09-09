<template>
<div class="asset_record x-header-top" v-if="show">
  <div class="asset_record__centon">
    <div
      v-for="(items) in assetRecord"
      :key="items.c_group_time"
      class="arc_list"
    >
      <h2 v-text="items.c_group_time">2018年05月</h2>
      <ul>
        <li 
          v-for="(item, index) in items.list"
          :key="index"
        >
          <div class="top">
            <h4 v-text="item.name">充值</h4>
            <h5 v-text="item.trade_money" :style="{color: item.color}">+100.00</h5>
          </div>
          <p v-text="item.c_time">2018-05-15 12:20:25</p>
          <p >易宝线上充值，成功</p>
          <div class="zhanwei"></div>
        </li>
      </ul>
    </div>
  </div>
</div>
</template>


<script>

export default {
  // name: 'index',
  components: {},
  data() {
    return {
      show: false,
      assetRecord: []
    }
  },
  computed: {},
  watch: {},
  created() {
    this.initFun()
  },
  mounted() {},
  methods: {
    initFun(){
      this.$http("/jyd/accountGetOrderDetailList", {
        userid: this.$route.query.userid,
      })
      .then((res) => {
        console.log(res);
        this.assetRecord = res.data.list
        this.show = true
      }).catch(error => {
        console.log(error);
        this.show = true
      });
    },
    
  },
}
</script>


<style lang="stylus">
.asset_record  
  margin-top 20px
  // background-color #f5f5f5
  .asset_record__centon
    .arc_list
      h2 
        margin 0 40px
        line-height 70px
        font-size 30px
        background-color #f5f5f5
        color #a5a5a5
      ul 
        background-color #fff
        padding 0 40px
        li 
          position relative
          &:before
            content ''
            position absolute
            height 1px
            width 100%
            bottom 0
            right 0
            background-color: #e5e5e5
            transform:scaleY(0.5)
            -webkit-transform:scaleY(0.5);
          .top
            overflow hidden
            padding-top 12px
            h4
              float left 
              line-height 76px
              font-size 30px
            h5
              float right 
              line-height 76px
              font-size 30px
              color #ff744e
          p 
            line-height 42px
            font-size 24px
            color #a5a5a5
          .zhanwei
            height 32px
</style>

