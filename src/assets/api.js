const api = {
  install(Vue) {
    // 添加全局方法
    Vue.createAPI = function(component, events, single) {
      if (typeof events === "boolean") {
        single = events;
        events = [];
      }
      const apiName = "$api" + capitalize(component.name);
      // 添加实例方法
      const api = creater.call(this, component, events, single);
      Vue.prototype[apiName] = api.create;
    };
  }
};

/**
 * api生成组件
 * @param {*} Component
 * @param {*} events
 * @param {*} single
 */
function creater(Component, events = [], single = false) {
  let Vue = this;
  let singleMap = {};
  let api = {
    create: function(config, _single) {
      const renderData = parseData(config, events);
      if (typeof _single === "undefined") {
        _single = single;
      }
      const ownerInstance = this;
      const ownerInsUid = ownerInstance._uid;
      const { comp, ins } = singleMap[ownerInsUid]
        ? singleMap[ownerInsUid]
        : {};
      if (_single && comp && ins) {
        // 更新renderData
        ins.updateRenderData(renderData);
        ins.$forceUpdate();
        return comp;
      }

      let component = null;
      component = createComponent(Vue, Component, renderData);
      const instance = component.$parent; // 取当前组件的父实例
      component.remove = function() {
        if (single) {
          if (!singleMap[ownerInsUid]) {
            return;
          }
          singleMap[ownerInsUid] = null;
        }
        instance.destroy();
      };
      const originShow = component.show;
      component.show = function() {
        originShow && originShow.call(this);
        return this;
      };

      const originHide = component.hide;
      component.hide = function() {
        originHide && originHide.call(this);
        return this;
      };

      if (single) {
        // 单例
        singleMap[ownerInsUid] = {
          comp: component,
          ins: instance
        };
      }
      return component;
    }
  };
  return api;
}
/**
 * 创建组件
 * @param {*} Vue
 * @param {*} Component
 * @param {*} data
 */
function createComponent(Vue, Component, data) {
  let renderData;
  const instance = new Vue({
    render(createElement) {
      return createElement(Component, {
        ...renderData
      });
    },
    methods: {
      init() {
        document.body.append(this.$el);
      },
      destroy() {
        this.$destroy();
        document.body.removeChild(this.$el);
      }
    }
  });
  instance.updateRenderData = function(data) {
    renderData = data;
  };
  instance.updateRenderData(data);
  instance.$mount();
  instance.init();
  // 组件是实例的子组件
  const component = instance.$children[0];
  return component;
}

/**
 * 解析事件和数据
 * @param {*} data  包含(props 和 event)
 * @param {*} events 监听的事件名称
 *  返回props 和 on 用于createElement 接收参数
 *  props是 组件的prop
 *  on 是 事件监听器
 */
function parseData(data = {}, events = {}) {
  events = parseEvents(events);
  const props = {
    ...data
  };
  const on = {};
  for (const name in events) {
    if (events.hasOwnProperty(name)) {
      const handlerName = events[name];
      if (props[handlerName]) {
        on[name] = props[handlerName];
        delete props[handlerName];
      }
    }
  }
  return {
    props,
    on
  };
}
/**
 * 事件名 变更
 * @param {*} events
 */
function parseEvents(events) {
  const parseEvents = {};
  events.forEach(name => {
    parseEvents[name] = `on${capitalize(name)}`;
  });
  return parseEvents;
}
/**
 * 首字母大写
 * @param {*} str
 */
function capitalize(str) {
  var lowStr = str.toLowerCase();
  return lowStr.slice(0, 1).toUpperCase() + lowStr.slice(1);
}

export default api;
