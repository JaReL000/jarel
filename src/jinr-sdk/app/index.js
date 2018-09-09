/**
 * 鲸鱼APP交互方法
 *
 * 2018.2.1
 *
 */

import parameter from './parameter'

export default Object.assign(parameter,{
    // ...parameter,

    /**
     * 跳转到客服机器人咨询界面
     * @author 7175 1504
     */
    pushServiceRobot(){
      try {
        Jinr.pushServiceRobot()
      } catch (error) {
        // this.isBug ? this.$flash(i18n[error]) : ''
      }
    },

    /**
     * 关闭Web界面时调用的方法
     * @author 1154 1504
     */
    finish(){
      try {
        Jinr.finish()
        return true
      } catch (error) {

        // this.isBug ? Flash(i18n[error]) : ''
        return false
      }
    },
})

