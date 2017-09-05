import jsonp from '../common/js/jsonp';
import {commonParams,options} from "./config";

export function getRecommend() {
  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg';
  //拷贝commonParams的数据
  const data = Object.assign({},commonParams,{
    platform : 'h5',
    uin : 0,
    needNewCode: 1,

  });
  return jsonp(url,data,options)
}
export function getDiscList() {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_first_yqq.fcg';
  //拷贝commonParams的数据
  const data = Object.assign({},commonParams,{
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    rnd:Math.random(),
    notice: 0,
    loginUin: 0,
    tpl: 'v12',
    page: 'other'
  });
  return jsonp(url,data,options)
}
