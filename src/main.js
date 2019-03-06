import Vue from 'vue';
import App from './App.vue';
import { Indicator, Toast, Lazyload } from 'mint-ui';
import dayjs from 'dayjs';
import router from './router';
import store from './store/store';
import 'mint-ui/lib/style.css';
import './assets/style/common.css';
import './assets/style/loading.css';

Vue.prototype.$loading = Indicator;
Vue.prototype.$toast = Toast;
Vue.config.productionTip = false;

Vue.use(Lazyload);

Vue.filter('time', value => (
  dayjs(String(value).length <= 10 ? value * 1000 : value).format('YYYY-MM-DD HH:mm')
));

Vue.filter('getImgUrl', url => (
  url.replace(/http\w{0,1}:\/\//g, 'https://images.weserv.nl/?url=')
));

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
