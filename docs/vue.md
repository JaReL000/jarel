```js 
// 2. 打开vue-resource的from-data模式，否则post过去的数据会是json形式，php无法识别
Vue.http.options.emulateJSON = true;

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
   mode: 'hash',   // 强制使用hash模式进行导航，不能指望服务器支持history
   routes: routes,  // （缩写）相当于 routes: routes
   hashbang: true,//去除#！开头
   transitionOnload: false,//初次加载的时候是否对<router-view>处理场景切换效果
   history: true,//是否开启html5模式，去掉锚点
   saveScrollPosition: true, //记住页面的滚动位置 html5模式适用
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
```

## 标准实例
```js 
export default {
  name: 'jinr',
  
  data(){},
  props: {},
  mixins: [mixin],
  computed: {},
  watch: {},

  beforeCreate(){},
  created(){},
  beforeMount(){},
  mounted(){},
  beforeUpdate(){},
  updated(){},
  beforeDestroy(){},
  destroyed(){},

  directives: {}, // 注册局部指令
  filters: {},
  components: {},
  methods: {},

  // 高阶插件/组件库提供用例
  provide: {},
  inject: {},

  delimiters: ['${', '}'], //分隔符变成了 ES6 模板字符串的风格 默认值：["{{", "}}"]
  functional,
  model: {},
}
```

## 实例属性

```js 
vm.$data
vm.$props
vm.$el
vm.$options
vm.$parent
vm.$root
vm.$children
vm.$slots
vm.$scopedSlots
vm.$refs
vm.$isServer
vm.$attrs
vm.$listeners
```

## 实例方法 / 数据

```js 
/**
 * @param {string | Function} expOrFn
 * @param {Function | Object} callback
 * @param {Object} [options=>{{boolean} deep, {boolean} immediate}]
 * @returns {Function} unwatch
 */
vm.$watch( expOrFn, callback, [options] )

/**
 * @param {Object | Array} target
 * @param {string | number} key
 * @param {any} value
 * @returns 设置的值
 */
vm.$set( target, key, value )

/**
 * @param {Object | Array} target
 * @param {string | number} key
 */
vm.$delete( target, key )

```

## 实例方法 
```js 
// 事件
vm.$on( event, callback )
vm.$once( event, callback )
vm.$off( [event, callback] )
vm.$emit( event, […args] )

// 生命周期
vm.$mount( [elementOrSelector] )
vm.$forceUpdate()
vm.$nextTick( [callback] )
vm.$destroy()
```

## 指令
```js 
v-text
v-html
v-show
v-if
v-else-if
v-else
v-for
v-on
v-bind
v-model
v-pre
v-cloak
v-once

//特殊特性
key
ref
slot
slot-scope
is

//内置的组件
component
transition
transition-group
keep-alive
slot
```

## 全局配置
```js 
// 是一个对象，包含 Vue 的全局配置。可以在启动应用之前修改下列属性：
Vue.config = {
  silent: false, //取消 Vue 所有的日志与警告。
  optionMergeStrategies,
  devtools,  //默认值：true (生产版为 false)
  errorHandler: undefined,
  warnHandler: undefined,
  ignoredElements: [],
  keyCodes: {}, //给 v-on 自定义键位别名。
  performance: false,
  productionTip: true, //设置为 false 以阻止 vue 在启动时生成生产提示。


}

```

```css

overflow: hidden;
text-overflow:ellipsis;
white-space: nowrap;


display: -webkit-box;
-webkit-box-orient: vertical;
-webkit-line-clamp: 3;
overflow: hidden;
```
```js 

import Vue from 'vue'

import VueRouter from 'vue-router'
import VueResource from 'vue-resource'// 注册两个插件
import routes  from './router.js'

import main from './main.vue'

Vue.use(VueResource);
Vue.use(VueRouter);

// 1. 开启debug模式
Vue.config.debug = true

// 2. 打开vue-resource的from-data模式，否则post过去的数据会是json形式，php无法识别
Vue.http.options.emulateJSON = true;

// 3. 创建 router 实例，然后传 `routes` 配置
// 你还可以传别的配置参数, 不过先这么简单着吧。
const router = new VueRouter({
    mode: 'hash',   // 强制使用hash模式进行导航，不能指望服务器支持history
    routes:routes,  // （缩写）相当于 routes: routes
})

// 4. 创建和挂载根实例。
// 记得要通过 router 配置参数注入路由，
// 从而让整个应用都有路由功能
const app = new Vue({
    render: h => h(main),
    router:router,
}).$mount('#app')
```