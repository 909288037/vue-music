<template>
<div class="singer">
  <list-view :data="singers"></list-view>
</div>
</template>

<script>
  import {getSingerList} from "../../api/singer";
  import {ERR_ok} from "../../api/config";
  import index from "../../router/index";
  import Singer from "../../common/js/singer";
  import listView from "../../base/listview/listview";
    const HOT_NAME = '热门';
    const HOT_SINGER_LEN = 10;
  export default {
      data() {
        return {
          singers: []
        }
      },
      created() {
        this._getSingerList();
      },
      methods: {
        _getSingerList() {
          getSingerList().then((res) => {
            if (res.code === ERR_ok) {
              this.singers = this._normalizeSinger(res.data.list);
              console.log(this.singers);
            }
          })
        },
        _normalizeSinger(list) {
          let map = {
            hot: {
              title: HOT_NAME,
              items: []
            }
          }
          list.forEach((item,index) => {
//            获取前10当热门
            if (index < HOT_SINGER_LEN) {
              map.hot.items.push(new Singer({
                id : item.Fsinger_mid,
                name : item.Fsinger_name
              }))
            }
            // 名字开头字母
            const key = item.Findex;
            if (!map[key]) {
              map[key] = {
                title: key,
                items: []
              }
            }
            map[key].items.push(new Singer({
              id : item.Fsinger_mid,
              name : item.Fsinger_name
            }))
          });
          // 有序排序列表
          let hot = [];
          let ret = [];
          for (let key in map) {
            let val = map[key];
            // 如果是a-z就添加到ret,否则添加到hot
            if (val.title.match(/[a-zA-Z]/)) {
              ret.push(val);
            } else if (val.title === HOT_NAME) {
              hot.push(val);
            }
          }
          // 使用sort排序
          ret.sort((a,b) => {
            return a.title.charCodeAt(0) - b.title.charCodeAt(0);
          });
          return hot.concat(ret);
        }
      },
      components : {
        listView
      }
    }
</script>

<style lang="less">
.singer {
  position: fixed;
  top: 88px;
  bottom: 0;
  width: 100%;
}
</style>
