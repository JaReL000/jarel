<template>
   <div :class="[options.cls,'slide-box']" ref="box">
       <div :class="`content content-${options.direction}`" :style="pos"  ref="content">
          <div ref="slotList">
              <slot></slot>
          </div>
          <div v-html="copyHtml"></div>
       </div>
   </div>
</template>
<script>
export default {
  name: "Slide",
  props: {
    data: {
      type: Array,
      default() {
        return [];
      }
    },
    cls: {
      type: String,
      default: ""
    },
    options: {
      type: Object,
      default() {
        return {
          cls: "",
          direction: "up"
        };
      }
    },
    rateValue: {
      type: String,
      default: ""
    },
    step: {
      type: Number,
      default: 0.2
    },
    isPlayNum:{
      type:Number,
      default:5
    }
  },
  data() {
    return {
      yPos: 0,
      xPos: 0,
      h: 0, //内容高度
      copyHtml: "",
      h: 0, // 容器高度
      w: 0 //容器宽度
    };
  },
  computed: {
    // list() {
    //   let data = [...this.data];
    //   return data.length < 5 ? data : data.concat(data);
    // },
    pos() {
      return {
        "-webkit-transform": `translate(${this.xPos}px,${this.yPos}px)`,
        overflow: "hidden"
      };
    }
  },

  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.copyHtml = "";
      setTimeout(() => {
        let direction = this.options.direction;
        if (direction === "up") {
          let h = this.$refs.content.offsetHeight;
          // this.$refs.box.style.height = h + "px"; // 设置容器高度为内容高度的一半
          if (this.data.length < this.isPlayNum) return;
        } else if ((direction = "left")) {
          this._initLeft();
        }
        this.h = this.$refs.slotList.offsetHeight;
        this.w = this.$refs.slotList.offsetWidth;
        this.copyHtml = this.$refs.slotList.innerHTML;
        this.move();
      }, 50);
    },
    move() {
      // if (this.data.length < 5) return;
      // console.log('----进来了')
      let direction = this.options.direction;
      let h = this.h;
      let w = this.w;
      let content = this.$refs.content;
      this.reqFarm = requestAnimationFrame(() => {
        if (direction === "up") {
          this.yPos -= this.step;
          if (-this.yPos < h || -this.yPos === h) {
            this.move();
          } else {
            this.yPos = 0;
            // content.style["-webkit-transform"] = `translate(0, 0)`;
            this.yPos = 0;
            this.move();
          }
        } else if (direction === "left") {
          this.xPos -= this.step;
          if (-this.xPos < w || -this.xPos === w) {
            this.move();
          } else {
            this.xPos = 0;
            // content.style["-webkit-transform"] = `translate(0, 0)`;
            this.yPos = 0;
            this.move();
          }
        }
      });
    },
    _initLeft() {
      console.log("---", this.$refs.box.offsetWidth);
      let w = this.$refs.box.offsetWidth;
      // let li = document.querySelectorAll(".content-left li");
      // console.log('w---',w,li.length)
      this.$refs.content.style.width = w * this.data.length * 2 + "px";
    }
  },
  watch: {
    data(value) {
      console.log('value', value)
      this.init();
    }
  }
};
</script>
<style lang='scss'>
.slide-box {
  // height: 200px;
  // background: hotpink;
  overflow: hidden;
  .content {
    ul {
      list-style: none;
      box-sizing: border-box;
      margin: 0;
      li {
        height: 50px;
      }
      // padding: 14px 40px;
    }
  }
  .content-left {
    display: flex;
    div {
      flex: 1;
      ul {
        display: flex;
        li {
          flex: 1;
        }
      }
    }
  }
}
</style>