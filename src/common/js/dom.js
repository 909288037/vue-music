export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  //分成字符串数组
  let newClass = el.className.split(' ');
  //添加类名
  newClass.push(className);
  //把数组用空格隔开，返回的是字符串
  el.className = newClass.join(' ');
}

export function hasClass(el, className) {
  let reg = new RegExp('(^|\\s)' + className + '(\\s|$)')
  return reg.test(el.className)
}


export function getData(el, name, val) {
  const prefix = 'data-';
  name = prefix + name;
  if(val) {
    return el.setAttribute(name, val)
  }else {
    return el.getAttribute(name)
  }
}
