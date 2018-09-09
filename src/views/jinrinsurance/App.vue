<template>
  <article id="app">
    <router-view ></router-view>
  </article>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
    }
  },
  computed: {
  },
  methods: {
  },
  created () {
  },
  watch: {
  }
}
</script>

<style>
body{
  margin: 0;
}
body>a{
  display: none;
}
body p,
body ul,
body li,
body ol,
body dl,
body dd{
  margin: 0;
  padding: 0;
}
body button{
  outline: none;
  border: none;
}
html,
body {
  padding-top: constant(safe-area-inset-top);   
  /*为导航栏+状态栏的高度 88px         */
  padding-left: constant(safe-area-inset-left);   
  /**如果未竖屏时为0   */             
  padding-right: constant(safe-area-inset-right); 
  /**如果未竖屏时为0                */
  padding-bottom: constant(safe-area-inset-bottom);
  /**为底下圆弧的高度 34px       */
  background: #ffffff;
}
@media only screen and (device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3){
  html,
  body{
    padding-bottom:80px!important;
    background-color:#ffffff;
  }
}
#app{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  text-align: center;
  width: 750px;
  margin: 0 auto;
}
#app.fix-scroll{
  height: 100vh;
  overflow: hidden;
}
#warning{
  position: fixed;
  top: 7rem;
  width: 7rem;
  left: 1.5rem;
  box-sizing: border-box;
  text-align: center;
  font-size: .5rem;
  padding: .6rem;
  background: rgba(0, 0, 0, .9);
  color: red;
  text-align: center;
  border-radius: .2rem;
}
</style>
