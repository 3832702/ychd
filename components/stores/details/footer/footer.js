const routes = [
  {
    path: "/pages/stores/goods/goods",
    name: "全部商品",
    ico: ""
  },
  /*{
    path: "/pages/stores/fans/fans",
    type: 2,
    name: "店铺分享",
    ico: ""
  },*/
  {
    path: "/pages/stores/merchants/merchants",
    type: 1,
    name: "联系商家",
    ico: ""
  }
];

const { baseurl } = getApp().globalData;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    storeInfo: {
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
    routes, // 跳转路径
  },

  /**
   * 组件的方法列表
   */
  methods: {
    jumpHandler(e) {      
      const { currentTarget: { dataset: { index } } } = e;
      const { routes, store_id } = this.data;

      const { path, type } = routes[index];
      const url = `${path}?store_id=${store_id}`;

      if (type === 1) {
        this.previewImageHandler();
        return;
      }

      if (type === 2) {
        return;
      }

      wx.navigateTo({ url })
    },

    /**
     * @module 预览图片
     */
    previewImageHandler() {
      
      const { storeInfo: { merchant_code } } = this.data;

      if (!merchant_code) {
        wx.showModal({
          content: '该商家还没有上传商家二维码'
        })
        return;
      }

      const image = `${baseurl}${merchant_code}`

      wx.previewImage({
        current: image, // 当前显示图片的http链接
        urls: [image] // 需要预览的图片http链接列表
      })
    }
  }
})
