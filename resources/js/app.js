import Vue from "vue";
import Vuetify from "vuetify";
import User from "./helpers/User";
import router from "./Router/router.js";

require("./bootstrap");

window.Vue = require("vue");

Vue.use(Vuetify);
window.User = User;

window.EventBus = new Vue();

Vue.component("app-home", require("./components/AppHome.vue").default);

const app = new Vue({
  el: "#app",
  router
});
