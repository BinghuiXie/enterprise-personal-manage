import { USER_DATE_EXPIRES } from "../constants";

export const isEqual = (value, other) => {
  
  // Get the value type
  var type = Object.prototype.toString.call(value);
  
  // If the two objects are not the same type, return false
  if (type !== Object.prototype.toString.call(other)) return false;
  
  // If items are not an object or array, return false
  if (['[object Array]', '[object Object]'].indexOf(type) < 0) return false;
  
  // Compare the length of the length of the two items
  var valueLen = type === '[object Array]' ? value.length : Object.keys(value).length;
  var otherLen = type === '[object Array]' ? other.length : Object.keys(other).length;
  if (valueLen !== otherLen) return false;
  
  // Compare two items
  var compare = function (item1, item2) {
    
    // Get the object type
    var itemType = Object.prototype.toString.call(item1);
    
    // If an object or array, compare recursively
    if (['[object Array]', '[object Object]'].indexOf(itemType) >= 0) {
      if (!isEqual(item1, item2)) return false;
    }
    
    // Otherwise, do a simple comparison
    else {
      
      // If the two items are not the same type, return false
      if (itemType !== Object.prototype.toString.call(item2)) return false;
      
      // Else if it's a function, convert to a string and compare
      // Otherwise, just compare
      if (itemType === '[object Function]') {
        if (item1.toString() !== item2.toString()) return false;
      } else {
        if (item1 !== item2) return false;
      }
      
    }
  };
  
  // Compare properties
  if (type === '[object Array]') {
    for (var i = 0; i < valueLen; i++) {
      if (compare(value[i], other[i]) === false) return false;
    }
  } else {
    for (var key in value) {
      if (value.hasOwnProperty(key)) {
        if (compare(value[key], other[key]) === false) return false;
      }
    }
  }
  
  // If nothing failed, return true
  return true;
  
};

export const getCookie = () => {
  let cookieArray = document.cookie.split(";");
  let cookie = {};
  cookieArray.map(cookieItem => {
    const cookies = cookieItem.split("=");
    cookie[cookies[0].trim()] = cookies[1];
  });
  return cookie;
};

/* 处理参数 */
/* 接受一个字符串，提取出其中特定的值并返回 */
export const isAdministrator = (string, splitLetter) => {
  let res = "";
  if (typeof string !== "string") {
    res = String.prototype.toString(string);
  }
  res = string;
  res = decodeURIComponent(res);
  res = res.split(splitLetter);
  return res.length > 1
};

/* 设置缓存 */
/* 参数：缓存内容 */
export const setCache = (data, key) => {
  const saveData = JSON.stringify(data);
  const lastCache = localStorage.getItem(key);
  if (lastCache) {
    if (!isEqual(lastCache, saveData)) {
      localStorage.setItem(key, saveData)
    }
  } else {
    /* 第一次缓存 */
    const time = Date.now();
    localStorage.setItem(key, saveData);
    localStorage.setItem("expires", time);
  }
};

/* 取出缓存 */
export const getCache = (key) => {
  const isOverdue = removeCache(key, USER_DATE_EXPIRES);
  if (isOverdue) {
    /* 缓存过期 */
    return ""
  } else {
    /* 没有过期 */
    return JSON.parse(localStorage.getItem(key));
  }
};

/* 超过过期时间，删除缓存 */
export const removeCache = (key, expires) => {
  const time = localStorage.getItem("expires");
  const isOverdue = (Date.now() - time) > expires;
  if (isOverdue) {
    localStorage.removeItem(key);
    return true;
  }
  return false;
};


