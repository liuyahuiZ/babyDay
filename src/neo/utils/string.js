import { isString } from './base';

export function trim(str) {
  if (!isString(str)) {
    return '';
  }

  return str.replace(/^\s+|\s+$/g, '');
}

export function test() {
  return 1;
}
