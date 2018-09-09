<template>
   <div class="insuranceList-dogle" @click.stop="show=false">
     <div :class="{'dogle-content':true,'SeachFixed':!!SeachFixed}" v-model="show" @click.stop="1">
          <p class="header"><span class="close" @click.stop="show=false">×</span> 查询职业类别</p>
          <div class="content" ref="dogleContet">
             <div class="search" >
                <i></i>
                <input type="text" @input="search" v-model="searchVal">
             </div>
             <div class="inform" v-if="true">
                <div class="section1">
                    <h4>职业告知</h4>
                    <p>本产品承保职业等级为<span>1-4</span>的职业，不符合职业不能投保，否则不能获得赔付且保费不退。</p>
                </div>
             </div>
             <!-- {{searchList.length}} -->
            <div class="none" v-if="searchVal&&!searchList.length&&!!seachSate">
                <h4>未查询到相关职业？</h4>
                <p>1:无法准确选择职业时，可选择相似的职业；</p>
                <p>2:若无法找到准确或相近职业，可能该职业不在被保范围类中，请咨询客服或者查看完整的职业列表；</p>
            </div>
             <div class="default" v-if="!searchVal">
                   <ul v-for="(item,index) in dataList" :key="index">
                      <h4 class="title" v-text="item.name" ></h4>
                      <li v-for="(v,i) in item.data " :key="v+i">
                         <h4 @click.stop="view(`${index}${i}`,!isShowChild[`${index}${i}`])">
                           <span v-text="v.name"></span><span :class="{'active':isShowChild[`${index}${i}`]}"></span>
                        </h4>
                          <div v-show="isShowChild[`${index}${i}`]" >
                              <!-- {{item.name}}{{v.name}} -->
                              <p v-for="(it,ind) in v.data" :key="it+ind" @click.stop="select(it,item.name,v.name)">
                                <span v-text="it.name"></span><span v-text="it.type+'类'"></span></p>
                          </div>
                      </li>
                   </ul>
             </div>
             <div class="search-content" v-else>
                  <ul v-if="!!searchList.length">
                     <li v-for="(item,i) in searchList" :key="item+i" @click.stop="select(item)">
                        <p v-text="item.name"></p>
                        <p v-text = "`${item.type}类`"></p>
                     </li>
                  </ul>

             </div>
          </div>
     </div>
   </div>
</template>
<script>
import Loading from "components/loading";
export default {
  data() {
    return {
      show: true,
      dataList: [],
      isShowChild: {}, // 是否展示子项
      sign: false,
      searchVal: "",
      searchList: [],
      searchSign: false,
      timeId: "",
      SeachFixed: false, // 解决安卓键盘弹出后将弹框顶出视口的问题
      seachSate: false, // 搜索是否完成
    };
  },
  created() {
    this.init();
    console.log("---loading--", Loading);
  },
  mounted() {
    // this.$flash({
    //   message:this.$refs.dogleContet
    // })
    // this.$refs.dogleContet.scrollIntoView()
    if (this.$JinrSDK.isiOS) return;
    window.onresize = e => {
      this.SeachFixed = !this.SeachFixed;
    };
  },
  methods: {
    init() {
      let jobList = this.sessionGet("JobList");
      if (jobList) {
        this.dataList = jobList;
      } else {
        this.$http("/api/getJobList", null, "get").then(({ data: res }) => {
          // console.log("res---", res);
          this.sessionSet("JobList", res); // 缓存职业列表
          this.dataList = res;
        });
      }
    },
    view(key, sign) {
      // this.isShowChild[i] = sign
      this.$set(this.isShowChild, key, sign);
      // console.log("----",this.isShowChild);
    },
    select(item, one, tow) {
      item.name = one && tow ? `${one}-${tow}-${item.name}` : item.name;
      this.$emit("Change", item);
    },
    search() {
      this.seachSate = false
      let key = this.searchVal;
      if(key==='') return
      // console.log('xxx')
      clearTimeout(this.timeId);
      this.timeId = setTimeout(() => {
        let dataList =JSON.parse(JSON.stringify(this.dataList))
        let temp = [];
        dataList.forEach((v, i) => {
          v.data.forEach((item, inx) => {
            item.data.forEach((opt, j) => {
              if (opt.name.indexOf(key) !== -1) {
               console.log(v,item,opt);
                opt.name = `${v.name}-${item.name}-${opt.name}`;
                temp.push(opt);
              }
            });
          });
        });
        this.$set(this, "searchList", temp);
        this.$nextTick(()=>{
          this.seachSate = true
        })
      }, 100);
    }
  },
  watch: {
    show(isShow) {
      if (!isShow) {
        this.$emit("input", false);
      }
    },
  }
};
</script>
<style lang="scss">
.insuranceList-dogle {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  > .dogle-content {
    position: absolute;
    bottom: 0;
    width: 100%;
    overflow-y: scroll;
    height: 1100px;
    background: #f5f5f5;
    > .header {
      position: relative;
      text-align: center;
      line-height: 102px;
      font-size: 32px;
      border-bottom: 1px solid #cccccc;
      background: #fff;
      > span.close {
        position: absolute;
        left: 32px;
        top: -8px;
        font-size: 64px;
      }
    }
    > .content {
      // height: 1100px;
      // background:#fff;
      padding-bottom: 400px;
      > div {
        &.search {
          padding: 0 20px;
          height: 104px;
          margin: 20px 0;
          width: 100%;
          box-sizing: border-box;
          position: relative;
          > i {
            content: "";
            width: 32px;
            height: 32px;
            background: url("./images/insuranceList_search.png") no-repeat;
            background-size: 100% 100%;
            position: absolute;
            left: 32px;
            top: 50%;
            transform: translate(0, -50%);
          }
          > input {
            box-sizing: border-box;
            height: 100%;
            width: 100%;
            padding-left: 50px;
          }
        }
        // &.SeachFixed {
        //   position: fixed;
        //   bottom:40px;
        //   padding:30px;
        //   z-index: 5;
        //   height:150px;
        //   background: #fff;
        //   box-shadow: 0px 0px 16px 0px #333;
        //   // box-sizing: content-bo;
        //   >input{
        //      background:#f5f5f5;
        //   }
        // }
      }
      > .inform {
        > .section1 {
          margin-bottom: 20px;
          padding: 0 30px 28px;
          background: #fff;
          > h4 {
            font-weight: 900;
            font-size: 30px;
            padding: 20px 0;
            text-align: center;
          }
          > p {
            font-size: 28px;
            line-height: 42px;
            > span {
              color: #0c72e3;
            }
          }
        }
      }
      > .none {
        padding: 0 30px 44px;
        font-size: 22px;
        color: #0c72e3;
        background: #fff;

        > h4 {
          padding: 20px 0;
          text-align: center;
        }
        > p {
          line-height: 36px;
        }
      }
      > .default {
        margin-top: 20px;
        > ul {
          h4 {
            height: 104px;
            line-height: 104px;
            color: #666666;
            border-bottom: 1px solid #e5e5e5;
            background: #fff;
            padding: 0 30px;
            &.title {
              color: black;
              margin-top: 20px;
            }
          }
          > li {
            background: #fff;
            > h4 {
              display: flex;
              justify-content: space-between;
              align-items: center;
              > span {
                &:last-child {
                  width: 19px;
                  height: 19px;
                  border-top: 1px solid #999999;
                  border-right: 1px solid #999;
                  transition: all 0.5s;
                  transform: rotateZ(45deg);
                }
                &.active {
                  transform: rotateZ(135deg);
                }
              }
            }
            > div {
              // display:none;
              > p {
                display: flex;
                justify-content: space-between;
                height: 104px;
                line-height: 104px;
                padding: 0 30px;
                color: #333;
                background: #fafafa;
                border-bottom: 1px solid #e5e5e5;
                &:last-child {
                  // border:none;
                }
                > span {
                  &:last-child {
                    color: #0c72e3;
                  }
                }
              }
            }
          }
        }
      }
      > .search-content {
        background: #fff;
        padding: 0 30px;
        ul {
          li {
            display: flex;
            justify-content: space-between;
            height: 104px;
            // line-height: 104px;
            border-bottom: 1px solid #e5e5e5;
            padding-top: 20px;
            font-size: 28px;
            box-sizing: border-box;
            > p {
              &:last-child {
                color: #0c72e3;
                &:last-child {
                  flex: 0 0 150px;
                  text-align: center;
                }
              }
            }
          }
        }
      }
    }
  }
  > .SeachFixed {
    position: fixed;
    top: 40px;
  }
}
</style>


