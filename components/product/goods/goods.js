const routes = {
  all: {
    path: "/pages/stores/goods/goods",
    name: "全部商品"
  }
}


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    banners: { // 轮播图数据
      type: Array,
      value: []
    },
    detailsData: {
      type: Object,
      value: {}
    },
    isCollect: {
      type: Number,
      value: 0
    },
    store_id: { // 店铺id
      type: String,
      value: ""
    },
    isShare: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    current: 1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    collectHandler(e) {
      const { detail } = e;

      this.triggerEvent('collectHandler', detail)
    },

    /**
     * @module 改变轮播图
     */
    changeHandler(e) {
      let { detail: { current } } = e;
      current++;
      this.setData({ current })
    },

    jumpPage(e) {

      const { store_id, isShare } = this.data;

      const { currentTarget: { dataset: { page } } } = e;
      let url = `${routes[page].path}?store_id=${store_id}`;

      if (page === 'shop' && isShare) {
        url = `${url}&share=1`
      }

      // url = page === 'shop' ? `${routes[page].path}?store_id=${store_id}` : routes[page].path;

      if (page === 'shop') {
        wx.redirectTo({ url })
      } else {
        wx.navigateTo({ url })
      }
    }
  }
})
