<template>
   <div>xxxx</div>
</template>
<script>
export default {
  created() {
    let data = {
      servicename: "activity.safe.and.daily.walf",
      v: "1.0.0",
      appid: "jinr_activity",
      request_no: "ctgqyearinvest68f66b5b72b864dd389748bffe112f4f3333",
      timestamp: new Date().getTime()
    };
    this.$http('/',data).then(res=>{
      console.log(res)
    });
  }
};
</script>
