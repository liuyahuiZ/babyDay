import { getType } from './base';
import moment from 'moment'; // 引入时间计算插件

export function format(date, fmt) {
  if (date) {
    date = new Date(date);
  } else {
    return '';
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds()
  };

  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (`${date.getFullYear()}`).substr(4 - RegExp.$1.length));
  }

  Object.keys(o).forEach((k) => {
    if (new RegExp(`(${k})`).test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : ((`00${o[k]}`).substr((`${o[k]}`).length)));
    }
  });

  return fmt;
}

export function isDate(value) {
  return getType(value) === 'date';
}


/**
 * 生成月份显示形式
 *
 * @param {String} monthStr 月份
 */
export function formatViewMonth (monthStr) {
  const dateFormat = /^\d{4}-\d{2}-\d{2}$/;

  if (!dateFormat.test(monthStr)) {
      console.log('[FormatError]: startDateStr格式不符合"YYYY-MM-DD"');

      return false
  }
  return moment(monthStr).format('YYYY年M月'); // 其他单天日期就显示 mm月dd日
}

/**
 * 生成只显示月份
 *
 * @param {String} monthStr 月份
 */
export function formatViewMonthOnly (monthStr) {
  const dateFormat = /^\d{4}-\d{2}-\d{2}$/;

  if (!dateFormat.test(monthStr)) {
      console.log('[FormatError]: startDateStr格式不符合"YYYY-MM-DD"');

      return false
  }
  return moment(monthStr).format('MM月'); // 其他单天日期就显示 mm月
}

 /**
 * 生成日期显示形式
 *
 * @param {String} startDateStr 开始日期
 * @param {String} endDateStr 结束日期
 */
export function formatViewDate (startDateStr, endDateStr) {
  const dateFormat = /^\d{4}-\d{2}-\d{2}$/;

  if (!dateFormat.test(startDateStr)) {
      console.log('[FormatError]: startDateStr格式不符合"YYYY-MM-DD"');

      return false
  }

  if (!dateFormat.test(endDateStr)) {
      console.log('[FormatError]: endDateStr格式不符合"YYYY-MM-DD"');

      return false
  }

  if (startDateStr === endDateStr) {
      // let todayStr = moment().format('YYYY-MM-DD') // 今天
      // let yesterdayStr = moment().subtract(1, 'days').format('YYYY-MM-DD'); // 昨天
      // let beforeYesterdayStr = moment().subtract(2, 'days').format('YYYY-MM-DD'); // 前天

      // if (startDateStr === yesterdayStr) {
      // 	return '昨天'; // 昨天的日期就显示“昨天”
      // } else if (startDateStr === todayStr) {
      // 	return '今天'; // 今天的日期就显示“今天”
      // } else if (startDateStr === beforeYesterdayStr) {
      // 	return '前天'; // 前天的日期就显示“前天”
      // } else {
      // 	return moment(startDateStr).format('MM月DD日'); // 其他单天日期就显示 mm月dd日
      // }

      return moment(startDateStr).format('MM月DD日'); // 其他单天日期就显示 mm月dd日

  } else {
      return `${moment(startDateStr).format('MM月DD日')}-${moment(endDateStr).format('MM月DD日')}`; // 时间区间就显示 mm月dd日－mm月dd日
  }
}

  /**
   * 获取默认日期，昨天
   */
  export function getDefaultDate () {
      return moment().subtract(1, 'days').format('YYYY-MM-DD');
  }
  /**
   * 获取今天日期
   * */
  export function getRecentDate() {
      return moment().subtract(0, 'days').format('YYYY-MM-DD');
  }
  /**
   * 获取明天
   * */
  export function getNextDate(date) {
      return moment(date,'YYYY-MM-DD').subtract(-1, 'days').format('YYYY-MM-DD');
  }
  /**
   * 获取昨天
   * */
  export function getLastDate(date) {
      if(!date) return moment().subtract(1, 'days').format('YYYY-MM-DD')
      return moment(date,'YYYY-MM-DD').subtract(1, 'days').format('YYYY-MM-DD');
  }

  /**
 * 当前页面重新出现的响应事件
 *
 * @param {function} fn 页面重新出现要执行的方法
 */
export function addListenerForWebviewDidAppear (fn = function () {}) {
	if (typeof fn !== 'function') {
		console.log('[TypeError]: fn必须是函数');

		return false;
  }
}