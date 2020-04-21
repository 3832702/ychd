const { category } = require("../../utils/server.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: [], // 入口数据
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.getCategory()
  },

  /**
   *  @module 获取产品分类
   */
  getCategory() {
    category()
      .then(res => {
        let { data: category } = res;
        this.setData({ category })
      })
  },

  /**
     * @module 跳转至产品分类
     */
  jumpColumn(e) {
    const { currentTarget: { dataset: { index } } } = e;
    const { category } = this.data;

    const { cate_id } = category[index]

    const url = `/pages/column-list/index?cate_id=${cate_id}`

    wx.navigateTo({ url })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {

  }
})