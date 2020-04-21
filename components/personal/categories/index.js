


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    routes: { // 栏目数据
      type: Array,
      value: []
    },
    title: { // 头部名字
      type: String,
      value: ''
    },
    is_hide: { // 是否隐藏栏目
      type: Boolean,
      value: true
    },
    shopInfo: { // 店铺信息
      type: Object,
      value: {}
    },
    isHideShare: { // 是否显示分享
      type: Boolean,
      value: true
    },
    is_pass: { // 判断审核状态
      type: null,
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
    /**
     * @module 跳转页面
     */
    jumpPage(e) {
      const { currentTarget: { dataset: { index } } } = e;
      const { routes, shopInfo, is_pass } = this.data;
      const { store_id } = shopInfo;
      let url = `${routes[index].path}?store_id=${store_id}&is_pass=${is_pass}`;

      if (routes[index].type) {
        url = `${url}&type=${routes[index].type}`
      }

      if (routes[index].meta) {
        url = `${url}&p=${routes[index].meta}`
      }

      if (routes[index].is_pass === 0 && routes[index].title == "店铺") {
        
        wx.showModal({
          content: '当前店铺正在审核中'
        })
        
        return;
      }

      if (routes[index].use === 'code') {
        this.triggerEvent('getCodeHandler', {  })
        return;
      }

      wx.navigateTo({ url })
    },
  }
})
