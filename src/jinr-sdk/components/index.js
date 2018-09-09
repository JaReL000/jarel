/*
 |--------------------------------------------------------------------------
 | 鲸鱼SDK组件
 |--------------------------------------------------------------------------
 |
 |  Created by ZIHUA on 2018/2/23.
 */


import PaletteButton from './palette-button'
import TabContainerItem from './tab-container-item';
import TabContainer from './tab-container';

// 鲸鱼组件版本
const version = require('../package.json').version
const install = function(Vue, config = {}) {
  
  if (install.installed) return;

  Vue.component(PaletteButton.name, PaletteButton);

  Vue.component(TabContainerItem.name, TabContainerItem);
  Vue.component(TabContainer.name, TabContainer);

}

// auto install
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

export {
  install,

  PaletteButton,

  TabContainerItem,
  TabContainer,
}

export default {
  install,
  version
}
