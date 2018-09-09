<template>
<div class="Jyd-index">
   <div class="minirefresh-wrap" id="Jyd-minirefresh">
      <div class="list minirefresh-scroll">
          <ul>
            <li v-for="(item,index) in productLists" :key="item+index"
            @click="$router.push({path:'details',query:{id:item.projectid}})">
                <div class="top">
                  <div class="left">
                    <h4><span :class="{'type-car':item.mortgage_way==1,'type-xin':item.mortgage_way==2}"></span><span v-text="item.project_name"></span></h4>
                    <div class="center">
                        <div>
                          <p><span v-text="item.leftRateInit.substr(0,item.leftRateInit.length-1)"></span >%<span v-text="!item.rightRateInit?item.rightRateInit:`+${item.rightRateInit}`"></span></p>
                          <p>收益年化利率</p>
                        </div>
                        <div>
                          <p v-text="'期限一个月'"></p>
                          <p v-text="'最小投资金额100元'"></p>
                        </div>
                    </div>
                  </div>
                  <div
                  :class="{right:true,abled:!item.overplusTime&&item.cur_status==4}"
                  v-text="!item.overplusTime?cur_statusName[item.cur_status]:'已结束'"
                  @click="_goInvest(!item.overplusTime&&item.cur_status==4)"
                  ></div>
                </div>
                <div class="bottom">
                    <p v-text="['先息后本','到期本息','等本等息','等额本息','等额本金'][item.repay_way-1]">先息后本</p>
                    <p>剩余<span v-text="'30000.000'"></span></p>
                </div>
            </li>
          </ul>
      </div>
   </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      pageInfo: {
        page: 1,
        limit: 10
      },
      productLists: [],
      cur_statusName: {
        4: "立即投资", // 招标中
        5: "满标",
        6: "满标",
        7: "还款中",
        8: "已结清",
        11: "满标"
      },
      btnInfo: {
        text: "",
        state: ""
      },
      resf: ""
    };
  },
  mounted() {
    this.resf = this.RefreshUp("#Jyd-minirefresh", this._getList);
  },
  methods: {
    intData() {
      this._getList();
    },
    _getList() {
      let params = {};
      let pageInfo = this.pageInfo;
      // console.log('进来了-------------------------')
      this.$http("/jyd/projectList", this.pageInfo)
        .then(({ data: res }) => {
          //  if(pageInfo.page>1){
          this.productLists = this.productLists.concat(res.list);
          pageInfo.page++;
          this.$nextTick(() => {
            console.log("艹", res.total, this.productLists.length);
            this.resf.endUpLoading(res.total <= this.productLists.length);
          });
        })
        .catch(error => {
          console.log(error);
          this.resf.endUpLoading(true);
        });
    },
    _goInvest(isTrue){
      console.log('---isTrue', isTrue)
      if(isTrue){
        // 跳转入页面
        // this.$router.push()
      }
    }
  }
};
</script>
<style lang="scss">
.Jyd-index {
  // background: #f7f7f8;
  padding-top: 20px;
  position: relative;
  height: 90%;
  div.list {
    width: 100%;
    height: 100%;
    ul {
      background: #f7f7f8;
      li {
        background: #fff;
        margin-bottom: 20px;
        // overflow: hidden;
        > div.top {
          height: 220px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 30px;
          border-bottom: 1px solid #eaeaea;
          > div.left {
            flex: 1;
            margin-right: 50px;
            h4 {
              font-size: 32px;
              display: flex;
              align-items: center;
              margin-bottom: 43px;
              span {
                //  vertical-align: middle;
                &:first-child {
                  display: inline-block;
                  width: 23px;
                  height: 26px;
                  // vertical-align: middle;
                  margin-right: 10px;
                }
                &.type-car {
                  background: url("./images/type_car_icon.png") no-repeat 100%/100%;
                }
                &.type-xin {
                  background: url("./images/type_xin_icon.png") no-repeat 100%/100%;
                }
              }
            }
            > div.center {
              display: flex;
              justify-content: space-between;
              div {
                &:first-child {
                  p {
                    &:first-child {
                      color: #ff744e;
                    }
                    &:last-child {
                      margin-top: 10px;
                      color: #a5a5a5;
                      font-size: 21px;
                    }
                    span {
                      &:first-child {
                        font-size: 45px;
                      }
                      &:last-child {
                        font-size: 26px;
                      }
                    }
                  }
                }
                &:last-child {
                  p {
                    color: #a5a5a5;
                    font-size: 21px;
                    &:first-child {
                      font-size: 32px;
                      margin-bottom: 20px;
                      color: #000;
                    }
                  }
                }
              }
            }
          }
          > div.right {
            width: 171px;
            height: 66px;
            text-align: center;
            line-height: 66px;
            border-radius: 10px;
            background: #f7f7f8;
            color: #ff744e;
          }
          > div.abled {
            background: #0c72e3;
            color: #fff;
          }
        }
        > div.bottom {
          display: flex;
          justify-content: space-between;
          padding: 10px 30px 20px;
          // line-height: 46px;
        }
      }
    }
  }
}
</style>


