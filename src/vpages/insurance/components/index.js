import Share from  './share/'
import Hd from  './x-header'
import DateSelect from './date-select';
import Slide from './slide'
import Loading from './loading'
export default function install(Vue){
  Vue.component(Share.name,Share);
  Vue.component('hd',Hd);
  Vue.component(Slide.name,Slide);
  Vue.component(Loading.name, Loading);
  DateSelect.install(Vue)
}