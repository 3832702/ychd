const routes = {
  shop: {
    path: "/pages/stores/details/details",
    name: "店铺"
  },
  all: {
    path: "/pages/stores/goods/goods",
    name: "全部商品"
  },
  share: {
    path: "",
    name: "分享"
  },
  contact: {
    path: "/pages/stores/merchants/merchants",
    type: 1,
    name: "联系商家"
  }
}

const { baseurl } = getApp().globalData;

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    store_id: { // 店铺id
      type: String,
      value: ""
    },
    isShare: {
      type:Boolean,
      value: false
    },
    merchant_code: {
      type: String,
      value: ''
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
      
      const { store_id, isShare } = this.data;

      const { currentTarget: { dataset: { page } } } = e;
      let url = `${routes[page].path}?store_id=${store_id}`;

      const { type } = routes[page];

      if (page === 'shop' && isShare) {
        url = `${url}&share=1`
      }

      if (type === 1) {
        this.previewImageHandler();
        return;
      }

     // url = page === 'shop' ? `${routes[page].path}?store_id=${store_id}` : routes[page].path;

      if (page === 'shop') {
        wx.redirectTo({ url })
      } else {
        wx.navigateTo({ url })
      }
    },

    /**
     * @module 预览图片
     */
    previewImageHandler() {

      const { merchant_code } = this.data;

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
