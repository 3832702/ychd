const { goodShops } = require("../../utils/server.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: true,
    page: 1, // 分页
    listData: [], // 商家列表
    isMore: true, // 是否可以加载更多
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    this.goodShops();
  },

  /**
   * @module 获取商家
   */
  goodShops() {
    const { page } = this.data;
    const data = { page };
    
    goodShops(data)
      .then(({ data }) => {
        this.setListData(data)
        this.setData({ disabled: true })
      })
      .catch(err => {
        console.log(err)
        this.setData({ disabled: true })
      })
  },

  /**
   * @module 设置商家
   */
  setListData(data) {
    let { listData } = this.data;

    if (!data.length) {
      this.setData({ isMore: false })
    }

    listData = [...listData, ...data];

    this.setData({ listData })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    this.setData({ disabled: true })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom () {
    let { page, isMore } = this.data;

    if (isMore) {
      page++;
      this.setData({ page })
      this.goodShops()
    }
  }
})