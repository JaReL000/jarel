/**
 * @desc webpack打包入口
 */

import classApi from './class/classApi'

import copyObj from './object/copyObj'

import isEmail from './regexp/isEmail'
import isIdCard from './regexp/isIdCard'
import isPhoneNum from './regexp/isPhoneNum'
import isUrl from './regexp/isUrl'
import priceSubstr from './regexp/priceSubstr'

import cookieApi from './cookie/cookie'
import scrollApi from './dom/scrollApi'

import localStorageApi from './stroge/localStorage'

import formatPassTime from './time/formatPassTime'
import formatTime from './time/formatTime'

import throttle from './function/throttle'
import debounce from './function/debounce'

import isWeixin from './device/isWeixin'
import mobileType from './device/mobileType'
import getOs from './device/getOs'

import typeOf from './type/typeOf'
import secretInfo from './secret/secretInfo'

import getUrlParams from './url/getUrlParams'
import stringfyQs from './url/stringfyQs'
import getRandom from './random/getRandom'
import shuffle from './collections/shuffle'
import arrayEqual from './array/arrayEqual'
import animationFrame from './animationFrame/animationFrame'
import prefixStyle from './prefixStyle/prefixStyle'

export default {
  classApi,
  copyObj,
  isEmail,
  isIdCard,
  isPhoneNum,
  isUrl,
  priceSubstr,
  cookieApi,
  scrollApi,
  getOs,
  localStorageApi,
  formatPassTime,
  formatTime,
  throttle,
  debounce,
  isWeixin,
  mobileType,
  typeOf,
  secretInfo,
  getUrlParams,
  stringfyQs,
  getRandom,
  shuffle,
  arrayEqual,
  animationFrame,
  prefixStyle
}
