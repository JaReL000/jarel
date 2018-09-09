exports.install = function (Vue, options) {
  Vue.prototype.$Object = {
    name: 'ZIHUA',
    
    goIndex: (code, isLogin) => {
      if(code===1000200){
          if(!isLogin){
            window.location.href = '/'
          }
      }else{
        window.location.href = '/'
      }
      
    },
    // 对应页面
    goBank : {
      '-1' : 'balance', //余额
      '1' : 'currentAsset', //活期产品
      '2' : 'regularAsset', //定期产品
      '103' : 'myAsset',
    },
    regularMoney: (money, bool)=>{
     
      let reg = /(\.\d{3})+/
      let reg2 = /^[-+]?\d*[.]?\d{0,2}$/
      let reg3 = /^[0-9]+.?[0-9]*$/ //只能输入数字
      let reg4 = /(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/
      let reg5 =  /[A-Za-z]+|[-\+,·~`()\{\}~!@#$%^&*/\\\[\]]$/ // 过滤字母和特殊字符
      let regbul =  /[\u4e00-\u9fa5]+/ // 过滤双字节
      let regbul2 =  /[-+·~！@#￥%……&*（）：“|；‘、{}【】《》？，。//*\【、]$/ // 过滤双字节
      let pattern2 = /^[0-9]+|^[a-zA-Z]$/
      
      if(reg.test(money)){
        money = money.substr(0, money.length-1)
      }
      if(!reg3.test(money)){   
          return false
      }
    
      if(reg5.test(money)){
        return false
      }

      if(regbul.test(money)){
        return false
      }
      if(regbul2.test(money)){
        return false
      }
      money = String(money)
      money = money.replace(/(^\s*)|(\s*$)/g,"");
      money = money.replace(/[^\d\.]/g,'');
      money = money.replace(/^\./g,'0.')
      money = money.replace(/^0+[0-9]/g,money.substr(1, 1)) // 去零
      
      // 如果匹配到点.
      if(/[.]/.test(money)&&bool){
        money=money.substring(0,money.length-1) // 去除最后一个.
      }
      
      return money
    },
    onlyNumber(value){ 
      //先把非数字的都替换掉，除了数字和. 
      value = value.replace(/[^\d\.]/g,''); 
      //必须保证第一个为数字而不是. 
      value = value.replace(/^\./g,'0.'); 
      //保证只有出现一个.而没有多个. 
      value = value.replace(/\.{2,}/g,'.'); 
      //保证.只出现一次，而不能出现两次以上 
      value = obj.value.replace('.','$#$').replace(/\./g,'').replace('$#$','.');
        //只能输入两个小数
      value = value.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3'); 
      return value
    },
  }
};
