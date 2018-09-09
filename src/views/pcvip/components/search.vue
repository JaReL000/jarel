<template>
   <div class="search">
       <ul>
         <li @click="tab(1)" :class="{'active':searchParams.vip_level===1}">一级被邀请人（员工）</li>
         <li @click="tab(2)" :class="{'active':searchParams.vip_level===2}">二级被邀请人</li>
      </ul>
      <div class="search-param">
          <div class="date">
              <p>邀请时间</p>
              <el-date-picker
                    v-model="date"
                    type="daterange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    value-format="yyyy-MM-dd"
                    @change = "change"
                    >
              </el-date-picker>
          </div>
          <div class="select">
              <p>是否投资</p>
              <p>
                <el-checkbox-group v-model="radio" @change="checkChange">
                  <el-checkbox label="已投资"></el-checkbox>
                  <el-checkbox label="未投资"></el-checkbox>
                </el-checkbox-group>
              </p>
          </div>
          <div class="phone-search">
              <p>手机号码</p>
              <p>
                <el-input
                  placeholder="请输入手机号"
                  suffix-icon="el-icon-phone-outline"
                  :maxlength="13"
                  v-model  = 'searchParams.mobile'
                  >
                </el-input>
              </p>
              <el-button type="primary" icon="el-icon-search" @click="query">搜索</el-button>
          </div>
      </div>
   </div>
</template>
<script>
// import { Trim } from "utils/utils.js";
export default {
  data() {
    return {
      date: [],
      active: 1,
      radio: [],
      phone:'',
      searchParams: {
        type: 0,
        mobile: "",
        vip_level: 1,
      },
      oldSearchParam:{}, // 查询按钮截流  
      oldTab: 1 // tab切换截流
    };
  },
  methods: {
    tab(i) {
      if(i === this.oldTab) return 
      this.searchParams.vip_level = i;
      // this.$emit("tabActive", i);
      this.$emit('serchParam', Object.assign({},this.searchParams))
      this.oldTab = i;
      this.oldSearchParam = Object.assign({},this.searchParams)
    },
    change(t) {
      console.log(t)
      if(t){
        Object.assign(this.searchParams, {
          end_time: t[1],
          begin_time: t[0]
        });
      }else{
        Object.assign(this.searchParams, {
          end_time: '',
          begin_time: ''
        });
      }
    },
    checkChange(name) {
      console.log(name);
      if (
        name.length === 0 ||
        (name.indexOf("未投资") !== -1 && name.indexOf("已投资") !== -1)
      ) {
        this.searchParams.type = 0; // 展示示全部
        console.log("// 展示示全部");
      } else if (name.indexOf("未投资") !== -1) {
        console.log("// 未投资");
        this.searchParams.type = 2; // 未投资
      } else if (name.indexOf("已投资") !== -1) {
        console.log("// 已投资");
        this.searchParams.type = 1; // 已投资
      }
      console.log(this.searchParams);
    },
    query(){
      if(JSON.stringify(this.searchParams) !== JSON.stringify(this.oldSearchParam)){
        console.log('进来了', JSON.stringify(this.searchParams))
        this.$emit('serchParam', Object.assign({},this.searchParams))
        this.oldSearchParam = Object.assign({},this.searchParams)
      }
    }
  },
  watch: {
  }
};
</script>

<style lang="stylus">
div.search {
  margin-bottom: 15px;

  ul {
    height: 48px;
    display: flex;

    >li {
      width: 290px;
      background: #cacaca;
      text-align: center;
      line-height: 48px;
      cursor: pointer;

      &:last-child {
        margin-left: 2px;
      }

      &.active {
        background: #2a8bf6;
        color: white;
      }
    }
  }

  div.search-param {
    line-height: 40px;
    padding: 0 40px;
    margin-top: 40px;

    >div.date {
      display: flex;
      justify-content: flex-start;

      >p {
        margin-right: 40px;
      }
    }

    >div.select {
      display: flex;
      margin-top: 24px;

      >p {
        margin-right: 40px;
      }
    }

    >div.phone-search {
      margin-top: 24px;
      display: flex;
      align-items: cetner;

      >p {
        margin-right: 40px;
      }
    }
  }
}
</style>

