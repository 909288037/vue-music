// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'
Vue.config.productionTip = false;

//消除点击延迟
fastclick.attach(document.body);

Vue.use(VueLazyLoad,{
  loading : require('./common/image/default.png'),
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App),
})
