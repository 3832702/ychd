// components/stores/details/listbar/listbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    goods: {
      type: Array,
      value: []
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
    /**
     *  @module 跳转产品详情
     */
    jumpPage(e) {
  
      const { currentTarget: { dataset: { index } } } = e;
      const { goods } = this.data;

      const { goods_id } = goods[index];
      wx.navigateTo({
        url: `/pages/product/index?goods_id=${goods_id}`,
      })
    }
  }
})
