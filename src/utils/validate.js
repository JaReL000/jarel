/**
 * Created by zi on 2017/4/23.
 * 鲸鱼工具方法
 */

/* 是否是公司邮箱*/
export function isWscnEmail(str) {
  const reg = /^[a-z0-9](?:[-_.+]?[a-z0-9]+)*@usfund\.com$/i;
  return reg.test(str.trim());
}

/* 合法uri*/
export function validateURL(textval) {

  // var urlregex = new RegExp(
  //   "^(http|https|ftp)\://([a-zA-Z0-9\.\-]+(\:[a-zA-Z0-9\.&amp;%\$\-]+)*@)*((25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9])\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[1-9]|0)\.(25[0-5]|2[0-4][0-9]|[0-1]{1}[0-9]{2}|[1-9]{1}[0-9]{1}|[0-9])|([a-zA-Z0-9\-]+\.)*[a-zA-Z0-9\-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(\:[0-9]+)*(/($|[a-zA-Z0-9\.\,\?\'\\\+&amp;%\$#\=~_\-]+))*$");
  var urlregex = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/;

  return urlregex.test(textval);
}

/* 小写字母*/
export function validateLowerCase(str) {
  const reg = /^[a-z]+$/;
  return reg.test(str);
}

/* 验证key*/
// export function validateKey(str) {
//     var reg = /^[a-z_\-:]+$/;
//     return reg.test(str);
// }

/* 大写字母*/
export function validateUpperCase(str) {
  const reg = /^[A-Z]+$/;
  return reg.test(str);
}

/* 大小写字母*/
export function validatAlphabets(str) {
  const reg = /^[A-Za-z]+$/;
  return reg.test(str);
}

//**************************************************************** 
//* 名　　称：DataLength 
//* 功    能：计算数据的长度 
//* 入口参数：fData：需要计算的数据 
//* 出口参数：返回fData的长度(Unicode长度为2，非Unicode长度为1) 
//***************************************************************** 
export function DataLength(fData) 
{ 
    var intLength=0 
    for (var i=0;i<fData.length;i++) 
    { 
        if ((fData.charCodeAt(i) < 0) || (fData.charCodeAt(i) > 255)) 
            intLength=intLength+2 
        else 
            intLength=intLength+1    
    } 
    return intLength 
} 
//**************************************************************** 
//* 名　　称：IsEmpty 
//* 功    能：判断是否为空 
//* 入口参数：fData：要检查的数据 
//* 出口参数：True：空                              
//*           False：非空 
//***************************************************************** 
export function IsEmpty(fData) 
{ 
    return ((fData==null) || (fData.length==0) ) 
} 


//**************************************************************** 
//* 名　　称：IsDigit 
//* 功    能：判断是否为数字 
//* 入口参数：fData：要检查的数据 
//* 出口参数：True：是0到9的数字                              
//*           False：不是0到9的数字 
//***************************************************************** 
export function IsDigit(fData) 
{ 
    return ((fData>="0") && (fData<="9")) 
} 


//**************************************************************** 
//* 名　　称：IsInteger 
//* 功    能：判断是否为正整数 
//* 入口参数：fData：要检查的数据 
//* 出口参数：True：是整数，或者数据是空的                            
//*           False：不是整数 
//***************************************************************** 
export function IsInteger(fData) 
{ 
    //如果为空，返回true 
    if (IsEmpty(fData)) 
        return true 
    if ((isNaN(fData)) || (fData.indexOf(".")!=-1) || (fData.indexOf("-")!=-1)) 
        return false    
    
    return true    
} 

//**************************************************************** 
//* 名　　称：IsEmail 
//* 功    能：判断是否为正确的Email地址 
//* 入口参数：fData：要检查的数据 
//* 出口参数：True：正确的Email地址，或者空                              
//*           False：错误的Email地址 
//***************************************************************** 
export function IsEmail(fData) 
{ 
    if (IsEmpty(fData)) 
      return true 
    if (fData.indexOf("@")==-1) 
      return false 
    var NameList=fData.split("@"); 
    if (NameList.length!=2) 
      return false  
    if (NameList[0].length<1 ) 
      return false   
    if (NameList[1].indexOf(".")<=0) 
      return false 
    if (fData.indexOf("@")>fData.indexOf(".")) 
      return false 
    if (fData.indexOf(".")==fData.length-1) 
      return false 
    
    return true    
} 

//**************************************************************** 
//* 名　　称：IsPhone 
//* 功    能：判断是否为正确的电话号码（可以含"()"、"（）"、"+"、"-"和空格） 
//* 入口参数：fData：要检查的数据 
//* 出口参数：True：正确的电话号码，或者空                              
//*           False：错误的电话号码 
//* 错误信息： 
//***************************************************************** 
export function IsPhone(fData) 
{ 
    var str; 
    var fDatastr=""; 
    if (IsEmpty(fData)) 
        return true 
    for (var i=0;i<fData.length;i++) 
    { 
        str=fData.substring(i,i+1); 
        if (str!="(" && str!=")" && str!="（" && str!="）" && str!="+" && str!="-" && str!=" ") 
           fDatastr=fDatastr+str; 
    }  
    //alert(fDatastr);  
    if (isNaN(fDatastr)) 
        return false 
    return true    
} 

//**************************************************************** 
//* 名　　称：IsPlusNumeric 
//* 功    能：判断是否为正确的正数（可以含小数部分） 
//* 入口参数：fData：要检查的数据 
//* 出口参数：True：正确的正数，或者空                              
//*           False：错误的正数 
//* 错误信息： 
//***************************************************************** 
export function IsPlusNumeric(fData) 
{ 
    if (IsEmpty(fData)) 
        return true 
    if ((isNaN(fData)) || (fData.indexOf("-")!=-1)) 
        return false 
    return true    
} 

//**************************************************************** 
//* 名　　称：IsNumeric 
//* 功    能：判断是否为正确的数字（可以为负数，小数） 
//* 入口参数：fData：要检查的数据 
//* 出口参数：True：正确的数字，或者空                              
//*           False：错误的数字 
//* 错误信息： 
//***************************************************************** 
export function IsNumeric(fData) 
{ 
    if (IsEmpty(fData)) 
        return true 
    if (isNaN(fData)) 
        return false 
        
    return true    
} 


//**************************************************************** 
//* 名　　称：IsIntegerInRange 
//* 功    能：判断一个数字是否在指定的范围内 
//* 入口参数：fInput：要检查的数据 
//*           fLower：检查的范围下限，如果没有下限，请用null 
//*           fHigh：检查的上限，如果没有上限，请用null 
//* 出口参数：True：在指定的范围内                              
//*           False：超出指定范围 
//***************************************************************** 
export function IsIntegerInRange(fInput,fLower,fHigh) 
{ 
    if (fLower==null) 
        return (fInput<=fHigh) 
    else if (fHigh==null) 
        return (fInput>=fLower) 
    else         
        return ((fInput>=fLower) && (fInput<=fHigh)) 
}



