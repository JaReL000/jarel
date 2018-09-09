#! /usr/bin/env node 

//http://blog.gejiawen.com/2016/09/21/make-a-node-cli-program-by-commander-js/
const program = require('commander')

const _ = require('lodash')
const chalk = require('chalk')
const { resolve } = require('path')

// Promise
const res = command => resolve(__dirname, 'commands/', command)
// 通过option设置的选项可以通过program.chdir或者program.noTests来访问。
// 通过command设置的命令通常在action回调中处理逻辑。
program
  .version(require('../package').version )

program
  .command('upload')
  .alias('u')
  .description('上传静态文件->OSS服务器')
  .option('--name [bucketName]')
  .option('--password', '输入密码')
  .option('--bucket', '选择服务器')
  .action(option => {
    require(res('upload'))
  }) 
  .on('--help', function() {
    console.log('  Examples:')
    console.log('')
    console.log('$ app module moduleName')
    console.log('$ app m moduleName')
  })

program
  .version('0.0.1')
  .option('-C, --chdir <path>', 'change the working directory')
  .option('-c, --config <path>', 'set config path. defaults to ./deploy.conf')
  .option('-T, --no-tests', 'ignore test hook')

// program
//   .command('start <name>')
//   .description('启动本地服务进行开发')
//   .alias('s')
//   .option('--name [bucketName]')
//   .option('--password', '输入密码')
//   .option('--bucket', '选择服务器')
//   .action((name) => {
//     console.log(name);
    
//     // require(res('start'))
//   })

  // function range(val) {
  //   return val.split('..').map(Number);
  // }
  
  // function list(val) {
  //   return val.split(',');
  // }
    
// program
// .version('0.0.1')
// .usage('test')
// .option('-C, --chdir [value]', '设置服务器节点','/home/conan/server')
// .option('-c, --config [value]', '设置配置文件','./deploy.conf')
// .option('-m, --max <n>', '最大连接数', parseInt)
// .option('-s, --seed <n>', '出始种子', parseFloat)
// .option('-r, --range <a>..<b>', '阈值区间', range)
// .option('-l, --list <items>', 'IP列表', list)

// program
// .command('deploy <name>')
// .alias('d')
// .description('部署一个服务节点')
// .action(function(name){
// console.log(name);
// });

program.parse(process.argv)

// jinr -c /deploy/c1/config.conf -m 20 -s 19.1 -r 12..101 -l 192.168.1.1,192.168.1.2,192.168.1.3 deploy server1
// console.log(' chdir - %s ', program.chdir);
// console.log(' config - %s ', program.config);
// console.log(' max: %j', program.max);
// console.log(' seed: %j', program.seed);
// program.range = program.range || [];
// console.log(' range: %j..%j', program.range[0], program.range[1]);
// console.log(' list: %j', program.list);
