import Vue from "vue";
import App from "./App.vue";
import api from "./assets/api";
import Toast from "./components/Toast";
import Dialog from "./components/Dialog/Dialog";

Vue.use(api);

Vue.createAPI(Dialog, ["test", "show"], true);
Vue.createAPI(Toast, ["timeout"], true);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");
