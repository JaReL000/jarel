<template>
  <div class="header-box">
    <a href="javascript:;" @click="back"></a>
    <h1>{{pageTitle}}</h1>
  </div>
</template>

<script>
export default {
  name: 'back',
  data () {
    return {
    }
  },
  props: {
    pageTitle: {
      type: String,
      default () {
        return ''
      }
    }
  },
  methods: {
    back () {
      try {
        /* global Jinr */
        Jinr.finish()
      } catch (error) {
        window.history.back()
      }
    }
  },
  created () {
  }
}
</script>

<style scoped>
.header-box{
  position: relative;
  height: 90px;
  background: #ffffff;
}
.header-box>a{
  display: block;
  width: 50px;
  height: 100%;
  position: absolute;
  left: 30px;
  background: url('../assets/title_arrow.png') no-repeat center center / 25px 45px;
}
.header-box>h1{
  color: #333;
  margin: 0;
  line-height: 90px;
  font-size: 34px;
}
</style>
