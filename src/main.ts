import Vue from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import store from './store';
import VModal from 'vue-js-modal';
import '@/assets/css/tailwind.css';

Vue.config.productionTip = false;
Vue.use(VModal, { dynamic: true, injectModalsContainer: true });

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
