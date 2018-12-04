const MAX_ARRAY_LENGTH = (2 << 22) - 1;

export function getType(item) {
  const fulltype = Object.prototype.toString.call(item);

  return fulltype.substring(8, fulltype.indexOf(']')).toLowerCase();
}

export function isArray(item) {
  return getType(item) === 'array';
}

export function isString(item) {
  return getType(item) === 'string';
}

export function isNumber(item) {
  return getType(item) === 'number';
}

export function isLikeNumber(item) {
  return isString(item) && item !== '' && isNumber(+item);
}

export function isFunction(item) {
  return getType(item) === 'function';
}

export function isObject(item) {
  return Object.prototype.toString.call(item).toLowerCase().indexOf('object') > -1;
}

export function isLikeArray(obj) {
  const len = obj.length;
  return isNumber(len) && len >= 0 && len <= MAX_ARRAY_LENGTH;
}


export function noop() {}

export function genRandomId() {
  return `${+new Date()}${(Math.random() * 1000000).toFixed(0)}`;
}

/*
* 带默认值的预处理显示
* @isCut 为真值时，数字零不放过
* */
export function defValFormater(val, def = '', isCut = false) {
  if (val === undefined || val === null || val === '') {
    return def;
  }
  if (isCut && val === 0) {
    return def;
  }
  return val;
}

/*
 * 深拷贝（函数类型除外直接返回）
 * */
export function deepClone(data) {
  const t = getType(data);
  let o;

  if (t === 'array') {
    o = [];
  } else if (t === 'object') {
    o = {};
  } else {
    return data;
  }

  if (t === 'array') {
    for (let i = 0, ni = data.length; i < ni; i++) {
      o.push(deepClone(data[i]));
    }
  } else if (t === 'object') {
    Object.keys(data).forEach((k) => {
      o[k] = deepClone(data[k]);
    });
  }
  return o;
}
