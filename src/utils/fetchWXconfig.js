let wx = require('weixin-js-sdk');

export default function  fetchWXconfig(data,self){
	
	let appId,jsapi_ticket,shareurl,url,timestamp,nonceStr,signature,title,desc,imgUrl,shareObj,hb_type=''
	appId=data.appId
	jsapi_ticket=data.jsapi_ticket
	shareurl=data.link
	url=data.url // 未知
	timestamp=data.timestamp
	nonceStr=data.nonceStr
	signature=data.signature
	title=data.title
	desc=data.desc
	imgUrl=data.imgUrl

	shareObj = {
		debug: data.debug || false,
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
		debug: shareObj.debug,
		appId: shareObj.appId,
//          jsapi_ticket: shareObj.jsapi_ticket,
		timestamp: shareObj.timestamp,
		nonceStr: shareObj.nonceStr,
		signature: shareObj.signature,
		jsApiList: shareObj.jsApiList 
	});
	

	wx.ready(function () {
		// 2. 分享接口
		//分享到朋友圈
		wx.onMenuShareTimeline({
			title: shareObj.title, //
			desc: shareObj.desc, // 描述
			link: shareObj.shareurl, // 链接
			imgUrl: shareObj.imgUrl,
			success: function (res) {
				if(watchSystem=='iphone'){
					
				}
				return false;
			},
			cancel: function (res) {
				// self.CHANGEalertShare(false)
				// self.warnInfo="已取消";
				// self.showWarn=true;
				this.$flash("已取消")
				return false;
			}
		});
		//分享到好友
		wx.onMenuShareAppMessage({
			title: shareObj.title, // 标题
			desc: shareObj.desc, // 描述
			link: shareObj.shareurl, // 链接
			imgUrl: shareObj.imgUrl,
			success: function (res) {
				// 分享成功执行此回调函数
				if(watchSystem=='iphone'){
					self.$flash('分享成功')
				}
				return false;
			},
			cancel: function (res) {
				self.CHANGEalertShare(false)
				self.$flash('已取消')
				return false;
			}
		});       
		wx.onMenuShareQQ({
			title: shareObj.title,
			desc: shareObj.desc,
			link: shareObj.shareurl, // 链接
			imgUrl: shareObj.imgUrl,
			success: function (res) {
				// 分享成功执行此回调函数
				if(watchSystem=='iphone'){
					self.$flash('分享成功')
				}
				return false;
			},
			cancel: function (res) {
				self.CHANGEalertShare(false)
				self.$flash('已取消')
				return false;
			}
		});
//					          //
		wx.onMenuShareWeibo({
			title: shareObj.title,
			desc: shareObj.desc,
			link: shareObj.shareurl, // 链接
			imgUrl: shareObj.imgUrl,
			success: function (res) {
				// 分享成功执行此回调函数
				if(watchSystem=='iphone'){
					self.$flash('分享成功')
				}
				return false;
			},
			cancel: function (res) {
				self.$flash('已取消')
				return false;
			}
		});
		wx.onMenuShareQZone({
			title: shareObj.title,
			desc: shareObj.desc,
			link: shareObj.shareurl, // 链接
			imgUrl: shareObj.imgUrl,
			success: function (res) {
				// 分享成功执行此回调函数
				self.CHANGEalertShare(false)
				if(self.isIphoneOrAndroid=='iphone'){
					self.$flash('分享成功')
				}
				return false;
			},
			cancel: function (res) {
				self.CHANGEalertShare(false)
				self.$flash('已取消')
				return false;
			}
		});

	
		// wx.hideMenuItems({
		// 	menuList: ['menuItem:share:appMessage','menuItem:share:timeline','menuItem:share:qq','menuItem:share:weiboApp','menuItem:share:QZone']
		// })

		// 5 图片接口
		// var images = {
		// 	localId: [],
		// 	serverId: []
		// };
		
		// // 5.1 拍照、本地选图
		// wx.chooseImage({
    //   success: function (res) {
    //     images.localId = res.localIds;
    //     alert('已选择 ' + res.localIds.length + ' 张图片');
    //   }
		// });
		
		// // 5.2 图片预览
		// wx.previewImage({
    //   current: 'http://img5.douban.com/view/photo/photo/public/p1353993776.jpg',
    //   urls: [
    //     'http://img3.douban.com/view/photo/photo/public/p2152117150.jpg',
    //     'http://img5.douban.com/view/photo/photo/public/p1353993776.jpg',
    //     'http://img3.douban.com/view/photo/photo/public/p2152134700.jpg'
    //   ]
		// });
		
		// // 5.3 上传图片
		// document.querySelector('#uploadImage').onclick = function () {
		// 	if (images.localId.length == 0) {
		// 		alert('请先使用 chooseImage 接口选择图片');
		// 		return;
		// 	}
		// 	var i = 0, length = images.localId.length;
		// 	images.serverId = [];
		// 	function upload() {
		// 		wx.uploadImage({
		// 			localId: images.localId[i],
		// 			success: function (res) {
		// 				i++;
		// 				//alert('已上传：' + i + '/' + length);
		// 				images.serverId.push(res.serverId);
		// 				if (i < length) {
		// 					upload();
		// 				}
		// 			},
		// 			fail: function (res) {
		// 				alert(JSON.stringify(res));
		// 			}
		// 		});
		// 	}
		// 	upload();
		// };
	});
}

function watchSystem(){
	var ua = navigator.userAgent.toLowerCase();	
	if (/iphone|ipad|ipod/.test(ua)) {
		    return 'iphone';
	} else if (/android/.test(ua)) {
			return 'android';
	}
}

/** 屏蔽分享 */
// function onBridgeReady() {
// 	WeixinJSBridge.call('hideOptionMenu');
// }


// if (typeof WeixinJSBridge == "undefined") {
// if (document.addEventListener) {
// 	document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
// } else if (document.attachEvent) {
// 	document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
// 	document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
// }
// } else {
// 	onBridgeReady();
// }