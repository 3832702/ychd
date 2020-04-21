// components/bidding/info/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    date: {
      type: String,
      value: ''
    },
    startDate: { // 起始时间
      type: String,
      value: ''
    },
    endDate: { // 截止时间
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    region: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    /**
     * @module 切换地区
     */
    bindRegionChange(e) {
      
      this.setData({
        region: e.detail.value
      })
    },

    /**
     * @module 更改日期
     */
    bindDateChange(e) {
      
      const { detail: { value: date } } = e;

      this.triggerEvent('dateChange', { date })
    }
  }
})
