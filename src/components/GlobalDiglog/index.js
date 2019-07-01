import GlobalDiglog from "./GlobalDiglog.vue";

const Global = {
  install(Vue) {
    const Diglog = Vue.extend(GlobalDiglog);
    let dig = new Diglog();
    dig.$mount(document.createElement("div"));
    Vue.prototype.$global = function() {
      document.body.append(dig.$el);
    };
  }
};
export default Global;
