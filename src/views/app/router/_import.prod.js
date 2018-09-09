// module.exports = file => () => import('@/views/' + file + '.vue')

// 同步
module.exports = file => require('../' + file + '.vue').default

/**
 * 异步加载组件
 * @param file
 */
// module.exports = file => (resolve) => {
//   import('../' + file + '.vue').then((module) => {
//     resolve(module)
//   })
// }