"use strict"
/**
 * Created by weizhua on 2018/4/10.
 */

const fs = require('fs');
const co = require('co');
const path = require('path');
const chalk = require('chalk')
const oss = require('ali-oss');

const config = require('../config')
const store = oss(config.ossEnv);
const ProgressBar = require('./progress.bar');

// 初始化一个进度条长度为 50 的 ProgressBar 实例
const pb = new ProgressBar('上传进度', 50);

(() => {

  const root = path.resolve(__dirname, '../dist');
  const files = [];
  function readDirSync(p) {
    const pa = fs.readdirSync(p);
    pa.forEach((e) => {
      const cur_path = `${p}/${e}`;
      const info = fs.statSync(cur_path);
      if (info.isDirectory()) {
        readDirSync(cur_path);
      } else {
        files.push(cur_path);
      }
    });
  }
  readDirSync(root);
  co(function* () {
    for (let index = 0; index < files.length; index += 1) {
      const e = files[index];
      const result = yield store.put(e.replace(root, ''), e);
      pb.render({ completed: index, total: files.length-1 });
    }
    console.log('')  
    console.log(chalk.rgb(255, 136, 0).bold('上传成功: '))     
    console.log('')
  });
})();



