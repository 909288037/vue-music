<template>
  <div class="m-header">
    <div class="icon"></div>
    <h1 class="text">Chicken Music</h1>
    <!--<router-link tag="div" class="mine" to="/user">-->
      <!--<i class="icon-mine"></i>-->
    <!--</router-link>-->
  </div>
</template>

<script>
    export default {}
</script>

<style lang="less">
  @import "../../common/less/mixin";
  @import "../../common/less/variable";
  .m-header{
    position: relative;
    height: 44px;
    color: @color-theme;
    font-size: 0;
    text-align: center;
    .icon {
      display: inline-block;
      vertical-align: top;
      margin-top: 6px;
      width: 30px;
      height: 32px;
      margin-right: 9px;
      .bg-image('logo');
      background-size: 30px 32px;
    }
    .text {
      display: inline-block;
      vertical-align: top;
      line-height: 44px;
      font-size: @font-size-large;
    }
  }
</style>
