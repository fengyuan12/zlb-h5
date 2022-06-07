import Vue from 'vue'
import {
  Empty,
  Dialog,
  Field,
  Form,
  Button,
  Picker,
  Popup,
  DatetimePicker,
  Toast
} from 'vant'
import 'vant/lib/index.css'

Vue.use(Dialog)
Vue.use(Empty)
Vue.use(Field)
Vue.use(Form)
Vue.use(Button)
Vue.use(Picker)
Vue.use(Popup)
Vue.use(DatetimePicker)
Vue.prototype.$Toast = Toast
