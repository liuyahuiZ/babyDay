import fetch from '../servise/fetch';
import config from '../config/config';

export function createRecord(reqbody){
    return new Promise((resolve, reject)=>{
        fetch(config.ROOT_URL+ 'record/doCreate',{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function recordList(reqbody){
    return new Promise((resolve, reject)=>{
        fetch(config.ROOT_URL+ 'record/recordList',{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function findType(reqbody){
    return new Promise((resolve, reject)=>{
        fetch(config.ROOT_URL+ 'commonType/findType',{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

export function addType(reqbody){
    return new Promise((resolve, reject)=>{
        fetch(config.ROOT_URL+ 'commonType/addType',{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}
export function removeType(reqbody){
    return new Promise((resolve, reject)=>{
        fetch(config.ROOT_URL+ 'commonType/removeType',{ method: 'POST', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}