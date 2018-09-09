<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.explain-limit 
  top 88px
  padding  30px 32px 0
  font-size 26px
  line-height 50px
  table
    width 100%
    margin-bottom 30px
    line-height 60px
    font-size rem(20)
    th
      border 1px solid #0c72e3
      text-align center
      background: #0c72e3;
      color: #fff;
      width: 33.3%;
    td
      border: 1px solid #ccc;
      text-align: center;
      color: #4e4e4e;
  h4
    font-size 30px
    color mainColor
  span
    float left
  .ge 
    height 80px
  
</style>
<template>
  <div class="explain-limit fixed  fixed-x" v-if="show">
    <table>
      <thead>
      <tr>
        <th >单笔</th>
        <th >单日</th>
        <th >累计</th>
      </tr>
      </thead>
      <tbody>
      <tr >
        <td >{{every_money_max}}</td>
        <td >{{person_daily_money_max}}</td>
        <td >{{person_sum_money_max}}</td>
      </tr>
      </tbody>
    </table>
    <h4>注:</h4>    
    <ul>
      <li 
        v-for="(item, index) in body"
        :key="index"
      >
        <span :class="{ge: item.ge}">{{index+1}}、</span>
        <p >{{item}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        show: false,
        body: [],
        every_money_max: 10000,
        every_money_min: 0,
        person_daily_money_max:0,
        person_sum_money_max: 0,
        product_name:"活期",
        productid: 1,
        ptypeid: 1,
      }
    },
    computed: {},
    watch: {},
    created() {
      this.initAPPFun()
    },
    mounted() {},
    methods: {
      initMFun(){
        this.$http({
          servicename: 'user.index',
        }).then((response) => {
            this.data = res
        }).catch(err => {
          this.$flash(err)
        });
      },
      initAPPFun(){
        this.$http({
          method: 'product.web.limit',
          productid: this.$route.query.productid || 1,
          token: this.$root.appData.token,
        }).then((response) => {
          this.body = response.body
          this.person_daily_money_max = response.person_daily_money_max
          this.every_money_max = response.every_money_max
          this.person_sum_money_max = response.person_sum_money_max
          this.show = true
        })
      },
      
    },
  }
</script>
