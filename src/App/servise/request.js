import axios from 'axios';
import {Toaster, Loader} from '../../neo/Components';
import { storage, sessions } from '../../neo/utils';
import {getDateTimeStr} from '../utils/timeStamp';
import { hashHistory } from 'react-router';

function setReq(obj, url) {
    return {
        'chCode': url.indexOf('user/login')>=0 ? '' :sessions.getStorage('userInfo').channelId||'',
        'version': '1.0',
        'source': 'candys',
        'data': obj,
        'reqNo': parseInt(Math.random() * Math.pow(10, 15)),
        'reqTime': getDateTimeStr(),
    }
}

function resetHeader(headers){
    if(!headers) return {};
    let newHeader = {}
    for(let i=0;i<headers.length;i++){
        newHeader[headers[i].text] = headers[i].value
    }
    return newHeader;
}
export default function (url, options = {}, header) {
    Loader.showProgress();
    return new Promise((resolve, reject)=>{
        let token = ''
        if(url.indexOf('user/login')<0){
            token = sessions.getStorage('token');
        }
        let headers = Object.assign({
            'Content-Type': 'application/json',
            'token': token
        }, resetHeader(header))
        axios({
            method: options.method,
            url: url,
            headers: headers, 
            data: setReq(options.data, url)
        }).then((response) => {
            Loader.hideProgress();
            if (response.status !== 200) {
                Toaster.toaster({ type: 'error', content: '系统错误', time: 3000 });
                reject(response)
            } else {
                if(response.data.code=='99995'|| response.data.code === '9992' ){
                    hashHistory.push('/LoginPage');
                }
                resolve(response.data)
            }
        }).catch(error => reject(error));
    })
    
}