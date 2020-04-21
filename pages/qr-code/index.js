/**
 * Created by sail on 2017/6/1.
 */
import WeCropper from '../../utils/we-cropper/we-cropper.js'
const app = getApp()
const config = app.globalData.config

const device = wx.getSystemInfoSync()
const { pixelRatio } = device
const width = device.windowWidth
const height = device.windowHeight

const { contactCode } = require('../../utils/server.js')


Page({
  data: {
    store_id: '',
    cropperOpt: {
      id: 'cropper',
      targetId: 'targetCropper',
      pixelRatio: device.pixelRatio,
      width,
      height,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: (width - 300) / 2,
        y: (height - 300) / 2,
        width: 300,
        height: 300
      },
      boundStyle: {
        color: config.getThemeColor(),
        mask: 'rgba(0,0,0,0.8)',
        lineWidth: 1
      }
    },
    isDisabled: false,
    isImage: false, // 是否有图片
  },
  touchStart(e) {
    this.cropper.touchStart(e)
  },
  touchMove(e) {
    this.cropper.touchMove(e)
  },
  touchEnd(e) {
    this.cropper.touchEnd(e)
  },
  getCropperImage() {

    const { isImage } = this.data;

    if (!isImage) {
      wx.navigateBack({
        delta: 1
      })
      return;
    }
    
    this.cropper.getCropperImage({ original: true })
      .then((src) => {
        this.uploadAvatarImage(src)
      })
      .catch(() => {
        console.log('获取图片地址失败，请稍后重试')
      })
  },

  /**
  * @module 上传图片
  */
  uploadAvatarImage(tempFilePaths) {

    const { store_id } = this.data;

    const url = `https://ychd.nineopen.com/web/contact_code`;
    const that = this;

    return new Promise((resolve, reject) => {
      wx.uploadFile({
        url,
        filePath: tempFilePaths,
        name: 'image',
        formData: {
          store_id
        },
        success: ({ data: image, statusCode }) => {

          if (statusCode === 200) {
            wx.showModal({
              content: '商家二维码上传成功',
              success() {
                wx.navigateBack({
                  delta: 1
                })
              }
            })
          }

          this.setData({ disabled: true })
        },
        fail: (err) => {
          this.setData({ disabled: true });
        }
      })
    })
  },

  uploadTap() {
    const self = this
    const { isDisabled } = this.data;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success(res) {
        const src = res.tempFilePaths[0]
        //  获取裁剪图片资源后，给data添加src属性及其值
        self.setData({ isDisabled: true })

        if (src) {
          self.setData({ isImage: true })
        }

        self.cropper.pushOrign(src)
      }
    })
  },

  /**
   * @module 返回上一页
   */
  backHandler() {
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * @module 生命周期函数
   */
  onLoad(option) {
    this.getStoreId(option)

    const { cropperOpt } = this.data

    cropperOpt.boundStyle.color = config.getThemeColor()

    this.setData({ cropperOpt })

    this.cropper = new WeCropper(cropperOpt)
      .on('ready', (ctx) => {
        console.log(`wecropper is ready for work!`)
      })
      .on('beforeImageLoad', (ctx) => {
        wx.showToast({
          title: '上传中',
          icon: 'loading',
          mask: true,
          duration: 20000
        })
      })
      .on('imageLoad', (ctx) => {
        wx.hideToast()
      })
      this.getIco(option)
  },

  /**
   * @module 获取数据
   */
  getIco(options) {
    const { p } = options;

    if (p) {
      this.cropper.pushOrign(p)
    }
  },


  /**
   * @module 获取店铺id
   */
  getStoreId(options) {
    const { store_id } = options;

    this.setData({ store_id })
  }
})
