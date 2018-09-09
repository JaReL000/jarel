// 友好提示语
let i18n = {
  'ReferenceError: Jinr is not defined': '不在APP环境'
}

if(process.env.NODE_ENV === 'prod'){
  i18n['ReferenceError: Jinr is not defined'] = '请前往鲸鱼APP使用'
  
} 

export default i18n