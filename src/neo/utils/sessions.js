function validsessionStorageLimit(key) {
    const stora = JSON.parse(sessionStorage[key]);
    const zeroDate = new Date().getTime();
    if ((zeroDate - stora.limitTime) > stora.limit) {
      sessionStorage[key] = '';
    }
  }
  function randomString(len) {
    len = len || 32;
    let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    let maxPos = $chars.length;
    let pwd = '';
    for (let i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  }
  export function getStorage(key) {
    if(sessionStorage['userid']&&sessionStorage['userid']!==null){
      let groupKey = sessionStorage['userid'];
      let stora = JSON.parse(sessionStorage[groupKey]);
      if(stora[key]&&stora[key]!==''){
          return stora[key].item;
      }
      return ''
    }
    return null;
  }
  
  export function setStorage(key, value) {
    let newValue = value;
    if(sessionStorage['userid']&&sessionStorage['userid']!==null){
      let groupKey = sessionStorage['userid'];
      let stora = JSON.parse(sessionStorage[groupKey]);
      stora[key] ={
        item: value,
        type: typeof value
      }
      sessionStorage[groupKey] = JSON.stringify(stora);
    } else{
      let groupKey = randomString(10);
      sessionStorage['userid'] = groupKey;
      sessionStorage[groupKey]=JSON.stringify({
        [key]: {
          item: value,
          type: typeof value
        }
      })
    }
  }
  
  export function removeAllStorage() {
    let groupKey = sessionStorage['userid'];
    sessionStorage.removeItem(groupKey)
    sessionStorage.removeItem('userid')
  }
  
  export function removeStorage(key) {
    let groupKey = sessionStorage['userid'];
    let stora = JSON.parse(sessionStorage[groupKey]);
    delete stora[key];
    sessionStorage[groupKey] = JSON.stringify(stora);
  }
  