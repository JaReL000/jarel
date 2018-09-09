<template >
  <div class="alert-wrap fixed">
    <div class="alert-mask fixed" @click.stop.prevent="closeFun"></div>
    <div class="alert" >
      <div class="alert-main">
        <h4 >福利详情</h4>
        <ul>
          <li>
            <h6>1.收益更高，期限更短</h6>
            <table>
              <thead>
              <tr>
                <th >投资</th>
                <th >利率</th>
                <th >期限</th>
              </tr>
              </thead>
              <tbody>
              <tr >
                <td >{{productName}}</td>
                <td v-if="($route.params.productid == '3')">3.5%-9.498%</td>
                <td v-if="($route.params.productid == '4')">3.5%-8.970%</td>
                <td v-if="($route.params.productid == '3')">100个月</td>
                <td v-if="($route.params.productid == '4')">36个月</td>
              </tr>
              <tr >
                <td >年定期</td>
                <td >6.0%</td>
                <td >12个月</td>
              </tr>
              </tbody>
            </table>
          </li>
          <li>
            <h6>2.如何转入年定期？</h6>
            <p>1） {{productName}}产品，点击”一键转入年定期“按钮，直接转入年定期</p>
            <p>2） 若已在转让市场挂单，您需先撤销转让即申请，可点击”一键转入年定期“按钮，直接转入年定期</p>
          </li>
        </ul>
      </div>

      <div @click.stop.prevent="closeFun" class="ok-yes">知道了</div>
    </div>

  </div>
</template>

<script>
  export default {
    data () {
      return {

      }
    },

    computed:{
      productName(){
        return (this.$route.params.productid == '3' ? '保险箱' : '日增息')
      }
    },
    created() {},
    mounted() {},
    methods: {
      closeFun(){
        // this.$flash('快把我关掉')
        try {
          Jinr.finish()
        } catch (error) {

        }
      }
    }
  }
</script>

<style lang="stylus">
.alert-wrap
  position fixed
  background transparent
.alert-mask
  position fixed
  background transparent
.alert
  position: absolute;
  left: 50%;
  top: 40%;
  width 90%
  transform translate3d(-50%, -50%, 0)
  font-size 20px
  line-height 50px
  text-align center
  color #fff
  // background-color transparent
  .alert-main
    background: url('./p_bg.png') no-repeat left  top
    background-size 100% 100%
  h4
    position relative
    margin-bottom 20px
    line-height 100px
    font-size 44px
    &:before
      content ''
      position absolute
      width 100%
      left  0
      bottom  0
      border-bottom 1px solid  #fff
      transform scaleY(0.5)
  ul
    text-align left
    padding 0px 22px  40px
    table
      width 100%
      margin-bottom 30px
      line-height 60px
      font-size 24px
      text-align center
      background-color rgba(255,255,255,0.2)
      th
        text-align center
        border 1px solid #fa7d40
        width 33.3%
      td
        text-align center
        border 1px solid #fa7d40
    h6
      font-size 30px
    p
      line-height 40px
      font-size 24px
  .ok-yes
    border-radius 0 0 12px 12px
    line-height 90px
    font-size 30px
    background-color #fff
    color #0c72e3



</style>
