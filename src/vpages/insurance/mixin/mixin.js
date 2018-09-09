export default{
  methods:{
    sessionSet(key,value){
      console.log(window.sessionStorage)
      let session = window.sessionStorage
      value = typeof value === 'object' ? JSON.stringify(value) : value
      session.setItem(key,value)
    },
    sessionGet(key){
      let session = window.sessionStorage
      let value
      try {
        value = JSON.parse(session.getItem(key))
      } catch (error) {
        value = session.getItem(key)
      }
      return value
    },
  }
}