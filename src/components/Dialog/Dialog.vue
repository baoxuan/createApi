<template>
  <div class='dialog'
       v-show='isVisible'>
    <h3>{{title}}</h3>
    <p>{{content}}</p>
    <button @click="test">点击事件</button>
  </div>
</template>
<script>
export default {
  name: "Dialog",
  props: {
    title: {
      type: String,
      default: "标题"
    },
    content: {
      type: String,
      default: "内容"
    }
  },
  data: function() {
    return {
      isVisible: false
    };
  },
  methods: {
    test() {
      this.$emit("test", "1234");
    },
    show() {
      this.isVisible = true;
      this.$emit("show");
    },
    hide() {
      this.isVisible = false;
      this.$emit("hide");
    }
  }
};
</script>
