import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from './api/http'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    loading: "https://2url.cc/1OwrB",
});
Vue.prototype.$http = axios
Vue.config.productionTip = false
// const eventBus = new Vue();
// Vue.prototype.$event = eventBus;
let jwt=localStorage.getItem('jwt');
if(jwt){
  store.commit('setJwt', jwt)
}
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
