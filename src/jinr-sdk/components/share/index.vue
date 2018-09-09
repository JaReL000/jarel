<style lang="stylus" rel="stylesheet/stylus">

  .jinr-share-wrapper
    .jinr-share-mask
      position fixed
      top 0
      left 0
      right 0 
      bottom 0
      z-index 100
      background-color rgba(0,0,0,0.3)
    .jinr-share
      position fixed
      // top 50%
      // left 50%
      // transform translate3d(-50%, -50%, 0)
      bottom 0
      left 0
      z-index 100
      background-color #fff
      width 100%
      // border-radius 5px
      font-size 32px
      -webkit-user-select none
      overflow hidden
      backface-visibility hidden
      transition .2s
      &.share-bounce-enter
        opacity 0
        // transform translate3d(-50%, -50%, 0) scale(0.7)
        transform translate3d(0%, 100%, 0) 
      &.share-bounce-leave-active
        opacity 0
        // transform translate3d(-50%, -50%, 0) scale(0.9)
        transform translate3d(0%, 100%, 0)
      &-header
        padding 26px 0 0
      &-content
        padding 10px 20px 15px
        border-bottom 1px solid #ddd
        min-height 72px
        position relative
      &-input
        padding-top 15px
        input
          border 1px solid #dedede
          border-radius 5px
          padding 4px 5px
          width 100%
          appearance none
          outline none
        input.invalid
          border-color #ff4949
          &focus
            border-color #ff4949
      &-errormsg
        color red
        font-size 24px
        min-height 18px
        margin-top 2px
      &-title
        text-align center
        padding-left 0
        margin-bottom 0
        font-size 32px
        font-weight bold
        color #333
      &-message
        color #999
        margin 0
        text-align center
        line-height 72px
      &-btns
        display -webkit-box
        display -webkit-flex
        display -ms-flexbox
        display flex
        height 280px
        line-height @height
        // background  url('./images/home_icon_close@2x.png') no-repeat center 
        background-size 30px 30px
        background-color #fff
      &-btn
        display block
        background-color #fff
        flex 1
        padding-top 100px
        margin 0
        border 0
        // background  url('./images/share_weixin.png') no-repeat center  70px
        background-size 80px 80px
        background-color #fff
        font-size 30px
        &focus
          outline none
        &active
          // background-color #fff
      &-cancel
        width 50%
        // border-right 1px solid #ddd
        &active
          color #000
      &-confirm
        // color #26a2ff
        width 50%
        // background-image url('./images/share_friend.png') 
        &active
          color #26a2ff

</style>

<template>
  <div class="jinr-share-wrapper">
    <div class="jinr-share-mask" @click="doClose" v-show="value"></div>
    <transition name="share-bounce">
      <div class="jinr-share" v-show="value">
        <div
          class="jinr-share-header"
          v-if="title !== ''"
        >
          <div
            class="jinr-share-title"
            v-text="title"
          ></div>
        </div>

        <!-- <div class="jinr-share-content" v-if="message !== ''">
          <div class="jinr-share-message" v-html="message"></div>
          <div class="jinr-share-input" v-show="showInput">
            <input
              v-model="inputValue"
              :placeholder="inputPlaceholder"
              ref="input">
            <div
              class="jinr-share-errormsg"
              :style="{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }"
              v-text="editorErrorMessage"
            ></div>
          </div>
        </div> -->
        
        <div class="jinr-share-btns">
          <!-- v-show="showCancelButton" -->
          <button
            :class="[ cancelButtonClasses ]"
            
            @click="handleAction('cancel')"
            v-text="cancelButtonText"
          ></button>
          <!-- v-show="showConfirmButton" -->
          <button
            :class="[ confirmButtonClasses ]"
            
            @click="handleAction('confirm')"
            v-text="confirmButtonText"
          ></button>
        </div>
      </div>
    </transition>
  </div>
</template>



<script type="text/babel">
  let CONFIRM_TEXT = '确定';
  let CANCEL_TEXT = '取消';

  // import Popup from 'src/utils/popup';

  export default {
    // mixins: [ Popup ],

    props: {
      value: {
        type: Boolean,
        default: false
      },
      modal: {
        default: true
      },
      showClose: {
        type: Boolean,
        default: true
      },
      lockScroll: {
        type: Boolean,
        default: false
      },
      closeOnClickModal: {
        default: true
      },
      closeOnPressEscape: {
        default: true
      },
      inputType: {
        type: String,
        default: 'text'
      }
    },

    computed: {
      confirmButtonClasses() {
        let classes = 'jinr-share-btn jinr-share-confirm ' + this.confirmButtonClass;
        if (this.confirmButtonHighlight) {
          classes += ' jinr-share-confirm-highlight';
        }
        return classes;
      },
      cancelButtonClasses() {
        let classes = 'jinr-share-btn jinr-share-cancel ' + this.cancelButtonClass;
        if (this.cancelButtonHighlight) {
          classes += ' jinr-share-cancel-highlight';
        }
        return classes;
      }
    },

    watch: {
      value(val) {
        if (val) {
          if (this._opening) return;
          if (!this.rendered) {
            this.rendered = true;
            Vue.nextTick(() => {
              this.open();
            });
          } else {
            this.open();
          }
        } else {
          this.close();
        }
      }
    },

    methods: {
      doClose() {
        this.value = false;
        this._closing = true;

        this.onClose && this.onClose();

        setTimeout(() => {
          if (this.modal && this.bodyOverflow !== 'hidden') {
            document.body.style.overflow = this.bodyOverflow;
            document.body.style.paddingRight = this.bodyPaddingRight;
          }
          this.bodyOverflow = null;
          this.bodyPaddingRight = null;
        }, 200);
        this.opened = false;

        if (!this.transition) {
          this.doAfterClose();
        }
      },
      doAfterClose() {
        this.closing = false;
        // PopupManager.closeModal(this._popupId);

        // if (this.preventScroll) {
        //   document.removeEventListener('touchstart', this.recordPosition, false);
        //   document.removeEventListener('touchmove', this.watchTouchMove, false);
        // }
      },

      handleAction(action) {
        if (this.$type === 'prompt' && action === 'confirm' && !this.validate()) {
          return;
        }
        var callback = this.callback;
        this.value = false;
        callback(action);
      },

      validate() {
        if (this.$type === 'prompt') {
          var inputPattern = this.inputPattern;
          if (inputPattern && !inputPattern.test(this.inputValue || '')) {
            this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法!';
            this.$refs.input.classList.add('invalid');
            return false;
          }
          var inputValidator = this.inputValidator;
          if (typeof inputValidator === 'function') {
            var validateResult = inputValidator(this.inputValue);
            if (validateResult === false) {
              this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法!';
              this.$refs.input.classList.add('invalid');
              return false;
            }
            if (typeof validateResult === 'string') {
              this.editorErrorMessage = validateResult;
              return false;
            }
          }
        }
        this.editorErrorMessage = '';
        this.$refs.input.classList.remove('invalid');
        return true;
      },

      handleInputType(val) {
        if (val === 'range' || !this.$refs.input) return;
        this.$refs.input.type = val;
      }
    },

    watch: {
      inputValue() {
        if (this.$type === 'prompt') {
          this.validate();
        }
      },

      value(val) {
        this.handleInputType(this.inputType);
        if (val && this.$type === 'prompt') {
          setTimeout(() => {
            if (this.$refs.input) {
              this.$refs.input.focus();
            }
          }, 500);
        }
      },

      inputType(val) {
        this.handleInputType(val);
      }
    },

    data() {
      return {
        title: '',
        message: '',
        type: '',
        showInput: false,
        inputValue: null,
        inputPlaceholder: '',
        inputPattern: null,
        inputValidator: null,
        inputErrorMessage: '',
        showConfirmButton: true,
        showCancelButton: false,
        confirmButtonText: CONFIRM_TEXT,
        cancelButtonText: CANCEL_TEXT,
        confirmButtonClass: '',
        confirmButtonDisabled: false,
        cancelButtonClass: '',
        editorErrorMessage: null,
        callback: null
      };
    }
  };
</script>
