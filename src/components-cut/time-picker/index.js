import Picker from '../picker/picker.vue'
import TimePicker from '../time-picker/time-picker.vue'
import addTimePicker from './api'
import addPicker from '../picker/api'

TimePicker.install = function (Vue) {
  Vue.component(Picker.name, Picker)
  Vue.component(TimePicker.name, TimePicker)
  addPicker(Vue, Picker)
  addTimePicker(Vue, TimePicker)
}

TimePicker.Picker = Picker

export default TimePicker
