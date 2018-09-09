<template>
   <div class="slide">
      <div class="container" ref="container">
        <div class="index">
            <p v-for="(item,index) in title" :key="index"><span v-text="item" @click="navActive(index)"></span></p>
        </div>
        <ul class="content" ref="content">
           <slot></slot>
        </ul>

    </div>
   </div>
</template>
<script>
export default {
  name: "Slide",
  props: {
    title: {
      type: Array,
      default() {
        return ["产品介绍", "保险条款", "理赔流程", "常见问题"];
      }
    },
    Active: {
      // 默认选中
      type: String,
      default: "0"
    }
  },
  data() {
    return {
      startX: 0,
      endX: 0,
      distance: 0,
      distanceStep: 0,
      index: 0,
      container: "", // 外层容器
      content: "", // 内层容器content
      page: "", // 子项名称
      indexNote: "", // 索引
      width: "", //子项宽度
      direction: "left"
    };
  },
  computed: {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.container = this.$refs.container; // 外层容器
      this.content = this.$refs.content; // 内层容器content
      this.page = this.content.querySelectorAll(".page"); // 子项名称
      this.indexNote = this.container.querySelector(".index"); // 索引
      this.width = this.container.offsetWidth;
      // console.log('page', this.page);
      [].forEach.call(this.page,(item,i)=>{
        item.style.width = this.width+'px';
      })
      // !this.index ? this.move() : ''
      // this.container.addEventListener(
      //   "touchstart",
      //   this.touchstart.bind(this),
      //   false
      // );
      // this.container.addEventListener(
      //   "touchend",
      //   this.touchend.bind(this),
      //   false
      // );
      // this.container.addEventListener(
      //   "touchmove",
      //   this.touchmove.bind(this),
      //   false
      // );
      this.addIndex();
      if (this.Active) {
        // console.log("进来了");
        this.index = this.Active;
        this.distance = -this.Active * this.width;
        this.content.style["-webkit-transform"] = `translate(${
          this.distance
        }px, 0)`;
      }
    },
    touchstart(e) {
      // e.stopPropagation();
      // e.preventDefault();
      this.startX = e.touches[0].clientX;
      this.content.style.transition = "all 0s";
      // console.log('-------', this.startX)  transition: all 0s;
    },
    touchend(e) {
      // e.preventDefault();
      // e.stopPropagation();
      this.endX = e.changedTouches[0].clientX;
      if (Math.abs(this.distanceStep) < 150) {
        // 大于150到下一屏
        this.content.style.transition = "all 0.5s";
        this.content.style["-webkit-transform"] = `translate(${
          this.distance
        }px, 0)`;
      } else {
        this.move();
      }
    },
    touchmove(e) {
      // e.preventDefault();
      // e.stopPropagation();
      let step = (this.distanceStep =
        e.changedTouches[0].clientX - this.startX);
      // console.log("temp", step);
      if (Math.abs(step) > 70) {
        // 是左右滑动
        e.preventDefault();
        this.content.style["-webkit-transform"] = `translate(${this.distance +
          step}px, 0)`;
      }
    },
    navActive(i) {
      if (i === this.index) return; // 防止重复点击
      if (i > this.index) {
        // 向左
        this.direction = "left";
      } else {
        // 向右
        this.direction = "right";
      }
      this.distance = -this.width * i;
      this.index = i;
      this.content.style.transition = "all 0.5s";
      this.content.style["-webkit-transform"] = `translate(${
        this.distance
      }px, 0)`;
      this.sync(i);
    },
    move() {
      let step; // 滑动步长
      console.log("stpe除服x", step);
      // console.log(this.page.length, this.index)
      if (this.distanceStep > 0 && this.index > 0) {
        //右滑
        this.index--;
        this.direction = "right";
        this.sync(this.index);
        step = this.width;
        // console.log('----hhhh----')
      } else if (this.distanceStep < 0 && this.index < this.page.length - 1) {
        // 左滑
        this.index++;
        this.direction = "left";
        step = -this.width;
        this.sync(this.index);
      } else {
        step = 0;
      }
      // console.log('step', step)
      // 移动距离

      this.distance += step;
      // console.log('stpexxxxx',this.distance, step)
      this.content.style.transition = "all 0.5s";
      this.content.style["-webkit-transform"] = `translate(${
        this.distance
      }px, 0)`;
    },
    // 图片下方小点同步
    addIndex() {
      let fagment = document.createDocumentFragment();
      [].forEach.call(this.page, (item, index) => {
        fagment.appendChild(document.createElement("span"));
      });
      this.indexNote.appendChild(fagment);
      this.indexNote.children[this.Active].className = "leftActive";
      // console.log("fagment", this.indexNote.children);
    },
    sync(index) {
      // index+=1;
      // console.log("------", index);
      [].forEach.bind(this.indexNote.children)((note, i) => {
        if (i === index) {
          this.indexNote.children[i].className =
            //  console.log('this.direction', this.direction)
            this.direction === "left" ? "leftActive" : "rightActive";
          this.$emit("selectChange", index);
        } else {
          this.indexNote.children[i].className = "";
        }
      });
    }
  }
};
</script>

style.<style lang="scss">
.slide {
  height: 100%;
  width: 100%;
  position: absolute;
  overflow: hidden;
  padding-top: 102px;
  box-sizing: border-box;
  > .container {
    height: 100%;
    > .index {
      display: flex;
      > p {
        flex: 1;
        height: 90px;
        line-height: 90px;
        text-align: center;
        border-bottom: 1px solid #e5e5e5;
        position: relative;
        // height: 100%;
        font-size: 32px;
        &::after {
          content: "";
          width: 30px;
          height: 0;
          border-bottom: 4px solid transparent;
          position: absolute;
          bottom: 0;
        }
        &.leftActive,
        &.rightActive {
          color: #0c72e3;
          // &::after{
          //    animation: activePlay 1s forwards;
          //    border-bottom:4px solid #0c72e3;

          // }
        }
        &.leftActive::after {
          left: 0;
          animation: LeftactivePlay 0.5s forwards;
          border-bottom: 4px solid #0c72e3;
        }
        &.rightActive::after {
          left: auto;
          right: 0;
          animation: RightactivePlay 0.5s forwards;
          border-bottom: 4px solid #0c72e3;
        }
      }
    }
    > ul.content {
      height: 100%;
      display: flex;
      .page {
        flex: 0 0 100%;
        height: 100%;
        overflow-y: scroll;
        &::-webkit-scrollbar {
          background-color: transparent;
          width:0px;
        }
        // border: 1px solid black;
        // width: 100%;
        // background: hotpink;
      }
    }
  }
}
@keyframes LeftactivePlay {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(82px, 0);
  }
}

@keyframes RightactivePlay {
  from {
    transform: translate(0, 0);
  }
  to {
    transform: translate(-82px, 0);
  }
}
</style>

