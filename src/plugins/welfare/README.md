<swiper-item :key="0">
          <!--空盒子-->
          <div
            class="empty-item"
            v-if="financingList.list.length ===0 && financingListShow"
          >
            <img src="../images/empty_box.png" alt="空盒子">
            <h3>暂无相关福利</h3>
          </div>
          <!-- 内容区 -->
          <div class="swiper-item" v-if="financingList.list.length !==0">
            <h2>累计获得: <span v-text="financingList.totalMoney+ '元'"></span></h2>
            <ul class="my">
              <li
                v-for="(item, index) in financingList.list"
                @click="goToNext(item.id)"
                :class="{ban: item.status!==1, used: item.status===2}"
                :key="index"
              >
                <div class="li_left">
                  <h4 v-text="item.money">50000.00</h4><span>元</span>
                </div>
                <div class="li_right">
                  <h4 v-text="item.name"></h4>
                  <p v-text="item.intro"></p>
                  <p>有效期至：<label v-text="item.start_date"></label></p>
                </div>
              </li>
              <h3
                v-if="parseFloat(financingList.total)>financingList.list.length && !responseing"
                @click="moreFinancingListFun"
              >点击加载更多</h3>
            </ul>
          </div>
        </swiper-item>




         <!--空盒子-->
          <div
            class="empty-item"
            v-if="cashList.list.length===0 && cashListShow"
          >
            <img src="../images/empty_box.png" alt="空盒子">
            <h3>暂无相关福利</h3>
          </div>
          <!-- 内容区 -->
          <div class="swiper-item" v-if="cashList.list.length !==0">
          <h2>累计获得: <span v-text="cashList.totalMoney+ '元'"></span></h2>
          <ul class="my">
            <li
              v-for="(item, index) in cashList.list"
              @click="goToNext1(item.id)"
              :key="index"
            >
              <div class="li_left">
                <h4 v-text="item.money">50000.00</h4><span>元</span>
              </div>
              <div class="li_right">
                <h4 v-text="item.name"></h4>
                <p v-text="item.intro"></p>
                <p>领取时间：<label v-text="item.get_time"></label></p>
              </div>
            </li>
            <h3 v-if="parseFloat(cashList.total)>cashList.list.length" @click="moreCouponListFun">点击加载更多</h3>
          </ul>
          <h3
            v-if="parseFloat(cashList.total)>cashList.list.length && !responseing"
            @click="moreCashListListFun"
          >点击加载更多</h3>
          </div>



           <!--空盒子-->
          <div
            class="empty-item"
            v-if="couponList.list.length ===0 && couponListShow"
          >
            <img src="../images/empty_box.png" alt="空盒子">
            <h3>暂无相关福利</h3>
          </div>
          <!-- 内容区 -->
          <div class="swiper-item"  v-if="couponList.list.length !==0">
            <h2>累计获得: <span v-text="couponList.total+ '张'"></span></h2>
          <ul class="my">
            <li
              v-for="(item, index) in couponList.list"
              @click="goToNext2(item.id, item.coupon_type)"
              :class="{ban: item.status!==1, used: item.status===2, expire: item.status===3}"
              :key="index"
            >
              <div
                class="li_left_img"
                v-if="item.coupon_type==='4' && item.status===1"
              ><img
                src="../images/rocket_bg.png"
                alt="火箭"></div>
              <div
                class="li_left_img"
                v-if="item.coupon_type==='4' && item.status!==1"
              ><img
                src="../images/rocket_ban_bg.png"
                alt="火箭禁止"></div>
              <div
                class="li_left"
                v-if="item.coupon_type!=='4'"
              >
                <h4  v-text="item.money"></h4><span v-if="item.coupon_type!=='1'">元</span><span v-if="item.coupon_type==='1'">%</span>
              </div>
              <div class="li_right">
                <h4 v-text="item.name"></h4>
                <p v-text="item.intro"></p>
                <p>有效期至：<label v-text="item.end_date"></label></p>
              </div>
              <div
                class="jiaxi"
                v-if="item.coupon_type==='1'&&item.status===1&&item.is_invoke===1"
                @click.stop.prevent ="userJiaxi(index, item.id)"

              >去激活</div>
            </li>
          </ul>
          <h3
            v-if="parseFloat(couponList.total)>couponList.list.length && !responseing"
            @click="moreCouponListFun"
          >点击加载更多</h3>
          </div>



           // 使用加息
      userJiaxi(index, id){
        let params = {
          coupon_id: id 
        }
        postApi(activeCurrentCoupon, params).then((response) => {
          if(response.code === 1000){
            this.couponList.list[index].status = 2
            this.couponList.list.forEach((value, index) => {
              this.couponList.list[index].is_invoke = 0
            });


          }else {
            this.$flash(response.msg)
          }
        })
      },
      menuFun(){
        this.sildShow = !this.sildShow
      },
      demo01_onIndexChange (index) {
        this.demo01_index = index
      },
      switchTabFun(item, index){
        if(index===0 && !this.financingListShow){
          this.redPacketList(21)
        }
        if(index===1 && !this.cashListShow){
          this.redPacketList(22)
        }
        if(index===2 && !this.couponListShow){
          this.myWelfareCoupon()
        }
      },

      // 现金红包
      myWelfareCash(){
        this.responseing = true
        postApi(cash).then((response) => {
          this.responseing = false
          if(response.code === 1000){
            this.cashList = response.data.list
            this.show = true
            this.cashListShow = true

          }else {

          }
        })
      },

      // 卡券
      myWelfareCoupon(){
        this.responseing = true
        let params = {
          pageSize: 20,
          token: testUser.token
        }
        postApi(coupon, params).then((response) => {
          this.responseing = false
          if(response.code === 1000){
            this.couponList = response.data.list
            this.show = true
            this.couponListShow = true

          }else {

          }
        })
      },

        // 加载更多卡券
      goToDetailFun(url){
        this.responseing = true
        postApi(url).then((response) => {
          this.responseing = false
          if(response.code === 1000 ){
            this.nextData = response.data
            this.$router.push('/myWelfare/myWelfareDetail')
          }else {

          }
        })
      },

      // 加载更多卡券
      moreCouponListFun(){
        this.responseing = true
        let params = {
          page: this.couponIndex
        }
        postApi(coupon, params).then((response) => {
          this.responseing = false
          if(response.code === 1000 && this.couponList.list.length!==0){
            response.data.list.list.forEach((value, index) => {
              this.couponList.list.push(value)
            });
            this.couponIndex++

          }else {

          }
        })
      },

       // 加载更多理财红包
      moreFinancingListFun(){
        this.responseing = true
        let params = {
          page: this.financingIndex
        }
        postApi(financing, params).then((response) => {
          this.responseing = false
          this.$Object.goIndex(response.code, response.data.isLogin)

          if(response.code === 1000 && this.financingList.list.length!==0){
            response.data.list.list.forEach((value, index) => {
              this.financingList.list.push(value)
            });
            this.financingIndex++

          }else {

          }
        })
      },

       // 加载更多现金
      moreCashListFun(){
        this.responseing = true
        let params = {
          page: this.cashIndex
        }
        postApi(cash, params).then((response) => {
          this.responseing = false
          if(response.code === 1000 && this.cashList.list.length!==0){
            response.data.list.list.forEach((value, index) => {
              this.cashList.list.push(value)
            });
            this.cashIndex++

          }else {

          }
        })
      },



// 进入下一页面
      goToNext(id){
          this.goToDetailFun(financingDetail+id)
      },
      // 进入下一页面
      goToNext1(id){
        this.goToDetailFun(cashDetail+id)
      },
      // 进入下一页面
      goToNext2(id, coupon_type){
        if(coupon_type!=='4'){
          this.goToDetailFun(coupoDetail+id)
        }

      },
