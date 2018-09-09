module.exports = file => require('../' + file + '.vue').default

// module.exports = file => (resolve) => {

//   import('../' + file + '.vue').then((module) => {
//     resolve(module)
//   })
// }
