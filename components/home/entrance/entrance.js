const entrances = [
  {
    name: '',
    ico: '',
    path: ''
  },
  {
    name: '',
    ico: '',
    path: ''
  },
  {
    name: '',
    ico: '',
    path: ''
  },
  {
    name: '',
    ico: '',
    path: ''
  },
  {
    name: '',
    ico: '',
    path: ''
  },
  {
    name: '',
    ico: '',
    path: ''
  },
  {
    name: '',
    ico: '',
    path: ''
  },
  {
    name: '',
    ico: '',
    path: ''
  },
  {
    name: '',
    ico: '',
    path: ''
  },
  {
    name: '',
    ico: '',
    path: ''
  }
]

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    category: {
      type: Array,
      value: entrances
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {
    jumpCategories() {
      wx.navigateTo({
        url: `/pages/categories/index`
      })
    },

    /**
     * @module 跳转至产品分类
     */
    jumpColumn(e) {
      const { currentTarget: { dataset: { index } } } = e;
      const { category } = this.data;

      const { cate_id } = category[index]

      const url = `/pages/column-list/index?cate_id=${cate_id}`

      wx.navigateTo({ url })
    }
  }
})
