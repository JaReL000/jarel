<template>
  <!-- 每日数据 滚动显示 -->
  <div class="datail-data">
    <div class="datail-data-top">
      <h4>今日交易人数 <span v-text="todayNum"></span>人</h4>
      <h4>今日交易额 <span v-text="todayMoney"></span>元</h4>
    </div>
      
    <div class="lists" >
      <div >
        <ul :style="{top}" :class="{top}">
          <li 
            v-for="(item, index) in lists"
            :key="index"
          >
            <span>{{item.mobile}}</span> 
            <span>{{item.trade_money}}</span>
            <span>{{item.trade_time}}</span>
          </li>
        </ul>
      </div> 
    </div>  
  </div>
</template>

<script>

  export default {
    props: {
      todayNum: {
        type: Number
      },
      todayMoney: {
        type: String
      },
      lists: {
        type: Array,
        default: ()=>{
          return []
        }
      },
    },
    data () {
      return {
        activeIndex: 0,
        timer: null,
        timerNxit: null,
        lis: []
      }
    },
    computed: {
      top(){
        let index = this.activeIndex
        if(index){
          return -(index * (50/75)) + 'rem'
        }
        return 0
      },
    },
    created() {},
    mounted() {
      this.timerNxit = setTimeout(()=> {
        this._moveUp()
      }, 1000);
    },
    methods: {
      /**
       * @author weizihua
       * 无缝滚动
       */
      _moveUp(){
        clearInterval(this.timer)
        clearTimeout(this.timerNxit)
        this.timer = setInterval(()=> {
          if(this.activeIndex >= this.lists.length/2) {
            this.activeIndex =  0 
            this.timerNxit = setTimeout(()=> {
              this.activeIndex ++
            }, 20); 
             
          }else{
            
            this.activeIndex ++;
          }   
        }, 1200);
      },
    }
  }
</script>

<style lang="stylus">
@import '~style/mixin.styl'

.datail-data  //数据
  padding 0 0 35px
  text-align center
  line-height 62px
  font-size 30px
  background $color-light-grey-def  
  &-top
    padding 35px 0 24px
    h4
      span 
        font-size 40px
        color #fc5465
  .lists 
    padding 18px 0
    margin 0 56px /*rem*/
    border-radius 12px /*px*/
    box-shadow: 0px 4px 5px 0px rgba(68, 68, 67, 0.04) /*no*/
    background #fff
    color #a7b6bc
    &>div 
      height 150px
      overflow hidden
    .topDiv
      position: relative
    .top 
      transition: top 0.8s  
    ul  
      position: relative
      font-size 0
      li 
        height 50px
        line-height @height
        span 
          display inline-block
          overflow hidden
          text-overflow ellipsis
          white-space nowrap
          font-size 26px   
        span:nth-child(1)
          width 240px
        span:nth-child(2)
          text-align left
          text-indent 16px
          width 290px
        span:nth-child(3)
          width 80px
</style>