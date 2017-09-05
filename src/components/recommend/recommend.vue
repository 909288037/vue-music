<template>
        <div class="recommend">
          <scroll ref="scroll" class="recommend-content" :data="discList">
            <div>
              <div  class="swiper-container" id="slide">
                <div class="swiper-wrapper">
                  <div class="swiper-slide" v-for="str in recommends">
                    <a :href="str.linkUrl">
                      <img  @load="loadImage" :src="str.picUrl" alt="">
                    </a>
                  </div>
                </div>
                <div class="swiper-pagination"></div>
              </div>
              <div class="recommend-list">
                <h1 class="list-title">热门歌单推荐</h1>
                <ul>
                  <li v-for="item in discList" class="item">
                    <div class="icon">
                      <img  width="60" height="60" v-lazy="item.imgurl" alt="">
                    </div>
                    <div class="text">
                      <h2 class="name">{{item.dissname}}</h2>
                      <p class="desc">{{item.author}}</p>
                      <p class="desc">播放量:{{(item.listennum / 10000).toFixed(1)}}万</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div class="loading-container" v-show="!discList.length">
              <loading></loading>
            </div>
          </scroll>
        </div>
</template>

<script>
  import Swiper from 'swiper';
  import 'swiper/dist/css/swiper.min.css';
  import Scroll from '../../base/scroll/scroll';
  import Loading from '../../base/loading/loading';
  import {getRecommend,getDiscList} from '../../api/recommend';
  import {ERR_ok} from '../../api/config';
  export default {
      data() {
        return {
          recommends : [],
          discList : [],
        }
      },
      created() {
        this._getRecommend();
        this._getDiscList();
      },
      methods: {
        _getRecommend() {
          getRecommend().then((res) => {
            if (res.code === ERR_ok) {
              this.recommends = res.data.slider;
//              console.log(res.data.slider);
              this.$nextTick(function () {
                this._silder();
              })
            }
          })
        },
        _getDiscList() {
          getDiscList().then((res) => {
            if (res.code === ERR_ok) {
              console.log(res.data.hotdiss.list);
              this.discList = res.data.hotdiss.list
            }
          })
        },
//        防止轮播图后加载导致滑不到底部
        loadImage() {
          if(!this.checkLoaded) {
            this.$refs.scroll.refresh();
            this.checkLoaded = true;
          }
        },
        _silder() {
          var mySwiper = new Swiper('#slide', {
            autoplay: 3000,
            loop: true,
            autoplayDisableOnInteraction : false,//是否禁止auto
            pagination: '.swiper-pagination',
            slidesPerView: 1,
            paginationClickable: true,
            centeredSlides: true,
            observer:true,//修改swiper自己或子元素时，自动初始化swiper
            observeParents:true,//修改swiper的父元素时，自动初始化swiper
          });
        },

      },
      components : {
        Scroll,
        Loading
      }
    }
</script>

<style lang="less">
  @import "../../common/less/variable";
  @import "../../common/less/mixin";
  .recommend {
    position: fixed;
    width: 100%;
    top: 88px;
    bottom: 0;
    .recommend-content {
      height: 100%;
      overflow: hidden;
      .swiper-container {
        width: 100%;
        .swiper-wrapper {
          width: 100%;
          height: 100%;
        }
        .swiper-slide {
          background-position: center;
          background-size: cover;
          width: 100%;
          height: 100%;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .swiper-pagination-bullet-active {
          width: 20px;
          border-radius: 5px;
          background-color: hsla(0,0%,100%,.5);
        }
      }
      .recommend-list {
        .list-title {
          height: 65px;
          line-height: 65px;
          text-align: center;
          font-size: @font-size-medium;
          color: @color-theme;
        }
        .item {
          display: flex;
          box-sizing: border-box;
          align-items: center;
          padding: 0 20px 20px;
          .icon {
            flex: 0 0 60px;
            width: 60px;
            padding-right: 20px;
          }
          .text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex: 1;
            line-height: 20px;
            overflow: hidden;
            font-size: @font-size-medium;
            .name {
              margin-bottom: 10px;
              color: @color-text;
              .no-wrap();
            }
            .desc {
              color: @color-text-d;
            }
          }
        }
      }
      .loading-container {
        position: absolute;
        width: 100%;
        top: 50%;
        transform: translateY(-50%);
      }
    }
  }
</style>
