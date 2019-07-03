<template>
  <div id="app">
    <img alt="Vue logo"
         src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"
                level=1
                @touch='touch' />
    <button @click="show">测试show</button>
    <button @click="show1">测试show1</button>
    <button @click="remove">测试remove</button>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
export default {
  name: "app",
  components: {
    HelloWorld
  },
  methods: {
    touch() {
      this.dialog1 = this.$apidialog({
        title: "我是 title",
        content: "我是 内容",
        ontest: a => {
          console.log(a);
        },
        onshow: () => {
          console.log("show");
        }
      });
      this.dialog1.show();
    },
    show() {
      this.$apiToast({
        content: "我是toast",
        ontimeout: () => {
          console.log("timeout");
        }
      }).show();
    },
    show1() {
      this.$apiToast({
        content: "我是toast1",
        ontimeout: () => {
          console.log("timeout");
        }
      }).show();
    },
    remove() {
      this.dialog1.remove();
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
