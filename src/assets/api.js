const api = {
  install(Vue) {
    Vue.createAPI = function(component, event) {
      // console.log("api");
      const apiName = "$api" + component.name.toLowerCase();

      Vue.prototype[apiName] = function(component, renderData, event) {
        const instance = new Vue({
          render(createElement) {
            return createElement(component, {
              props: renderData,
              on: event
            });
          }
        });
        instance.$mount(document.createElement("div"));
        document.body.append(instance.$el);
      };
    };
  }
};

export default api;
