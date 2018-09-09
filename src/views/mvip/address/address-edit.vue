
<template>
  <section class="address-edit">
    <van-address-edit 
      class="address-edit-main"
      :area-list="areaList" 
      :show-postal="true" 
      :show-set-default="true" 
      :show-search-result="true" 
      :search-result="searchResult" 
      :addressInfo="addressInfo"
      @save="onSave" 
      @delete="onDelete" 
      @change-detail="onChangeDetail"
    ></van-address-edit>
    <jinr-cell-group>
      <!-- @click="selectFun"  -->
      <jinr-cell  
        title="设置默认" 
        is-radio
        :active="active"
        @userFun="userFun"
      ></jinr-cell>
    </jinr-cell-group>
    <div 
      class="footer fixed-xm" 
      v-text="btnText"
      @click="saveFun"
    ></div>
  </section>
</template>
<script>
// import { Toast } from 'packages';
import areaList from './area.json';
// const _import = file => (resolve) => {
//   import('./' + file + '.json').then((module) => {
//     resolve(module)
//   })
// }

export default {
  data() {
    return {
      btnText: '保存',
      active: 0,
      areaList: areaList,
      searchResult: [],
      addressInfo: {},
      responseing: false,
    }
  },
  created() {
    this.initFun()
  },
  methods: {
    initFun(){
      this.$http({
        servicename: 'Address.addressDetail',
        uaddressid: this.$route.query.uaddressid || '',
      }).then((res)=>{
        this.addressInfo.tel = res.phone
        this.addressInfo.address_detail = res.address
        this.addressInfo.user_name = res.username

        this.addressInfo.area_code = res.regionid
        this.active = res.is_default

        this.searchResult = [

        ]
        this.onChangeDetail()
      }).catch((error)=>{
      });
    },

    onSave() {
      this.test = {
        user_name: 'b'
      };
      this.$flash('save');
    },
    onDelete() {
      this.$flash('delete');
    },
    saveFun(){
      if(this.responseing){
        return 
      }
      this.responseing = true
      this.$http({
        servicename: 'Address.addressUpdate',
        mobile: this.addressInfo.tel || '',
        address: this.addressInfo.address_detail || '',
        username: this.addressInfo.user_name || '',
        region_name_path: (this.addressInfo.province+this.addressInfo.city+this.addressInfo.county) || '',
        regionid: this.addressInfo.area_code || '',
        is_default: this.active || '',
        uaddressid: this.$route.query.uaddressid || ''
      }).then((res)=>{
        // this.$flash('添加地址成功')
        this.routerPush('list')
      }).catch((error)=>{
          setTimeout(()=> {
            this.responseing = false
          }, 770);
      });
    },
    onChangeDetail(val) {
      console.log(val);
      this.searchResult = [];
      if (val) {
        // this.searchResult = [{
        //   name: '黄龙万科中心',
        //   address: '杭州市西湖区'
        // }, {
        //   name: '黄龙万科中心H座'
        // }, {
        //   name: '黄龙万科中心H座',
        //   address: '杭州市西湖区'
        // }];
      } else {
        this.searchResult = [];
      }
    },

    // 设置默认地址
    userFun(){
      this.active = !this.active ? 1 : 0
      
    }
  }
};
</script>

<style lang="stylus">
@import "~style/mixin.styl"
  
.address-edit
  &-main 
    margin-bottom 20px
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
  a::after
    border-width: 0px 0 !important;
</style>

  