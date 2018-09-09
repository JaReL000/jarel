
<template>
<div class="address-list" >
  <div class="no-add" v-if="!list.length && show">
    <img src="./images/no_addrees.png" alt="无地址">
    <p>您还没有收获地址哦</p>
  </div>
  <div class="fixed main" v-if="list.length && show">
    <scroll :data="list" ref="toplist" v-if="list.length">
      <van-address-list
        :list="list"
        @setDefaultFun="setDefaultFun"
        @editFun="editFun"
        @delFun="delFun"
      ></van-address-list>
    </scroll>
  </div>
  <div 
    class="footer fixed-xm" 
    v-text="btnText"
    @click="routerPush('new')"
  ></div>
</div>
</template>

<script>

export default {
  components: {},
  data() {
    return {
      show: false,
      btnText: '+ 新增地址',
      list: []
    }
  },
  computed: {},
  watch: {},
  created() {
    this.$http({
      servicename: 'Address.addressList',
    }).then((res)=>{
      
      this.list = res.list
      this.show = true
    })
  },
  mounted() {},
  methods: {
    //设置默认
    setDefaultFun(index){
      this.$http({
        servicename: 'Address.addressDdefaultSet',
        uaddressid: this.list[index].uaddressid || '',
      }).then((res)=>{
        this.list.forEach((val, i)=> {
          this.list[i].is_default = 0
        });
        this.list[index].is_default = 1
      })
    },

    //编辑
    editFun(uaddressid){
      this.routerPush('edit', {uaddressid})
    },

    //删除
    delFun(index){
      this.$http({
        servicename: 'Address.addressDel',
        uaddressid: this.list[index].uaddressid || '',
      }).then((res)=>{
        
        this.list.splice(index, 1)
      })
    },
  },
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import "~style/mixin.styl"

.address-list
  text-align center
  &>.main
    background-color #f5f5f5
  .no-add
    padding-top 48%
    img 
      width 190px
    p 
      line-height 160px
      font-size 28px
      color #999999
  .footer 
    position fixed
    bottom 0
    left 0
    width 100%
    height 100px
    line-height @height
    font-size 32px
    background-color mColor
    color #fff

</style>