# app客户端交互方法

# 类型
```js
// APP方法

// 工具类方法


```

## 跳转转入

``` js 
  /**
   * 跳转入
   * @author 1154 1504
   * @param {*} productId  产品ID
   * @param {*} productName  产品名字
   * @param {*} productTypeId 产品类型ID
   * @param {*} fromPage  从哪个页面跳转过来的 1-首页 2-资产页 3-详情页  4-活动页
   * @param {*} eventRefId 活动事件ID,活动的页面点击的时候传，其余默认为“0”
   * @param {*} couponId 卡券id（4.1.0）
   * @param {*} couponName 卡券名称（4.1.0）
   * @param {*} isShowCoupon 是否显示选择卡券 “0”为不显示，“1”显示（4.2.0）
   * 
   */
  pushProductTurnIn(productId, productName, productTypeId, fromPage, eventRefId, couponId, couponName, isShowCoupon)
```

## 分享
``` js 
  /**
   * 分享
   * @author 1154 1504
   * @param {*} shareType 分享类型参数,"0"是图片分享,"1"是活动分享,不能为空
   * @param {*} type 分享位置参数,"0"是微信好友分享,"1"是微信朋友圈分享,不能为空
   * @param {*} imageUrl 享图片时,图片的Url,分享活动时,分享卡片的小图Url,不能为空
   * @param {*} text 分享的文案,不能为空
   * @param {*} title 分享的标题,不能为空
   * @param {*} url 分享活动时,活动的网站链接地址,分享图片的时候可以为空字符串
   */
  showShare(shareType, type, imageUrl, text, title, url)
```

## 保存图片
```js
/**
 * 保存图片
 * @author 1154 1504
 * @param {*} url 图片的绝对地址
 */
  savePhoto(url)
```

## 小弹窗
```js 
  /**
   * 小弹窗
   * @param {*} str 
   */
  $flash(str)
```

## 大弹窗
```js 
  /**
   * 
   * 大弹窗
   * @author 7043
   * @param {*} title 标题
   * @param {*} message 文本内容
   * @param {*} callbackCancel 取消回调
   * @param {*} callbackConfirm 确认回调
   */
  $msgBox(title, message, callbackCancel, callbackConfirm)
```