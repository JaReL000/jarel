var chalk = require('chalk')
const build = require('../build')

console.log('开始');
console.log(chalk.cyan('> Starting dev server...'))
console.log(process.env.DOMAIN_ENV);
console.log('结束');

module.exports = (option) => {
  yield build()
  console.log(process);
  console.log(option);
  
}