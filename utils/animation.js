/**
 *  @module 动画
 */
const animationHandler = function ({ duration = 1000, delay = 0, transformOrigin = "50% 50%", timingFunction = "ease" } = {}) {
  const animation = wx.createAnimation({ transformOrigin, duration, delay, timingFunction })

  return animation;
};


/**
 *  @module 隐藏组件
 *  @params [Object] options 创建动画的配置选项
 */
const topHandler = function (options) {
  const animation = animationHandler(options);

  animation.bottom('-100%').step();
  return animation.export();
};

/**
 *  @module 显示组件
 *  @params [Object] options 创建动画的配置选项
 */
const bottomHandler = function (options) {
  const animation = animationHandler(options);

  animation.bottom(0).step();
  return animation.export();
};

/**
*  @module 显示弹窗
*/
const blockHandler = function() {
  const animationData = bottomHandler({ duration: 1000 });

  const animationDataParent = bottomHandler({ duration: 0 });

  this.setData({ animationData, animationDataParent });
};

/**
 *  @module 隐藏弹窗
 */
const hideHandler = function() {
  const animationData = topHandler({ duration: 1000 });

  const animationDataParent = topHandler({ duration: 0, delay: 500 });

  this.setData({ animationData, animationDataParent });
};


module.exports = {
  topHandler,
  bottomHandler,
  hideHandler,
  blockHandler
}