<template>
  <div>
    <a :href="info.link">
      <img :src="info.src" :alt="info.alt">
    </a>
  </div>  
</template>

<script>
export default {
  name: 'box-item',
  props: {
    info: {
      type: Object,
      default () {
        return {
          src: '',
          alt: '',
          link: 'javascript:;'
        }
      }
    }
  }
}
</script>

<style scoped>
div{
  width: 750px;
  font-size: 0;
}
div>a{
  font-size: 0;
  text-decoration: none;
  display: inline-block;
  width: 100%;
  height: 100%;
}
div>a>img{
  width: 100%;
}
</style>
