const { statusBarHeight } = getApp().globalData;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: { // 标题
      type: String,
      value: "壹城好店"
    },
    bg: { // 背景颜色
      type: String,
      value: '#000'
    },
    isHeaderHide: { // 是否隐藏
      type: Boolean,
      value: false
    },
    isBack: { // 是否显示返回
      type: Boolean,
      value: false
    },
    isShare: {// 是否显示返回首页
      type: Boolean,
      value: false
    },
    is_000: { // 是否显示黑色
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: statusBarHeight + 'px'
  },

  ready() {
    this.queryMultipleNodes()
  },

  /**
   * 组件的方法列表
   */
  methods: {
    queryMultipleNodes() {
      const query = wx.createSelectorQuery().in(this)
      query.select('#header').boundingClientRect(res => {
        console.log(res)
        this.triggerEvent('changeHeader', res)
      }).exec()
    },

    /**
     * @module 跳转首页
     */
    homeHandler() {
      wx.switchTab({
        url: '/pages/home/index'
      })
    },

    /**
     * @module 返回
     */
    backHandler() {
      wx.navigateBack({
        delta: 1
      })
    }
  }
})
