/*
 |--------------------------------------------------------------------------
 | 鲸鱼组件
 |--------------------------------------------------------------------------
 |
 |  Created by ZIHUA on 2017/7/21.
 */

import MessageBox from './message-box'
import Popup from './popup-vant'
import Flash from './flash'
import Scrool from './scroll'
// import Requesting from './requesting' 
// import Indicator from './indicator' // 加载中请求
import Loading from './loading' // 加载中请求
import SeamlessScroll from './seamless-scroll' // 无缝滚动


import Cell from './cell'
import CellGroup from './cell-group'
import CellSwipe from './cell-swipe'

import Field from './field' 
import Area from './area' 
import Picker from './picker' 

import AddressEdit from './address-edit';
import AddressList from './address-list';

import Col from './col'
import Row from './row'

import Button from './button'
import Loadmore2 from './loadmore2'
import Switch from './switch'

import {
  Swiper,
  SwiperItem
} from './swiper'

import {
  Tab,
  TabItem
} from './tab'


// 鲸鱼组件版本
const version = '0.0.1'
const install = function(Vue, config = {}) {
  
  if (install.installed) return;

  Vue.component(Popup.name, Popup);
  Vue.component(Scrool.name, Scrool);
  Vue.component(Loadmore2.name, Loadmore2); 
  Vue.component(SeamlessScroll.name, SeamlessScroll); 

  Vue.component(Cell.name, Cell);
  Vue.component(CellGroup.name, CellGroup);
  Vue.component(CellSwipe.name, CellSwipe);
  Vue.component(Field.name, Field);
  Vue.component(Area.name, Area);
  Vue.component(Picker.name, Picker); 
  
  Vue.component(AddressEdit.name, AddressEdit);
  Vue.component(AddressList.name, AddressList);

  Vue.component(Col.name, Col);
  Vue.component(Row.name, Row); 
  Vue.component(Button.name, Button);

  Vue.component(Switch.name, Switch);

  Vue.component(Swiper.name, Swiper);
  Vue.component(SwiperItem.name, SwiperItem);

  Vue.component(Tab.name, Tab);
  Vue.component(TabItem.name, TabItem);

  Vue.$messagebox = Vue.prototype.$messagebox = MessageBox;
  Vue.$flash = Vue.prototype.$flash = Flash;
  // Vue.$indicator = Vue.prototype.$indicator = Indicator;
  Vue.$loading = Vue.prototype.$loading = Loading;
}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

export {
  install,
  MessageBox,
  Popup,
  Flash,
  Scrool,
  Cell,
  CellGroup,
  CellSwipe,
  Col,
  Row,
  Button,
  // Indicator,
  Loading,

  Field,
  Area,
  Picker,

  AddressEdit,
  AddressList,

  Tab,
  TabItem,

  Switch,

  Swiper,
  SwiperItem,

  Loadmore2,
  SeamlessScroll,

}

export default {
  install,
  version
}
