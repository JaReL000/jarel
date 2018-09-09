<template>
    <div class="content-header">
        <div class="top">
            <slot name="left"></slot>
            <slot name="right"></slot>
        </div>
         <slot name="bottom"></slot>
    </div>
</template>
<style lang="stylus">
   *{
    box-sizing:border-box;
    }
   div.content-header{
    
    //  display:flex;
     width:540px;
     height:304px;
     background:white;
     padding:25px 50px;
     border-radius:15px;
     margin-bottom:22px;
     .top{
       display:flex;
       margin-bottom:57px;
       .left{
         text-align:center;
         heihgt:156px;
         width:158px;
         background:#2a8bf6;
         color:white;
         padding-top:25px;
         h3{
           line-height:40px;
           font-size:34px;
           font-weight:900;
         }
         p{
           &:nth-child(2){
             font-weight:100;
           }
           &:nth-child(3){
             font-size:12px;
           }
         }
       }
       .right{
         flex:1;
         p{
            height:76px;
            border:1px solid #5da6f6;
            padding-top:10px;
            padding-left:38px;
            line-height:28px;
            &:first-child{
              border-bottom:none;
            }
           >span{
              font-weight:900;
              font-size:24px;
              &.until{
                font-size:14px;
              }
            }
         }
         
       }
     }
     .bottom{
       text-align:center;
       line-height:30px;
       p{
         &:first-child{
           font-size:20px;
           font-weight:900;
         }
         &:last-child{
           font-size:12px;
         }
       }

     }
   }
</style>
