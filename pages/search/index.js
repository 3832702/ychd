const { search } = require("../../utils/server.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyword: "", // 要查询的值
    option: 1, // 1为全部  二为店铺
    page: 1, // 分页
    store_id: '', // 店铺查询需要
    searchData: [], // 查询到的数据
    isNot: false, // 是否为空数据
    isMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    this.getOption(options);
    this.getStoreId(options)
  },

  /**
   * @module 获取option
   */
  getOption(options) {
    const { option } = options;

    this.setData({ option })
  },

  /**
   * @module 获取store_id
   */
  getStoreId(options) {
    const { store_id } = options;

    if (store_id) {
      this.setData({ store_id })
    }
  },

  /**
   * @module 获取要查询内容
   */
  getKeyword(e) {
    const { detail: { value: keyword } } = e;

    if (keyword === '') {
      this.setData({ searchData: [], isNot: false })
    }

    this.setData({ keyword })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow () {
    this.setData({ disabled: true })
  },

  /**
   * @module 搜索
   */
  search() {
    const { option, page, keyword, store_id } = this.data;
    
    const data = { option, page, keyword }

    if (store_id) {
      data.store_id = store_id;
    }

    search(data)
      .then(({ data }) => {
        this.setData({ disabled: true })
        this.setSearchData(data);
      })
      .catch(err => {
        console.log(err)
        this.setData({ disabled: true })
      })
  },

  /**
   * @module 设置搜索数据
   */
  setSearchData(data) {
    let { searchData } = this.data;
    if (data.length === 0) {
      this.setData({ isMore: false })
    }

    searchData = [...searchData, ...data]

    console.log(searchData)
    let isNot = searchData.length === 0 ? true : false;

    this.setData({ searchData, isNot })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom () {
    let { isMore, page } = this.data;

    if (isMore) {
      page++;
      this.setData({ page })
      this.search()
    }
  }
})