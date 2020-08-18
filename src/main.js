import Vue from "vue";
import App from "./App.vue";
import store from "./store/store.js";
import style from "./assets/style.scss";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  store,
  style
}).$mount("#app");
