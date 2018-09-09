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
	}
}

















