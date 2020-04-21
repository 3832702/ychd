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
    isTabHide: { // 是否隐藏tab,默认不隐藏
      type: Boolean,
      value: false
    },
    nearData: {
      type: Array,
      value: []
    },
    title: {
      type: String,
      value: '优选商品'
    },
    adImg: {
      type: String,
      value: ""
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    activeIndex: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    jumpPage(e) {
      const { currentTarget: { dataset: { index } } } = e;
      const { nearData } = this.data;
      const { goods_id } = nearData[index];

      wx.navigateTo({
        url: `/pages/product/index?goods_id=${goods_id}`
      })
    },
    /**
     * @module 设置分类
     */
    seatchHandler(e) {

      const { currentTarget: { dataset: { index } } } = e;
      this.setData({ activeIndex: index })

      this.triggerEvent('changeNearHandler', { index })
    }
  }
})
