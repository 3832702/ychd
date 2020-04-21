const { goodsList, goodsAudit, auditList } = require("../../utils/server.js")
const { statusBarHeight, baseImgUrl } = getApp().globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: true,
    page: 1, // 分页
    list: [], // 数据
    isMore: true, // 是否加载完毕
    isNot: false, // 是否为空数据
    activeIndex: 0, // 当前索引
    unionId: '', // 获取unionId
    is_pass: 1, // type
    is_play: 0, // 是否上架
    statusBarHeight: statusBarHeight + 'px',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getUnionId();
    this.getActiveIndex(options);
    this.getData();
  },

  /**
   * @module 获取unionId
   */
  getUnionId() {
    const unionId = wx.getStorageSync('unionId');

    this.setData({ unionId })
  },

  /**
   * @module 切换tab
   */
  searchTabHandler(e) {
    const { currentTarget: { dataset: { index: activeIndex } } } = e;

    this.setData({ activeIndex, list: [], page: 1, isMore: true, isNot: false })
    this.getData();
  },

  /**
   * @module 获取activeIndex
   */
  getActiveIndex(options) {
    const { index: activeIndex } = options;

    if (activeIndex) {
      this.setData({ activeIndex })
    }
  },

  /**
   * @module 返回type值
   */
  getIsPass() {
    const { activeIndex } = this.data;
    let is_pass = 0;
    this.setData({ is_pass: activeIndex })
  },

  /**
   * @module 获取数据
   */
  getData() {
    this.getIsPass();
    let { page, is_pass, disabled } = this.data;

    const data = { page, is_pass, type: 1 }

    if (!disabled) {
      return;
    }

    this.setData({ disabled: false })

    wx.showLoading({
      title: '数据加载中',
      mask: true
    })

    auditList(data)
      .then(({ data }) => {
        wx.hideLoading()
        this.setData({ disabled: true })
        this.setListHandler(data);
      })
      .catch(err => {
        wx.hideLoading()
        this.setData({ disabled: true })
        console.log(err)
      })
  },

  /**
   * @module 审核商品
   */
  auditHandler(e) {
    const { currentTarget: { dataset: { index, ispass } } } = e;

    const { list, disabled, unionId } = this.data;

    let { goods_id, goods_name } = list[index];
    const data = { is_pass: ispass, goods_id, unionId }

    if (!disabled) {
      return;
    }

    this.setData({ disabled: false })

    let title = '审核提示';
    let content;

    if (ispass == 0) {
      content = `是否将商品【${ goods_name }】更改为待审核`
    } else if (ispass == 1) {
      content = `是否将商品【${goods_name}】更改为审核通过`
    } else if (ispass == 2) {
      content = `是否将商品【${goods_name}】更改为审核不通过`
    }

    wx.showModal({
      title,
      content,
      success: (res) => {
        if (res.confirm) {

          wx.showLoading({
            title: '处理中'
          })

          goodsAudit(data)
            .then(res => {
              list.splice(index, 1)
              this.setData({ disabled: true, list })
              wx.hideLoading()
            })
            .catch(err => {
              console.log(err)
              this.setData({ disabled: true })
              wx.hideLoading()
            })
        } else {
          this.setData({ disabled: true })
        }
      }
    })
  },

  /**
   * @module 设置列表数据
   */
  setListHandler(data) {
    let { list } = this.data;

    list = [...list, ...data];

    if (data.length === 0 || !data) {
      this.setData({ isMore: false })
    }

    let isNot = list.length === 0 ? true : false;

    this.setData({ list, isNot })
  },

  /**
   * @module 跳转至详情页
   */
  jumpHandler(e) {
    const { currentTarget: { dataset: { index } } } = e;

    const { list } = this.data;

    const { goods_id } = list[index];

    wx.navigateTo({
      url: `/pages/product/index?goods_id=${goods_id}`,
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.setData({ disabled: true })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {
    let { isMore, page } = this.data;

    if (!isMore) {
      return;
    }

    page++;

    this.setData({ page })
    this.getData();
  }
})