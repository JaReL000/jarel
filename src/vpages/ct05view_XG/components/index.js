// import Share from  './share/'
import Hd from  './x-header'
// import DateSelect from './date-select';
// import Loading from './loading'
import Slide from './slide'
import Countdown from './countdown'
import Register from './register' // 注册
export default function install(Vue){
  Vue.component('hd',Hd);
  Vue.component(Slide.name,Slide);
  Vue.component(Countdown.name,Countdown);
  Vue.component(Register.name,Register);
}