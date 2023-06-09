import Vue from 'vue'
import App from './App.vue'
import router from './router'
Vue.config.productionTip = false
import HomeNavs from './pages/Home/Home_Nav/HomeNavs.vue'
Vue.component('HomeNavs',HomeNavs);
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
