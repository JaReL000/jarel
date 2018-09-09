"use strict"
/**
 * Created by weizhua on 2018/4/10.
 */

const fs = require("fs")
const rm = require('rimraf')
const path = require('path')
const chalk = require('chalk')

let json = {
  name: '',
  value: '',
  directory: '',
  version: '',
  title: "",
  project: {},
  port: 8080,

  // dev: {
  //   domain: '"http://jinrpc.dev.jinr.com"',
  //   bucket: 'jinrfedev',
  // },
  // pre: {
  //   domain: '"http://jinrpc.pre.jinr.com"',
  //   bucket: 'jinrfepre',
  // },
  // beta: {
  //   domain: '"http://jinrpc.beta.jinr.com"',
  //   bucket: 'jinrfebeta',
  // },
  // prod: {
  //   domain: '"http://jinr.com"',
  //   bucket: 'jinrfe',
  // },


  dev: {
    domain: '"http://hbnew.dev.jingyugame.com"',
    bucket: 'jinrfedev',
  },
  pre: {
    domain: '"http://hbnew.pre.jingyugame.com"',
    bucket: 'jinrfepre',
  },
  beta: {
    domain: '"http://hbnew.beta.jingyugame.com"',
    bucket: 'jinrfebeta',
  },
  prod: {
    domain: '"http://hbnew.jingyugame.com"',
    bucket: 'jinrfe',
  },


  // dev: {
  //   domain: '"http://jinrapp.dev.jinr.com"',
  //   bucket: 'jinrfedev',
  // },
  // pre: {
  //   domain: '"http://jinrapp.pre.jinr.com"',
  //   bucket: 'jinrfepre',
  // },
  // beta: {
  //   domain: '"http://jinrapp.beta.jinr.com"',
  //   bucket: 'jinrfebeta',
  // },
  // prod: {
  //   domain: '"https://jinrapp.jinr.com"',
  //   bucket: 'jinrfe',
  // },
}

/**
 * 
 * @param {*} dir 目录
 * @param {*} version 版本
 * @param {*} describe 描述
 * @param {*} title 标题
 * @param {*} mode 模式
 * @param {*} port 端口号
 */
exports.generateProjectJson = function(dir, version, describe, title, mode, port, proxy) {

  console.log('')
  // console.log(chalk.red('上传静态文件'))     
  console.log(chalk.rgb(255, 136, 0).bold('配置文件 -- project.json'))     
  console.log('')

  let rootDir = `src/${mode}`
  
  let root = path.resolve(__dirname, `../../${rootDir}/${dir}`)
  
  
  // 重写
  json.name = describe
  json.directory = dir
  json.title = title 
  json.value = dir.toUpperCase(),
  json.proxy = proxy || '',
  json.arrAPI = [],
  

  json.project[dir] = './src/' + mode + '/' + dir

  json.port = port

  console.log("于%s 创建目录 %s", rootDir, dir);

  // 创建文件
  fs.writeFileSync(`${root}/project.json`, JSON.stringify(json, null, 2));
  // console.log("创建成功。");

  // // 创建目录
  // fs.mkdir(root,function(err){
  //   if (err) {
  //     return console.error(err);
  //   }
  // });

  return

  // 删除 dir 目录
  rm(root, err => {
    // console.log("于%s 创建目录 %s", rootDir, dir);
    
    // // 创建目录
    // fs.mkdir(root,function(err){
    //   if (err) {
    //     return console.error(err);
    //   }

    //   // 创建文件
    //   fs.writeFileSync(`${root}/index.json`, JSON.stringify(json, null, 2));
    //   console.log("创建成功。");
    // });

  })

}