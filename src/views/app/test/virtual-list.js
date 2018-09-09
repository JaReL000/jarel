/**
 * 虚拟列表
 * @author weizihua
 * 
 * 
 * 
 * 
 */

  let _debounce = function (func, wait, immediate) {
    console.log(func, wait, immediate);

    var timeout
    return function () {
      var context = this
      var args = arguments
      var later = function () {
        timeout = null
        if (!immediate) {
          func.apply(context, args)
        }
      }
      var callNow = immediate && !timeout
      clearTimeout(timeout)
      timeout = setTimeout(later, wait)
      if (callNow) {
        func.apply(context, args)
      }
    }
  }
  
  export default {
    name: 'VirtualList',
    props: {
      size: {
        type: Number, 
        required: true
      },
      remain: {
        type: Number, 
        required: true
      },
      rtag: {
        type: String, 
        default: 'div'
      },
      wtag: {
        type: String, 
        default: 'div'
      },
      wclass: {
        type: String, 
        default: ''
      },
      start: {
        type: Number, 
        default: 0
      },
      offset: {
        type: Number, 
        default: 0
      },
      variable: [Function, Boolean],
      bench: Number,
      debounce: Number,
      totop: Function,
      tobottom: Function,
      onscroll: Function
    },
    data() {
      return {
        //   size: '',
        //   remain: '',
        //   bench: '',
        //   start: '',
        //   offset: '',
      };
    },

    created: function () {
      var start = this.start >= this.remain ? this.start : 0
      var keeps = this.remain + (this.bench || this.remain)

      this.delta = {
        start: start, // start index.
        end: start + keeps - 1, // end index.
        keeps: keeps, // nums keeping in real dom.
        total: 0, // all items count, update in filter.
        offsetAll: 0, // cache all the scrollable offset.
        paddingTop: 0, // container wrapper real padding-top.
        paddingBottom: 0, // container wrapper real padding-bottom.
        varCache: {}, // object to cache variable index height and scroll offset.
        varAverSize: 0, // average/estimate item height before variable be calculated.
        varLastCalcIndex: 0 // last calculated variable height/offset index, always increase.
      }
    },

    watch: {
      size() {
        this.alter = 'size'
      },
      remain() {
        this.alter = 'remain'
      },
      bench() {
        this.alter = 'bench'
      },
      start() {
        this.alter = 'start'
      },
      offset() {
        this.alter = 'offset'
      }
    },

    mounted() {
      if (this.start) {
        var start = this.getZone(this.start).start
        this.setScrollTop(this.variable ? this.getVarOffset(start) : start * this.size)
      } else if (this.offset) {
        this.setScrollTop(this.offset)
      }
    },


    methods: {
      onScroll: function (e) {
        console.log(e);
        return
        var delta = this.delta
        var offset = this.$refs.vsl.scrollTop

        if (delta.total > delta.keeps) {
          this.updateZone(offset)
        } else {
          delta.end = delta.total - 1
        }

        var offsetAll = delta.offsetAll
        if (this.onscroll) {
          this.onscroll(e, {
            offset: offset,
            offsetAll: offsetAll,
            start: delta.start,
            end: delta.end
          })
        }

        if (!offset && delta.total) {
          this.triggerEvent('totop')
        }

        if (offset >= offsetAll) {
          this.triggerEvent('tobottom')
        }
      },

      /**
       * 滚动偏移时更新渲染区
       * update render zone by scroll offset.
       * @param {*} offset 
       */
      updateZone(offset) {
        var overs = this.variable
          ? this.getVarOvers(offset)
          : Math.floor(offset / this.size)

        var delta = this.delta
        var zone = this.getZone(overs)
        var bench = this.bench || this.remain

        // for better performance, if scroll pass items within now bench, do not update.
        if (!zone.isLast && (overs > delta.start) && (overs - delta.start <= bench)) {
          return
        }

        delta.end = zone.end
        delta.start = zone.start
        this.$forceUpdate()
      },

      /**
       * 返回滚动传递的项目计数变量。
       * return the scroll passed items count in variable.
       * @param {*} offset 
       */
      getVarOvers(offset) {
        var low = 0
        var middle = 0
        var middleOffset = 0
        var delta = this.delta
        var high = delta.total

        while (low <= high) {
          middle = low + Math.floor((high - low) / 2)
          middleOffset = this.getVarOffset(middle)

          // calculate the average variable height at first binary search.
          if (!delta.varAverSize) {
            delta.varAverSize = Math.floor(middleOffset / middle)
          }

          if (middleOffset === offset) {
            return middle
          } else if (middleOffset < offset) {
            low = middle + 1
          } else if (middleOffset > offset) {
            high = middle - 1
          }
        }

        return low > 0 ? --low : 0
      },

      // 
      /**
       * 返回一个变量滚动偏移量从给定的索引。
       * return a variable scroll offset from given index.
       * @param {*} index 
       * @param {*} nocache 
       */
      getVarOffset(index, nocache) {
        var delta = this.delta
        var cache = delta.varCache[index]

        if (!nocache && cache) {
          return cache.offset
        }

        var offset = 0
        for (var i = 0; i < index; i++) {
          var size = this.getVarSize(i, nocache)
          delta.varCache[i] = {
            size: size,
            offset: offset
          }
          offset += size
        }

        delta.varLastCalcIndex = Math.max(delta.varLastCalcIndex, index - 1)
        delta.varLastCalcIndex = Math.min(delta.varLastCalcIndex, delta.total - 1)

        return offset
      },

      /**
       * 返回一个可变大小（高度）从给定索引。
       * return a variable size (height) from given index.
       * @param {*} index 
       * @param {*} nocache 
       */
      getVarSize(index, nocache) {
        var cache = this.delta.varCache[index]
        if (!nocache && cache) {
          return cache.size
        }

        if (typeof this.variable === 'function') {
          return this.variable(index) || 0
        } else {
          var slot = this.$slots.default[index]
          var style = slot && slot.data && slot.data.style
          if (style && style.height) {
            var shm = style.height.match(/^(.*)px$/)
            return (shm && +shm[1]) || 0
          }
        }
        return 0
      },

      // return the variable paddingTop base current zone.
      // @todo: if set a large `start` before variable was calculated,
      // here will also case too much offset calculate when list is very large,
      // consider use estimate paddingTop in this case just like `getVarPaddingBottom`.
      //返回变量paddingtop基极电流区。
      //：如果在变量之前设置一个大的‘开始’，
      //这里也会有太多的偏移量，当列表很大时计算，
      //考虑使用估计paddingtop在这种情况下，就像` getvarpaddingbottom `
      getVarPaddingTop() {
        return this.getVarOffset(this.delta.start)
      },

      /**
       * 返回变量paddingbottom基极电流区。
       * return the variable paddingBottom base current zone.
       */
      getVarPaddingBottom() {
        var delta = this.delta
        var last = delta.total - 1
        if (delta.total - delta.end <= delta.keeps || delta.varLastCalcIndex === last) {
          return this.getVarOffset(last) - this.getVarOffset(delta.end)
        } else {
          // if unreached last zone or uncalculate real behind offset
          // return the estimate paddingBottom avoid too much calculate.
          return (delta.total - delta.end) * (delta.varAverSize || this.size)
        }
      },

      /**
       * return the variable all heights use to judge reach bottom.
       * 返回所有的高度来判断触底变。
       */
      getVarAllHeight() {
        var delta = this.delta
        if (delta.total - delta.end <= delta.keeps || delta.varLastCalcIndex === delta.total - 1) {
          return this.getVarOffset(delta.total)
        } else {
          return this.getVarOffset(delta.start) + (delta.total - delta.end) * (delta.varAverSize || this.size)
        }
      },

      /**
       * the ONLY ONE public method, allow the parent update variable by index.
       * 只有一个公共方法，允许父更新变量按索引。
       * @param {*} index 
       */
      updateVariable(index) {
        // clear/update all the offfsets and heights ahead of index.
        this.getVarOffset(index, true)
      },

      /**
       * return the right zone info base on `start/index`.
       * 返回正确的区域信息，基于“开始/索引”。
       * @param {*} index 
       */ 
      getZone(index) {
        var start, end
        var delta = this.delta

        index = parseInt(index, 10)
        index = Math.max(0, index)

        var lastStart = delta.total - delta.keeps
        var isLast = (index <= delta.total && index >= lastStart) || (index > delta.total)
        if (isLast) {
          end = delta.total - 1
          start = Math.max(0, lastStart)
        } else {
          start = index
          end = start + delta.keeps - 1
        }

        return {
          end: end,
          start: start,
          isLast: isLast
        }
      },

      /**
       * trigger a props event on parent.
       * 触发事件我们父母的道具了。
       * @param {*} event 
       */
      triggerEvent(event) {
        if (this[event]) {
          this[event]()
        }
      },

      /**
       * set manual scroll top.
       * 设置手动滚动顶部。
       * @param {*} scrollTop 
       */
      setScrollTop(scrollTop) {
        this.$refs.vsl.scrollTop = scrollTop
      },

      /**
       * filter the shown items base on `start` and `end`.
       * 过滤可视区显示items
       */
      filter() {
        var delta = this.delta
        var slots = this.$slots.default

        if (!slots) {
          slots = []
          delta.start = 0
        }

        delta.total = slots.length

        var paddingTop, paddingBottom, allHeight
        var hasPadding = delta.total > delta.keeps

        if (this.variable) {
          allHeight = this.getVarAllHeight()
          paddingTop = hasPadding ? this.getVarPaddingTop() : 0
          paddingBottom = hasPadding ? this.getVarPaddingBottom() : 0
        } else {
          allHeight = this.size * delta.total
          paddingTop = this.size * (hasPadding ? delta.start : 0)
          paddingBottom = this.size * (hasPadding ? delta.total - delta.keeps : 0) - paddingTop
        }

        delta.paddingTop = paddingTop
        delta.paddingBottom = paddingBottom
        delta.offsetAll = allHeight - this.size * this.remain

        var targets = []
        for (var i = delta.start; i <= delta.end; i++) {
          targets.push(slots[i])
        }
        return targets
      }
    },

    // check if delta should update when prorps change.
    // prorps 变化 刷新数据
    beforeUpdate: function () {
      
      var delta = this.delta
      delta.keeps = this.remain + (this.bench || this.remain)

      var calcstart = this.alter === 'start' ? this.start : delta.start
      var zone = this.getZone(calcstart)

      // if start, size or offset change, update scroll position.
      if (~['start', 'size', 'offset'].indexOf(this.alter)) {
        this.$nextTick(this.setScrollTop.bind(this, this.alter === 'offset'
          ? this.offset : this.variable
            ? this.getVarOffset(zone.isLast ? delta.total : zone.start)
            : zone.isLast && (delta.total - calcstart <= this.remain)
              ? delta.total * this.size : calcstart * this.size)
        )
      }

      // if points out difference, force update once again.
      if (calcstart !== zone.start || delta.end !== zone.end || this.alter) {
        this.alter = ''
        delta.end = zone.end
        delta.start = zone.start
        this.$forceUpdate()
      }
    },

    render (h) {
      var list = this.filter()
      var delta = this.delta
      var dbc = this.debounce

      return h(this.rtag, {
        'ref': 'vsl',
        'style': {
          'display': 'block',
          'overflow-y': 'auto',
          'height': this.size * this.remain + 'px'
        },
        'on': {

          '&scroll': this.debounce ? _debounce(this.onScroll.bind(this), this.debounce) : this.onScroll
        }
      }, [
        h(this.wtag, {
          'style': {
            'display': 'block',
            'padding-top': this.delta.paddingTop + 'px',
            'padding-bottom': this.delta.paddingBottom + 'px'
          },
          'class': this.wclass
        }, this.filter())
      ])
    }
  }



