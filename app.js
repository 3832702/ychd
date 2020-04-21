
import GlobalConfig from './utils/config.js'

const globalConfig = new GlobalConfig()

globalConfig.init()


App({
  onLaunch: function () {
    const { statusBarHeight, system } = wx.getSystemInfoSync();

    this.globalData.statusBarHeight = statusBarHeight
    this.globalData.system = system
  },
  globalData: {
    userInfo: null,
    config: globalConfig,
    baseurl: 'https://ychd.nineopen.com/',
    baseImgUrl: 'https://store.nineopen.com'
  }
})