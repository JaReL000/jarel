<template>
  <article class="product-a">
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
import Box from '../components/box'
import XHeader from 'components/x-header/index.vue'
export default {
  name: 'product-a',
  components: {
    Box,
    XHeader
  },
  data () {
    return {
      pageTitle: '鲸鱼保险',
      imglist: [
        {
          src: require('../assets/images/illness/001.png'),
          alt: '鲸鱼保险',
          link: 'javascript:;'
        },
        {
          src: require('../assets/images/illness/002.png'),
          alt: '鲸鱼保险',
          link: 'javascript:;'
        },
        {
          src: require('../assets/images/illness/003.png'),
          alt: '鲸鱼保险',
          link: 'javascript:;'
        },
        {
          src: require('../assets/images/illness/004.png'),
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
  