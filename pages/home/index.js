const shuffling = ["../../static/image/shuffling_1.jpg", "../../static/image/shuffling_1.jpg", "../../static/image/shuffling_1.jpg", "../../static/image/shuffling_1.jpg"]
const { category, storeCreate, nearGoods, goodShops, banner } = require("../../utils/server.js");
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
const { statusBarHeight, system, baseImgUrl } = getApp().globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    shuffling,
    category: [], // 入口数据
    latitude: '', 
    longitude: '',
    optimization: [], // 为你优选
    nearData: [], // 优选数据
    city: "定位中", // 定位城市
    option: 'near',
    page: 1, // 分页
    goodsPage: 1, // 分页
    statusBarHeight: statusBarHeight + 'px',
    searchtop: 0,
    isFirst: true, // 是否第一次进入
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
        this.inverseHandler({ latitude, longitude });
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
   * @module 获取经纬度
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
   * @module 经纬度转地址
   */
  inverseHandler({ latitude, longitude }) {
    const demo = new QQMapWX({
      key: '2ZUBZ-7E56J-VP6FB-KRF2O-QEBVE-ZKBXP' // 必填
    });

    const { shopAddress: address } = this.data;

    demo.reverseGeocoder({
      location: {
        latitude,
        longitude
      },
      success:(res) => {
        const { city: cityName } = res.result.address_component;

        const { city } = this.data;

        if (city != '定位中' && city !== cityName) {
          console.log(12313)
        }

        this.setData({ city: cityName })
        this.getNearData();
      },
      fail(err) {}
    });
  },

  /**
   *  @module 获取轮播图数据
   */
  getShufflingData() {

    const data = { type: 1 }

    banner(data)
      .then(({ data: shuffling }) => {
        
        shuffling.forEach(item => {
          item.img_url = `http://ychds.nineopen.com:8000${item.img_url}`
        })

        this.setData({ disabled: true, shuffling })
      })
      .catch(err => {
        console.log(err)
        this.setData({ disabled: true })
      })
  },

  /**
   *  @module 获取附近商家数据
   */
  getNearData() {

    const { latitude, longitude, option, page } = this.data;
    const data = { latitude, longitude, option, page }

    console.log(latitude, longitude, option, page)

    nearGoods(data)
      .then(({ data }) => {
        this.setDistance(data)
        this.setAddress(data)
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
      } else if (item.distance >= 1000 ) {
        item.distance = '>1000'
      } else {
        item.distance = item.distance.toFixed(1)
      }
    })
    this.setData({ nearData: data })
  },

  /**
   * @module 设置地址
   */
  setAddress(data) {
    data.forEach(item => {
      item.address = item.address.split('市')
      item.address = item.address[1].replace(')', '')
    })
    this.setData({ nearData: data })
  },

  /**
   *  @module 获取产品分类
   */
  getCategory() {
    category()
      .then(res => {
        let { data: category } = res;
        const lastCategory = category[category.length - 1]
        category = category.slice(0, 9);
        category = [...category, lastCategory]
        this.setData({ category })
      })
  },

  /**
   *  @module 获取为你优选数据
   */
  getOptimization() {
    const { goodsPage: page } = this.data;
    const data = { page }

    goodShops(data)
      .then(({data}) => {
        this.setOptimizationAddress(data);
      })
      .catch(err => {
        console.log(err)
      })
  },

  /**
   * @module 设置为你优选地址
   */
  setOptimizationAddress(data) {
    data.forEach(item => {
      item.address = item.address.split('市')
      item.address = item.address[1].replace(')', '')
    })
    this.setData({ optimization: data })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getShufflingData();
    this.setSearchTop();
    this.getCategory();
    this.getOptimization();
  },

  /**
   * @module 选择地址
   */
  chooseLocation({ detail }) {
    const { address, latitude, longitude } = detail;
    this.setData({ latitude, longitude })
    
    if (address) {
      wx.setStorageSync('location', { latitude, longitude })
      this.inverseHandler({ latitude, longitude })
    }
  },

  /**
   * @module 选择产品分类配置
   */
  changeNearHandler(e) {
    const { detail: { index } } = e;
    let option;

    if (index == 0) {
      option = "swa"
    } else if (index == 1) {
      option = "latest"
    } else if (index == 2) {
      option = "near"
    }
    
    this.setData({ option })
    this.getNearData();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({ disabled: true })
    const { latitude } = this.data;

    if (latitude) {
      this.getNearData();
    } else {
      this.getLocation();
    }
  },

  /**
   * @module 设置搜索框位置
   */
  setSearchTop() {

    let searchtop = system.indexOf('iOS') == -1 ? 8 : 6;

    this.setData({ searchtop })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})