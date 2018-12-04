export default {
    /**
     * 加法计算
     * @param arg1
     * @param arg2
     * @returns {string}
     */
    accAdd:(arg1,arg2)=>{
        var r1,r2,m;
        try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
        try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
        m=Math.pow(10,Math.max(r1,r2))
        return ((arg1*m+arg2*m)/m).toFixed(2);
    },
    /**
     * 减法计算
     * @param arg1
     * @param arg2
     * @returns {string}
     * @constructor
     */
    subtr:(arg1,arg2)=>{
        var r1,r2,m;
        try{r1=arg1.toString().split(".")[1].length}catch(e){r1=0}
        try{r2=arg2.toString().split(".")[1].length}catch(e){r2=0}
        m=Math.pow(10,Math.max(r1,r2));
        //last modify by deeka
        //动态控制精度长度
        n=(r1>=r2)?r1:r2;
        return ((arg1*m-arg2*m)/m).toFixed(2);
    },
    /**
     * 除法计算
     * @param arg1
     * @param arg2
     * @returns {number}
     */
    /*accDiv:(arg1,arg2)=>{
        var t1=0,t2=0,r1,r2;
        try{t1=arg1.toString().split(".")[1].length}catch(e){}
        try{t2=arg2.toString().split(".")[1].length}catch(e){}
        with(Math){
            r1=Number(arg1.toString().replace(".",""))
            r2=Number(arg2.toString().replace(".",""))
            return (r1/r2)*pow(10,t2-t1);
        }
    },*/
    /**
     * 乘法计算
     * @param arg1
     * @param arg2
     * @returns {number}
     */
    accMul:(arg1,arg2)=>{
        var m=0,s1=arg1.toString(),s2=arg2.toString();
        try{m+=s1.split(".")[1].length}catch(e){}
        try{m+=s2.split(".")[1].length}catch(e){}
        return Number(s1.replace(".",""))*Number(s2.replace(".",""))/Math.pow(10,m)
    },
    /**
     * 余数计算
     * @param arg1
     * @param arg2
     */
    accRem:(arg1,arg2)=>{
       return Number(this.Subtr(arg1,this.accMul(Number(Math.floor(this.accDiv(arg1,arg2))),arg2)));
    },

}
