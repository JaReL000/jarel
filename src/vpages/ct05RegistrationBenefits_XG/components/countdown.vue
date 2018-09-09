<template>
 <div class="Countdown">
   <div class="Countdown-play" v-if="totalSeconds>0">
      倒计时:
      <span v-text="day"></span> 天
      <span v-text="hour"></span> 时
      <span v-text="minute"></span> 分
      <span v-text="seconds"></span> 秒
   </div>
   <div class="start" v-else>
      活动结束
   </div>
</div>
</template>
<script>
export default {
  name: "Countdown",
  props: {
    times: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      totalSeconds: 0
    };
  },
  computed: {
    day() {
      // 天
      return Math.floor(this.totalSeconds / (3600 * 24*1000));
    },
    hour() {
      // 时
      let temp = this.totalSeconds % (3600*1000 * 24);
      return Math.floor(temp / (3600*1000));
    },
    minute() {
      let temp = this.totalSeconds % 3600;
      return Math.floor(temp / 60);
    },
    seconds() {
      return this.totalSeconds % 60;
    }
  },
  mounted() {},
  methods: {
    play() {
      let timeId = setInterval(() => {
        if (this.totalSeconds == 0 || this.totalSeconds < 0) {
          clearInterval(timeId);
        } else {
          this.totalSeconds--;
        }
      }, 1000);
    }
  },
  watch: {
    times(val) {
      console.log("times", this.times);
      this.totalSeconds = val;
      this.play();
    }
  }
};
</script>
