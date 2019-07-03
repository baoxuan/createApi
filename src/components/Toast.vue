<template>
  <transition name="toast-fade">
    <div class="container"
         v-show='isVisible'>
      <span class="content"
            v-if="content">
        {{content}}
      </span>
    </div>
  </transition>

</template>

<script>
export default {
  name: "toast",
  props: {
    isMask: {
      type: Boolean,
      default: false
    },
    content: {
      type: String,
      default: "xxxxxx"
    },
    time: {
      type: Number,
      default: 1500
    }
  },
  data() {
    return {
      isVisible: false
    };
  },
  methods: {
    hide() {
      this.isVisible = false;
      this.clearTimer();
    },
    clearTimer() {
      clearTimeout(this.timer);
      this.timer = null;
    },
    show() {
      this.isVisible = true;
      this.$nextTick(() => {
        this.clearTimer();
        if (this.time !== 0) {
          this.timer = setTimeout(() => {
            this.hide();
            this.$emit("timeout");
          }, this.time);
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" >
.popMask {
  position: fixed;
  z-index: 998;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: rgb(37, 38, 45);
  opacity: 0.8;
  z-index: 998;
}

.container {
  position: fixed;
  top: 40%;
  width: 100%;
  text-align: center;
  .content {
    border-radius: 10px;
    color: #fff;
    z-index: 999;
    padding: 10px 15px;
    font-size: 15px;
    background: rgba(0, 0, 0, 0.8);
  }
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: all 0.5s ease-out;
}

.toast-fade-enter {
  opacity: 0;
}

.toast-fade-leave-to {
  opacity: 0;
}
</style>
