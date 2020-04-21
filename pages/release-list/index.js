const { storeGoods, goodsDel, qrCode, isPlay } = require("../../utils/server.js")
const { statusBarHeight, baseImgUrl } = getApp().globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    disabled: true,
    store_id: "", // 店铺id
    page: 1, // 分页
    list: [], // 数据
    isMore: true, // 是否加载完毕
    isNot: false, // 是否为空数据
    activeIndex: 1, // 当前索引
    is_pass: 1, // type
    is_play: 0, // 是否上架
    statusBarHeight: statusBarHeight + 'px',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getActiveIndex(options);
    this.getStoreId(options);
    this.getData();
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
   * @module 获取store_id
   */
  getStoreId(options) {
    const { store_id } = options
    this.setData({ store_id })
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
   * @module 上架
   */
  playHandler(e) {
    const { currentTarget: { dataset: { index } } } = e;

    const { list } = this.data;

    const { is_play } = list[index];

    const content = is_play == 1 ? '是否将本商品上架' : '是否将本商品下架' 

    wx.showModal({
      content,
      success: res => {
        if (res.confirm) {
          this.isPlayHandler(e);
        } else {
          this.setData({ disabled: true })
        }
      }
    })
  },

  /**
   * @module 跳转至海报页
   */
  postersHandler(e) {
    
    const { list } = this.data;

    const { currentTarget: { dataset: { index } } } = e;

    const { goods_cover, goods_id } = list[index];
    console.log(list)

    wx.setStorageSync('postersData', list[index])

    wx.navigateTo({
      url: `/pages/posters/index?goods_cover=${goods_cover}&id=${goods_id}`
    })
  },

  /**
   * @module 设置上下架
   */
  setPlayHandler(e, is_play) {
    const { currentTarget: { dataset: { index } } } = e;

    const { list } = this.data;

    list[index].is_play = is_play;

    this.setData({ list, disabled: true })
  },

  /**
   * @module 上下架
   */
  isPlayHandler(e) {
    const { currentTarget: { dataset: { index } } } = e;

    const { list } = this.data;

    let { is_play, goods_id } = list[index];

    is_play = is_play === 0 ? 1: 0;

    const data = { is_play, goods_id }

    isPlay(data)
      .then(({ data }) => {
        if (data === 'success') {
          this.setPlayHandler(e, is_play);
        } else {
          this.setData({ disabled: true })
        }
      })
      .catch(err => {
        this.setData({ disabled: true })
      })
  },

  /**
   * @module 获取数据
   */
  getData() {
    this.getIsPass();
    let { store_id, page, is_pass, disabled } = this.data;

    const data = { store_id, page, is_pass }

    if (!disabled) {
      return;
    }

    this.setData({ disabled: false })

    wx.showLoading({
      title: '数据加载中',
      mask: true
    })

    storeGoods(data)
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
   * @module 设置列表数据
   */
  setListHandler(data) {
    let { list } = this.data;

    list = [...list, ...data];

    if (data.length === 0 || !data ) {
      this.setData({ isMore: false })
    }

    let isNot = list.length === 0 ? true: false;

    this.setData({ list, isNot })
  },

  /*
    @module  删除商品
  */
  rmHandler(e) {

    const { currentTarget: { dataset: { index } } } = e;
    const { list, disabled } = this.data;

    if (!disabled) {
      return;
    }

    this.setData({ disabled: false })

    const { goods_id } = list[index]

    wx.showModal({
      content: '是否确定删除商品',
      success: (res) => {
        if (res.confirm) {
          this.goodsDel(goods_id, index);
        } else if (res.cancel) {
          console.log('用户点击取消')
          this.setData({ disabled: true })
        }
      }
    })
  },

  /**
   * @module 删除商品
   */
  goodsDel(goods_id, index) {
    const data = { goods_id };
    let { list } = this.data;
    wx.showLoading({
      title: '处理中...',
      mask: true
    })
    goodsDel(data)
      .then(({ statusCode }) => {
        wx.hideLoading()
        if (statusCode === 200) {
          list.splice(index, 1)

          let isNot = list.length === 0 ? true: false;

          this.setData({ list, isNot })
        }
        this.setData({ disabled: true })
      })
      .catch(err => {
        console.log(err)
        wx.hideLoading()
        this.setData({ disabled: true })
      })
  },

  /**
   * @module 编辑商品
   */
  editHandler(e) {
    const { currentTarget: { dataset: { index } } } = e;
    const { list, store_id } = this.data;

    const { goods_id } = list[index];
   
    wx.navigateTo({
      url: `/pages/release/index?goods_id=${goods_id}&store_id=${store_id}`
    })
  },

  /**
   * @module 生成小程序码
   */
  codeHandler(e) {
    const { currentTarget: { dataset: { index } } } = e;

    const unionId = wx.getStorageSync('unionId')

    const { list, disabled } = this.data;

    if (!disabled) {
      return;
    }

    this.setData({ disabled: false })

    const { goods_id: id } = list[index];

    const data = { type: 1, unionId, id }

    qrCode(data)
      .then(({ data }) => {
        const codeImage = baseImgUrl + data;

        wx.previewImage({
          current: codeImage,
          urls: [codeImage]
        })

        this.setData({ disabled: true })
      })
      .catch(err => {
        console.log(err)
        this.setData({ disabled: true })
      })

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
    let { isMore, page } = this.data;

    if (!isMore) {
      return;
    }

    page++;

    this.setData({ page })
    this.getData();
  }
})