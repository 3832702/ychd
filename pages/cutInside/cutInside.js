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

Page({
  data: {
    cropperOpt: {
      id: 'cropper',
      targetId: 'targetCropper',
      pixelRatio: device.pixelRatio,
      width,
      height,
      scale: 2.5,
      zoom: 8,
      cut: {
        x: (width - 375) / 2,
        y: (height - 225) / 2,
        width: 375,
        height: 225
      },
      boundStyle: {
        color: config.getThemeColor(),
        mask: 'rgba(0,0,0,0.8)',
        lineWidth: 1
      }
    },
    startY: 0, // 起始高度
    isDisabled: false
  },
  touchStart (e) {
    this.cropper.touchStart(e)
    
    const { changedTouches: [ { y } ] } = e;
    
  },
  touchMove (e) {
    this.cropper.touchMove(e)
  },
  touchEnd (e) {
    this.cropper.touchEnd(e)
  },
  getCropperImage (src) {
    let { imgLeft, imgTop, scaleWidth, scaleHeight, croperTarget } = this.cropper
    let { x, y, width, height } = this.cropper.cut

    this.cropper.getCropperImage({ original: true })
      .then((src) => {

        if (this.data.isDisabled) {
          wx.setStorageSync('localImage', src);
        }

        wx.navigateBack({
          delta: 1
        })
      })
      .catch(() => {
        console.log('获取图片地址失败，请稍后重试')
      })
  },
  uploadTap () {
    const self = this
    const { isDisabled } = this.data;
    wx.chooseImage({
      count: 1, // 默认9
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success (res) {
        let src = res.tempFilePaths[0]
        //  获取裁剪图片资源后，给data添加src属性及其
        self.setData({ isDisabled: true })
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
   * @module 清除数据存储图片
   */
  removeLocalImage() {
    wx.removeStorageSync('localImage')
  },


  onLoad (option) {
    this.getShapeType(option);
    this.removeLocalImage()
    const { cropperOpt } = this.data

    cropperOpt.boundStyle.color = config.getThemeColor()

    this.setData({ cropperOpt })

    this.cropper = new WeCropper(cropperOpt)
      .on('ready', (ctx) => {
        console.log(`wecropper is ready for work!`)
      })
      .on('beforeImageLoad', (ctx) => {
        wx.showToast({
          title: '加载中',
          mask: true,
          icon: 'loading',
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
   * @module 获取截图形状
   */
  getShapeType(options) {
    const { shapetype } = options;
    let { cropperOpt } = this.data;


    if (shapetype == 1) {

      cropperOpt.cut = {
        x: (width - 300) / 2,
        y: (height - 180) / 2,
        width: 300,
        height: 180
      }

    } else if (shapetype == 2) {
      
      cropperOpt.cut = {
        x: (width - 355) / 2,
        y: (height - 225) / 2,
        width: 355,
        height: 225
      }
      
    } else if(shapetype == 3) {
      cropperOpt.cut = {
        x: (width - 350) / 2,
        y: (height - 280) / 2,
        width: 350,
        height: 280
      }
    } else {
      cropperOpt.cut = {
        x: (width - 300) / 2,
        y: (height - 300) / 2,
        width: 300,
        height: 300
      }
    }

    this.setData({ cropperOpt })
  }
})
