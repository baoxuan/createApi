<template>
  <div id="app">
    <img alt="Vue logo"
         src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"
                level=1
                @touch='touch' />
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld.vue";
import Dialog from "./components/Dialog/Dialog.vue";
export default {
  name: "app",
  components: {
    HelloWorld
  },
  mounted() {},
  methods: {
    touch() {
      this.$api(
        Dialog,
        { title: "我是 title", content: "我是 内容" },
        {
          test: function(a) {
            alert(a);
          }
        }
      );
      // this.$createDialog({
      //   conent: "111",
      //   onTest: () => {
      //     alert(1);
      //   }
      // });
      // this.$global();
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
