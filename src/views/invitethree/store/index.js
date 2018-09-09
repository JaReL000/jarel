import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)

const state = {
	alertToAppShowOrHide:false,//app分享显示
	alertLogShowOrHide: false,//有邀请记录弹框
	alertnoLogShowOrHide: false,//没有邀请记录弹框
	alertmesShowOrHide: false,//发短信弹框
	alertoldShowOrHide: false,//老用户弹框
	alertwxShowOrHide: false,//微信进入弹框
	alertwxShareShowOrHide: false,//微信分享弹框
	isApp: true//判断是否是app
}

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations,
})

















