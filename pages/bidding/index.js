const { setCountDown } = require("../../utils/util.js");
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: '', // 广告展示时间
    startDate: '', // 起始时间
    endDate: '', // 截止时间
    countDownTime: '', // 截止时间
    city: '', // 城市
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.getLocationHandler()
    this.getToday();
    this.setCountDown();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    
  },

  /**
   * @module 获取位置
   */
  getLocationHandler() {
    wx.getLocation({
      type: 'wgs84',
      success: ({ latitude, longitude }) => {
        this.setData({ latitude, longitude })
        this.inverseHandler({ latitude, longitude });
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
      success: (res) => {
        const { city } = res.result.address_component;

        this.setData({ city })
      },
      fail(err) { }
    });
  },

  /**
   * @module  获取倒计时
   */
  setCountDown() {
    const d = new Date();
    const endD = new Date(d.getTime() + 1000 * 60 * 60 * 24 * 1).getTime() / 1000;

    setCountDown.call(this, endD)
  },

  /**
   * @module 获取时间
   */
  getToday() {
    const d = new Date();

    const date = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`

    const endD = new Date(d.getTime() + 1000 * 60 * 60 * 24 * 15)

    const endDate = `${endD.getFullYear()}-${endD.getMonth() + 1}-${endD.getDate()}`

    this.setData({ date, startDate: date, endDate })
  },

  /**
   * @module 更改日期
   */
  dateChange(e) {
    const { detail: { date } } = e;
    this.setData({ date })
  }
})