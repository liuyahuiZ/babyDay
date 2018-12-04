import computed from '../utils/computed';

export default {
  // 金额分转化元
  tofixed: money => ((parseFloat(money) || 0) / 100).toFixed(2),
  formateMoney: s => {
    let money = parseFloat(s);
    if (money) {
      s = (money / 100).toFixed(2) + "";
      let l = s.split(".")[0].split("").reverse();
      let r = s.split(".")[1];
      let t = "";
      l.forEach((ll, key) => {
        t += l[key] + ((key + 1) % 3 == 0 && (key + 1) != l.length ? "," : "");
      })
      return t.split("").reverse().join("") + "." + r;
      // return s;
    } else if (s == 0) {
      return "0.00"
    } else {
      return '---';
    }
  },
  formateMoneys: s => {
    let money = parseFloat(s);
    if (money) {
      s = (money / 100).toFixed(2) + "";
      let l = s.split(".")[0].split("").reverse();
      let r = s.split(".")[1];
      let t = "";
      l.forEach((ll, key) => {
        t += l[key] + ((key + 1) % 3 == 0 && (key + 1) != l.length ? "," : "");
      })
      return t.split("").reverse().join("") + "." + r;
      // return s;
    } else if (s == 0) {
      return "0.00"
    } else {
      return '0.00';
      }
    },
  formateRate:s =>{ //百分比
    return computed.accMul(s,1).toFixed(4) + '%';
  },
  formateDayNum:s => {  //拼接‘天’字符串
        return `${s}天`
  },
  getNowDate: () => {
    var y = String(new Date().getFullYear());
    var m = String(new Date().getMonth()+1).length == 1 ? '0'+(new Date().getMonth()+1) : new Date().getMonth()+1;
    var d = String(new Date().getDate()).length == 1 ? '0'+new Date().getDate() : new Date().getDate();
    return y + m + d;
  },
  getNowTime: () => {
    var h = String(new Date().getHours()).length == 1 ? '0'+new Date().getHours() : String(new Date().getHours());
    var m = String(new Date().getMinutes()).length == 1 ? '0'+new Date().getMinutes() : String(new Date().getMinutes());
    var s = String(new Date().getSeconds()).length == 1 ? '0'+new Date().getSeconds() : String(new Date().getSeconds());
    return h + m + s;
  },
  todate: dd => {
    if (dd) {
      var y = dd.substr(0, 4);
      var m = dd.substr(4, 2);
      var d = dd.substr(6, 2);
      return y + '-' + m + '-' + d;
    } else {
      return '---';
    };
  },
  dateformat: dd => {
    if (dd) {
      var y = dd.substr(0, 4);
      var m = dd.substr(4, 2);
      var d = dd.substr(6, 2);
      return y + '年' + m + '月' + d + '日';
    } else {
      return '年' + " " + '月' + " " + '日';
    };
  },
  dayFormat: dd => {
    if (dd) {
      // var y = dd.substr(0, 4);
      // var m = dd.substr(4, 2);
      var d = dd.substr(6, 2);
      return d + '号';
    } else {
      return " " + '号';
    };
  },
  nameFormatStar: nameStr => { //姓名 **号
    if (nameStr) {
      var str = nameStr.replace(/.(?=.)/g, '*');
      return str;
    }
  },
  cardFormatStar: cardstr => { //银行卡打星号 后四位
    if (cardstr) {
      var str = cardstr.replace(/(\d{0})\d+(\d{4})/, "$1 **** **** **** $2");
      return str;
    }
  },
  cardFormatFour: cardstr => { //银行卡打星号 后四位
    if (cardstr) {
      var str = cardstr.replace(/(\d{0})\d+(\d{4})/, "$1 **** $2");
      return str;
    }
  },
  bankcardformat: thiscard => { //银行卡 每四位空格
    if (thiscard) {
      var first = thiscard.substr(0, 4);
      var second = thiscard.substr(4, 4);
      var third = thiscard.substr(8, 4);
      var fourth = thiscard.substr(12, 4);
      var fifth = thiscard.substr(16, 4);
      return first + ' ' + second + ' ' + third + ' ' + fourth + ' ' + fifth;
    } else {
      return '';
    };
  },
  bankcardLastNum: thiscard => { //保留银行卡后四位
    if (thiscard) {
      var lastNum = thiscard.substr(thiscard.length - 4);
      return lastNum;
    } else {
      return '';
    }
  },
  hidephone: thisphone => { //手机号中间3隐藏  保留前4、后4位数
    if (thisphone) {
      return thisphone.substr(0, 4) + '****' + thisphone.substr(7, 4)
    } else {
      return '---';
    };
  },
  phoneFouth: phone => { //手机号中间5位隐藏 保留前3、后3位数
    if (phone) {
      var thePhone = phone.substring(0, 3) + "****" + phone.substring(8, 11)
      return thePhone;
    } else {
      return '';
    };
  },
  phoneFormat: phone => { //手机号中间5位隐藏 保留前3、后4位数
    if (phone) {
      var thePhone = phone.substring(0, 3) + "****" + phone.substring(7, 11)
      return thePhone;
    } else {
      return '';
    };
  },
  removeSpaces: text => { //银行卡后四位
    var str = text.replace(/\s+/g, '');
    return str;
  },

  date: function(fmt,date) {
      var time = date || new Date();
      var o = {
          "M+" : time.getMonth()+1,
          "d+" : time.getDate(),
          "h+" : time.getHours(),
          "m+" : time.getMinutes(),
          "s+" : time.getSeconds(),
          "q+" : Math.floor((time.getMonth()+3)/3),
          "S"  : time.getMilliseconds()
      };
      if(/(y+)/.test(fmt)) {
          fmt=fmt.replace(RegExp.$1, (time.getFullYear()+"").substr(4 - RegExp.$1.length));
      }
      for(var k in o) {
          if(new RegExp("("+ k +")").test(fmt)){
              fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
          }
      }
      return fmt;
  },
  getDateStr: function (AddDayCount) {
    var dd = new Date();
    dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
    var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0
    return y + '.' + m + '.' + d;
  }
};
