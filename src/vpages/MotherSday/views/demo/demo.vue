<template>
    <div class="demo">
    <h3>佣金计算</h3>
        <div class="conditions1">
           <label>会员等级：</label>
           <div>
              <div>
                 <p :class="{'select':true,'placeholder1':!!placeholder1}"
                  v-text="members[conditions.type].typeName"
                  @click="drop=!drop"
                  >
                 </p>
              </div>
              <ul v-if="!!drop">
                 <li v-for="(item,key) in members" :key="item+key" @click="_selectType(item,key)">
                    <span v-text="item.typeName"></span>
                 </li>
              </ul>
           </div>
        </div>
        <div class="conditions2">
           <label>好友借出金额</label>
           <div>
              <input type="text" placeholder="请输入金额" v-model="conditions.money">&nbsp;元
              <input type="text" placeholder="请输入时间" v-model="conditions.times"> &nbsp;个月
           </div>
        </div>
        <div class="conditions3">
            <p :class="{'checked':conditions.reward==1}" @click="conditions.reward=1">0-30天</p>
            <p :class="{'checked':conditions.reward==2}" @click="conditions.reward=2">31-180天</p>
        </div>
        <div class="result">
           <label>佣金奖励</label>
           <div>
             <div v-text="result"></div> 【计算】
           </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      members: {
        0: {
          typeName: "普通会员",
          rate: "0.006"
        },
        1: {
          typeName: "银牌会员",
          rate: "0.016"
        },
        2: {
          typeName: "金牌会员",
          rate: "0.018"
        },
        3: {
          typeName: "白金会员",
          rate: "0.02"
        },
        4: {
          typeName: "钻石会员",
          rate: "0.024"
        },
        5: {
          typeName: "至尊会员",
          rate: "0.028"
        }
      },
      placeholder1: true, //
      drop: false, // 下拉
      conditions: {
        type: 0,
        money: "", // 借出金额
        times: "", // 借出时间
        reward: 1 // 奖励比例
      }
    };
  },
  computed: {
    result() {
      let Earnings = this._getEarnings(this.conditions.money);
      return Earnings;
    }
  },
  methods: {
    _selectType(opt, key) {
      this.drop = !this.drop;
      this.conditions.type = key;
      this.placeholder1 = false;
    },
    _getEarnings() {
      let sign = false;
      for (let key in this.conditions) { // 必要信息填满后开始计算
        if (this.conditions[key] == "") {
          sign = true;
          break;
        }
      }
      if (sign) return '';
      let money = this.conditions.money;
      let times = this.conditions.times;
      let proportion = parseFloat(this.members[this.conditions.type].rate);
      let additional = this.conditions.reward == 1 ? 0.004 : 0.002; // 额外奖励
      return money * times * (proportion + additional) / 12;
    }
  }
};
</script>

style.<style lang="scss">
.demo {
  width: 684px;
  height: 616px;
  border: 1px solid hotpink;
  margin: 50px auto 0;
  padding: 0 40px;
  box-sizing: border-box;
  h3 {
    margin-bottom: 50px;
    text-align: center;
  }
  .conditions1 {
    margin-bottom: 30px;
    > div {
      width: 234px;
      height: 38px;
      margin-top: 10px;
      .select {
        height: 50px;
        width: 300px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 10px;
        border: 1px solid #89a4a7;
        box-sizing: border-box;
        color: black;
        &::after {
          content: "";
          width: 15px;
          height: 15px;
          border-top: 1px solid #333399;
          border-right: 1px solid #333399;
          transform: rotateZ(135deg);
          margin-top: -5px;
        }
      }
      > ul {
        width: 100%;
        background: #fff;
        position: relative;
        z-index: 2;
        // text-align:center;
        li {
          padding: 15px;
          // border-bottom: 1px solid #c0c0c0;
        }
      }
      .placeholder1 {
        color: #d2d2d2;
      }
    }
  }
  .conditions2 {
    > div {
      display: flex;
      margin-top: 20px;
      input {
        width: 200px;
        height: 40px;
        border: 1px solid #89a4a7;
        &:last-child {
          margin-left: 40px;
        }
      }
    }
  }
  .conditions3 {
    margin-top: 40px;
    display: flex;
    justify-content: flex-start;
    p {
      width: 200px;
      display: flex;
      align-items: center;
      &::before {
        display: block;
        content: "";
        width: 15px;
        height: 15px;
        border: 1px solid #89a4a7;
        border-radius: 50%;
        margin-right: 15px;
      }
      &.checked {
        &::before {
          background: #89a4a7;
        }
      }
    }
  }
  .result {
    margin-top: 30px;
    div {
      display: flex;
      align-items: center;
      > div {
        margin-top: 10px;
        height: 40px;
        width: 300px;
        border: 1px solid #89a4a7;
      }
    }
  }
}
</style>

