import { trim } from './string';
import { getType, noop } from './base';

const defaultValidFuncs = {
  required: value => value !== '',

  number: value => /^\d*$/.test(value),

  pNumber: (value) => {
    if (trim(value) === '') {
      return true;
    }
    return /^[1-9]\d*$/.test(value);
  },

  percent: (value) => {
    if (trim(value) === '') {
      return true;
    }
    if (!/^[0-9][0-9.]*$/.test(value)) {
      return false;
    }
    const fidx = value.indexOf('.');
    if (fidx !== value.lastIndexOf('.')) {
      return false;
    }
    if (parseFloat(value) > 100) {
      return false;
    } else if (parseFloat(value) === 100) {
      if (fidx > 0) {
        if (value.substr(fidx + 1).length > 2) {
          return false;
        }
      }
      return true;
    } else if (parseFloat(value) < 100) {
      if (value.substr(fidx + 1).length > 2) {
        return false;
      }
    }

    return true;
  },

  mobile: value => /^1[3578]\d{9}$/.test(value),

  identity: value => /[0-9xX]{18}/.test(value),

  commaArray: value => !/(,,)|(,$)/.test(value) && value !== ''
};

const isValid = (value, valid) => {
  const type = getType(valid);
  switch (type) {
    case 'string':
      return (defaultValidFuncs[valid] || noop)(value);
    case 'regexp':
      return valid.test(value);
    case 'function':
      return valid(value);
    case 'array':
      return valid.every(val => isValid(value, val));
    case 'undefined':
    default:
      return true;
  }
};

export default isValid;
