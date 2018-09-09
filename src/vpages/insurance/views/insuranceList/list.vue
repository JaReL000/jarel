<template>
   <div>
       <h4 v-text="title"></h4>
       
   </div>
</template>
<script>
export default {
  props:{
    title:{
      type:String,
      default:''
    }
  }
}
</script>

