const { chooseImage, imageHandler, removeImageHandler, isDisabled, uploadImage } = require("../../utils/util.js")
const QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
const { storeCreate, shopFind, storeUpdate } = require("../../utils/server.js")
const { baseurl, statusBarHeight } = getApp().globalData;

const conditions = {
  isEmpty(value) {
    return !!this.data[value];
  }
}

Page({

  /**
   * 页面的初始数据
   */
  data: {
    statusBarHeight: statusBarHeight + 'px',
    getUnionId: "", // 用户标识
    chooseImageLength: 0, // 当前图片数量
    avataData: [], // 店铺头像图片
    imageData: [], // 店铺图片
    shopName: "", // 店铺名
    shopAddress: "", //店铺地址
    address: "", // 定位地址
    shopTime: "00:00", // 营业时间
    endTime: "请选择结束时间", // 
    shopDesc: "", // 店铺简介
    store_id: "", // 店铺id
    latitude: '',
    isFirst: true, // 是否首次进入
    longitude: '',
    startTime: '请选择营业时间', // 起始时间
    disabled: true,
    isAvatar: true, // 是否点击头像
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.getIsPass(options)
    this.getStoreId(options);
    this.removeLocalImage();
    this.getUnionId();
  },

  /**
   * @module 清除数据存储图片
   */
  removeLocalImage() {
    wx.removeStorageSync('localImage')
  },

  /**
   * @module 获取店铺id
   */
  getStoreId(options) {
    const { store_id } = options;

    const { unionId } = this.data;

    this.setData({ store_id })

    console.log(store_id)

    if (store_id !== 'undefined') {
      const data = { store_id, unionId };
      shopFind(data)
        .then(res => {
          this.initHandler(res);
        })
        .catch(err => {
          console.log(err)
        })
    }
  },

  /**
   * @module 获取is_pass
   */
  getIsPass(options) {
    const { is_pass } = options;

    this.setData({ is_pass })
  },


  /**
   * @module 获取开始时间
   */
  startTimeChange(e) {
    
    const { detail: { value: startTime } } = e;
    
    this.setData({ startTime })
  },
  /**
   * @module 获取结束时间
   */
  endTimeChange(e) {
    const { detail: { value: endTime } } = e;
    this.setData({ endTime })
  },

  /**
   * @module 初始化编辑店铺
   */
  initHandler(res) {
    const { address: shopAddress, address, latitude, longitude, store_about: shopDesc, store_banner: imageData, store_head, store_hours: shopTime, store_name: shopName } = res.data;

    const avataData = [store_head];
    const chooseImageLength = imageData.length
    
    const [startTime, endTime] = shopTime.split('-');

    if (startTime && endTime) {
      this.setData({ startTime, endTime })
    }

    this.setData({ avataData, imageData, shopName, shopAddress, address, shopDesc, latitude, longitude, address, chooseImageLength })
  },

  /**
   * @module 获取unionId
   */
  getUnionId() {
    const unionId = wx.getStorageSync('unionId');
    this.setData({ unionId })
  },

  /**
   * @module 上传店铺头像
   */
  uploadAvatar({
    count = 1,
    sizeType = ['original', 'compressed'],
    sourceType = ['album', 'camera']
  } = {}) {
    
    this.setData({ isAvatar: true })

    const { avataData } = this.data;

    let url = avataData.length > 0 ? `/pages/cutInside/cutInside?p=${avataData[0]}` : `/pages/cutInside/cutInside`

    wx.navigateTo({ url })
  },

  /**
 * @module 上传图片
 */
  uploadAvatarImage(tempFilePaths) {

    const url = `https://ychd.nineopen.com/web/picture`;
    const that = this;

    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url,
        filePath: tempFilePaths[0],
        name: 'image',
        formData: {
          'user': 'test'
        },
        success: (res) => {
          resolve(res)
          const { data } = res;
          that.setImageHandler([`${baseurl}upload/${data}`])
        },
        fail: (err) => {
          this.setData({ disabled: true });
        }
      })

    })
  },

  /**
   * @module 设置图片
   */
  setImageHandler(images) {
    const avataData = images;
    this.setData({ avataData, disabled: true });
  },

  /**
   *  @module 上传店铺图片
   */
  uploadImage({
    count = 9,
    sizeType = ['original', 'compressed'],
    sourceType = ['album', 'camera']
  } = {}) {

    const { chooseImageLength } = this.data;

    count = count - chooseImageLength;

    if (!count) {
      return;
    }

    this.setData({ isAvatar: false })
    wx.navigateTo({
      url: '/pages/cutInside/cutInside?shapetype=3'
    })

  },

  /**
   *  @module 删除店铺图片
   */
  removeImageHandler(e) {
    removeImageHandler.call(this, e)
  },

  /**
   *  @module 获取经纬度
   */
  getLocation() {
    const demo = new QQMapWX({
      key: '2ZUBZ-7E56J-VP6FB-KRF2O-QEBVE-ZKBXP' // 必填
    });

    const { shopAddress: address } = this.data;

    return new Promise((resolve, reject) => {
      demo.geocoder({
        address,
        success(res) {
          resolve(res)
        },
        fail(err) {
          reject(err)
        }
      });
    })

  },


  /**
   * @module 获取店铺地址
   */
  chooseLocation() {
    const that = this;

    wx.chooseLocation({
      success({ address, latitude, longitude }) {
        that.setData({ shopAddress: address, address, latitude, longitude })
      }
    })
  },


  /**
   *  @module 点击提交
   */
  submitHandler() {

    const { avataData, imageData, shopName, shopAddress, address, shopDesc, latitude, longitude, unionId, store_id, startTime, endTime, is_pass } = this.data;
    const store_head = avataData[0];
    
    const shopTime = startTime + '-' + endTime

    let data = { unionId, store_name: shopName, store_head: avataData[0], store_about: shopDesc, store_hours: shopTime, latitude, longitude, address: shopAddress, store_banner: imageData }

    if (isDisabled.call(this)) {
      return;
    }

    if (!conditions.isEmpty.call(this, "shopName")) {
      wx.showModal({
        showCancel: false, 
        content: `请输入店铺名称`,
      })
      this.setData({ disabled: true })
      return;
    }

    if (!conditions.isEmpty.call(this, "shopAddress")) {
      wx.showModal({
        showCancel: false,
        content: `请输入店铺地址`,
      })
      this.setData({ disabled: true })
      return;
    }

    if (!conditions.isEmpty.call(this, "shopTime")) {
      wx.showModal({
        showCancel: false,
        content: `请输入营业时间`,
      })
      this.setData({ disabled: true })
      return;
    }


    if (!conditions.isEmpty.call(this, "shopDesc")) {
      wx.showModal({
        showCancel: false,
        content: `请输入店铺简介`,
      })
      this.setData({ disabled: true })
      return;
    }

    if (startTime === '请选择营业时间') {
      wx.showModal({
        showCancel: false,
        content: `请选择营业时间`,
      })
      this.setData({ disabled: true })
      return;
    }

    if (endTime === '请选择结束时间') {
      wx.showModal({
        showCancel: false,
        content: `请选择结束时间`,
      })
      this.setData({ disabled: true })
      return;
    }


    if (shopAddress === address) {

      if (store_id !== 'undefined' || is_pass == 2) {
        this.successHandler('你的编辑申请已提交(2个工作日内完成审核)');

        if (store_id == 'undefined' && is_pass == 2) {
          data.store_id = wx.getStorageSync('storeid')
        } else {


          data.store_id = store_id;
        }

        data.is_pass = 0;
        storeUpdate(data)
          .then(res => {
          })
      } else {
        this.successHandler('你的开店申请已提交(2个工作日内完成审核)');
        storeCreate(data)
          .then(res => {
          })
      }
      this.setData({ disabled: true })
      return;
    }

    this.getLocation()
      .then(res => {
        const { result: { location: { lat: latitude, lng: longitude } } } = res;
        this.setData({ longitude, latitude })

        data = Object.assign({}, data, { longitude, latitude })
     
        if (store_id !== 'undefined' || is_pass == 2) {
          if (store_id == 'undefined' && is_pass == 2) {
            data.store_id = wx.getStorageSync('storeid')
          } else {
            data.store_id = store_id;
          }

          data.is_pass = 0;
          this.successHandler('你的编辑申请已提交(2个工作日内完成审核)');
          storeUpdate(data)
            .then(res => {
            })
        } else {
          
          this.successHandler('你的开店申请已提交(2个工作日内完成审核)');
          storeCreate(data)
            .then(res => {
            })
        }
      })
      .catch(err => {
        wx.showModal({
          showCancel: false,
          content: `该店铺地址${err.message}`
        })
        this.setData({ disabled: true })
      })
  },

  /**
   *  @module 处理成功回调
  */
  successHandler(msg) {
    this.setData({ disabled: true })
    wx.showModal({
      content: msg,
      showCancel: false,
      success: () => {
        wx.navigateBack({
          delta: 1
        })
      }
    })
  },

  /**
   *  @module 获取店铺名称
   */
  getShopName(e) {
    const { detail: { value: shopName } } = e;
    this.setData({ shopName })
  },

  /**
   *  @module 获取店铺地址
   */
  getShopAddress(e) {
    const { detail: { value: shopAddress } } = e;
    this.setData({ shopAddress })
  },

  /**
   * @module 获取店铺营业时间
   */
  getShopTime(e) {
    const { detail: { value: shopTime } } = e;
    this.setData({ shopTime })
  },

  /**
   * @module 获取店铺简介
   */
  getShopDesc(e) {
    const { detail: { value: shopDesc } } = e;
    this.setData({ shopDesc })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const { isFirst, isAvatar } = this.data;

    if (!isFirst) {
      const tempFilePaths = wx.getStorageSync('localImage')

      if (tempFilePaths && isAvatar) {
        this.uploadAvatarImage([tempFilePaths])
      } else if (tempFilePaths && !isAvatar) {
        uploadImage.call(this, [tempFilePaths])
      }
    }

    this.removeLocalImage();
    this.setData({ disabled: true, isFirst: false })
  }
})