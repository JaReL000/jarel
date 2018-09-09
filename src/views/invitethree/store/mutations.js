import {
	CHANGEalertShareApp,
	CHANGEalertLog,
	CHANGEalertnoLog,
	CHANGEalertmes,
	CHANGEalertold,
	CHANGEalertwx,
	CHANGEalertwxShare,
	CHANGEIsApp
} from './mutation-types'

export default {
	[CHANGEalertShareApp](state,alertToAppShowOrHide){
		state.alertToAppShowOrHide=alertToAppShowOrHide
	},
	[CHANGEalertLog](state,alertLogShowOrHide){
		state.alertLogShowOrHide=alertLogShowOrHide
	},
	[CHANGEalertnoLog](state,alertnoLogShowOrHide){
		state.alertnoLogShowOrHide=alertnoLogShowOrHide
	},
	[CHANGEalertmes](state,alertmesShowOrHide){
		state.alertmesShowOrHide=alertmesShowOrHide
	},
	[CHANGEalertold](state,alertoldShowOrHide){
		state.alertoldShowOrHide=alertoldShowOrHide
	},
	[CHANGEalertwx](state,alertwxShowOrHide){
		state.alertwxShowOrHide=alertwxShowOrHide
	},
	[CHANGEalertwxShare](state,alertwxShareShowOrHide){
		state.alertwxShareShowOrHide=alertwxShareShowOrHide
	},
	[CHANGEIsApp](state,isApp){
		state.isApp=isApp
	}
}

















