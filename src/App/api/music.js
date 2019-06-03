import fetch from '../servise/fetch';
import config from '../config/config';

//音乐分类
export function musicCategrary(reqbody){
    return new Promise((resolve, reject)=>{
        fetch(config.MUSIC_URL+ 'highquality',{ method: 'GET', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

//分类下音乐列表
export function musicList(reqbody){
    return new Promise((resolve, reject)=>{
        fetch(config.MUSIC_URL+ 'playlist_detail',{ method: 'GET', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

//音乐歌曲详情url
export function getMusic(reqbody){
    return new Promise((resolve, reject)=>{
        fetch(config.MUSIC_URL+ 'song',{ method: 'GET', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}

//音乐歌词详情
export function getLyric(reqbody){
    return new Promise((resolve, reject)=>{
        fetch(config.MUSIC_URL+ 'lyric',{ method: 'GET', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}


//搜索
export function musicSearch(reqbody){
    return new Promise((resolve, reject)=>{
        fetch(config.MUSIC_URL+ 'search',{ method: 'GET', data: reqbody})
        .then(data => {
            resolve(data)
        }).catch(error => {
            reject(error);
        })
    })
}



