const { storeFocus, storeFocusCancel, storeShow } = require("../../../utils/server.js")
const { uploadInfo } = require('../../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isFocus: 0, // 是否关注
    store_id: '', // 店铺id
    disabled: true, //
    unionId: '', // 
    storeInfo: {}, // 店铺信息
    store_banner: [], // 店铺图片
    goods: [], // 商品列表
    isShare: false, // 是否通过分享进入
    store_id: '' , // 店铺id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getScene(options);
    this.getUnionId();

    const { unionId } = this.data;

    if (unionId) {
      this.storeShow();
    }
  },

  /**
   * @module 获取scene
   */
  getScene(options) {
    const scene = decodeURIComponent(options.scene);

    if (scene === 'undefined') {
      this.getStoreId(options);
      this.isShareHandler(options);
      return;
    }

    const [store_id, referrer] = scene.split(',')
    wx.setStorageSync('referrer', referrer)
    
    this.setData({ store_id, referrer, isShare: true })
  },

  /**
   * @module 获取是否分享
   */
  isShareHandler(options) {
    const { share } = options;

    const isShare = share == 1 ? true : false;

    this.setData({ isShare })
  },

  /**
   * @module 获取goods_id
   */
  getStoreId(options) {
    const { store_id } = options;
    this.setData({ store_id })
  },

  /**
   * @module 获取unionId
   */
  getUnionId() {
    const unionId = wx.getStorageSync('unionId');
    this.setData({ unionId })
  },

  /**
   * @module 获取店铺信息
   */
  storeShow() {
    const { store_id, unionId } = this.data;
    const data = { store_id, unionId }

    storeShow(data)
      .then(({data}) => {
        
        this.setStoreInfo(data)
        this.setStoreList(data)
        this.setGoodsList(data)
        this.setIsFocus(data);
        this.setData({ disabled: true })
      })
      .catch(err => {
        console.log(err)
        this.setData({ disabled: true })
      })
  },

  /**
   * @module 设置店铺信息
   */
  setStoreInfo({ store }) {
    this.setData({ storeInfo: store })
  },

  /**
   * @module 设置店铺列表
   */
  setStoreList({ store }) {
    this.setData({ store_banner: store.store_banner })
  },

  /**
   * @module 设置是否关注
   */
  setIsFocus({ is_focus }) {
    this.setData({ isFocus: is_focus })
  },

  /**
   * @module 设置店铺商品列表
   */
  setGoodsList({ goods }) {
    this.setData({ goods })
  },

  /**
   * @module 点击关注
   */
  focusHandler(e) {
    const { isFocus } = this.data;

    if (isFocus == 0) {
      this.storeFocus()
    } else {
      this.cancelFocus()
    }
  },

  /**
   * @module 点击关注
   */
  storeFocus() {
    const { unionId, store_id, disabled } = this.data;

    const data = { unionId, store_id };

    if (!disabled) {
      return
    }

    this.setData({ disabled: false })
    storeFocus(data)
      .then(res => {
        this.setData({ isFocus: 1 })
        this.setData({ disabled: true })
      })
      .catch(err => {
        console.log(err)
        this.setData({ disabled: true })
      })
  },

  /**
   * @module 取消关注
   */
  cancelFocus() {
    const { unionId, store_id, disabled } = this.data;

    const data = { unionId, store_id };

    if (!disabled) {
      return
    }

    this.setData({ disabled: false })
    storeFocusCancel(data)
      .then(res => {
        this.setData({ isFocus: 0 })
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
   * @module 获取用户信息
   */
  bindgetuserinfo(e) {
    const { iv, encryptedData } = e.detail;

    uploadInfo({ iv, encryptedData }, () => {
      this.getUnionId();
      const { unionId } = this.data;

      if (unionId) {
        this.storeShow();
      }
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
    const { storeInfo, store_id } = this.data;

    const { store_banner: imageUrl } = storeInfo;

    return {
      title: storeInfo.store_name,
      path: `/pages/stores/details/details?store_id=${store_id}&share=1`,
      imageUrl: imageUrl[0]
    }
  }
})