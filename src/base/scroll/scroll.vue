<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from "better-scroll";
    export default {
      props: {
        probeType: {
          type: Number,
          default: 1
        },
        click: {
          type: Boolean,
          default: true
        },
        data: {
          type: Array,
          default: null
        }
      },
      mounted() {
        setTimeout(() => {
          this._initScroll()
        },20)
      },
      methods: {
        _initScroll() {
          if(!this.$refs.wrapper) {
            return
          }
          this.scroll = new BScroll(this.$refs.wrapper,{
            probeType: this.probeType,
            click: this.click
          })
        },
//        启用better-scroll
        enable() {
          this.scroll && this.scroll.enable()
        },
//        禁用better-scroll
        disable() {
          this.scroll && this.scroll.disable()
        },
//        重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
        refresh() {
          this.scroll && this.scroll.refresh()
        },
      },
      watch : {
        data() {
          setTimeout(() => {
            this.refresh()
          },20)
        }
      }
    }
</script>

<style lang="less">

</style>
