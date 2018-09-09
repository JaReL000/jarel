const { prompt } = require('inquirer')
// 通用交互式命令行用户界面的集合。
// const inquirer = require('inquirer')
const { writeFile } = require('fs')
const chalk = require('chalk')
const project = require('../../config/project.env')


// const ossEnv = require('../../config/oss.env')

// const { listTable } = require(`${__dirname}/../utils`)

// let tplList = require(`${__dirname}/../templates`)
// var config = _.assign({
//   bucketName: null,
//   password: '',
//   bucket: '',
// }, option)
// var promps = []

console.log('')
// console.log(chalk.red('上传静态文件'))     
console.log(chalk.rgb(255, 136, 0).bold('上传静态文件'))     
console.log('')

const promps = [
  {
    type: 'list',
    name: 'project',
    prefix: '',
    suffix: '',
    message: '选择以下那个项目',
    choices: project.item,
  },
  // {
  //   type: 'input',
  //   name: 'bucketName',
  //   message: '请输入bucket服务器名',
  //   validate (input){
  //       if(!input) {
  //           return '不能为空'
  //       }
  //       return true
  //   }
  // },
  // {
  //   type: 'password',
  //   name: 'bucketPassword',
  //   message: chalk.blue('请输入密码'),
  //   default: '*',
  //   validate: function (input){
  //     if(!input) {
  //         return '不能为空'
  //     }
  //     return true
  //   }
  // },
  {
    type: 'list',
    name: 'bucketServers',
    message: '想用那个bucket服务器',
    choices: project.bucketServers,
  },
  // {
  //   type: 'confirm',
  //   name: 'confirm',
  //   message: '确认要上传到服务器',
  //   validate: function (input){
  //       if(!input) {
  //           return '不能为空'
  //       }
  //       return true
  //   }
  // }
]


// { bucketName, bucketPassword, bucketServers, confirm }
module.exports = prompt(promps).then((answers) => {
  process.env.project = answers.project
  process.env.bucketServers = answers.bucketServers
  // console.log(answers);
  
  // node build/dev-server.js
  // const devServer = require('../dev-server')
  // ossEnv.bucket = answers.bucketServers
  const build = require('../build')

  // const oss =  require('../utils/oss')
  // const ossEnv = require('../../config/oss.env')
  
  // oss(ossEnv)

})








// if(config.bucketName !== 'string') {
//       promps.push()
// } 
// if(config.password !== 'string') {
//   promps.push()
// }
// if(config.bucket === '') {
//   promps.push()
// }
// if(config.confirm !== 'string') {
//   promps.push()
// } 
// inquirer.prompt(promps).then(function (answers) {
//   // console.log(chalk.green('收工咯'))
//   // console.log(chalk.blue('收工咯'))
//   // console.log(chalk.blue.bgRed('收工咯')) //支持设置背景
//   // console.log(chalk.blue(answers))
//   console.log(answers)
  
// })