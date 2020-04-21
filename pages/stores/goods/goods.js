const { storeGoods } = require("../../../utils/server.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {
    store_id: '', // 店铺id
    disabled: true,
    page: 1, // 分页
    isMore: true, // 是否还有更多
    listData: [], // 列表数据
    isNot: false, // 是否为空数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.getStoreId(options)
    this.storeGoods();
  },

  /**
   * @module 获取store_id
   */
  getStoreId(options) {
    const { store_id } = options;

    this.setData({ store_id })
  },

  /**
   * @module 请求数据
   */
  storeGoods() {
    const { store_id, page } = this.data;
    const data = { store_id, page, is_pass: 1 }

    storeGoods(data)
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
   * @module 设置数据
   */
  setListData(data) {
    let { listData } = this.data;
    
    if (data.length === 0) {
      this.setData({ isMore: false })
    }

    listData = [...listData, ...data]

    let isNot = listData.length === 0 ? true: false;

    this.setData({ listData, isNot })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    this.setData({ disabled: true })
  },

  /**
   * @module 跳转页面
   */
  jumpPage(e) {
    
    const { currentTarget: { dataset: { index } } } = e;
    const { listData } = this.data;
    const { goods_id } = listData[index];

    
    const url = `/pages/product/index?goods_id=${goods_id}`

    wx.redirectTo({ url })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom () {
    let { isMore, page, disabled } = this.data;

    if (!disabled) {
      return
    }

    if (isMore) {
      page++;
      this.setData({ page })
      this.storeGoods()
    }
  }
})