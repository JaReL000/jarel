<template>
   <div class="agreement">
      <Important-notice v-if="index==1"></Important-notice>
   </div>
</template>
<script>
import ImportantNotice from "./Important-notice";
export default {
  components: {
    ImportantNotice
  },
  mounted() {
    console.log("this", this.index);
  },
  computed: {
    index() {
      return this.$route.query.index || 0;
    }
  }
};
</script>

