import { getDateTimeStr } from './timeStamp';
import { hashHistory } from 'react-router';
import { utils } from 'neo';

const { storage } = utils;

export function setReq(obj) {
    return {
        "appUser": 'jfxqj_wx',
        "requestData": obj,
        "requestNo": parseInt(Math.random()*Math.pow(10,15)),
        "requestTime": getDateTimeStr(),
        "source": "jfxqj_wx",
        "version": "1.2",
        "productCode": "2000",
        "channelCode": 'jbs2000',
        "accessMode": 'wx',
        "clientType": 'wx',
        "osType": 'weichart',
        "appVersion": '1.0',
        "jfpalVersion": '1.0',
        "mobileSerialNum": storage.getStorage('userId'),
        "phone": storage.getStorage('userId')
    }
}

export function goLink(link, itm){
    if(link) {
      hashHistory.push({
        pathname: link,
        query: itm || ''
      });
    }
  }