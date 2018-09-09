<template>
    <div class="result-box">
       <top-hd :phone="vipdata.mobile"></top-hd>
      <div class="banner-vip">
        <img src="../assets/vip_pc_banner.jpg" alt="鲸鱼">
      </div>
      <div class="content-box">
          <div class="hd">
              <!-- 今日邀请明细 -->
              <hd>
                <div class="left" slot="left">
                  <h3 v-text="vipdata.today_invite_user"></h3>
                  <p>今日累计</p>
                  <p>邀请好友数（人）</p>
               </div>
               <div class="right" slot="right">
                  <p>已投资：<br/> <span v-text="vipdata.today_invest_user||0"></span> <span class="until">人</span></p>
                  <p>未投资：<br/> <span v-text="vipdata.today_uninvest_user||0"></span><span class="until">人</span></p>
               </div>
               <div class="bottom" slot="bottom">
                  <p v-text="vipdata.today_invest_money"></p>
                  <p>今日累计邀请投资金额（元）</p>
               </div>
             </hd>
             <!-- 总邀请明细 -->
            <hd>
                <div class="left" slot="left">
                  <h3 v-text="vipdata.total_invite_user"></h3>
                  <p>历史累计</p>
                  <p>邀请好友数（人）</p>
               </div>
               <div class="right" slot="right">
                  <p>已投资：<br/> <span v-text="vipdata.total_invest_user||0"></span><span class="until">人</span></p>
                  <p>未投资：<br/> <span v-text="vipdata.total_uninvest_user||0"></span><span class="until">人</span></p>
               </div>
               <div class="bottom" slot="bottom">
                  <p v-text="vipdata.total_invest_money"></p>
                  <p>累计邀请投资金额（元）</p>
               </div>
            </hd>
          </div>
          <div class="content">
              <!-- 查询组件 -->
              <search @serchParam="serchParam"></search>
              <!-- 导出按钮 -->
          <div class="export">
              <a :href="`${baseUrl}/m/index/?page=${params.page||''}&page_size=${params.page_size}&vip_level=${params.vip_level}&type=${params.type||''}&begin_time=${params.begin_time||''}&end_time=${params.end_time||''}&mobile=${params.mobile||''}&servicename=user.getExcelfile`">
                  <el-button type="primary" icon="el-icon-upload2" size="small">导出</el-button>
              </a>
          </div>
              <!-- 一级邀被邀请人table表格 -->
              <tb v-if="vip_level === 1"  :tableData="data" :key="1" @pageChange="pageChange">
                  <el-table-column
                    prop="level_one_inviter"
                    label="一级被邀请人"
                    >
                     <template slot-scope="scope">
                        <span>{{scope.row.level_one_inviter + scope.row.username}}</span>
                     </template>
                  </el-table-column>
                  <el-table-column
                    prop="money"
                    label="投资额"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="register_date"
                    label="注册时间">
                 </el-table-column>
                  <el-table-column
                    prop="total_invite_user"
                    label="累计邀请人数"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="total_invest_money"
                    label="累计邀请投资金额"
                    >
                 </el-table-column>
              </tb>
              <!-- 二级被邀请人table表格 -->
              <tb v-if="vip_level === 2" :tableData="data" :key="2" @pageChange="pageChange">
                  <el-table-column
                    prop="level_two_inviter"
                    label="二级被邀请人"
                    >
                  </el-table-column>
                  <el-table-column
                    label="一级被邀请人"
                    >
                      <template slot-scope="scope1">
                        <span>{{scope1.row.level_one_inviter + scope1.row.username}}</span>
                     </template>
                  </el-table-column>
                  <el-table-column
                    prop="money"
                    label="累计投资金额"
                    >
                  </el-table-column>
                  <el-table-column
                    prop="register_date"
                    label="邀请注册时间"
                    >
                 </el-table-column>
              </tb>
          </div>
      </div>
    </div>
</template>
<script>
import hd from '../components/content-header.vue';
import search from '../components/search.vue';
import tb from '../components/table.vue';
import topHd from '../components/top-hd';
import Flash from 'components/flash';
export default {
  data() {
    return {
      vip_level: 1,
      vipdata: {},
      data: [],
      params: {
        page: 1,
        page_size: 10,
        vip_level: 1,
        type: 0,
      },
      baseUrl: process.domain
    };
  },
  created() {
    console.log(hd);
    this.init();
    this.getData(); // 获取邀请记录
    // console.log('---2222-', process.domain)
  },
  components: {
    hd,
    search,
    tb,
    topHd
  },
  methods: {
    init() {
      // 获取用户基本信息
      this.$http({
        servicename: "user.vipdata",
        fromId: '309784180'
      }).then(res => {
        // console.log(res,'------');
        if(res.code === 1000403||res.be_invited_level!==0){
          this.$router.replace("/");
          Flash('非常抱歉，你无法进入');
        }
        this.vipdata = res;
      }).catch((error)=>{
        console.log('res---')
      });
    },
    serchParam(params) {
      this.vip_level = params.vip_level;
      Object.assign(this.params, params);
      this.getData();
    },
    getData() {
      // 获取表格数据
      this.params.servicename = "user.vipList";
      this.params.fromId = '309784180';
      // console.log('--jjjj--', this.params)
      this.$http(this.params)
        .then(res => {
          console.log("---", res);
          // this.total = res.total_count
          // this.tableData = res.list
          this.data = res;
        })
        .catch(res => {
          console.log("xxxxxxxxxxx");

        });
    },
    pageChange(page) {
      console.log("hl", page);
      this.params.page = page;
      this.getData();
    },
  }
};
</script>

<style lang="stylus">
.result-box {
  >div.banner-vip {
    img {
      width: 100%;
      // height: 316px;
    }
  }

  >div.content-box {
    background: #ebeaea;
    padding-bottom: 40px;

    >div.hd {
      display: flex;
      justify-content: space-between;
      width: 1100px;
      margin: 0 auto;
      padding-top: 44px;
    }

    >div.content {
      background: white;
      width: 1100px;
      margin: 0 auto;
      border-radius: 10px;
      overflow: auto;
    }
  }

  span.el-range-separator {
    padding: 0;
  }
  div.export{
    box-sizing border-box;
    padding-left:20px;
    padding-bottom:10px;
  }
}
</style>


