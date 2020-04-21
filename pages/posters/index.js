const { qrCode } = require('../../utils/server.js')
const { baseImgUrl, statusBarHeight } = getApp().globalData;


Page({
  data: {
    cardInfo: {
      avater: "", //需要https图片路径
      qrCode: "", //需要https图片路径
      TagText: "", //标签
      Name: '一城好店', //姓名
      Position: "￥24.00", //职位
      Mobile: "在这里写入你的描述(最多30字)", // 
      Company: "", //公司
    },
    disabled: true,
    statusBarHeight: statusBarHeight + 'px',
    isClick: true
  },

  onLoad: function (options) {
    this.getPostersData();
    this.getId(options);
    this.getUnionId();
    this.getGoodsCover(options)
    this.getAvaterInfo();
  },

  /**
   * @module 取消按钮
   */
  blackHandler() {
    this.setData({ isClick: false })
    wx.navigateBack({
      delta: 1
    })
  },

  /**
   * @module 获取postersData
   */
  getPostersData() {
    const postersData = wx.getStorageSync('postersData');

    const { cardInfo } = this.data;

    cardInfo.Position = '￥' + postersData.goods_new_price
    cardInfo.Name = postersData.goods_name

    this.setData({ postersData, cardInfo })
  },

  /**
   * @module 获取unionId
   */
  getUnionId() {
    const unionId = wx.getStorageSync('unionId');

    this.setData({ unionId })
  },

  onShow() {
    this.setData({ disabled: true })
  },

  /**
   * @module 获取id
   */
  getId(options) {
    const { id } = options;

    this.setData({ id })
  },

  /**
   * @module 获取goods_cover
   */
  getGoodsCover(options) {
    const { goods_cover } = options;

    const { cardInfo } = this.data;

    cardInfo.avater = cardInfo.qrCode = goods_cover;

    this.setData({ cardInfo })
  },

  /**
   * @module 更改宣传语
   */
  changeMobile(e) {

    const { detail: { value } } = e;

    const { cardInfo, isClick } = this.data;

    if (cardInfo.Mobile === value) {
      this.setData({ disabled: true })
      return;
    }

    cardInfo.Mobile = value;
  },

  /**
   * @module 重新生成
   */
  submitHandler() {
    this.getAvaterInfo();
  },

  /**
   * @module 获取焦点
   */
  focusHandler() {
    this.setData({ disabled: false, isClick: true })
  },

  /**
   * 先下载头像图片
   */
  getAvaterInfo: function () {
    this.setData({ disabled: false })
    wx.showLoading({
      title: '生成中...',
      mask: true,
    });
    var that = this;
    wx.downloadFile({
      url: that.data.cardInfo.avater, //头像图片路径
      success: function (res) {
        wx.hideLoading();
        if (res.statusCode === 200) {
          var avaterSrc = res.tempFilePath; //下载成功返回结果
          that.qrCodeHandler(avaterSrc);
        } else {
          wx.showToast({
            title: '头像下载失败！',
            icon: 'none',
            duration: 2000,
            success: function () {
              var avaterSrc = "";
              that.qrCodeHandler(avaterSrc);
            }
          })
        }
      },
      fail() {
        that.setData({ disabled: true })
      }
    })
  },

  /**
   * @module 获取QrCode
   */
  qrCodeHandler(avaterSrc) {

    const { id, unionId } = this.data;

    const data = { type: 1, unionId, id }

    qrCode(data)
      .then(({ data }) => {
        const codeImage = baseImgUrl + data;

        this.getQrCode(avaterSrc, codeImage); //继续下载二维码图片
      })
      .catch(err => {
        console.log(err)
        this.setData({ disabled: true })
      })

  },

  /**
   * 下载二维码图片
   */
  getQrCode: function (avaterSrc, codeImage) {
    wx.showLoading({
      title: '生成中...',
      mask: true,
    });
    var that = this;
    wx.downloadFile({
      url: codeImage, //二维码路径
      success: function (res) {
        wx.hideLoading();
        if (res.statusCode === 200) {
          var codeSrc = res.tempFilePath;
          that.sharePosteCanvas(avaterSrc, codeSrc);
        } else {
          wx.showToast({
            title: '二维码下载失败！',
            icon: 'none',
            duration: 2000,
            success: function () {
              var codeSrc = "";
              that.sharePosteCanvas(avaterSrc, codeSrc);
            }
          })
        }
      },
      fail: () => {
        this.setData({ disabled: true })
      }
    })
  },

  /**
   * 开始用canvas绘制分享海报
   * @param avaterSrc 下载的头像图片路径
   * @param codeSrc   下载的二维码图片路径
   */
  sharePosteCanvas: function (avaterSrc, codeSrc) {
    wx.showLoading({
      title: '生成中...',
      mask: true,
    })
    this.setData({ disabled: true })
    var that = this;
    var cardInfo = that.data.cardInfo; //需要绘制的数据集合
    const ctx = wx.createCanvasContext('myCanvas'); //创建画布
    var width = "";
    wx.createSelectorQuery().select('#canvas-container').boundingClientRect(function (rect) {
      var height = rect.height;
      var right = rect.right;

      width = rect.width * 0.8;
      console.log(rect.width)
      var left = rect.left + 5;
      ctx.setFillStyle('#fff');
      ctx.fillRect(0, 0, rect.width, height);

      //头像为正方形
      if (avaterSrc) {
        ctx.drawImage(avaterSrc, left, 40, width, width / 1.25);
        ctx.setFontSize(14);
        ctx.setFillStyle('#fff');
        ctx.setTextAlign('left');
      }

      //标签
      if (cardInfo.TagText) {
        ctx.fillText(cardInfo.TagText, left + 20, width - 4);
        const metrics = ctx.measureText(cardInfo.TagText); //测量文本信息
        ctx.stroke();
        ctx.rect(left + 10, width - 20, metrics.width + 20, 25);
        ctx.setFillStyle('rgba(255,255,255,0.4)');
        ctx.fill();
      }

      //产品名
      if (cardInfo.Name) {
        ctx.setFontSize(14);
        ctx.setFillStyle('#000');
        ctx.setTextAlign('left');
        ctx.fillText(cardInfo.Name, left, width + 57);
      }

      //价格
      if (cardInfo.Position) {
        ctx.setFontSize(20);
        ctx.setFillStyle('#fb6464');
        ctx.setTextAlign('left');
        ctx.fillText(cardInfo.Position, left, width + 90);
      }

      //电话
      if (cardInfo.Mobile) {
        const CONTENT_ROW_LENGTH = 20; // 正文 单行显示字符长度
        let [contentLeng, contentArray, contentRows] = that.textByteLength(cardInfo.Mobile, CONTENT_ROW_LENGTH);
        ctx.setTextAlign('left');
        ctx.setFillStyle('#666');
        ctx.setFontSize(13);
        let contentHh = 20 * 1;
        for (let m = 0; m < contentArray.length; m++) {
          ctx.fillText(contentArray[m], left, width + 120 + contentHh * m);
        }
      }

      // 公司名称
      if (cardInfo.Company) {
        const CONTENT_ROW_LENGTH = 24; // 正文 单行显示字符长度
        let [contentLeng, contentArray, contentRows] = that.textByteLength(cardInfo.Company, CONTENT_ROW_LENGTH);
        ctx.setTextAlign('left');
        ctx.setFillStyle('#000');
        ctx.setFontSize(10);
        let contentHh = 22 * 1;
        for (let m = 0; m < contentArray.length; m++) {
          ctx.fillText(contentArray[m], left, width + 150 + contentHh * m);
        }
      }

      //  绘制二维码
      if (codeSrc) {
        ctx.drawImage(codeSrc, left + 160, width + 40, width / 3, width / 3)
        ctx.setFontSize(10);
        ctx.setFillStyle('#ccc');
        ctx.fillText("微信扫码或长按识别", left + 160, width + 150);
      }

    }).exec()

    setTimeout(function () {
      ctx.draw();
      wx.hideLoading();
    }, 1000)

  },

  /**
   * 多行文字处理，每行显示数量
   * @param text 为传入的文本
   * @param num  为单行显示的字节长度
   */
  textByteLength(text, num) {
    let strLength = 0; // text byte length
    let rows = 1;
    let str = 0;
    let arr = [];
    for (let j = 0; j < text.length; j++) {
      if (text.charCodeAt(j) > 255) {
        strLength += 2;
        if (strLength > rows * num) {
          strLength++;
          arr.push(text.slice(str, j));
          str = j;
          rows++;
        }
      } else {
        strLength++;
        if (strLength > rows * num) {
          arr.push(text.slice(str, j));
          str = j;
          rows++;
        }
      }
    }
    arr.push(text.slice(str, text.length));
    return [strLength, arr, rows] //  [处理文字的总字节长度，每行显示内容的数组，行数]
  },

  //点击保存到相册
  saveShareImg: function () {
    const { disabled } = this.data;
    if (!disabled) {
      return;
    }

    var that = this;
    wx.showLoading({
      title: '正在保存',
      mask: true,
    })
    setTimeout(function () {
      wx.canvasToTempFilePath({
        canvasId: 'myCanvas',
        success: function (res) {
          wx.hideLoading();
          var tempFilePath = res.tempFilePath;
          wx.saveImageToPhotosAlbum({
            filePath: tempFilePath,
            success(res) {
              // utils.aiCardActionRecord(19);
              wx.showModal({
                content: '图片已保存到相册，赶紧晒一下吧~',
                showCancel: false,
                confirmText: '好的',
                confirmColor: '#333',
                success: function (res) {
                  wx.navigateBack({
                    delta: 1
                  })
                },
                fail: function (res) { }
              })
            },
            fail: function (res) {
              wx.showToast({
                title: res.errMsg,
                icon: 'none',
                duration: 2000
              })
            }
          })
        }
      });
    }, 1000);
  },

})