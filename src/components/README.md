# 插件开发指南

## 方式

> Vue 的插件必须提供一个公开方法 install，该方法会在你使用该插件，也就是 Vue.use(yourPlugin) 时被调用，相当于是一个插件的注册或者声明。install 接受 Vue 构造器作为第一个参数，并且有一个可选的选项对象作为第二个参数，比如：

```js
yourPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = ...
  // 2. 添加全局资源
  Vue.directive('my-directive', {})
  // 3. 添加实例方法
  Vue.prototype.$myMethod = ...
}
```

> Vue.js 的插件应当有一个公开方法 install 。这个方法的第一个参数是 Vue 构造器 , 第二个参数是一个可选的选项对象:

```js
// vue插件的编写方法一般分为4类
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或属性，如: vue-custom-element
  Vue.myGlobalMethod = function () {  
    // 逻辑...
  }
  // 2. 添加全局资源：指令/过滤器/过渡等，如 vue-touch
  Vue.directive('my-directive', { 
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
    ...
  })
  // 3. 通过全局 mixin方法添加一些组件选项，如: vuex
  Vue.mixin({
    created: function () {  
      // 逻辑...
    }
    ...
  })
  // 4. 添加实例方法，通过把它们添加到 Vue.prototype 上实现
  Vue.prototype.$myMethod = function (options) {  
    // 逻辑...
  }
}
```

> 接下来要讲到的 vue-toast 插件则是通过添加实例方法实现的。我们先来看个小例子。先新建个js文件来编写插件：toast.js

```js
// toast.js
var Toast = {};
Toast.install = function (Vue, options) {
    Vue.prototype.$msg = 'Hello World';
}
module.exports = Toast;

// 实际代码
var Toast = {};
Toast.install = function (Vue, options) {
    Vue.prototype.$toast = (tips) => {
        let toastTpl = Vue.extend({     // 1、创建构造器，定义好提示信息的模板
            template: '<div class="vue-toast">' + tips + '</div>'
        });
        let tpl = new toastTpl().$mount().$el;  // 2、创建实例，挂载到文档以后的地方
        document.body.appendChild(tpl);     // 3、把创建的实例添加到body中
        setTimeout(function () {        // 4、延迟2.5秒后移除该提示
            document.body.removeChild(tpl);
        }, 2500)
    }
}
module.exports = Toast;
```

> main.js

```js
// main.js
import Vue from 'vue';
import Toast from './toast.js';
Vue.use(Toast);
```

> App.vue

```js
// App.vue
export default {
    mounted(){
        console.log(this.$msg);         // Hello World
    }
}
```