<template>
  <div class="jinr-msgbox-wrapper">
    <transition name="msgbox-bounce">
      <div class="jinr-msgbox" v-show="value">
        <div
          class="jinr-msgbox-header"
          v-if="title !== ''"
        >
          <div
            class="jinr-msgbox-title"
            v-text="title"
          ></div>
        </div>
        <div class="jinr-msgbox-content" v-if="message !== ''">
          <div class="jinr-msgbox-message" v-html="message"></div>
          <div class="jinr-msgbox-input" v-show="showInput">
            <input
              v-model="inputValue"
              :placeholder="inputPlaceholder"
              ref="input">
            <div
              class="jinr-msgbox-errormsg"
              :style="{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }"
              v-text="editorErrorMessage"
            ></div>
          </div>
        </div>
        <div class="jinr-msgbox-btns">
          <button
            :class="[ cancelButtonClasses ]"
            v-show="showCancelButton"
            @click="handleAction('cancel')"
            v-text="cancelButtonText"
          ></button>
          <button
            :class="[ confirmButtonClasses ]"
            v-show="showConfirmButton"
            @click="handleAction('confirm')"
            v-text="confirmButtonText"
          ></button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../../style/mixin.styl"

  .jinr-msgbox-wrapper
    .jinr-msgbox-html
      text-align center
    .jinr-msgbox
      position fixed
      top 50%
      left 50%
      transform translate3d(-50%, -50%, 0)
      background-color #fff
      width 85%
      border-radius rem(5)
      font-size rem(32)
      -webkit-user-select none
      overflow hidden
      backface-visibility hidden
      transition .2s
      &.msgbox-bounce-enter
        opacity 0
        transform translate3d(-50%, -50%, 0) scale(0.7)
      &.msgbox-bounce-leave-active
        opacity 0
        transform translate3d(-50%, -50%, 0) scale(0.9)
      &-header
        padding rem(26) 0 0
      &-content
        padding rem(10) rem(20) rem(15)
        border-bottom 1px solid #ddd
        min-height rem(72)
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
        font-size rem(24)
        min-height 18px
        margin-top 2px
      &-title
        text-align center
        padding-left 0
        margin-bottom 0
        font-size rem(32)
        font-weight bold
        color #333
      &-message
        color #999
        margin 0
        text-align center
        line-height rem(72)
      &-btns
        display -webkit-box
        display -webkit-flex
        display -ms-flexbox
        display flex
        height rem(80)
        line-height @height
      &-btn
        display block
        background-color #fff
        flex 1
        margin 0
        border 0
        font-size rem(30)
        &focus
          outline none
        &active
          background-color #fff
      &-cancel
        width 50%
        border-right 1px solid #ddd
        &active
          color #000
      &-confirm
        color #26a2ff
        width 50%
          &active
            color #26a2ff

</style>
//  <style src="../../../style/popup.css"></style>

<script type="text/babel">
  let CONFIRM_TEXT = '确定';
  let CANCEL_TEXT = '取消';

  import Popup from 'src/utils/popup';

  export default {
    mixins: [ Popup ],

    props: {
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
        let classes = 'jinr-msgbox-btn jinr-msgbox-confirm ' + this.confirmButtonClass;
        if (this.confirmButtonHighlight) {
          classes += ' jinr-msgbox-confirm-highlight';
        }
        return classes;
      },
      cancelButtonClasses() {
        let classes = 'jinr-msgbox-btn jinr-msgbox-cancel ' + this.cancelButtonClass;
        if (this.cancelButtonHighlight) {
          classes += ' jinr-msgbox-cancel-highlight';
        }
        return classes;
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
