const { baseurl } = getApp().globalData;
const { goodsCreate, category, goodsUpdate, goodsFind } = require("../../utils/server.js")
const { chooseImage, imageHandler, removeImageHandler } = require("../../utils/util.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array: ['选择商品分类', '分类一', '分类二', '分类三', '分类四'], // 商品分类
    index: 0, // 当前分类索引
    goodsName: "", // 商品名
    goodsClass: "", // 商品分类
    images: [], // 商品图片
    descs: [], // 商品正文
    goodsPrice: "", // 商品原价
    chooseImageLength: 0, 
    goodsActivityTime: "2018-12-27", // 商品活动时间
    goodsEndTime: "", // 商品结束时间
    goodsNewPrice: "", // 活动原价
    disabled: true, //
    unionId: "", //
    goods_id: "", // 商品id
    categoryJSON: [], // 详细
    // category: [], // 分类
    avataData: [], // 封面图
    isFirst: true, // 是否首次进入页面
    descImageData: [], // 商品描述图片
    imageData: [], // 图片
    descStr: '', // 描述信息
    imgViewList: [], // 图片列表
    imgViewIndex:0, // 图片个数
    descData: {
      0: '',
      1: '',
      2: ''
    }, // 图片
    store_id: "", // 店铺id
    imgIndex: 0, // 当前操作的是第几张图片
    descIndex: 0, // 当前操作的是第几个文本输入框
    isAvatar: true, // 是否点击头像
  },

  /**
   *  @module 更改商品分类
   */
  bindPickerChange(e) {
    const { detail: { value: index } } = e;
    const { array } = this.data;
    const goodsClass = array[index];
    this.setData({ index, goodsClass })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.removeLocalImage();
    this.getGoodsId(options);
    this.getActiveTime();
    this.getCategory();
    this.getStoreId(options);
  },

  /**
   * @module 清除数据存储图片
   */
  removeLocalImage() {
    wx.removeStorageSync('localImage')
  },

  /**
   * @module 获取商品id
   */
  getGoodsId(options) {
    const { goods_id } = options;

    if (goods_id) {
      this.setData({ goods_id })
    }
  },

  /*
  * @module 获取当前时间
  */
  getActiveTime() {
    const date = new Date();

    const y = date.getFullYear()
    let m = date.getMonth() + 1;
    let day = date.getDate()

    if (m < 10) {
      m = '0' + m
    }

    if (day < 10) {
      day = '0' + day
    }

    const str = `${y}-${m}-${day}`

    this.setData({ goodsActivityTime: str, goodsEndTime: str, startTime: str })
  },

  /**
   * @module 获取分类
   */
  getCategory() {
    category()
      .then(({ data }) => {

        const array = data.map(item => item.cate_name)

        this.setData({ categoryJSON: data, array })
        this.getGoodsInfo();
      })
      .catch(err => {
        console.log(err)
      })
  },

  /**
   * @module 获取数据
   */
  getGoodsInfo() {
    const { goods_id } = this.data;

    if (!goods_id) {
      return;
    }

    const data = { goods_id }

    goodsFind(data)
      .then(({ data }) => {
        this.setDataHandler(data)
      })
      .catch(err => {

      })
  },

  /**
   * @module 设置数据
   */
  setDataHandler(data) {
    let { goods_banner: imgViewList, content: descStr, goods_name: goodsName, goods_new_price: goodsNewPrice, goods_price: goodsPrice, goods_start_time: goodsActivityTime, goods_end_time: goodsEndTime, cate_id, goods_cover: avataData } = data

    const { categoryJSON } = this.data;

    categoryJSON.forEach((item, index) => { 

      if (cate_id === item.cate_id) {
        this.setData({ goodsClass: item.cate_name, index })
      }

    });

    if (!imgViewList) {
      imgViewList = [];
    }

    this.setData({ goodsName, goodsNewPrice, goodsEndTime, goodsActivityTime, goodsPrice, descStr, imgViewList, imgViewIndex: imgViewList.length, avataData: [avataData] })
  },

  /**
   * @module 获取unionId
   */
  getUnionId() {
    const unionId = wx.getStorageSync('unionId');
    this.setData({ unionId })
  },

  /**
   * @module 获取店铺id
   */
  getStoreId(options) {
    const { store_id } = options;

    if (store_id) {
      this.setData({ store_id })
    }
  },

  /**
   * @module 获取商品名字
   */
  getGoodsName(e) {
    const { detail: { value: goodsName } } = e;

    this.setData({ goodsName })
  },

  /**
   * @module 获取商品原价
   */
  getGoodsPrice(e) {
    const { detail: { value: goodsPrice } } = e;

    this.setData({ goodsPrice })
  },

  /**
   * @module 获取活动时间
   */
  bindDateChange(e) {
    this.setData({
      goodsActivityTime: e.detail.value
    })
  },

  /**
   * @module 获取活动结束时间
   */
  bindEndChange(e) {
    this.setData({
      goodsEndTime: e.detail.value
    })
  },

  /**
   * @module 获取商品活动价钱
   */
  getGoodsNewPrice(e) {
    const { detail: { value: goodsNewPrice } } = e;

    this.setData({ goodsNewPrice })
  },

  /**
   * @module 获取正文
   */
  descHandler(e) {
    const { currentTarget: { dataset: { index: descIndex } }, detail: { value } } = e;
    let { descData } = this.data;

    descData[descIndex] = value;

    this.setData({ descIndex, descData, disabled: true })
  },

  /**
   * @module 获取描述
   */
  getDescHandler(e) {
    console.log(e)
    const { detail: { value: descStr } } = e;

    this.setData({ descStr })
  },

  /**
   * @module 删除图片
   */
  removeImageHandler(e) {
   // removeImageHandler.call(this, e)
  },

  /**
   * @module 上传店铺描述图片
   */
  uploadImage(e) {
    //imageHandler.call(this)
  },

  /**
  * @module 上传封面头像
  */
  uploadCoverAvatar({
    count = 1,
    sizeType = ['original', 'compressed'],
    sourceType = ['album', 'camera']
  } = {}) {

    this.setData({ isAvatar: true })

    const { avataData } = this.data;

    let url = avataData.length > 0 ? `/pages/cutInside/cutInside?shapetype=3&p=${avataData[0]}` :  `/pages/cutInside/cutInside?shapetype=3`

    wx.navigateTo({ url })
  },

  /**
 * @module 上传图片
 */
  uploadCoverAvatarImage(tempFilePaths) {

    wx.showLoading({
      title: '加载中',
      mask: true
    })

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
          wx.hideLoading()
          resolve(res)
          const { data } = res;
          that.setCoverImageHandler([`${baseurl}upload/${data}`])
        },
        fail: (err) => {
          this.setData({ disabled: true });
          wx.hideLoading()
        }
      })

    })
  },

  /**
   * @module 设置图片
   */
  setCoverImageHandler(images) {
    const avataData = images;
    this.setData({ avataData, disabled: true });
  },

  /**
   * @module 提交登陆
   */
  submitHandler() {
    const { imgViewList: goods_banner, descStr: content, goodsName: goods_name, goodsClass, store_id, categoryJSON, index, goodsPrice: goods_price, goodsActivityTime: goods_start_time, goodsNewPrice: goods_new_price, disabled, goodsEndTime: goods_end_time, goods_id, avataData } = this.data;

    if (!disabled) {
      return
    }

    const cate_id = categoryJSON[index].cate_id;

    if (!goods_name) {
      wx.showModal({
        content: '请输入商品名称',
        showCancel: false
      })

      this.setData({ disabled: true })
      return;
    }

    if (!goods_new_price) {
      wx.showModal({
        content: '请输入活动价',
        showCancel: false
      })

      this.setData({ disabled: true })
      return;
    }

    if (avataData.length === 0) {
      wx.showModal({
        content: '请输入封面图',
        showCancel: false
      })

      this.setData({ disabled: true })
      return;
    }

    if (!goods_price) {
      wx.showModal({
        content: '请输入商品原价',
        showCancel: false
      })

      this.setData({ disabled: true })
      return;
    }

    let data = { goods_name, store_id, content, goods_banner, cate_id, goods_start_time, goods_end_time, goods_price, goods_new_price, goods_cover: avataData[0], is_pass: 0 };

    if (!goods_id) {
      goodsCreate(data)
        .then(({ statusCode }) => {

          if (statusCode === 200) {
            wx.showModal({
              content: '商品正在审核中(2个工作日内完成审核)',
              showCancel: false,
              success: () => {
                this.setData({ disabled: true })

                /*wx.redirectTo({
                  url: `/pages/release-list/index?index=0&store_id=${store_id}`
                })*/

                wx.navigateBack({
                  delta: 1
                })
              }
            })
          } else {
            console.log(data)
          }

          this.setData({ disabled: true })

        })
        .catch(err => {
          console.log(err)
          this.setData({ disabled: true })
        })
    } else {
      data.goods_id = goods_id;

      goodsUpdate(data)
        .then(({ statusCode }) => {
          if (statusCode === 200) {
            wx.showModal({
              content: '商品正在审核中(2个工作日内完成审核)',
              showCancel: false,
              success: () => {
                this.setData({ disabled: true })
                
               // const store_id = wx.getStorageSync('store_id')

                wx.redirectTo({
                  url: `/pages/release-list/index?index=0&store_id=${store_id}`
                })
              }
            })
          }

          this.setData({ disabled: true })
        })
        .catch(err => {
          console.log(err)
          this.setData({ disabled: true })
        })
    }
  },

  takePhoto: function () {

    const { imgViewIndex, disabled } = this.data;

    let count = 9 - imgViewIndex;

    if (count <= 0) {
      this.setData({ disabled: true })
      return;
    }

    if (!disabled) {
      return;
    }

    this.setData({ disabled: false })
   
    //拍照、从相册选择上传
    wx.chooseImage({
      count,    //这个是上传的最大数量，默认为9
      sourceType: ['album', 'camera'],    //这个是图片来源，相册或者相机
      success: ({ tempFilePaths }) => {
        this.getCanvasImg(0, 0, tempFilePaths);    //进行压缩
        wx.showLoading({
          title: '加载中',
          mask: true
        })
      },
      fail: () => {
        this.setData({ disabled: true })
      }
    });
  },

  //压缩并获取图片，这里用了递归的方法来解决canvas的draw方法延时的问题
  getCanvasImg: function (index, failNum, tempFilePaths) {
    let { imgViewIndex } = this.data;

    if (index < tempFilePaths.length) {

      wx.getFileInfo({
        filePath: tempFilePaths[index],
        success: ({ size }) => {

          console.log(size)
          if (size > 2000000) {
            wx.getImageInfo({
              src: tempFilePaths[index],
              success: (res) => {

                const ctx = wx.createCanvasContext('attendCanvasId');

                let quality = 1

                if (size > 10000000 && size < 13500000) {
                  quality = .8
                } else if (size > 13500000) {
                  quality = .5
                }

                this.setData({ canWidth: res.width, canHeight: res.height })
                ctx.drawImage(tempFilePaths[index], 0, 0, res.width, res.height);
                if (res.width > 2000 || res.height > 2000) {
                  quality = .7
                }
                ctx.draw(true, () => {
                  index = index + 1;//上传成功的数量，上传成功则加1
                  wx.canvasToTempFilePath({
                    canvasId: 'attendCanvasId',
                    fileType: "jpg",
                    quality,
                    success: ({ tempFilePath }) => {

                      this.uploadCanvasImg(tempFilePath, index === tempFilePaths.length);
                      this.getCanvasImg(index, failNum, tempFilePaths);
                    }, fail: (e) => {
                      failNum += 1;//失败数量，可以用来提示用户
                      this.getCanvasImg(inedx, failNum, tempFilePaths);
                    }
                  });
                });
              }
            })
          } else {
            this.uploadCanvasImg(tempFilePaths[index], index === tempFilePaths.length - 1);
            index = index + 1;//上传成功的数量，上传成功则加1
            this.getCanvasImg(index, failNum, tempFilePaths);
          }
        }
      })
    } else {
      this.setData({ disabled: true })
    }
  },
    //上传图片
  uploadCanvasImg: function (canvasImg, last) {

    console.log(canvasImg)
    
    wx.uploadFile({
      url: 'https://ychd.nineopen.com/web/picture',//文件服务器的地址
      filePath: canvasImg,
      name: 'image',
      formData: {
        'user': 'test'
      },
      success: ({ data }) => {
        const { imgViewList } = this.data;
        imgViewList.push(`${baseurl}upload/${data}`);

        console.log(data)

        wx.getFileInfo({
          filePath: canvasImg,
          success: (res) => {
            console.log(res)
          }
        })
        
        this.setData({ imgViewList, imgViewIndex: imgViewList.length })
        
        if (last) {
          wx.hideLoading();
          this.setData({ disabled: true })
        }
      }
    })
  },

  /**
   * @module 删除
   */
  removeImageHandler(e) {
    const { index } = e.currentTarget.dataset;

    const { imgViewList } = this.data;

    imgViewList.splice(index, 1);

    const imgViewIndex = imgViewList.length;

    this.setData({ imgViewList, imgViewIndex });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    const { isFirst, isAvatar } = this.data;
  
    if (!isFirst) {
      const tempFilePaths = wx.getStorageSync('localImage')

      if (tempFilePaths && isAvatar) {
        this.uploadCoverAvatarImage([tempFilePaths])
      } else if (tempFilePaths && !isAvatar) {
        console.log(tempFilePaths)
        this.uploadAvatarImage([tempFilePaths])
      }
    }

    this.removeLocalImage();

    this.setData({ disabled: true, isFirst: false })
  }
})