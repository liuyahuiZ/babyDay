export function accMul(arg1,arg2){
    var m=0,s1=arg1.toString(),s2=arg2.toString();
    try{m+=s1.split(".")[1].length}catch(e){}
    try{m+=s2.split(".")[1].length}catch(e){}
    return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
}

export function UrlSearch() {
    let name,value;
    let str=location.href; //取得整个地址栏
    let num=str.indexOf("?")
    str=str.substr(num+1); //取得所有参数   stringvar.substr(start [, length ]
    let obj = {};
    let arr=str.split("&"); //各个参数放到数组里
    for(let i=0;i < arr.length;i++){
         num=arr[i].indexOf("=");
         if(num>0){
              name=arr[i].substring(0,num);
              value=arr[i].substr(num+1);
              obj[name]=value;
         }
    }
    return obj;
 }

 export function arrSetKey(arr, key){
    let newArr = [];
    let obj = {};
    for(let i=0; i< arr.length ;i++){
        if(newArr.indexOf(arr[i][key]) >= 0){
            obj[arr[i][key]] = obj[arr[i][key]] + 1;
        } else{
            obj[arr[i][key]] = 1;
            newArr.push(arr[i][key]);
        }
    }
    return {
        arr: newArr,
        count: obj
    }
}

export function objToArr(obj){
    let keys = Object.keys(obj);
    let values = Object.values(obj);
    let newArr = []
    for(let i=0;i<keys.length;i++){
        newArr.push({
            key: keys[i],
            value: values[i]
        })
    }
    return newArr;
}

export  function datedifference(sDate1, sDate2) {    //sDate1和sDate2是2006-12-18格式  
    let dateSpan = 0;
    let iDays = 0;
    sDate1 = Date.parse(sDate1);
    sDate2 = Date.parse(sDate2);
    dateSpan = sDate2 - sDate1;
    dateSpan = Math.abs(dateSpan);
    iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
    return iDays
};
