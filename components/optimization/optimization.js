const optimizations = [
  {
    store_head: "",
    store_name: ""
  },
  {
    store_head: "",
    store_name: ""
  },
  {
    store_head: "",
    store_name: ""
  },
  {
    store_head: "",
    store_name: ""
  }
]

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    optimization: {
      type: Array,
      value: optimizations
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
     * @module 跳转商家
     */
    jumpStores(e) {
      const { optimization } = this.data;
      const { currentTarget: { dataset: { index } } } = e;

      const { store_id } = optimization[index];
      const url = `/pages/stores/details/details?store_id=${store_id}`

      wx.navigateTo({ url })
    },

    /**
     * @module 跳转更多
     */
    jumpHandler() {
      wx.navigateTo({
        url: '/pages/store-list/index',
      })
    } 
  }
})
