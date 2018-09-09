
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
      <jinr-cell  
        title="设置默认" 
        @click="showAreaSelect = true" 
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
// const areaList = file => (resolve) => {
//   import('./area.json').then((module) => {
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
      mobile: '',
      address: '',
      username: '',
      region_name_path: '',
      regionid: '',
      addressInfo: {}
    }
  },
  created() {},
  methods: {

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
        servicename: 'Address.addressAdd',
        mobile: this.addressInfo.tel || '',
        address: this.addressInfo.address_detail || '',
        username: this.addressInfo.user_name || '',
        region_name_path: this.addressInfo.province+this.addressInfo.city+this.addressInfo.county || '',
        regionid: this.addressInfo.area_code || '',
        is_default: this.active || '',
        
      }).then((res)=>{
        setTimeout(()=> {
          this.responseing = false
        }, 700);
        this.$flash('添加地址成功')
        this.routerPush('list')
      })
    },
    onChangeDetail(val) {
      console.log(val);
      this.searchResult = [{
          name: '',
          address: val
      }]
    },

    // 设置默认地址
    userFun(){
      this.active = !this.active ? 1 : 0
    }
  }
};
</script>

<style lang="stylus">
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
    background-color #0c72e3
    color #fff
</style>

  