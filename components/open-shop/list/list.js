const { qrCode } = require('../../../utils/server.js')

const routes = [
  {
    path: "/pages/release/index",
    name: "商品发布",
    ico: ""
  },
  {
    path: "/pages/management/index",
    name: "店铺编辑",
    ico: ""
  },
  {
    path: "/pages/release-list/index",
    name: "商品列表",
    ico: ""
  },
  {
    path: "/pages/qr-code/index",
    name: "上传群二维码",
    type: 2,
    ico: ""
  },
  {
    path: "/pages/qr-code/index",
    name: "上传商家二维码",
    type: 1,
    ico: ""
  }
]

const shares = [
  {
    path: "",
    category: 'code',
    name: "小程序码",
    ico: ""
  },
  {
    path: "",
    category: "share",
    name: "店铺分享",
    ico: ""
  },
  {
    
  }
]

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    shopInfo: {
      type: Object,
      value: {}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    routes,
    shares,
    unionId: '',
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
      const { routes, shopInfo } = this.data;
      const { store_id } = shopInfo;
      let url = `${routes[index].path}?store_id=${store_id}`;

      if (routes[index].type) {
        url = `${url}&type=${routes[index].type}`
      }

      wx.navigateTo({ url })
    },

    /**
     * @module 分享栏目点击
     */
    shareHandler(e) {
      const { currentTarget: { dataset: { index } } } = e;
      this.triggerEvent('shareHandler', { index })
    },

    /**
     * @module 获取unionId
     */
    getUnionId() {
      return wx.getStorageSync('unionId'); 
    }

  }
})
