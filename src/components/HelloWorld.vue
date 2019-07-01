

<script>
export default {
  name: "HelloWorld",
  props: {
    level: String,
    default: 1
  },
  render(h) {
    let self = this;
    return h(
      "h" + this.level,
      {
        class: {
          foo: true,
          bar: false
        },
        on: {
          click: function() {
            self.$emit("touch", 12344);
          }
        },

        style: {
          color: "red"
        },
        attrs: {
          id: "name"
        }
      },
      ["12323454", "我", h("div", "assdss")]
    );
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.box {
  height: 100px;
  width: 100px;
  background: red;
}
.ignore {
  height: 100px;
}
.flexContainer {
  display: flex;
  height: 500px;
}
[w-499-250] {
  background: #42b983;
  width: 499px;
}
[w-499-250] {
  aspect-ratio: "499:250";
}
[w-250-250] {
  background: beige;
  width: 250px;
}
[aspectratio] {
  position: relative;
}
[aspectratio]::before {
  content: "";
  display: block;
  width: 1px;
  margin-left: -1px;
  height: 0;
}
/*aspectratio-content存放内容，自由填满，利用伪元素::before和::after来撑开容器*/
[aspectratio-content] {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
@svg square {
  @rect {
    fill: var(--color, black);
    width: 100%;
    height: 100%;
  }
}

.hr {
  background: black svg(square param(--color #00b1ff));
}
</style>
