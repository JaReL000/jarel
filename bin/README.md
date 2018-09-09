# 鲸鱼工程工具

命令行模式功能开发: 初始化项目、启动本地服务、打包文件、上传文件至OSS

###  连接快捷键
使用`jinr`进行关联操作，等价于`node bin`命令启动

```bash
#连接快捷键
npm link # node bin === jinr

```

### 初始化项目
首先会从远程仓库下载模板(temp), 然后生成`project.json`配置文件, 配置操作如下

> 请输入项目名称
> 请输入描述
> 请输入标题
> 选择项目模式
> 请输入端口号

#### 关于给项目取名字
 活动类型(2字符)+  编号ID(2字符)+ 项目名(3~6字符) + 版本(1~2字符)

> 活动类型
拉新 lx
促投 ct
赌博 db
引导 yd
游戏 yx

> 编号ID (自行定义)
7122 xx
7205 cc
7200 bb
7231 aa

> 项目名
自己定义

> 版本


执行以下命令
```bash
# 引导式操作
jinr init

# 全命令操作
node bin init app -d '描述' -t '标题' -v '版本' -m 'views' -p '端口'

```

> 最后一个选项为设置代理， 即工程配置文件`project.json`中`proxy`设置代理的域名， 默认不填写为不代理，代理的api在项目目录`project.json`中字段`arrAPI`配置, 如下
```js
{
  "arrAPI": [
    '/api'
  ]
}
  
```

### 启动服务

以命令行形式启动具体项目，命令如下
```bash

jinr start yybg

# 或者
node bin start yybg

```

### 打包项目

```bash
jinr build

# 或者
node bin build(u)
```

### 上传文件
默认检索`vpages`文件， 如果需要检索某个文件需添加`-m views`
- eg 上传views文件夹中的文件：

```bash
 jinr u -m  views // jinr u 默认上传vpages中的文件
```


```bash

jinr upload(u) 项目名

# 或者
node bin upload(u)

# 检索具体某个文件
jinr upload(u) 项目名 -m views

```