<template>
  <div class="myInsurance">
    <hd :title="{name:'我的保险'}" :fixed="true"></hd>
    <Slide :Active="$route.query.index" :title="title" @selectChange="select">
      <li class="page" v-for="(v,i) in title" :Key="i">
        <div class="myInsurance-contetn-box">
          <div class="myInsurance-order-box"
              v-if="!!orderList.length"
              v-for="(item,index) in orderList"
              :key="item+index"
          >
            <order
              :orderData="item" logo="right"
              :state="{index:i,text:v}"
              @click.native.stop="goDetails(item,i,v)"
            ></order>
            <div class="btn" v-if="i==3">
               <button @click="del(item.order_no)">取消订单</button>
            </div>
          </div>

          <div class="none" v-if="!orderList.length">暂无相关订单</div>
        </div>
      </li>
    </Slide>
  </div>
</template>
<script>
import order from "../components/order";
export default {
  data() {
    return {
      title: ["审核中", "保障中", "已失效", "待支付"],
      orderList: [],
      userData: {}
    };
  },
  components: {
    order
  },
  mounted() {
    this.userData = this.sessionGet("userData");
    this.init();
  },
  computed: {
    orderData() {
      return this.sessionGet("orderData");
    }
  },
  methods: {
    init() {
      // console.log("----", this.userData);
      this.select(this.$route.query.index);
    },
    select(index) {
      index = index || 0;
      this.$http(
        "/api/getInsuranceStatus",
        {
          code: index,
          userId: this.userData.userid
        },
        "get"
      )
        .then(res => {
          console.log("res---", res);
          this.orderList = res.data;
        })
        .catch(res => {
          this.$flash("xxxx" + index);
        });
    },
    goDetails(item, i, v) {
      // 跳转到保单详情页面
      console.log("item", item, i);
      if (i == 3) {
        this.sessionSet("orderID", item.order_no);
        this.$router.push("/payment");
      } else {
        let params = {
          orderData: item,
          state: {
            index: i,
            text: v
          }
        };
        this.$router.push({ name: "orderDetails", params });
      }
    },
    del(orderNo) {
      console.log("---", orderNo);
      this.$messagebox({
        title: "提示",
        message: "该操作将会删除此条订单"
      })
        .then(sign => {
          if (sign === "confirm") {
            this.$http(
              "/api/delOrder",
              {
                orderNo
              },
              "post"
            )
              .then(res => {
                this.$flash("删除成功");
                this.select(3);
              })
              .catch(err => {
                this.$flash({
                  message: res.data || "删除失败"
                });
              });
          } else if (sign === "cancel") {
            console.log("取消了");
          }
        })
        .catch(() => {});
    }
  }
};
</script>
style.<style lang="scss">
.myInsurance {
  .content {
    .page {
      background: #f5f5f5;
      box-sizing: border-box;
      // &::-webkit-scrollbar {
      //   background-color: transparent;
      // }
      .myInsurance-contetn-box {
        padding-bottom: 100px;
        margin: 0 auto;
        > .none {
          font-size: 30px;
          color: #999;
          text-align: center;
          line-height: 100px;
        }
        .myInsurance-order-box {
          background: #fff;
          .btn {
            height: 50px;
            padding-right: 60px;
            button {
              float: right;
              background: #fff;
              outline: none;
              border: 1px solid #b5b5b5;
              padding: 8px 15px;
              margin-top: -20px;
              font-size: 18px;
              border-radius: 5px;
            }
            button:hover {
              color: #0c72e3;
              border-color: #0c72e3;
            }
          }
        }
      }
    }
  }
}
</style>


