import Vue from 'vue';
import VueRouter from 'vue-router';

import './sass/main.scss';

import { HomeComponent } from './components/home';
import { NavbarComponent } from './components/navbar';
import { Snotify } from 'vue-snotify';

// register the plugin
Vue.use(VueRouter);
Vue.use(Snotify);

let router = new VueRouter({
  routes: [
    { path: '/', component: HomeComponent },
  ]
});

new Vue({
  el: '#app-main',
  router: router,
  components: {
    'navbar': NavbarComponent
  }
});
