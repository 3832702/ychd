const { reqPromise } = require("./util.js");
const { baseurl } = getApp().globalData;

/**
 *  @module 获取产品分类
 */
const category = function () {
  const url = `${baseurl}web/category`;
  return reqPromise({ url })

}

/**
 * @module 获取轮播图
 */
const banner = function(data) {
  const url = `${baseurl}web/banner`;
  return reqPromise({ url, data })
}

/**
 *  @module 提交店铺申请
 */
const storeCreate = function (data) {
  const url = `${baseurl}web/store_create`;
  return reqPromise({ url, data })
}

/**
 * @module 更新店铺申请
 */
const storeUpdate = function (data) {
  const url = `${baseurl}web/store_update`;
  return reqPromise({ url, data })
}

/**
 * @module 获取个人中心数据
 */
const user = function (data) {
  const url = `${baseurl}web/user`;
  return reqPromise({ url, data })
}

/**
 * @module 获取店铺管理数据
 */
const shopFind = function (data) {
  const url = `${baseurl}web/store_find`;
  return reqPromise({ url, data })
}


/**
 * @module 创建商品
 */
const goodsCreate = function (data) {
  const url = `${baseurl}web/goods_create`;
  return reqPromise({ url, data })
}

/**
 * @module 获取附近店铺
 */
const nearbyShops = function(data) {
  const url = `${baseurl}web/nearby_shops`;
  return reqPromise({ url, data })
}


/**
 * @module 获取商品列表
 */
const nearGoods = function (data) {
  const url = `${baseurl}web/near_goods`;
  return reqPromise({ url, data })
}

/**
 * @module 商品详情
 */
const goodsFind = function(data) {
  const url = `${baseurl}web/goods_find`;
  return reqPromise({ url, data })
}

/*
  @module  商品详情
*/
const goodsShow = function(data) {
  const url = `${baseurl}web/goods_show`;
  return reqPromise({ url, data })
}

/**
 * @module 收藏商品
 */
const goodsCollect = function(data) {
  const url = `${baseurl}web/goods_collect`;
  return reqPromise({ url, data })
}

/**
 * @module 取消收藏商品
 */
const goodsCollectCancel = function(data) {
  const url = `${baseurl}web/goods_collect_cancel`;
  return reqPromise({ url, data })
}

/**
 * @module 关注店铺
 */
const storeFocus = function(data) {
  const url = `${baseurl}web/store_focus`;
  return reqPromise({ url, data })
}

/**
 * @module 取消关注店铺
 */
const storeFocusCancel = function(data) {
  const url = `${baseurl}web/store_focus_cancel`;
  return reqPromise({ url, data })
}

/**
 * @module 更新商品
 */
const goodsUpdate = function(data) {
  const url = `${baseurl}web/goods_update`;
  return reqPromise({ url, data })
}

/**
 * @module  店铺展示
 */
const storeShow = function(data) {
  const url = `${baseurl}web/store_show`;
  return reqPromise({ url, data })
}

/**
 * @module 店铺商品列表
 */
const storeGoods = function(data) {
  const url = `${baseurl}web/store_goods`;
  return reqPromise({ url, data })
}

/**
 * @module 删除商品
 */
const goodsDel = function(data) {
  const url = `${baseurl}web/goods_del`;
  return reqPromise({ url, data })
}

/**
 * @module 店铺统计
 */
const storeCount = function(data) {
  const url = `${baseurl}web/store_count`;
  return reqPromise({ url, data })
}

/**
 * @module 优选店铺
 */
const goodShops = function(data) {
  const url = `${baseurl}web/good_shops`;
  return reqPromise({ url, data })
}


/**
 * @module 栏目列表
 */
const cateGoods = function(data) {
  const url = `${baseurl}web/cate_goods`;
  return reqPromise({ url, data })
}


/**
 * @module 搜索
 */
const search = function(data) {
  const url = `${baseurl}web/search`;
  return reqPromise({ url, data })
}

/**
 * @module 优选商品
 */
const recommendGoods = function(data) {
  const url = `${baseurl}web/recommend_goods`;
  return reqPromise({ url, data })
}

/**
 * @module 生成小程序码
 */
const qrCode = function(data) {
  const url = `https://store.nineopen.com/index/qr_code`;
  return reqPromise({ url, data })
}


/**
 * @module 上传二维码
 */
const contactCode = function(data) {
  const url = `${baseurl}web/contact_code`;
  return reqPromise({ url, data })
}

/**
 * @module 上架
 */
const isPlay = function(data) {
  const url = `${baseurl}web/is_play`;
  return reqPromise({ url, data })
}

/**
 * @module 审核列表
 */
const goodsList = function(data) {
  const url = `${baseurl}web/goods_list`;
  return reqPromise({ url, data })
}


/**
 * @module 审核列表
 */
const auditList = function(data) {
  const url = `${baseurl}web/audit_list`;
  return reqPromise({ url, data })
}

/**
 * @module 审核商品
 */
const goodsAudit = function(data) {
  const url = `${baseurl}web/goods_audit`;
  return reqPromise({ url, data })
}


/**
 * @module 审核店铺
 */
const storeAudit = function (data) {
  const url = `${baseurl}web/store_audit`;
  return reqPromise({ url, data })
}

module.exports = {
  category,
  storeCreate,
  user,
  shopFind,
  storeUpdate,
  goodsCreate,
  nearbyShops,
  nearGoods,
  goodsFind,
  goodsCollect,
  storeFocus,
  goodsUpdate,
  storeFocusCancel,
  storeShow,
  storeGoods,
  goodsDel,
  goodsShow,
  goodsCollectCancel,
  storeCount,
  goodShops,
  cateGoods,
  search,
  recommendGoods,
  qrCode,
  contactCode,
  isPlay,
  banner,
  goodsList,
  goodsAudit,
  storeAudit,
  auditList
}