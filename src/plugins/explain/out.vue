<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.explain-out
  padding  30px 32px 0
  font-size 26px
  line-height 50px
  table
    width 100%
    margin-bottom 30px
    line-height 60px
    font-size rem(20)
    th
      border 1px solid #0c72e3
      text-align center
      background: #0c72e3;
      color: #fff;
      width: 33.3%;
    td
      border: 1px solid #ccc;
      text-align: center;
      color: #4e4e4e;
  h4
    font-size 30px
    color mainColor
  span
    float left
  .ge
    height 80px
</style>
<template>
  <div class="explain-out fixed  fixed-x">
    <!-- <table>
      <thead>
      <tr>
        <th
          v-for="(item, index) in thead"
          :key="index"
          v-text="item"
        ></th>
      </tr>
      </thead>
      <tbody>
      <tr
        v-for="(item, index) in tbody"
        :key="index"
      >
        <td>{{item.td1}}</td>
        <td>{{item.td2}}</td>
        <td>{{item.td3}}</td>
      </tr>
      </tbody>
    </table> -->
    <h4>注:</h4>
    <ul>
      <li
        v-for="(item, index) in lists[$route.query.productid] || 1"
        :key="index"
      >
        <span :class="{ge: item.ge}">{{index+1}}、</span>
        <p v-html="item.text"></p>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    components: {},
    data() {
      return {
        // thead: ['转出类型', '转出时间', '到账时间'],
        // tbody: [
        //   {td1: '转出余额', td2: '15:00前', td3: '实时到账'},
        //   {td1: '转出余额', td2: '15:00后', td3: '第二个工作日到账'},
        //   {td1: '转出到银行卡', td2: '当日', td3: '第二个工作日到账'},
        // ],
        thead: ['单笔', '单日', '累计'],
        tbody: [
          {td1: '5万', td2: '10万', td3: '20万/人'},
        ],
        lists: {
          1: [ // 活期转出说明
            {text: '15:00前转入的资金，当日15:00后才可转出；<br/> 15:00后转入的资金，次日15:00后才可转出。', ge: true},
            {text: '转出资金会在转出当日24：00前到账至余额账户。'},
            {text: '转出资金不享受当日收益。'},
            {text: '每天凌晨0点~4点系统正在进行每日计息，计息期间为保障平台稳定运行，将暂时关闭提现操作。', ge: true},
          ],
          9:[ // 月定期转出说明
            {text: '转出资金将在转出当日24:00前到账至余额账户。'},
            {text: '转出资金不享受当日收益。'},
            {text: '每天凌晨0点~4点系统正在进行每日计息，计息期间为保障平台稳定运行，将暂时关闭提现操作。', ge: true},
          ]
        },
        product: ''
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {
      this.product = this.$route.query
      console.log('ll', this.product)
    },
    methods: {},
  }
</script>
