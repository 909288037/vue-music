//1.导入jsonp组件
import originJSONP from 'jsonp';
//2. 创建一个jsonp函数
export default function jsonp(url,data,option) {
  //拼接url,如果有?就添加&否则添加?，param(data)为对URL进行编码和数据拼接
  url += (url.indexOf('?') < 0 ? '?' : '&') + param(data);
  return new Promise((resolve,reject) => {
    originJSONP(url,option,(err,data) => {
      if (!err) {
        resolve(data)
      } else {
        reject(err)
      }
    })
  })
}

function param(data) {
  let url = '';
  for (var k in data) {
    //判断data里的key是否有数据
    let value = data[k] !== undefined ? data[k] : '';
    //对url进行编码
    url += `&${k}=${encodeURIComponent(value)}`
  }
  // 从第一个开始
  return url ? url.substring(1) : '';
}
