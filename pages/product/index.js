const { goodsFind, nearGoods, goodsCollect, goodsShow, goodsCollectCancel, recommendGoods } = require("../../utils/server.js")
const { uploadInfo, isDisabled } = require("../../utils/util.js");
const { statusBarHeight } = getApp().globalData;

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detailsData: {  },
    banners: [], // 轮播图数据
    nearData: [], // 广告位
    unionId: "", // 用户标识                                    
    disabled: true,
    goods_id: "", // 商品id
    isCollect: 0, // 是否已收藏
    store_id: '', // 店铺id
    merchant_code: '', // 商家微信
    isShare: false, // 是否分享
    statusBarHeight: statusBarHeight + 'px',
    adImg: "/static/image/shuffling_3.jpg", // 广告路径
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.getScene(options)
    this.getUnionId();

    const { unionId } = this.data;

    if (unionId) {
      this.getData();
    }
  },

  /**
   * @module 获取scene
   */
  getScene(options) {
    const scene = decodeURIComponent(options.scene);

    if (scene === 'undefined') {
      this.getGoodsId(options)
      this.isShareHandler(options);
      return;
    }
    
    const [goods_id, referrer ] = scene.split(',')

    wx.setStorageSync('referrer', referrer)
    this.setData({ goods_id, referrer, isShare: true })
  },

  /**
   * @module 获取unionId
   */
  getUnionId() {
    const unionId = wx.getStorageSync('unionId');
    this.setData({ unionId })
  },

  /**
   * @module 获取goods_id
   */
  getGoodsId(options) {
    const { goods_id } = options;

    this.setData({ goods_id })
  },

  /**
   * @module 获取店铺id
   */
  getStoreId({ store_id }) {
    this.setData({ store_id })
  },

  /**
   * @module 获取是否分享
   */
  isShareHandler(options) {
    const { share } = options;

    const isShare = share == 1 ? true: false;
    
    this.setData({ isShare })
  },

  /**
   *  @module 获取广告位
   */
  getAdData() {

    const { store_id } = this.data;
    const data = { cate_id: store_id }

    recommendGoods(data)
      .then(({ data }) => {
        this.setData({ nearData: data })
      })
      .catch(err => {
        console.log(err)
      })
  },

  /**
   * @module 获取商品数据
   */
  getData() {
    const { goods_id, unionId } = this.data;
    const data = { goods_id: parseInt(goods_id), unionId };
  
    goodsShow(data)
      .then(({ data }) => {
        const { store: { merchant_code } } = data;

        this.getStoreId(data);
        this.getIsCollect(data)
        this.setBanners(data);
        this.getAdData();
        this.setData({ detailsData: data, disabled: true, merchant_code })
      })
      .catch(err => {
        console.log(err)
        this.setData({ disabled: true })
      })
  },

  /**
   * @module 设置轮播图
   */
  setBanners(data) {
    const { goods_banner1, goods_banner2, goods_banner3 } = data;

    let banners = [goods_banner1, goods_banner2, goods_banner3];

    banners = banners.filter(item => {
      return item;
    })

    this.setData({ banners })
  },

  /**
   * @module 获取是否收藏
   */
  getIsCollect({ is_collect }) {
    this.setData({ isCollect: is_collect })
  },

  /**
   * @module 点击收藏
   */
  collectHandler(e) {

    const { isCollect } = this.data;

    if (isCollect == 0) {
      this.goodsCollect()
    } else {
      this.cancelCollect()
    }
  },

  /**
   * @module 收藏
   */
  goodsCollect() {
    const { unionId, goods_id } = this.data;

    const data = { unionId, goods_id };

    if (isDisabled.call(this)) {
      return
    }

    goodsCollect(data)
      .then(res => {
        this.setData({ disabled: true, isCollect: 1 })
      })
      .catch(err => {
        console.log(err)
        this.setData({ disabled: true })
      })
  },

  /**
   * @module 取消收藏
   */
  cancelCollect() {
    const { unionId, goods_id } = this.data;

    const data = { unionId, goods_id };

    if (isDisabled.call(this)) {
      return
    }

    goodsCollectCancel(data)
      .then(res => {
        this.setData({ disabled: true, isCollect: 0 })
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
   * @module 获取用户信息
   */
  bindgetuserinfo(e) {
    const { iv, encryptedData } = e.detail;

    uploadInfo({ iv, encryptedData,  }, () => {
      this.getUnionId();
      const { unionId } = this.data;

      if (unionId) {
        this.getData();
      }
    })

  },

  /**
    * @module 跳转首页
    */
  homeHandler() {
    const { store_id } = this.data;
    const url = `/pages/stores/details/details?store_id=${store_id}&share=1`

    wx.redirectTo({ url })
  },

  /**
   * @module 返回
   */
  backHandler() {
    
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * @module 组织冒泡
   */
  bubbleHandler() {

  },

  /**
   * @module  生命周期函数  分享 
   */
  onShareAppMessage(e) {
    const { detailsData, goods_id, banners, detailsData: { goods_cover: imageUrl } } = this.data;

    return {
      title: detailsData.goods_name,
      path: `/pages/product/index?goods_id=${goods_id}&share=1`,
      imageUrl
    }
  }
})