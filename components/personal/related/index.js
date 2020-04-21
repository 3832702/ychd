// components/personal/related/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    is_hide: {
      type: Boolean,
      value: false
    },
    relatedData: {
      type: Array,
      value: [
        {
          title: '总访问量',
          num: 0
        },
        {
          title: '累计访客',
          num: 0
        },
        {
          title: '粉丝',
          num: 0
        }
      ]
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

  }
})
