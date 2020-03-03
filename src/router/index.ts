import Vue from 'vue';
import VueRouter from 'vue-router';
import Designer from '../views/Designer.vue';
import Preview from '../views/Preview.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Designer,
  },
  {
    path: '/preview',
    name: 'preview',
    component: Preview,
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
