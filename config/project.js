"use strict"

// 扩展配置说明
// 获取项目版本号，用以生成目录
const fs = require("fs")
const { resolve } = require('path')
let project = process.env.project || resolve(__dirname, '../src/views/app')
const projectEnv = require(project + '/project.json')

let bool = process.env.project && process.env.bucketServers
const projectName = bool ?
  process.env.project :
  process.env.PRO || 'newbie'
const projectDomain = bool ?
  process.env.bucketServers :
  process.env.DOMAIN || 'dev';

// console.log(projectName, projectDomain);

const name = projectEnv.name
const directory = projectEnv.directory
const version = projectEnv.version

module.exports = {
  // 方便当出现多项目、多页面需求时的进一步扩展。不能与其他项目重名
  name, // 项目描述
  directory, // 项目名：multi_vue_demo。
  title: projectEnv.title,
  version, // 版本号，据此生成map.json与项目目录
  static_root: directory ? directory + '/' + version + '/' : '', // 静态资源路径(线上的assets,html,js文件夹所在路径)
  project: projectEnv.project,
  domain: projectEnv[projectDomain].domain,
  projectName,
  port: projectEnv.port,
  bucket: projectEnv[projectDomain].bucket || 'jinrfedev',
};