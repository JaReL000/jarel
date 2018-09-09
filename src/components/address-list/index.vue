<template>
<div class="van-address-list">
  <div 
    v-for="(item, index) in list"
    :key="index"
    class="address-list-cell"
  >
    <div class="top">
      <h6>{{item.username}}</h6>
      <span>{{item.phone}}</span>
    </div>
    <p>{{item.region_name_path + item.address}}</p>

    <div class="bot">
      <div 
        class="default" 
        :class="{active: item.is_default}"
        @click="setDefaultFun(index)"
      >默认地址</div>
      <div class="ca">
        <div class="edit" @click="editFun(item.uaddressid)">编辑</div>
        <div class="del" @click="delFun(index)">删除</div>
      </div>
      
    </div>
  </div> 
</div>
</template>

<script>
// import Icon from '../icon';
import Cell from '../cell';
import Scroll from '../scroll';
import CellGroup from '../cell-group';
// import Radio from '../radio';
// import RadioGroup from '../radio-group';

export default {
  name: 'van-address-list',

  components: {
    // [Icon.name]: Icon,
    [Cell.name]: Cell,
    // [Radio.name]: Radio,
    [CellGroup.name]: CellGroup,
    // [RadioGroup.name]: RadioGroup
    Scroll
  },

  props: {
    value: [String, Number],
    list: {
      type: Array,
      default: () => []
    },
    addButtonText: {
      type: String,
      default: '新增收货地址'
    }
  },
  methods: {
    setDefaultFun(index){
      this.$emit('setDefaultFun', index)
    },
    editFun(index){
      this.$emit('editFun', index)
    },
    delFun(index){
      this.$emit('delFun', index)
    },
  },
};
</script>

<style lang="stylus">
.van-address-list
  padding-bottom 100px
  .address-list-cell
    margin-bottom 15px
    background-color #fff
    .top 
      overflow hidden
      padding 0 30px
      line-height 96px
      h6 
        float left
        font-size 28px
      span 
        float right 
    p 
      padding 0 30px
      border-bottom 1px #ececec solid
      line-height 58px
      font-size 28px
      text-align left
      color #666666
    .bot
      overflow hidden
      padding 0  30px
      line-height 64px
      font-size 22px
      .default 
        float left
        padding-left 50px
        background url('./images/Default_Address_Noselect@2x.png') no-repeat left center
        background-size 40px 40px
        &.active 
          background-image url('./images/Default_Address_Select@2x.png')
      .ca
        overflow hidden
        float right
        padding-left 30px
        &>div 
          float left
          padding-left 30px
          width 100px
          background-size 40px 40px
          background-repeat no-repeat
          background-position left center
        .edit
          margin-right 15px
          background-image url('./images/addressEditIcon@2x.png')
        .del 
          background-image url('./images/addressDeleteIcon@2x.png')

</style>
