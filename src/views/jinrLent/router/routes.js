// import page1 from '../views/page1/page1'
// console.log('-----xxxx----', page1)
export const routes = [
  {
    path:'/',
    name: 'index',
    component: r => require.ensure([],()=>r(require('../views/page1/page1.vue')),'index')
  }
]

// exports = module.exports =  routes