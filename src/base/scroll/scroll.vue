<template>
  <div ref="wrapper">
    <slot></slot>
  </div>
</template>

<script>
  import BScroll from "better-scroll";
    export default {
      props: {
//        滑动触发参数
        probeType: {
          type: Number,
          default: 1
        },
//        点击参数
        click: {
          type: Boolean,
          default: true
        },
//        数据
        data: {
          type: Array,
          default: null
        },
//        是否监听滚动
        listenScroll : {
          type : Boolean,
          default: false
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
          });
          if (this.listenScroll) {
            let me = this;
            this.scroll.on('scroll',(pos) => {
              me.$emit('scroll',pos)
            })
          }
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
        scrollTo() {
          this.scroll && this.scroll.scrollTo.apply(this.scroll,arguments);
        },
        scrollToElement() {
          this.scroll && this.scroll.scrollToElement.apply(this.scroll,arguments);
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
