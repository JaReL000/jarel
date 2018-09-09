  <template>
    <div class="table">
      <div class="total">
        <el-tag type="success" >累计：<span v-text="tableData.total_count">8000</span>条记录</el-tag>
      </div>
      <el-table
        :data="tableData.list"
        style="width: 100%">
          <slot></slot>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage3"
        :page-size="searchParam.page_size"
        layout="prev, pager, next, jumper"
        :total="tableData.total_count">
      </el-pagination>     
    </div>
  </template>
  <script>
export default {
  data() {
    return {
      currentPage3: 1,
      // tableData: [],
      searchParam: {
        page:1,
        page_size: 10,
        vip_level: 1,
        type:0
      },
      total:0
    };
  },
  props: {
    tableData: {}
  },
  created(){
    this.getDate()
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.searchParam.page = val
      this.$emit('pageChange',val)
      // this.getDate()
    },
    getDate(){
      // this.searchParam.servicename = 'user.vipList';
      // this.$http(this.searchParam).then((res)=>{
      //   console.log(res)
      //   this.total = res.total_count
      //   this.tableData = res.list
      // }).catch((res)=>{
      //   console.log('xxxxxxxxxxx')
      //   this.$router.replace('/')
      // })
    },
  },
  watch:{
   params: {
      handler: function (val, oldVal) { 
        // console.log(val)
        console.log('--------', val)
        Object.assign( this.searchParam,val)
        this.getDate()
      },
      deep: true
    },
  }
};
</script>
  <style lang="stylus">
  div.el-table 
    border-top: 1px solid #ebeef5;
    text-align: center;
  thead 
    th 
      text-align: center !important;  
  .el-pagination
    margin:10px 0
  div.table
    position relative
    div.total
      position:absolute
      right:50px
      top:-40px
</style>
  