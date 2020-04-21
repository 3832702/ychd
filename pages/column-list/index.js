const { cateGoods } = require("../../utils/server.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cate_id: '', // 产品分类id
    disabled: true,
    page: 1, // 分页
    goodsData: [], // 数据
    isMore: true, // 是否加载更多
    isNot: false, // 是否为空数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.getCateId(options);

    if (this.getLocation()) {
      this.cateGoods();
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
        this.cateGoods();
      }
    })
  },

  /**
   * @module 获取经纬度
   */
  getLocation() {
    const { latitude, longitude } = wx.getStorageSync('location')

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
  cateGoods() {
    const { page, cate_id, latitude, longitude } = this.data;
    const data = { page, cate_id, latitude, longitude };

    cateGoods(data)
      .then(({ data }) => {
        this.setGoodsData(data);
      })
      .catch(err => {
        console.log(err)
      })
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
   * @module 获取数据
   */
  setGoodsData(data) {
    let { goodsData } = this.data;

    if (data.length === 0) {
      this.setData({ isMore: false })
    }

    data = this.setDistance(data)

    goodsData = [...goodsData, ...data]

    let isNot = goodsData.length === 0 ? true: false;

    this.setData({ goodsData, isNot })
  },

  /**
   * @module 获取cate_id
   */
  getCateId(options) {
    const { cate_id } = options;
    console.log(cate_id)
    this.setData({ cate_id })
  },

  /**
   * @module 生命周期函数--上拉触底
   */
  onReachBottom() {
    let { isMore, page } = this.data;
    
    if (isMore) {
      page++;
      this.setData({ page })
      this.cateGoods();
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    this.setData({ disabled: true })
  }
})