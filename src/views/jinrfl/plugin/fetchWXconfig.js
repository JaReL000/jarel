export const fetchWXconfig=(data,self)=>{
	let appId,jsapi_ticket,shareurl,url,timestamp,nonceStr,signature,title,desc,imgUrl,shareObj,hb_type=''
	appId=data.appId
	jsapi_ticket=data.jsapi_ticket
	shareurl=data.shareUrl
	url=data.url
	timestamp=data.timestamp
	nonceStr=data.nonceStr
	signature=data.signature
	title=data.title
	desc=data.desc
	// let str= data.desc.replace(/xxxx/g,self.wxUserData.day)
	// desc= str
	imgUrl=data.imgUrl
	shareObj = {
					debug: false,
					title: title,
					appId: appId,
					hb_type: hb_type,
					jsapi_ticket: jsapi_ticket,
					shareurl: shareurl,
					url: url,
					timestamp: timestamp,
					nonceStr: nonceStr,
					signature: signature,
					desc:desc,
					imgUrl: imgUrl,
					jsApiList: [
						// 所有要调用的 API 都要加到这个列表中
						'checkJsApi',
						'onMenuShareTimeline',
						'onMenuShareAppMessage',
						'onMenuShareQQ',
						'onMenuShareWeibo',
						'onMenuShareQZone',
						'hideAllNonBaseMenuItem',
						'hideMenuItems'
					]
	    };
	 
	wx.config({
			debug: false,
			appId: shareObj.appId,
//    jsapi_ticket: shareObj.jsapi_ticket,
			timestamp: shareObj.timestamp,
			nonceStr: shareObj.nonceStr,
			signature: shareObj.signature,
			jsApiList: shareObj.jsApiList 
		});
	
	wx.ready(function () {
		wx.onMenuShareTimeline({
			title: shareObj.title,
			desc: shareObj.desc,
			link: shareObj.shareurl,
			imgUrl: shareObj.imgUrl,
			success: function (res) {

			},
			cancel: function (res) {

			}
		})
		wx.onMenuShareAppMessage({
			title: shareObj.title,
			desc: shareObj.desc,
			link: shareObj.shareurl,
			imgUrl: shareObj.imgUrl,
			success: function (res) {

			},
			cancel: function (res) {

			}
		})
		wx.onMenuShareQQ({
			title: shareObj.title,
			desc: shareObj.desc,
			link: shareObj.shareurl,
			imgUrl: shareObj.imgUrl,
			success: function (res) {

			},
			cancel: function (res) {

			}
		})
		wx.onMenuShareWeibo({
			title: shareObj.title,
			desc: shareObj.desc,
			link: shareObj.shareurl,
			imgUrl: shareObj.imgUrl,
			success: function (res) {

			},
			cancel: function (res) {

			}
		});
		wx.onMenuShareQZone({
			title: shareObj.title,
			desc: shareObj.desc,
			link: shareObj.shareurl,
			imgUrl: shareObj.imgUrl,
			success: function (res) {

			},
			cancel: function (res) {

			}
		});
		wx.hideMenuItems({
			menuList: ['menuItem:share:appMessage','menuItem:share:timeline','menuItem:share:qq','menuItem:share:weiboApp','menuItem:share:QZone']
		})
	})
}
