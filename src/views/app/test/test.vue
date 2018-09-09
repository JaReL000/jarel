<template>
  <div class="fixed">
    <!-- 通过拆解v-model语法糖实现双向传递 -->
    <ly-tab :value="selected" @input="changeSelected" activeColor="#1d98bd">
      <ly-tab-item v-for="(item, index) in tabList" :key="index">
        {{item.itemName}}
        </ly-tab-item>
    </ly-tab>
    <!-- 
      @mouseenter="enter" 
      @mouseleave="leave"  
    -->
    <div 
      :style="style"
      @touchstart="touchStart" 
      @touchmove="touchMove" 
      @touchend="touchEnd"
    >
      <h3>请选择移动端调试模式或者真机调试</h3>
      <h3>请选择移动端调试模式或者真机调试</h3>
      <h3>请选择移动端调试模式或者真机调试</h3>
    </div>
    
    <!-- 通过绑定‘fixBottom’实现固定在底部的tab -->
    <ly-tab v-model="selectedFixed" fixBottom>
      <ly-tab-item 
        v-for="(item, index) in fixedList" 
        :key="index"
      >
        <span slot="icon" v-text="item.icon"></span>
        {{item.itemName}}
      </ly-tab-item>
    </ly-tab>
  </div>
</template>

<script>
import LyTab from '@/jinr-sdk/components/tab/src/tab'
import LyTabItem from '@/jinr-sdk/components/tab/src/tab-item'

export default {
  name: 'Demo',
  components: {
    LyTab,
    LyTabItem
  },
  data () {
    return {
      selected: 0, // 自定义的变量用于存放当前选中的tab的索引值
      selectedFixed: 0,
      tabList: [
        {itemName: '活期'},
        {itemName: '月定期'},
        {itemName: '季定期'},
        {itemName: '年定期'},
        {itemName: '保险箱'},
        {itemName: '日增息'},
        {itemName: '周周盈'},
      ],
      fixedList: [
        {itemName: '首页', icon: 'icon1'},
        {itemName: '沸点', icon: 'icon2'},
        {itemName: '发现', icon: 'icon3'},
        {itemName: '我', icon: 'icon4'},
        {itemName: '我2', icon: 'icon4'},
        {itemName: '我3', icon: 'icon4'},
        {itemName: '我3', icon: 'icon4'},
        {itemName: '我3', icon: 'icon4'},
        {itemName: '我3', icon: 'icon4'},
        {itemName: '我3', icon: 'icon4'},
        {itemName: '我3', icon: 'icon4'},
        {itemName: '我3', icon: 'icon4'},
      ],
      translateY: 0,
    }
  },
  computed: {
    style () {
      return {
        transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        // transitionDuration: `${this.transitionDuration}ms`,
        transform: `translate3d(0px, ${this.translateY}px, 0px)`
      }
    },
  },
  methods: {
    changeSelected (id) {
      this.selected = id
    },

    enter(e){
      console.log('enter ', e);
      
    },
    leave(e){
      console.log('leave ', e);
      
    },
    touchStart(e){
      // console.log('touchStart ', e);
      
    },
    touchMove(e){
      console.log('touchMove ', e);
      if(this.translateY < 70){
        let direction_arc = Math.PI * (3 + Math.max(['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l'].indexOf('t'), 0)) / 4;
        this.translateY = this.translateY + direction_arc*0.5
        console.log(this.translateY);
        
      }
      
      
      
    },
    touchEnd(e){
      // console.log('touchEnd ', e);
      this.translateY = 0
    },

  }
}
</script>

<style>

</style>
