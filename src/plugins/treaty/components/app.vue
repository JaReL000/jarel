
<template>
<div class="treaty" v-if="show">
 <!-- 周定期合同 -->
  <week-regular v-if="productids==9"
    :username="username"
    :identityid="identityid"
    :mobile="mobile"
    :lock_principal="lock_principal"
    :lock_principal_chanese="lock_principal_chanese"
  ></week-regular>
  <!-- 活期合同 -->
  <current v-else-if="productids==1"
    :username="username"
    :identityid="identityid"
    :mobile="mobile"
    :lock_principal="lock_principal"
    :lock_principal_chanese="lock_principal_chanese"
  ></current>
  <!-- 定期合同 -->
  <regular v-else
    :username="username"
    :identityid="identityid"
    :mobile="mobile"
    :lock_principal="lock_principal"
    :lock_principal_chanese="lock_principal_chanese"
  >
  </regular>
  <p style="text-align:left;text-indent:inherit;">（以下无正文）</p>
  <br/>
  <p class="pindent">甲方&nbsp;:&nbsp;{{username}}</p>
  <p class="pindent">{{year}}年{{month ? month : '&nbsp'}}月{{day ? day : '&nbsp'}}日</p>
  <p class="pindent">乙方&nbsp;:&nbsp;厦门吉才神金融信息技术服务有限公司</p>
  <p class="pindent">{{year}}年{{month ? month : '&nbsp'}}月{{day ? day : '&nbsp'}}日</p>
</div>

</template>

<script>
 import weekRegular from './week-regular' // 周定期合同
 import current from './current' // 活期合同
 import regular from './regular'
  export default {
    name: '',
    components: {
      current,
      weekRegular,
      regular
    },
    // props: {
    //   title: {
    //     type: String
    //   }
    // },
    data() {
      return {
        show: false,
        title:'',
        contract_no:'',//合同编号
        event:'',//年月日
        year:'',
        month:'',
        day:'',
        username:'',
        mobile:'',//用户账户
        identityid: '',//身份证
        show_trade_time: '',
        timeEnd: '',
        type:'',//判定点击的是合同还是协议 'protocol','contract'
        productids:'',//产品id
        lock_principal:null,
        lock_principal_chanese:null
      }
    },
    computed: {
      isHt(){
        let bool = (this.type==='contract') ? '合同' : '协议'
        return bool
      },
      isShowR(){
        return  this.title=="月定期" || this.title=="年定期" || this.title=="季定期" || this.title=="VIP年定期"
      }

    },
    watch: {},
    created() {
      console.log('----', this.productids)
      this.type=this.$route.query.type
      this.productids=this.$route.query.productid
      this.lock_principal=this.$route.query.lock_principal
      if(this.type==='contract'){
        this.title=this.$route.query.title
        this.getProductMess()
        this.contract_no=this.$route.query.contract_no
        this.event=this.$route.query.event
        this.show_trade_time=this.$route.query.show_trade_time
        this.timeEnd = this.$route.query.timeEnd
        this.lock_principal_chanese = this.NoToChinese(Number(this.lock_principal))
        if(this.event){
          let _temp=this.event.split('-')
          this.year=_temp[0]
          this.month=_temp[1]
          this.day=_temp[2]
        }
        this.setTitle()

      }else{
        if(this.productids){
          this.title=this.productId[this.productids]
        }
      }
    },
    mounted() {
      setTimeout(()=> {
        this.show = true
      }, 100);
    },
    methods: {
      NoToChinese(num){
        if (!/^\d*(\.\d*)?$/.test(num)) { alert("Number is wrong!"); return "Number is wrong!"; }
          var AA = new Array("零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖");
          var BB = new Array("", "拾", "佰", "仟", "萬", "億", "点", "");
          var a = ("" + num).replace(/(^0*)/g, "").split("."), k = 0, re = "";
          for (var i = a[0].length - 1; i >= 0; i--) {
              switch (k) {
                case 0: re = BB[7] + re; break;
                case 4: if (!new RegExp("0{4}\\d{" + (a[0].length - i - 1) + "}$").test(a[0])) re = BB[4] + re; break;
                case 8: re = BB[5] + re; BB[7] = BB[5]; k = 0; break;
              }
              if (k % 4 == 2 && a[0].charAt(i + 2) != 0 && a[0].charAt(i + 1) == 0) re = AA[0] + re;
              if (a[0].charAt(i) != 0) re = AA[a[0].charAt(i)] + BB[k % 4] + re; k++;
            }

          if (a.length > 1){
            re += BB[6];
            for (var i = 0; i < a[1].length; i++) re += AA[a[1].charAt(i)];
          }
          return re;
      },
      // setTitle(){
      //   if(this.title==="年定期"){
      //     this.changeTitle("年定期")
      //     this.setTitleText("年定期")
      //   }else if(this.title==="VIP年定期"){
      //     this.changeTitle("VIP年定期")
      //     this.setTitleText("VIP年定期")
      //   }else if(this.title==="季定期"){
      //     this.changeTitle("季定期")
      //     this.setTitleText("季定期")
      //   }else if(this.title==="月定期"){
      //     this.changeTitle("月定期")
      //     this.setTitleText("月定期")
      //   }else if(this.title==="周周盈"){
      //     this.changeTitle("周周盈")
      //     this.setTitleText("周周盈")
      //   }else if(this.title==="日增息"){
      //     this.changeTitle("日增息")
      //     this.setTitleText("日增息")
      //   }else if(this.title==="保险箱"){
      //     this.changeTitle("保险箱")
      //     this.setTitleText("保险箱")
      //   }else{
      //     this.setTitleText("合同")
      //   }
      // },
      getProductMess(){
        this.$http({
          method: 'user.info.web',
          token: this.$root.appData.token,
        }).then((response)=>{
          console.log(response,'response')
          this.identityid=response.identityid
          this.mobile=response.mobile
          this.username=response.username
        })
      }
    },
  }
</script>
