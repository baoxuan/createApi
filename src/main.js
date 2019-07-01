import Vue from "vue";
import App from "./App.vue";
// import CreateAPI from "vue-create-api";
import api from "./assets/api";
Vue.config.productionTip = false;
// Vue.use(CreateAPI);
Vue.use(api);
// import Dialog from "./components/Dialog/Dialog.vue";
// Vue.createAPI(Dialog, ["test"], true);
Vue.createAPI();
import GlobalDialog from "./components/GlobalDiglog";
Vue.use(GlobalDialog, {
  title: "我是标题",
  content: "我是内容"
});
new Vue({
  render: h => h(App)
}).$mount("#app");
