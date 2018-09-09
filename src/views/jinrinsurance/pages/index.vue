<template>
  <article class="index">
      <x-header 
      slot="header"
      class="x-header"
      :title="titleOptions"
    ></x-header>
    <section>
      <box v-for="info in imglist" :info="info"></box>
    </section>
  </article>
</template>

<script>
import XHeader from 'components/x-header/index.vue'
import Box from '../components/box'
export default {
  name: 'index',
  components: {
    XHeader,
    Box
  },
  data () {
    return {
      pageTitle: '鲸鱼保险',
      imglist: [
        {
          src: require('../assets/images/index/001.png'),
          alt: '鲸鱼保险',
          link: 'javascript:;'
        },
        {
          src: require('../assets/images/index/002.png'),
          alt: '鲸鱼保险',
          link: 'javascript:;'
        },
        {
          src: require('../assets/images/index/003.png'),
          alt: '鲸鱼保险',
          link: '#/product-a'
        },
        {
          src: require('../assets/images/index/004.png'),
          alt: '鲸鱼保险',
          link: 'javascript:;'
        },
        {
          src: require('../assets/images/index/005.png'),
          alt: '鲸鱼保险',
          link: 'javascript:;'
        }
      ]
    }
  },
  computed: {
    titleOptions(){
      return {
        name: '鲸鱼保险'
        // name: this.$root.title
      }
    }
  },
  methods: {
    init () {
    }
  },
  watch: {},
  created () {
    this.init()
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
 