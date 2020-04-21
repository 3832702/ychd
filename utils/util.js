const { baseurl } = getApp().globalData;

/**
 *  @module 发送请求
 *  @param [object] options 请求配置对象
 * 
 *  @return promise决议  发送请求成功或失败
 */

const reqPromise = function (options) {
  const defaultObj = {
    data: {},
    url: '',
    method: 'POST',
    header: {
      'content-type': 'application/json' // 默认值
    }
  };

  options = Object.assign({}, defaultObj, options);

  const { data, url, header, method } = options;

  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      header,
      method,
      success(res) {
        resolve(res);
      },
      fail(error) {
        reject(error)
      }
    })
  })
};


/**
 *  @module 连点控制
 *  
 *  @desc 需使用call显式绑定该函数的上下文
 * 
 *  @return 判断当前是否是处于连点的状态
 */

const isDisabled = function () {

  const { disabled } = this.data;
  if (!disabled) return true;

  this.setData({ disabled: false });
  return false;

};

/**
 *  @module 返回状态
 */
const statusHandler = function (res) {
  const { data: { status, info: content } } = res;

  if (!status) {
    wx.showModal({
      title: '',
      content,
      showCancel: false
    })
    this.setData({ disabled: true });
    return true;
  }
};


/**
 *  控制连点 组件中使用
 */
const controlComponentDisabled = function (disabledValue = false) {
  const { disabled } = this.data;

  if (!disabledValue) {

    if (!disabled) {
      return true;
    }
  }

  this.triggerEvent('disabledHandler', { disabled: disabledValue })
  return false;
};

/**
 *  @module 登陆
 * 
 *  @return 登陆决议  => 成功或者失败    
 */
const login = function () {
  return new Promise((resolve, reject) => {
    wx.login({
      success({ code }) {
        resolve(code)
      },
      fail(error) {
        resolve(err)
      }
    })
  })
};


/**
 *  @module 获取用户信息
 *  
 *  @return 返回用户信息
 */
const getUserInfo = function ({ code, user_id }) {
  return new Promise((resolve, reject) => {
    wx.getUserInfo({
      success(res) {
        res.code = code;
        res.user_id = user_id;
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

/**
 *  @module  上传获取到的code 和 iv encryptedData
 */
const uploadInfo = function ({ iv, encryptedData, rawData, user_id = '' }, cb) {
  login()
    .then(code => {

      if (iv && encryptedData) {
        return { code, iv, encryptedData, rawData, user_id };
      }

      return getUserInfo({ code, user_id });
    })
    .then(res => {

      /*if (!JSON.parse(rawData)) {
        
      } else {
        const { nickName, avatarUrl } = JSON.parse(rawData);
        wx.setStorageSync('userinfo', { nickName, avatarUrl })
      }*/

      // 这里上传到服务器
      loginReq.call(this, res, cb);
    })
    .catch(err => {
      console.log('登陆失败', err);
      controlComponentDisabled.call(this, true)
      wx.hideLoading();
    })
};

/**
 *  @module 获取后端返回的id
 * 
 *  @params [object] options 需要上传的code iv encryptedData
 *  @params [Function] cb  需要处理的回调函数
 * 
 */
const loginReq = function ({ code, iv, encryptedData, user_id }, cb) {
  const url = baseurl + 'wx/login';

   wx.showLoading({
     title: '加载中',
     mask: true
   })

  const referrer = wx.getStorageSync('referrer')

  const opt = {
    url,
    data: {
      code,
      iv,
      encryptedData,
      referrer
    }
  };

  reqPromise(opt)
    .then(res => {
      //console.log(JSON.parse(res))
      const { data: { unionId } } = res;
      wx.setStorageSync('unionId', unionId);
      wx.hideLoading();
      typeof cb === 'function' && cb();
    })
    .catch(err => {
      console.log('上传失败', err);
      controlComponentDisabled.call(this, true);
      wx.hideLoading();
    })
};

/**
 *  @module 上传图片
 *  @param [object] options  获取本地图片配置
 */

const chooseImage = function (
  {
    count = 9,
    sizeType = ['compressed'],
    sourceType = ['album', 'camera']
  } = {}) {

  if (isDisabled.call(this)) {
    return;
  }
  
  const { chooseImageLength } = this.data;

  count = count - chooseImageLength;

  if (!count) {
    return Promise.reject();
  }

  return new Promise((resolve, reject) => {
    wx.chooseImage({
      count,
      sizeType,
      sourceType,
      success(res) {
        resolve(res);
      },
      fail: (err) => {
        this.setData({ disabled: true });
      }
    })
  })
};

/**
 *  @module 处理本地文件
 *  
 *  @param [object] options  获取本地图片配置
 */
const imageHandler = function (options) {

  chooseImage.call(this, options)
    .then(({ tempFilePaths }) => {
      uploadImage.call(this, tempFilePaths)
    })
    .catch(err => {
      console.log(err);
      this.setData({ disabled: true });
    })
};

/**
 * @module 上传图片
 */
const uploadImage = function (tempFilePaths) {

  const url = `https://ychd.nineopen.com/web/picture`

  const arr = tempFilePaths.map(item => {
    console.log(url)
    return new Promise((resolve, reject) => {
      console.log(item)
      wx.uploadFile({
        url,
        filePath: item,
        name: 'image',
        formData: {
          'user': 'test'
        },
        success: (res) => {
          resolve(res)
        },
        fail: (err) => {
          console.log(err)
          this.setData({ disabled: true });
        }
      })

    })
  })

  wx.showLoading({
    title: '图片上传中',
    mask: true
  })

  Promise.all(arr)
    .then(res => {

      const images = res.map(item => {
        const { data } = item;

        return data
      })

      setImageHandler.call(this, images);

    })
    .catch(err => {
      console.log(err);
      wx.hideLoading();
      this.setData({ disabled: true });
    })
};

/**
 *  @module  设置图片  
 */

const setImageHandler = function (images) {
  let { imageData } = this.data;
  let chooseImageData = [];

  images.map(item => {
    if (item !== '"Fatal error: Call to a member function move() on null"') {
      chooseImageData.push(baseurl + 'upload/' + item)
    }
  })

  imageData = imageData.concat(chooseImageData);

  const chooseImageLength = imageData.length;
  wx.hideLoading();
  this.setData({ imageData, chooseImageLength, disabled: true });
};

/**
 *  @module 删除图片
 * 
 *  @param [Object] e 节点相关
 */
const removeImageHandler = function (e) {
  const { index } = e.currentTarget.dataset;

  const { imageData } = this.data;

  imageData.splice(index, 1);

  const chooseImageLength = imageData.length;

  this.setData({ imageData, chooseImageLength });

};


/**
 *  @module 获取设备高度
 * 
 *  @return [promise] 
 */
const getWindowHeight = function () {

  return new Promise((resolve, reject) => {
    wx.getSystemInfo({
      success(res) {
        resolve(res.windowHeight)
      },
      fail(err) {
        reject(err)
      }
    })
  });
};

/**
 * @module 获取指定元素高度
 * 
 * @param [String] select id选择器
 * 
 * @return 
 */

const getNodeHeight = function (select) {

  return new Promise((resolve, reject) => {
    wx.createSelectorQuery().select(select).boundingClientRect(rect => {
      resolve(rect.height)
    }).exec()
  })
};


/**
 *  @module 判断是否已经授权
 */
const getSetting = function (str) {
  return new Promise((resolve, reject) => {
    wx.getSetting({
      success: (res) => {

        let condition = true;

        if (typeof res.authSetting[str] === 'undefined') {
          condition = true;
        } else if (!res.authSetting[str]) {
          condition = false
        }

        resolve(condition)
      }
    })
  })
};


/**
 *  @module 打开授权页面
 */
const openSetting = function (str) {

  return new Promise((resolve, reject) => {

    wx.openSetting({
      success: (res) => {
        resolve(!!res.authSetting[str])
      }
    })

  })
};

/**
 *  @module 判断status === 0
 */
const failTipsHandler = function (res) {

  if (!res.data || res.data.status === 0) {
    if (res.data.info) {
      wx.showToast({
        title: res.data.info,
        icon: 'none'
      })
    }

    this.setData({ disabled: true });
    return true;
  }
};

/**
 *  @module 地址授权提示
 */
const addressSetting = function () {

  return new Promise((resolve, reject) => {
    wx.showModal({
      title: '温馨提示',
      content: '你已经拒绝了获取地址，点击确定重新打开获取地址',
      success(res) {
        if (res.confirm) {
          resolve()
        } else if (res.cancel) {
          reject()
        }
      }
    })
  })
};


/**
* @module  倒计时
*/
const countDown = function (timestamp) {

  const nowTime = new Date();
  const endTime = new Date(timestamp * 1000);
  const t = endTime.getTime() - nowTime.getTime();

  let hour = Math.floor(t / 1000 / 60 / 60);
  let min = Math.floor(t / 1000 / 60 % 60);
  let sec = Math.floor(t / 1000 % 60);
  let countDownTime = '';

  hour = hour < 10 ? '0' + hour : hour;
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;
  
  countDownTime = hour + " : " + min + " : " + sec;
  this.setData({ countDownTime: { hour, min, sec }, countDownTime });

};

/**
 *  设置倒计时
 */
const setCountDown = function (timestamp) {
  let timer = 0;

  countDown.call(this, timestamp);

  clearInterval(timer);
  timer = setInterval(() => {
    countDown.call(this, timestamp);
  }, 1000);
};

module.exports = {
  reqPromise,
  login,
  statusHandler,
  failTipsHandler,
  isDisabled,
  controlComponentDisabled,
  uploadInfo,
  chooseImage,
  getWindowHeight,
  getNodeHeight,
  getSetting,
  openSetting,
  addressSetting,
  imageHandler,
  setCountDown,
  uploadImage,
  removeImageHandler
}
