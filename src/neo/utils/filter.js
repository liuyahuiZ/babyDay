import { isString, isFunction, isArray, isNumber, isLikeNumber, noop } from './base';
import { format } from './date';

const defaulFilters = {
  date: (date, fmt) => format(date, fmt),
  lowercase: (value) => {
    if (isString(value)) {
      return value.toLowerCase();
    }

    return '';
  },
  uppercase: (value) => {
    if (isString(value)) {
      return value.toUpperCase();
    }

    return '';
  },
  fixed: (value, fixLength) => {
    if (isNumber(value) || isLikeNumber(value)) {
      return (+value).toFixed(fixLength);
    }

    return '';
  },
  replace: (value, str, replaceStr) => {
    if (isString(value)) {
      const reger = new RegExp(str, 'g');
      return value.replace(reger, replaceStr);
    }
    return '';
  }
};

export default function filter(filterName, value, ...args) {
  if (isArray(filterName)) {
    const [name, ...filterArgs] = filterName;
    return filter(name, value, ...filterArgs);
  } else if (isString(filterName)) {
    return (defaulFilters[filterName] || noop)(value, ...args);
  } else if (isFunction(filterName)) {
    return filterName(value, ...args) || '';
  }
  return filterName[value] || '';
}
