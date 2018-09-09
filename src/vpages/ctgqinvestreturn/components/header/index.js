/**
 * Created by ZIHUA on 2017/12/25.
 */


import HeaderComponent from './header.vue'

const Header={
  install: function (Vue) {
    Vue.component('jinr-header', HeaderComponent)
  }
}
export default Header