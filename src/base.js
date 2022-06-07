
import '@/utils/rem'

import '@/utils/plug'

// components全部加载入全局避免重复调用
// import '@/components/global'


export default {
  install(Vue) {
    const EventBus = new Vue()

    Object.defineProperties(Vue.prototype, {
      $eventBus: {
        get: function() {
          return EventBus
        }
      }
    })
  }
}
