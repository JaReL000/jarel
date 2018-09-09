"use strict"
/**
 * Created by weizhua on 2018/4/10.
 */

const ora = require('ora')
const chalk = require('chalk')
const { resolve } = require('path')
const { writeFile } = require('fs')
const { prompt } = require('inquirer')
const download = require('download-git-repo')

const generateProjectJson = require('./init.json').generateProjectJson

let downloadAndGenerate = (dir, version, describe, title, mode, port, template) =>{
  let tmp = dir ? 'src/vpages/' + dir :  'src/vpages/' + 'tmp'
  template = template || 'JinrFE/template' 
  let spinner = ora('下载模板中...')
  spinner.start()
  // { clone: true },
  download(template, tmp,  function (err) {
    spinner.stop() 
    if(err){
      console.log('模板下载失败或者文件已经存在')
    }else{
      // 生成json 
      generateProjectJson(dir, version, describe, title, mode, port)
      console.log('初始化成功'); 
    }
  })
}

exports.downloadAndGenerate = downloadAndGenerate

const promps = [
  {
    type: 'input',
    name: 'dir',
    prefix: '',
    suffix: '',
    default: 'temp',
    message: '请输入项目名称'
  },
  {
    type: 'input',
    name: 'describe',
    prefix: '',
    suffix: '',
    default: '这个是一个模板',
    message: '请输入描述'
  },
  {
    type: 'input',
    name: 'title',
    prefix: '',
    suffix: '',
    default: '鲸鱼',
    message: '请输入标题'
  },
  {
    type: 'list',
    name: 'mode',
    message: '选择项目模式',
    choices:  [
      {
        name: '活动H5',
        value: 'vpages'
      },{
        name: '主站业务',
        value: 'views'
      },{
        name: 'PC端项目',
        value: 'vpcges'
      },
    ]
  },
  {
    type: 'input',
    name: 'port',
    prefix: '',
    suffix: '',
    default: '8080',
    message: '请输入端口号'
  },
  {
    type: 'input',
    name: 'proxy',
    prefix: '',
    suffix: '',
    default: '',
    message: '请输入代理域名'
  },
]

exports.initFiles = () => {
  prompt(promps).then((answers) => {
    // console.log(answers);
    downloadAndGenerate(answers.dir, '', answers.describe, answers.title, answers.mode, answers.port, answers.proxy)
    
    
  
  })
}