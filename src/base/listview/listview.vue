<template>
  <scroll class="listview"
          :data="data"
          :listenScroll="listenScroll"
          ref="listView"
          @scroll="scroll"
          :probeType="probeType"
  >
    <ul>
      <li v-for="group in data" class="list-group" ref="listGroup">
        <h2 class="list-group-title">{{group.title}}</h2>
        <ul>
          <li v-for="item in group.items" class="list-group-item">
            <img class="avatar" v-lazy="item.avatar" alt="">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-shortcut" @touchstart.stop.prevent="onShortcutTouchStrat" @touchmove.stop.prevent="onShortcutTouchMove">
      <ul>
        <li v-for="(item,index) in shortcutList" class="item"
            :data-index="index" :class="{current : currentIndex == index}">{{item}}</li>
      </ul>
    </div>
    <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <div class="fixed-title">{{fixedTitle}} </div>
    </div>
    <div v-show="!data.length" class="loading-container">
      <loading></loading>
    </div>
  </scroll>
</template>

<script>
  import Scroll from '../scroll/scroll';
  import {getData} from '../../common/js/dom';
  import Loading from "../../base/loading/loading"
  const ANCHOR_HEIGHT = 18;
  const TITLE_HEIGHT = 30;
  export default {
      created() {
        this.touch = {};
        this.listenScroll = true;
        this.listHeight = [];
        this.probeType = 3;

      },
    data() {
      return {
        scrollY: -1,
        currentIndex: 0,
        diff: -1
      }
    },
      props: {
        data: {
          type: Array,
          default: []
        }
      },
      computed : {
        shortcutList () {
          // map方法创建一个新数组 回调函数遍历数组
          return this.data.map((group) => {
//            返回第一个字
            return group.title.slice(0,1)
          })
        },
        fixedTitle() {
          if (this.scrollY > 0){
            return '';
          }
//          返回当前索引对应的title属性
          return this.data[this.currentIndex] ? this.data[this.currentIndex].title : '';
        }
      },
      methods : {
        onShortcutTouchStrat(e) {
          //获取点击的索引
          let anchorIndex = getData(e.target,'index');
//          let anchorIndex = e.target.getAttribute("data-index");
//          获取点击时候的位子属性
          let firstTouch = e.touches[0];
//          console.log(firstTouch);
//          获取点击的位子
          this.touch.y1 = firstTouch.pageY;
//          添加索引
          this.touch.anchorIndex = anchorIndex;
//          滚动方法
          this._scrollTo(anchorIndex);
        },
        onShortcutTouchMove(e) {
//          获取滑动时的属性
          let firstTouch = e.touches[0];
//          console.log(firstTouch);
//          滑动的位子
          this.touch.y2 = firstTouch.pageY;
//          滑动的位子 - 点击时候的位子 除以li的高度或0 得到滑动停留的li的索引
          let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0;
//          点击的索引加上滑动停留的索引得到实际停留的位子
          let anchorIndex = this.touch.anchorIndex*1 + delta;
//          滚动到索引位置
          this._scrollTo(anchorIndex);
        },
        refresh() {
          this.$refs.listview.refresh()
        },
//        获取点击的位置
        scroll(pos) {
          this.scrollY = pos.y
        },
        _scrollTo(index) {
          if (!index && index !== 0) {
            return;
          }
          if (index < 0) {
            index = 0;
          } else if(index > this.listHeight.length -2) {
            index = this.listHeight.length - 2;
          }
          this.scrollY = -this.listHeight[index];
//          调用scrollToElement方法，参数一滚动的位子，参数2 过度动画时间
          this.$refs.listView.scrollToElement(this.$refs.listGroup[index],50);
        },
        _calculateHeight() {
          this.listHeight = [];
//          获取li的标签
          const list = this.$refs.listGroup;
          let height = 0;
          this.listHeight.push(height);
//          遍历li
          for (let i =0; i < list.length; i++) {
            let item = list[i];
//            添加每个li的高度
            height += item.clientHeight;
            this.listHeight.push(height);
          }
        }
      },
    watch: {
        data() {
          setTimeout(() => {
            this._calculateHeight()
          },20)
        },
//      监视滚动位子
      scrollY(newY) {
        const listHeight = this.listHeight;
        if (newY >0) {
          this.currentIndex = 0;
          return;
        }
//        遍历li高度，判断索引位子
        for (let i=0;i<listHeight.length-1; i++) {
          let height1 = listHeight[i];
          let height2 = listHeight[i + 1];
          if  (-newY >= height1 && -newY < height2) {
            this.currentIndex = i;
            this.diff = height2 + newY;
            return
          }
        }
        // 当滚动到底部，且-newY大于最后一个元素的上限
        this.currentIndex = listHeight.length - 2;
      },
      diff(newVal) {
        let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0;
        if (this.fixedTop === fixedTop) {
          return;
        }
        this.fixedTop = fixedTop;
        this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`;
      }
    },
      components: {
        Scroll,
        Loading
      }
    }
</script>

<style lang="less">
  @import "../../common/less/variable";
 .listview {
   position: relative;
   width: 100%;
   height: 100%;
   overflow: hidden;
   background: @color-background;
   .list-group {
     padding-bottom: 30px;
     .list-group-title {
       height: 30px;
       line-height: 30px;
       padding-left: 20px;
       font-size: @font-size-small;
       color: @color-text-l;
       background: @color-highlight-background;
     }
     .list-group-item {
       display: flex;
       align-items: center;
       padding: 20px 0 0 30px;
       .avatar {
         width: 50px;
         height: 50px;
         border-radius: 50%;
       }
       .name {
         margin-left: 20px;
         color: @color-text-l;
         font-size: @font-size-medium;
       }
     }
   }
   .list-shortcut {
     position: absolute;
     z-index: 30;
     right: 0;
     top: 50%;
     transform: translateY(-50%);
     width: 20px;
     padding: 20px 0;
     -webkit-border-radius: 10px;
     -moz-border-radius: 10px;
     border-radius: 10px;
     text-align: center;
     background: @color-background-d;
     .item {
       padding: 3px;
       line-height: 1;
       color: @color-text-l;
       font-size: @font-size-small;
       &.current {
         color: @color-theme;
       }
     }
   }
   .list-fixed {
     position: absolute;
     top: -1px;
     left: 0;
     width: 100%;
     .fixed-title {
       height: 30px;
       line-height: 30px;
       padding-left: 20px;
       font-size: @font-size-small;
       color: @color-text-l;
       background: @color-highlight-background;
     }
   }
   .loading-container {
     position: absolute;
     width: 100%;
     top: 50%;
     transform: translateY(-50%);
   }
 }
</style>
