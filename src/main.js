import Vue from 'vue'
import App from './App.vue'

import store from './store'
import router from './router'

import modal from './plugins/modalWindow'
Vue.use(modal)


Vue.config.productionTip = false



new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
  
