// components/home/near/near.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isHeadHide: { // 是否隐藏头部提示，默认不隐藏
      type: Boolean,
      value: false
    },
    isTabHide: { // 是否隐藏头部提示，默认不隐藏
      type: Boolean,
      value: false
    },
    nearShops: { // 商品
      type: Array,
      value: []
    },
    activeIndex: {
      type: String,
      value: 1
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    jumpPage(e) {
      
      const { currentTarget: { dataset: { index } } } = e;
      const { nearShops } = this.data;

      const url = `/pages/stores/details/details?store_id=${nearShops[index].store_id}`
      wx.navigateTo({ url })
    },

    /**
     * @module 切换索引
     */
    searchHandler(e) {

      const { currentTarget: { dataset: { index } } } = e;

      //this.setData({ activeIndex: index })

      this.triggerEvent('searchHandler', { index })
    }
  }
})
