import Vue from 'vue'
import App from './App.vue'
import cmsComponents from 'vue-cms-components'

Vue.config.productionTip = false
console.log(cmsComponents);
Vue.use(cmsComponents);
new Vue({
  render: h => h(App),
}).$mount('#app')
