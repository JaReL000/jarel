## commander API
* command – 定义命令行指令，后面可跟上一个name，用空格隔开，如 .command( ‘app [name] ‘)
* alias – 定义一个更短的命令行指令 ，如执行命令$ app m 与之是等价的
* description – 描述，它会在help里面展示
* option – 定义参数。它接受四个参数，在第一个参数中，它可输入短名字 -a和长名字–app ,使用 | 或者,分隔，在命令行里使用时，这两个是等价的，区别是后者可以在程序里通过回调获取到；第二个为描述, 会在 help 信息里展示出来；第三个参数为回调函数，他接收的参数为一个string，有时候我们需要一个命令行创建多个模块，就需要一个回调来处理；第四个参数为默认值
* action – 注册一个callback函数,这里需注意目前回调不支持let声明变量
* parse – 解析命令行

###inquirer功能简介

* input–输入
* validate–验证
* list–列表选项
* confirm–提示
* checkbox–复选框等等

```js
/**
 * type {String} [input，confirm， list，rawlist，expand，checkbox，password，editor]
 * name {String} 将答案存储在答案哈希中时使用的名称。如果名称包含句点，它将在答案哈希中定义一个路径
 * message {String | Function} 要打印的问题。如果定义为一个函数，第一个参数将是当前查询者会话的答案
 * default  {String | Number | Array | Function} 如果没有输入任何内容，或者返回默认值的函数，则使用默认值。如果定义为一个函数，第一个参数将是当前查询者会话的答案。
 * choices (Array|Function)
 * validate (Function)
 * filter (Function) 
 * when {Function，Boolean} 接收当前用户的回答哈希，应该返回true或false取决于是否应该问这个问题。该值也可以是一个简单的布尔值。
 * pageSize {Number} 更改将使用时呈现的行数list，rawList，expand或checkbox。
 * prefix {String} 更改默认的前缀消息
 * suffix {String} 更改默认的后缀消息。
 */
```