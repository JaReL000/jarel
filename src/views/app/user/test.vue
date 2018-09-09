<template>
  <div class="fixed">
    <button size="small" @click="activeFun">getToken</button>
      <button size="small" @click.native.prevent="active = 'tab-container2'">tab 2</button>
      <button size="small" @click.native.prevent="active = 'tab-container3'">tab 3</button>
    <!-- <div class="nav">
      <button size="small" @click.native.prevent="active = 'tab-container1'">tab 1</button>
      <button size="small" @click.native.prevent="active = 'tab-container2'">tab 2</button>
      <button size="small" @click.native.prevent="active = 'tab-container3'">tab 3</button>
    </div>
    <div class="page-tab-container">
      <tab-container class="page-tabbar-tab-container" v-model="active" swipeable>
        <tab-container-item id="tab-container1" class="tab-container1">
          <div v-for="n in 100" title="tab-container 1">{{n}}</div>
        </tab-container-item>
        <tab-container-item id="tab-container2" class="tab-container2">
          <div v-for="n in 5" title="tab-container 2">{{n}}</div>
        </tab-container-item>
        <tab-container-item id="tab-container3" class="tab-container3">
          <div v-for="n in 70" title="tab-container 3">{{n}}</div>
        </tab-container-item>
      </tab-container>
    </div> -->
  </div>
</template>

<script>
import { 
  TabContainerItem,
  TabContainer, 
} from '@/jinr-sdk/components'



export default {
  name: 'page-tab-container',
  components: {
    TabContainerItem,
    TabContainer,
  },
  data() {
    return {
      active: 'tab-container1'
    };
  },
  methods: {
    activeFun(){
      this.$flash('开始')
      try {
        // Jinr.pushProductTurnIn(
        //   '1', 
        //   '活期', 
        //   '1', 
        //   '0', 
        //   '0', 
        //   '0', 
        //   '--',
        //   '1'
        // )
        // window.webkit.messageHandlers.getToken.postMessage({title:'测试分享的标题',content:'测试分享的内容',url:'https://github.com/maying1992'});
        window.webkit.messageHandlers.getToken.postMessage('7043-test', function (params) {
          this.$flash(params || '123')
        });
      } catch (error) {
        this.$flash(error)
        // this.isBug ? this.$flash(i18n[error]) : ''
        
      }
    },
    
  }
};
</script>

<style lang="css" scoped>
  .item {
    display: inline-block;
  }

  .nav {
    padding: 10px;
  }

  .link {
    color: inherit;
    padding: 20px;
    display: block;
  }

  .tab-container1{
    background: red
  }

  .tab-container2{
    background: burlywood
  }

  .tab-container3{
    background: blueviolet
  }

  button{
    margin-top: 200px;
    width: 150px;
    height: 100px;
    margin-right: 40px;
  }

</style>
