import createAPI from 'utils/helpers/create-api'

export default function addTimePicker (Vue, TimePicker) {
  createAPI(Vue, TimePicker, ['select', 'cancel', 'change'])
}
