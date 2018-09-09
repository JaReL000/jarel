const getters = {
  maskShowFlag: state => {
    return state.popName !== ''
  },
  gameEndTimes: state => {
    const nowTime = state.nowTime
    const endTime = state.gameOverTimes
    if (nowTime > endTime) {
      const timer = {
        day: '0',
        hours: '0',
        minutess: '0',
        seconds: '0'
      }
      return timer
    } else {
      return countEndTimer(endTime, nowTime)
    }
    function countEndTimer (endTime, nowTime) {
      const t = endTime - nowTime
      const secondsTime = 1000
      const minutessTime = 60 * secondsTime
      const hoursTime = 60 * minutessTime
      const dayTime = 24 * hoursTime
      // 总时间取余得到的是，这个时间段以内，不够一天的时间所表达的毫秒数。
      // 总时间毫秒值减去不到一天的毫秒值，除以一整天的毫秒值，得到的就是总时间内完整的天数。
      // 以此类推，总时间减去整天所占用的毫秒数，除以一整个小时的毫秒值，得到的就是完整的小时。
      // 总时间减去整天所占用的毫秒数和完整的小时和完整的小时所占用的毫秒数，除以一分钟的毫秒值，得到的就是完整的分钟。
      // 总时间减去整天，整小时，整分钟，所占用的毫秒数，除以一秒钟的毫秒值，舍去小数点后面的得到的就是完整的秒数。
      const day = (t - (t % dayTime)) / dayTime

      const dayMS = day * dayTime

      const noOneDay = t - dayMS

      const hours = (noOneDay - (noOneDay % hoursTime)) / hoursTime

      const hoursMS = dayMS + hours * hoursTime

      const noOneHours = t - hoursMS

      const minutess = (noOneHours - (noOneHours % minutessTime)) / minutessTime

      const minutesMS = hoursMS + minutess * minutessTime

      const seconds = ((t - minutesMS) / secondsTime).toFixed(0)

      function supplement (val) {
        return val < 10 ? '0' + val : val
      }
      return {
        day: supplement(day),
        hours: supplement(hours),
        minutess: supplement(minutess),
        seconds: supplement(seconds)
      }
    }
  }
}

export default getters
