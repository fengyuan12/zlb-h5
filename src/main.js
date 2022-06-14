import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import _ from 'lodash'

// 引入vue全局方法
import base from './base.js'
Vue.use(base)
Vue.prototype.$_ = _
Vue.prototype.$EventBus = new Vue()
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
