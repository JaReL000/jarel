"use strict"
/**
 * Created by weizhua on 2018/4/10.
 */

const fs = require("fs")
const path = require('path')
const chalk = require('chalk')
const { prompt } = require('inquirer')

const { writeFile } = require('fs')
const { resolve } = require('path')

const promps = [
  {
    type: 'list',
    name: 'project',
    prefix: '',
    suffix: '',
    message: '选择以下那个项目',
    choices: []
  },
  {
    type: 'list',
    name: 'bucketServers',
    message: '想用那个bucket服务器',
    choices:  [
      {
        name: '开发机',
        value: 'dev'
      }, {
        name: '预发布机',
        value: 'pre'
      }, {
        name: '公测机',
        value: 'beta'
      },
      {
        name: '正式机',
        value: 'prod'
      },
    ]
  },
]

const res = command => resolve(__dirname, '../../src/views/', command)
exports.generateProject = (dir, mode, bucket) =>{
  console.log('')
  // console.log(chalk.red('上传静态文件'))     
  console.log(chalk.rgb(255, 136, 0).bold('打包文件: '))     
  console.log('')

  let num = 0
  let project = []
  let bucketServers = []
  dir = dir 
      ? resolve(__dirname, `../../src/${mode}/${dir}`)
      : resolve(__dirname, `../../src/${mode}`)
  const pa = fs.readdirSync(dir);
  console.log(dir);
  pa.forEach((el) => {
    const cur_path = `${dir}/${el}`;
    const info = fs.statSync(cur_path);
    if (info.isDirectory()) {
      
      let item = {}
      item.name = require(res(el)+'/project.json').name
      // item.value = require(res(el)+'/project.json').project
      item.value = res(el)
      project[num] = item

      num++
    } else {
      // files.push(cur_path);
    }
    
  });
  promps[0].choices = project
  
  prompt(promps).then((answers) => {
    // console.log(answers);
    process.env.project = answers.project
    process.env.bucketServers = answers.bucketServers

    // return
    const build = require('../../build/build')
  
  })
}