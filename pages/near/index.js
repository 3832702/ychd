const { nearbyShops } = require("../../utils/server.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: '',
    longitude: '',
    nearShops: [],
    disabled: true,
    isMore: true, // 是否还有更多
    page: 1, // 分页
    index: 0, // 当前索引
    isNot: false, // 是否为空数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    if (this.getLocation()) {
      this.getData();
    } else {
      this.authorizationHandler()
    }
  },

  /**
   * @module 授权
   */
  authorizationHandler() {
    wx.showModal({
      title: "用户未授权",
      showCancel: false,
      content: '如需正常使用定位功能，请按确定并在授权管理中选中“地理位置”，然后点按确定。',
      success: (res) => {
        if (res.confirm) {
          wx.openSetting({
            success: res => {
              if (res.authSetting['scope.userLocation']) {
                this.getLocationHandler();
              } else {
                this.promptHandler();
              }
            }
          })
        }
      }
    })
  },

  /**
   * @module 
   */
  promptHandler() {
    wx.showModal({
      content: '该页面不能正常使用，点击确认再次获取',
      success: (res) => {
        if (res.confirm) {
          wx.openSetting({
            success: res => {
              if (res.authSetting['scope.userLocation']) {
                this.getLocationHandler();
              }
            }
          })
        }
      }
    })
  },

  /**
   * @module 获取位置
   */
  getLocationHandler() {
    wx.getLocation({
      type: 'wgs84',
      success: ({ latitude, longitude }) => {
        wx.setStorageSync('location', { latitude, longitude })
        this.setData({ latitude, longitude })
        this.getData();
      }
    })
  },

  /**
   * @module 获取经纬度
   */
  getLocation() {
    const { latitude, longitude } = wx.getStorageSync('location');

    if (latitude && longitude) {
      this.setData({ latitude, longitude })
      return true;
    } else {
      return false;
    }
  },

  /**
   * @module 获取数据
   */
  getData() {
    const { latitude, longitude, page } = this.data;
    const option = this.setOptionHandler()
    const data = { latitude, longitude, page, option }

    nearbyShops(data)
      .then(res => {
        this.setNearShop(res);
        this.setData({ disabled: true })
      })
      .catch(err => {
        console.log(err)
        this.setData({ disabled: true })
      })
  },

  /**
   * @module 设置option
   */
  setOptionHandler() {
    const { index } = this.data;

    if (index == 0) {
      return 'swa'
    } else if(index == 1) {
      return 'latest'
    } else if(index == 2) {
      return 'near'
    }
  },

  /**
   * @module 设置数据
   */
  setNearShop({ data }) {

    let { nearShops } = this.data;
    nearShops = [...nearShops, ...this.setDistance(data)]

    if (data.length === 0) {
      this.setData({ isMore: false })
    }

    let isNot = nearShops.length === 0 ? true: false;

    this.setData({ nearShops, isNot })
  },

  /**
   * @module 设置距离
   */
  setDistance(data) {
    data.forEach(item => {
      if (item.distance < 0.1) {
        item.distance = '<0.1'
      } else if (item.distance >= 1000) {
        item.distance = '>1000'
      } else {
        item.distance = item.distance.toFixed(1)
      }
    })
    return data;
  },

  /**
   * @module 设置切换
   */
  searchHandler(e) {
    const { disabled } = this.data;
    const { detail: { index } } = e;

    if (!disabled) {
      return
    }

    this.setData({ index, disabled: false, page: 1, isMore: true, nearShops: [], isNot: false })

    this.getData()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    this.setData({ disabled: true })
  },

  /**
   * @module 生命周期函数---上拉加载
   */
  onReachBottom() {
    let { isMore, page, disabled } = this.data;

    if (!disabled) {
      return;
    }

    if (isMore) {
      page++;

      this.setData({ page })
      this.getData()
    }
  }
})