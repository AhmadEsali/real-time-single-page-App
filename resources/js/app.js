import Vue from 'vue';
import Vuetify from 'vuetify';
import VueSimplemde from 'vue-simplemde';
import md from 'marked';
import User from './helpers/User';
import Exception from './helpers/Exception';

import router from './Router/router.js';

require('./bootstrap');

window.Vue = require('vue');

window.md = md;
Vue.use(Vuetify);
window.User = User;
window.Exception = Exception;
window.EventBus = new Vue();

Vue.component('app-home', require('./components/AppHome.vue').default);

Vue.component('vue-simplemde', VueSimplemde);

const app = new Vue({
  el: '#app',
  router,
});
