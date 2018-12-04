import { isArray, isLikeArray, isString } from './base';

export function forEach(arr, func) {
  if (!isArray(arr)) {
    return;
  }

  for (let i = 0; i < arr.length; i++) {
    func(arr[i], i);
  }
}

export function uniq(arr) {
  if (!isArray(arr)) {
    return [];
  }

  const hash = {};
  const res = [];

  forEach(arr, (item) => {
    if (item === undefined || item === null) {
      return;
    }
    if (isString(item)) {
      if (hash[item]) {
        return;
      }
      hash[item] = 1;
    }
    res.push(item);
  });
  return res;
}

export function every(arr, func) {
  if (!isArray(arr)) {
    return false;
  }

  for (let i = 0; i < arr.length; i++) {
    if (!func(arr[i], i)) {
      return false;
    }
  }

  return true;
}

export function from(obj, func) {
  if (Array.from) {
    return Array.from(obj, func);
  }
  let array = [];
  if (isArray(obj)) {
    array = obj;
  } else if (isLikeArray(obj)) {
    for (let i = 0; i < obj.length; i++) {
      array[i] = obj[i];
    }
  } else if (isString(obj)) {
    array = [obj];
  }

  if (func) {
    array = array.map((val, idx) => func(val, idx));
  }

  return array;
}

export function merge(arr) {
  return Object.assign({}, ...arr);
}

// @cutZero 数字零是否赋值
export function mergeList(array, obj, cutZero = false) {
  if (!obj) {
    return;
  }
  forEach(array, (item) => {
    if (item.items) {
      forEach(item.items, (t) => {
        if (obj[t.key] || (!cutZero && obj[t.key] === 0)) {
          t.value = obj[t.key];
        }
      });
    } else if (obj[item.key] || (!cutZero && obj[item.key] === 0)) {
      item.value = obj[item.key];
    }
  });
}

function getDates(data, key) {
  if (data[key]) {
    return data[key];
  }
  let res = '';
  const keys = Object.keys(data);
  const values = Object.values(data);

  for (let i = 0; i < keys.length; i++) {
    if (typeof (values[i]) === 'object' && JSON.stringify(values[i]) !== '{}') {
      res = getDates(values[i], key);
      if (res !== '') break;
    }
  }
  return res;
}

export function getDate(data, key) {
  const result = getDates(data, key);
  return result;
}

export function arrDeleteRepeat(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === '' || arr[i] === null || typeof (arr[i]) === 'undefined') {
      arr.splice(i, 1);
    }
  }
  return arr;
}

export function getItemForKey(arr, key, keyName) {
  let item = {};
  for (let i = 0; i < arr.length; i++) {
    if (arr[i][keyName] === key) {
      item = arr[i]; break;
    }
  }
  return item;
}
