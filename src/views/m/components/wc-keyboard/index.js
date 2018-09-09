import Vue from 'vue'

import WcKeyboard from './keyboard-input'

import './fonts/iconfont.css'

export default {
	install (Vue, options = {}) {
		Vue.component(WcKeyboard.name, WcKeyboard);
	}
}