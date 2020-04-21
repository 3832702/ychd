// components/home/searchbar/searchbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    city: {
      type: String,
      value: ""
    },
    top: {
      type: String,
      value: ''
    },
    searchtop: {
      type: Number,
      value: 0
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
    jumpPage() {
      wx.navigateTo({
        url: '/pages/search/index?option=1'
      })
    },

    /**
     *  @module 选择位置
     */
    getLocation() {

      wx.getSetting({
        success: (res) => {
          if (!res.authSetting['scope.userLocation']) {
            wx.authorize({
              scope: 'scope.userLocation',
              success: () => {
                this.getLocationHandler();
              },
              fail: () => {
                this.locationFail();
              }
            })
          } else {
            this.getLocationHandler();
          }
        }
      })
    },

    /**
    * @module  拒绝授权
    */
    locationFail() {
      wx.showModal({
        title: "用户未授权",
        content: '如需正常使用定位功能，请按确定并在授权管理中选中“地理位置”，然后点按确定。',
        success: (res) => {
          if (res.confirm) {
            wx.openSetting({
              success: res => {
                if (res.authSetting['scope.userLocation']) {
                  this.getLocationHandler();
                }
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    },

    /**
     * @module 选择位置
     */
    getLocationHandler() {
      wx.chooseLocation({
        success: (res) => {
          this.triggerEvent('chooseLocation', res)
        }
      })
    }
  }
})
