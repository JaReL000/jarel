/**
 * Created by weizihua on 2017/11/1.
 */

import BScroll from 'better-scroll'
// import MiniRefreshTools from "minirefresh"
export default {
  data(){
    return{
      resf:[],
      total:[],
      oldPage: []
    }
  },
  methods: {
    onTabFun(){},

    // 手势滑动 左右切换
    onSwitchChange(index){
      let obj = this.listItems[index]
      // 第一次请求且非请求中状态
      if(obj.oneReload && !obj.responseing){
        this._apiListFun(index)
      }
    },

    _request(index, data){
      // console.log('进来了-----',index)
      if(this.oldPage[index] === data.page) return  // 防止重复请求同一页
      this.oldPage[index] = data.page
      this.listItems[index].responseing = true //请求中
      this.listItems[index].isMore = false
      // 发送请求
      console.log('data------------', this.oldPage[index] , data.page)
      this.$http(data).then((response) => {
        // 处理数据源 是否第一次请求
        if(this.listItems[index].oneReload){
          // console.log('进入1', response)
          this.listItems[index].dataLists = response
          this.listItems[index].oneReload = false
          // console.log('response', response)
          // console.log('--------')
          this.resf[index].endUpLoading(this.listItems[index].dataLists.list.length >= response.total)  // 是否停止上拉刷新
        }else{
          // 废弃
          // response.list.forEach((value) => {
          //   this.listItems[index].dataLists.list.push(value)
          // });
          console.log('进入2',index,this.indexTab, this.resf)
          this.listItems[index].dataLists.list =
          this.listItems[index].dataLists.list.concat(response.list)
          this.resf[index].endUpLoading(this.listItems[index].dataLists.list.length >= response.total)
           // 是否停止上拉刷新
          this.total[index] = response.total
        }

        // 第一次加载添加滚动 其余刷新处理
        this.$nextTick(()=>{
          if(!this.listItems[index].scroll){
            let elClass = '.' + this.listItems[index].refName
            // this.listItems[index].scroll =
            // new BScroll(document.querySelector(elClass), {
            //     click: true
            // })
          }else{
            // this.listItems[index].scroll.refresh()
          }
          this.listItems[index].page++
          // console.log(' this.listItems[index].page++',  this.listItems[index].page++)
        })

        // 一个请求结束
        this.listItems[index].responseing = false
        // 请求长度是否等于数组条数
        this.listItems[index].isMore =
          !(this.listItems[index].dataLists.list.length >= this.listItems[index].dataLists.total)
      }).catch((err)=>{
        this.resf[index].endUpLoading(true)
      })
    },


    // 去激活
    deActiva(index, cuserid, coupon_type){
      let platform = this.isIOS ? 3 : 4

      this.$http({
        method: 'user.coupon.activate',
        token: this.$root.appData.token,
        platform: platform,
        cuserid: cuserid
      }).then((res)=>{


        if(res.code === 1000000){
          this.$flash(res.msg)

        }else if(res == 1000000){
          this.listItems[2].dataLists.list[index].status = 2
        }

        // this.$flash('激活成功')
      }).catch(function(error){
        console.log(res.msg)
      });
    },

    // 进入详情
    goToDetaliFun(cuserid, type){
      this.type = type
      this.$router.push({
        path: `/welfare/myCore/detail`,
        query: {
          type,
          cuserid
        }
      })
    },
  }
}