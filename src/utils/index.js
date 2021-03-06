export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function (...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}
// 根据某个属性值从MenuList查找拥有该属性值的menuItem
export function getMenuItemInMenuListByProperty(menuList, key, value) {
  let stack = [];
  stack = stack.concat(menuList);
  let res;
  while (stack.length) {
    let cur = stack.shift();
    if (cur.children && cur.children.length > 0) {
      stack = cur.children.concat(stack);
    }
    if (value === cur[key]) {
      res = cur;
    }
  }
  return res;
}

/**
 * @description 将时间戳转换为年-月-日-时-分-秒格式
 * @param {String} timestamp
 * @returns {String} 年-月-日-时-分-秒
 */

export function timestampToTime(timestamp) {
  var date = new Date(timestamp);
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  var D = (date.getDate() < 10 ? '0'+date.getDate() : date.getDate()) + ' ';
  var h = (date.getHours() < 10 ? '0'+date.getHours() : date.getHours()) + ':';
  var m = (date.getMinutes() < 10 ? '0'+date.getMinutes() : date.getMinutes()) + ':';
  var s = (date.getSeconds() < 10 ? '0'+date.getSeconds() : date.getSeconds());
  
  let strDate = Y+M+D+h+m+s;
  return strDate;
}

// 获取地址栏的参数
export const getQueryString = name => {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
  var r = window.location.search.substr(1).match(reg);
  if (r !== null) return decodeURIComponent(unescape(r[2]));
  return null;
};

export function getQueryVariable(variable){
  const [, query2] = window.location.href.split('?')
  var vars = query2 ?.split("&");
  if (vars)
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
      if(pair[0] == variable){return pair[1];}
    }
  return(null);
}

// cookie获取
export const getCookie = cookieName => {
  const strCookie = document.cookie;
  const arrCookie = strCookie.split("; ");
  for (let i = 0; i < arrCookie.length; i += 1) {
    const arr = arrCookie[i].split("=");
    if (cookieName === arr[0]) {
      return arr[1];
    }
  }
  return "";
};

// cookie存储
export const setCookie = (key, value, t) => {
  const oDate = new Date(); // 创建日期对象
  oDate.setDate(oDate.getDate() + t); // 设置过期时间
  document.cookie = `${key}=${value};expires=${oDate.toGMTString()}`; // 设置cookie的名称，数值，过期时间
};

// cookie存储
export const colorItem = ['#F19149', '#79562F', '#B78E74', '#B78E74', '#2F4979']