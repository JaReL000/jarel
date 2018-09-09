"use strict"
/**
 * Created by weizhua on 2018/4/10.
 */

const { prompt } = require('inquirer')
// 通用交互式命令行用户界面的集合。
// const inquirer = require('inquirer')
const { writeFile } = require('fs')
const chalk = require('chalk')
const fs = require("fs")
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
    name: 'ossName',
    message: '上传至那个OSS服务器（默认鲸鱼）',
    choices:  [
      {
        name: '鲸鱼理财',
        value: ''
      }, {
        name: '鲸鱼选股',
        value: 'xg'
      }
    ]
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


exports.upload = (dirs, mode, bucket, name) =>{
  const res = command => resolve(__dirname, `../../src/${mode}`,  command)
  // console.log('')  
  // console.log(chalk.rgb(255, 136, 0).bold('上传静态文件: '))     
  // console.log('')
  let num = 0
  let project = []
  let bucketServers = []

  let dir = dirs 
    ? resolve(__dirname, `../../src/${mode}/${dirs}`)
    : resolve(__dirname, `../../src/${mode}`)

  const pa = fs.readdirSync(dir);
  // console.log(dir);
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
    process.env.isXG = answers.ossName

    process.env.upload = true
    const build = require('../../build/build')
  
  })
}
