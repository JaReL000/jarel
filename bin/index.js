#! /usr/bin/env node

const fs= require("fs")
// const _ = require('lodash')
const chalk = require('chalk')
const { resolve } = require('path')
const program = require('commander')

const upload = require('./commands/upload').upload
const generateProject = require('./commands/generate').generateProject
const { downloadAndGenerat, initFiles } = require('./commands/init')
const generateProjectJson = require('./commands/init.json').generateProjectJson

/*
<lang> required参数，使用时后边必须跟参数值, 否则程序会报错
[db] optional参数，后面可以选择是否跟参数值
*/

const res = command => resolve(__dirname, 'commands/', command)

/**
 * Option(): 初始化自定义参数对象，设置“关键字”和“描述”
 * Command(): 初始化命令行参数对象，直接获得命令行输入
 * Command#command(): 定义一个命令名字
 * Command#action(): 注册一个callback函数
 * Command#option(): 定义参数，需要设置“关键字”和“描述”，关键字包括“简写”和“全写”两部分，以”,”,”|”,”空格”做分隔。
 * Command#parse(): 解析命令行参数argv
 * Command#description(): 设置description值
 * Command#usage(): 设置usage值
 * 通过command设置的命令通常在action回调中处理逻辑。
 * 通过option设置的选项可以通过program.chdir或者program.noTests来访问。
 */

program
  .version(require('../package').version)
  .description(chalk.cyan('鲸鱼工程工具'))
  .usage('<命令> [-参数]')
  // .option('-i, --init [value]', '初始化项目')
  // .option('-s, -start [value]', '启动项目')
  // .option('-b, --build <n>', '打包项目')
  // .option('-u, --upload <n>', '上传文件')

program
  .command('init [dir]')
  .alias('i')
  .description('初始化项目')
  .option('-v, --version  [version]', '输出项目版本')
  .option('-d, --describe  <describe>', '输出项目描述')
  .option('-t, --title  <title>', '输出项目标题')
  .option('-m, --mode  [mode]', '输出项目模式')
  .option('-n, --name  [mode]', '输出项目名 鲸鱼 鲸鱼选股')
  .option('-p, --port  <port>', '输出项目端口号')
  .option('-e, --edit  [edit]', '输出项目编辑')
  .action(function (dir, options) {
    let rootDir = '../src/views'

    // 初始化具体的项目
    if(dir){
      fs.exists(resolve(__dirname, `${rootDir}/${dir}`), function(exists) {

        let version = typeof options.version=='string' ? options.version : ""
        let describe = typeof options.describe=='string' ? options.describe : "鲸鱼项目"
        let title = typeof options.title=='string' ? options.title : "鲸鱼"
        let mode = typeof options.mode=='string' ? options.mode : "vpages"
        let port = typeof options.port=='string' ? options.port : "8080"

        if(exists){
          if(options.edit){
            console.log('文件进行编辑');

            // 生成json
            // node bin init app -d 'APP-内嵌页4.0' -t 'jinr' -v '4.0' -m 'views' -p '8999'
            generateProjectJson(dir, version, describe, title, mode, port)
          }
          console.log('编辑成功');
          return
        }else{
          // 生成模板
          downloadAndGenerate(dir, version, describe, title, mode, port)
        }
      });
    }else{
      initFiles()
    }
  })

program
  .command('configure <dir>')
  .alias('c <dir>')
  .description('项目配置')
  .option('-d, --bucket  [mode]', '输出服务器环境')
  .option('-c, --configure  [mode]', '输出配置')
  .action(function (dir, options) {
    let bucket = typeof options.bucket=='string' ? options.bucket : "dev"
    // console.log( '项目名 ' + dir +' 服务器环境 ' + domain )

    process.env.DOMAIN = bucket
    process.env.PRO = dir.toUpperCase()
    require('../build/dev-server')

  })

program
  .command('start <dir>')
  .alias('s')
  .description('启动项目')
  .option('-d, --bucket  [mode]', '输出服务器环境')
  .option('-m, --mode  [mode]', '输出项目模式')
  .action(function (dir, options) {
    let bucket = typeof options.bucket=='string' ? options.bucket : "dev"
    let mode = typeof options.mode=='string' ? options.mode : "vpages"

    console.log('启动项目名  %s 服务器环境 %s', chalk.rgb(255, 136, 0).bold(dir) , chalk.rgb(255, 136, 0).bold(bucket));

    process.env.DOMAIN = bucket
    process.env.PRO = dir.toUpperCase()
    process.env.project = resolve(__dirname, `../src/${mode}/${dir}`)
    require('../build/dev-server')

  })

program
  .command('build [dir]')
  .alias('b')
  .description('打包项目')
  .option('-d, --bucket  [bucket]', '输出服务器环境')
  .option('-m, --mode  [mode]', '输出项目模式')
  .action(function (dir, options) {
    const ep = {
      def: 'views',
      act: 'vpages',
      pc: 'vpcges',
    }
    let bucket = typeof options.bucket=='string' ? options.bucket : "dev"
    let mode = typeof options.mode=='string' ? options.mode : "vpages"
    // let root = path.resolve(__dirname, `../src/${ep[dir]}`)
    generateProject(dir, mode, bucket)

  })

program
  .command('upload [dir]')
  .alias('u')
  .description('上传项目')
  .option('-d, --bucket  [bucket]', '输出服务器环境')
  .option('-n, --name  [mode]', '输出项目名 鲸鱼jr 鲸鱼选股jrxg') // 
  .option('-m, --mode  [mode]', '输出项目模式')
  .action(function (dir, options) {
    const ep = {
      def: 'views',
      act: 'vpages',
      pc: 'vpcges',
    }
    let bucket = typeof options.bucket=='string' ? options.bucket : "dev"
    let mode = typeof options.mode=='string' ? options.mode : "vpages"
    let name = typeof options.name=='string' ? options.name : "jr"

    upload(dir, mode, bucket, name)

  })

  program.on('--help', function(){
    console.log('');
    console.log(chalk.green('  示例: '));
    console.log('');
    console.log('  $ jinr init');
    console.log('  $ jinr start xx');
    console.log('  $ jinr build');
    console.log('  $ jinr upload');
    console.log('');
  });

program.parse(process.argv)

if (!program.args.length) program.help();
