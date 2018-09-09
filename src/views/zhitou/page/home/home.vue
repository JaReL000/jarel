<template>
  <div class="index">
    <img v-for="(item,index) in imgUrl" :key="index" :src="item">
  </div>
</template>

<script>
import {mapState,mapMutations} from 'vuex'
import * as jrUrl from '../../urlconfig/urlconfig'
import {getRequest,pattern} from '../../util/util'
import Flash from '@/components/flash'
import {fetchWXconfig} from '../../plugin/fetchWXconfig'
import data from './home.js'

export default {
  components: {

  },
  name: 'index',
  data () {
    return {
      ...data
    }
  },
  computed: {
    // ...mapState([]),

  },
  created () {

  },
  mounted () {

  },
  methods: {
    // ...mapMutations([])

  }
}
</script>

<style lang="stylus" scoped>
@import '../../style/mixin.styl'
  .index
    width 100%
    height auto
    overflow hidden
    img 
      width 100%
      display block
</style>

