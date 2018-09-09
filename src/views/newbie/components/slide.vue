<template>
   <div :class="[cls,'box']" ref="box">
       <div class="content" ref="content">
          <ul>
            <li v-for="(item,index) in list" :key="index">
              <div class="left">
                <p class="logo"></p>
                <p>
                  <span v-text="item.mobile"></span><br/>
                  <span v-text="item.getTime"></span>
                </p>
              </div>
              <div class="right" >
                  获得<span v-text="rateValue"></span>加息卷
              </div>
            </li>
          </ul>
       </div>
   </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    },
    cls: {
      type: String,
      default: ""
    },
    rateValue: {
      type:String,
      default:''
    }
  },
  computed:{
    list(){
      let data = [...this.data]
      return data.length<5 ? data : data.concat(data)
    }
  },
  data() {
    return {
      yPos: 0,
      step: 2
    };
  },
  mounted() {
    this.move();
  },
  methods: {
    move() {
      // this.$flash(typeof requestAnimationFrame)
      if(this.data.length<5) return
      this.reqFarm = requestAnimationFrame(() => {
        // console.log("xxxxxx，重绘了", this.$refs.box.offsetWidth);
        let h = this.$refs.box.offsetHeight;
        let content = this.$refs.content;
        this.yPos -= this.step;
        // console.log(" this.yPos", --this.yPos, h);
        content.style['-webkit-transform'] = `translate(0, ${this.yPos}px)`;
        if (-this.yPos < h || -this.yPos === h) {
          this.move();
        } else {
          this.yPos = 0;
          content.style['-webkit-transform'] = `translate(0, 0)`;
          this.move();
        }
      });
    }
  },
  watch:{
    data(value){
      this.move()
    }
  }
};
</script>
<style lang='stylus'>
.box {
  height: 200px;
  background: hotpink;
  overflow: hidden;
  ul {
    list-style: none;
    box-sizing border-box
    margin: 0;
    padding: 14px 40px;
    li {
      display:flex;
      box-sizing border-box
      padding: 20px 0;
      color:#fddda5;
      font-size:24px;
      line-height:34px;
      border-top:1px solid #eb3f39
      &:last-child{
        border-bottom:1px solid #eb3f39
      }
      >div{
        flex:1;
      }
      >div.left{
        display: flex;
        p.logo{
          width:60px;
          height:60px;
          background: url('../images/logo.png') no-repeat 100%/100%
          margin-right: 18px;
        }
      }
      >div.right {
        text-align: center;
        line-height: 75px;
      }
    }
  }
}
</style>