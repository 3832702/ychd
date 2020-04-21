const { statusBarHeight } = getApp().globalData;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isFocus: {
      type: Number,
      value: 0
    },
    storeInfo: { // 店铺信息
      type: Object,
      value: { }
    },
    store_id: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    statusBarHeight: statusBarHeight + 'px'
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * @module 点击关注
     */
    focusHandler(e) {
      const { detail } = e;

      this.triggerEvent('focusHandler', detail)
    },
    
    /**
     * @module 点击搜索
     */
    jumpSearch() {
      const { store_id } = this.data;

      wx.navigateTo({
        url: `/pages/search/index?store_id=${store_id}&option=2`
      })
    },

    /**
     * @module 点击地址
     */
    locationHandler() {
      const { storeInfo: { latitude, longitude } } = this.data;
      //console.log(typeof latitude)
      //console.log(111, latitude)
      wx.openLocation({
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        scale: 18
      })
    }
  }
})
