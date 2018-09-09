import {
	CHANGEalertReg,
	CHANGEalertFL
} from './mutation-types'

export default {
	[CHANGEalertReg](state,alertRegShowOrHide){
		state.alertRegShowOrHide=alertRegShowOrHide
	},
	[CHANGEalertFL](state,alertFLShowOrHide){
		state.alertFLShowOrHide=alertFLShowOrHide
	}
}

















