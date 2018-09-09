;function users() {
    /**
     * Created by zi on 2017/4/23.
     *
     */
    this.ug = {
        "notNull": "不能为空",
        "confirm": "您必须同意我们的条款，才能注册！",
        "min": "不能低于6位",
        "serverBusy": "服务器没有返回数据，可能服务器忙，请重试",
        "syslog": "系统正在登记您的资料，请稍候....",
        "waiting": "正在等待服务器返回数据",
        "needPwd": "请输入原始密码",
        "needPwdAgain": "请再次输入密码",
        "needAuthcode": "请输入验4位证码",
        "withAllDiagit": "不能全部为数字",
        "yourEmail": "请输入您的邮件地址",
        "emailWithSpace": "邮箱两边不能有空格",
        "emailLenErr": "您输入的邮箱长度不够,限6~60个字符",
        "emailFormatErr": "您输入的邮箱格式不正确",
        "emailHasReg": "该用邮箱已被注册，<a href='/login/lookpassword' style='color:#3358a2'>忘记密码了吗?</a>",
        "unmWithSpace": "用户名两边不能有空格",
        "unmLen": "请输入4-25个字符",
        "unmErr": "字母加数字或中文的组合,4-25个字符",
        "unmErr2": "字母加数字或中文的组合,2-25个字符",
        "unmFoucs": "可使用数字,字母和中文的组合，4-25个字符",
        "unmFoucs2": "可使用数字,字母和中文的组合，2-25个字符",
        "unmHasReg": "该用户名已被注册,请重新输入",
        "pwdLen": "密码6-20位",
        "pwdFocus": "请使用数字与字母的组合,字母区分大小写",
        "pwdErrWithUNM": "密码不能与用户名一样",
        "pwdTwiceNotEq": "您输入的密码不一致",
        "phoneEmpty": "请输入手机号码",
        "phoneErr": "您输入的手机号码格式错误",
        "phoneHasRef": "手机号码已存在",
        "phoneUnable": "手机号码不可用",
        "authcodeNeed": "请输入验证码",
        "authCodeErr": "验证码错误或已过期",
        "authCodeEmpty": "验证码未填写",
        "customerServiceEmpty": "请输入区域客服姓名",
        "customerNotExist": "该区域客服不存在",
        "IdHasReg": "该ID已经被注册"
    };
    //与用户相关的正则
    this.uReg = {
        "email": "^[\\w-]+(\\.[\\w-]+)*@([\\w-]+\\.)+[a-zA-Z0-9]+$",
        //"email": "^([a-zA-Z0-9]+[_|\_|\.|\-]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.|\-]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$",
        "unm": "^([\\u4E00-\\u9FA5\\uF900-\\uFA2D]|[a-zA-Z0-9]|[_]|[-]){4,25}$",
		"unm2": "^([\\u4E00-\\u9FA5\\uF900-\\uFA2D]|[a-zA-Z0-9]|[_]|[-]|[@]|[.]){2,25}$",
        "tel": "^(1[358][0-9]|14[57]|17[01678]|199)[0-9]{8}$"  //添加199号段

	};
	/**
	 * 检查密码强度
	 * @param string passwordID 表单密码ID
	 * ＠param string pwdstatusID  检测结果显示ID
	 * */
	this.chkPwdLevel = function(passwordID,pwdstatusID) {
		$('#'+passwordID).keyup(function() {
			var k = pwStrength(this.value);
			$("#"+pwdstatusID).attr("value", "" + k + "");
		});
	};
	/**
	 * 检查密码
	 * */
	this.checkPassword = function(id) {

		$("#" + id).formValidator({
			onShow: "",
			onFocus: "",
			onCorrect: ""
		}).inputValidator({
			min: 6,
			onError:'密码不能为空,密码需6~20位'//密码6-20位,字母与数字的组合，区分大小写
		}).inputValidator({
			min: 6,
			max: 20,
			onError: '密码不能为空,密码需6~20位'
		}).functionValidator({
			fun: fnValcheck
		}).compareValidator({
			desID: "username",
			operateor: "!=",
			onError: this.ug.pwdErrWithUNM
		});

  };

	/**
	 * 检查用户从新输入密码
	 * @parm string id 表单从新输入密码id
	 * @parm string id2 表单新密码id
	 * */
	this.checkRePassword = function(id, id2) {
		$("#" + id).formValidator({
			onShow: "",
			onFocus: "",
			onCorrect: ""
		}).inputValidator({
			min: 6,
			onError: this.ug.min
		}).inputValidator({
			min: 6,
			max: 20,
			onError: this.ug.pwdLen
		}).compareValidator({
			desID: id2,
			operateor: "=",
			onError: this.ug.pwdTwiceNotEq
		});
	};

	this.checkOldPassword=function(id,t){
        var text = t?"":"原始密码输入正确！";
		$("#"+id).formValidator({onShow:this.ug.needPwd,onFocus:"",onCorrect:text}).inputValidator({min:1,onError:"请输入原始密码"})
	};
	/**
	 * 同意注册
	 * */
	this.agree = function() {
		$(":checkbox[name='coks']").formValidator({
			tipID: "coksTip",
			onShow: "",
			onFocus: "",
			onCorrect: "&nbsp;"
		}).inputValidator({
			min: 1,
			onError: this.ug.confirm
		});
	};
	/**
	 * 检查邮件
	 * @param  string emailID 表单邮件ID
	 * @param string ajaxURL ajax验证URL
	 * */
	this.checkEmail = function(emailID,ajaxURL) {
		$("#"+emailID).formValidator({
			onShow: this.ug.yourEmail,
			onFocus: "",
			onCorrect: "&nbsp;",
			defaultValue: ""
		}).inputValidator({
			empty: {
				leftEmpty: false,
				rightEmpty: false,
				emptyError: this.ug.emailWithSpace
			},
			min: 6,
			max: 60,
			onError: this.ug.emailLenErr
		}).regexValidator({
			regExp:this.uReg.email,
			//regexp: "email",
              //  datatype: "enum",
			onError: this.ug.emailFormatErr
		}).ajaxValidator({
			type: "POST",
			dataType: "json",
			async: true,
			url: ajaxURL,
			data: {
				email: function() {
					return $("#"+emailID).val();
				}
			},
			success: function(data) {
				return parseInt(data) == 0 ? false : true;
			},
			onError: this.ug.emailHasReg

		});
	};

	/**
	 * 检查用户名和邮箱是否关联
	 * */
	this.checkEmailAndUnm = function(emailID,uID,ajaxURL) {
		$("#"+emailID).focus(function(){

            if(!$("#"+uID).val()){
                $("#"+uID).trigger("focus");

            }

		}).formValidator({
			onShow: this.ug.yourEmail,
			onFocus: "",
			onCorrect: "&nbsp;",
			defaultValue: ""
		}).inputValidator({
			empty: {
				leftEmpty: false,
				rightEmpty: false,
				emptyError: this.ug.emailWithSpace
			},
			min: 6,
			max: 100,
			onError: this.ug.emailLenErr
		}).regexValidator({
			regExp: this.uReg.email,
			onError: this.ug.emailFormatErr
		}).ajaxValidator({
			type: "POST",
			dataType: "json",
			async: true,
			url: ajaxURL,
			data: {
				email: function() {
					return $("#"+emailID).val();
				},
			    username:function(){
						return $("#"+uID).val();
					}
			},
			success: function(data) {
				return data.status?true:false;
			},
			onError:"用户名与注册邮箱不匹配"

		});
	};
	/**
	 * 检查客服
	 * */
	this.checkService = function(ajaxurl) {
		if ($("#areacustom").val()) {
			$("#areacustom").formValidator({
				onShow: "",
				onFocus: this.ug.customerServiceEmpty,
				onCorrect: "&nbsp;"
			}).inputValidator({
				min: 1,
				onError: this.ug.notNull
			}).regexValidator({
				regExp: this.uReg.unm,
				onError: "区域客服中含有非法字符"
			}).ajaxValidator({
				type: "POST",
				dataType: "json",
				url: ajaxurl,

				data: {
					areacustom: function() {
						return $("#areacustom").val();
					}
				},
				success: function(data) {
					//alert(data);
					if (data == 1)
						return true;
					else
						return false;
				},
				onError: ug.customerNotExist
			});
		}

	};
	/**
	 * 检查用户名,注册用
	 * @param string	 id 表单用户名ID
	 * @param string ajaxURL ajax验证URL
	 * */
	this.checkUserName = function(id, ajaxURL) {

		$("#" + id).formValidator({
			onShow: "",
			onFocus:this.ug.unmFoucs,
			onCorrect: "&nbsp;",
			defaultValue: ""
		}).inputValidator({
			min: 4,
			max: 25,
			onError: this.ug.unmLen
		}).functionValidator({
			fun: fnVal
		}).regexValidator({
			regExp: this.uReg.unm,
			onError: this.ug.unmErr
		}).ajaxValidator({
			type: "POST",
			dataType: "json",
			url:ajaxURL,
			data: {
				username:function(){return $("#"+id).val()}
			},
			success: function(data) {
				return parseInt(data) ? true :false;
			},
			onError: this.ug.unmHasReg
							//onWait : "正在对用户名进行合法性校验，请稍候..."
		});
	};

 /*
	* 一般检测手机号码
	* **/
	this.checkPhoneWithNoAjax = function(id) {
		$("#" + id).formValidator({
			onShow: "",onFocus:"",onCorrect:""
		}).inputValidator({
			min: 1,max:11,
			onError: "请输入手机号码"}).regexValidator({
			regExp: this.uReg.tel,
			onError: "请输入正确的手机号码"

		});
	};

    /**
     * 检查用户名是否存在
     * */

    this.checkUserExists = function(id, ajaxURL) {
        $("#" + id).blur(function() {
            if ($(this).val() && $("#tel").length) {
                $("#tel").trigger("blur");
            }
            if ($(this).val() && $("#email").length) {
                $("#email").trigger("blur");
            }
        }).formValidator({onShow: "请输入用户名", onFocus: "", onCorrect: "&nbsp;"})
                .inputValidator({min: 1, onError: "请输入用户名"})
                .inputValidator({min: 2, max: 25, onError: this.ug.unmErr2})
                .regexValidator({regExp: this.uReg.unm2, onError: this.ug.unmErr2})
                .ajaxValidator({
                    type: "POST", dataType: "json", url: ajaxURL,
                    data: {username: function() {
                            return $("#" + id).val();
                        }},
                    success: function(data) {
                        if (data.status == 1) {
                            return true;
                        } else {
                            return false;
                        }
                    },
                    onError: "您输入的用户名不存在"
                });
    };


    this.checkUserNameAndTel = function(uID, telID, ajaxURL) {
        $("#" + telID).focus(function() {
            if (!$("#" + uID).val()) {
                $("#" + uID).trigger("focus");
                return false;
            }
        }).formValidator({
            onShow: '',
            onFocus: "",
            onCorrect: "&nbsp;"
        }).inputValidator({
            min: 1,
            onError: this.ug.phoneEmpty
        }).regexValidator({
            regExp: this.uReg.tel,
            onError: this.ug.phoneErr
        })
    };
    /**
     * 初始化检查注册表单，仅仅注册用
     * */
	this.initRegCheck = function(formID) {
		var waiting=this.ug.syslog;
		$.formValidator.initConfig({
			formID: formID,
			debug: false,
			submitOnce: false

		});
	};

	/**
	 * 初始化检查注册表单，仅仅注册用
	 * */
	this.initTyRegCheck = function(formID, ajaxURL) {
		var waiting=this.ug.syslog;
		$.formValidator.initConfig({
			formID: formID,
			debug: false,
			submitOnce: false,
			buttons: $("#button"),
			ajaxForm: {
				type: "POST",
				dataType: "json",
				url: ajaxURL,
				beforeSend: function() {
					$.idialog.show({icon: "loading", msg:waiting})
				},
				data: {
					shijiid: function() {
						return $("#shijiid").val()
					},email: function() {
						return $("#email").val()
					}, usertuype: 0, username: function() {
						return $("#username").val();
					}, password: function() {
						return $("#password").val()
					}, repassword: function() {
						return $("#repassword").val()
					}, areacustom: function() {
						return $("#areacustom").val()
					}, coks: function() {
						return $("#coks").val()
					} ,itbtCode:function(){
						return $("#itbtCode").val();
					},tel:function(){
						return $("#tel").val();
					},chk_code:function(){
						return $("#chk_code").val();
					}
				},
				success: function(data) {
					if (data.status == 1) {
						$(':input','#'+formID).not(':button, :submit, :reset, :hidden').removeAttr('checked').removeAttr('selected').val('');
						$("Body").append('<div display="none">'+data.info+'</div>');
						window.setTimeout(function(){ $.idialog.show({icon: "loading", msg: "<font color=black style='font-size:18px'>"+data.msg+"</font>", location: data.refer,delay:5,width:1300})},300);
					} else {
                        $.idialog.show({icon: "faild", msg: data.msg})
                    }
                }
            }
        });
    };

    	/**
	 * 初始化检查注册表单，仅仅注册用(数金网)
	 * */

	this.getPhoneCode2=function(buttonID,ajaxURL,telID,msgID,verify){

		$("#"+buttonID).click(function(){
            var reCat =/^(1[3589][0-9]|14[57]|17[078])[0-9]{8}$/gi; //添加199号段
            if(!reCat.test($("#"+telID).val())){
                if($("#"+telID).val()){
                    $("#"+telID).trigger("blur");
                } else{
                    $("#"+telID).trigger("focus");
                }

                //$.idialog.show({icon: "warning", msg:$("#"+telID).val()?"手机号码格式错误！":"请输入手机号码先!"});
                return false;
            }



            $(this).attr("disabled",true);
            $.ajax({
                dataType: 'json',
                type: 'POST',
                url:ajaxURL+"/"+Date.parse(new Date())+parseInt(100000000*Math.random()),
                data:{mobile:$("#"+telID).val(),verify:$("#"+verify).val()},
                success: function(data) {
                      $("#"+msgID).removeClass().addClass(data.status?"green":"red").show().html(data.status==1?"验证码发送成功！":"验证码发送失败！60秒内禁止重复请求短信!");
                    if(data.status==1){
                        //发送成功，倒计时
                        $("#"+buttonID).removeClass("button02");
                        timer( 60);
                    }else{
                        $("#"+verify).next("img").attr("src",'/Index/verify/'+Math.random())
                         $("#"+buttonID).removeAttr("disabled");
                         $("#"+telID).trigger("focus");
                         $.idialog.show({icon: "warning", msg:data.msg});
                    }
                }
            });
		});
	};

    /**
     * 获取手机验证码
     * @param buttonID 获取手机验证码按钮ID　
     * @param ajaxURL  获取验证码URL
     * @param telID 手机号码ID
     * @param msgID 验证码发送状态消息ID
     * @param uid 用户名ID，可为空
     *
     * */

    this.getPhoneCode = function(buttonID, ajaxURL, telID, msgID, uid) {
        $("#" + buttonID).click(function() {
            if ($("#" + uid).length && !$("#" + uid).val()) {
                $("#" + uid).trigger("focus");
                return false;
            }


            var reCat = /^(1[3589][0-9]|14[57]|17[01678])[0-9]{8}$/gi;//添加199号段
            if (!reCat.test($("#" + telID).val())) {
                if ($("#" + telID).val()) {
                    $("#" + telID).trigger("blur");
                } else {
                    $("#" + telID).trigger("focus");
                }

                //$.idialog.show({icon: "warning", msg:$("#"+telID).val()?"手机号码格式错误！":"请输入手机号码先!"});
                return false;
            }
            var ajaxData = "mobile=" + $("#" + telID).val();
            if ($("#" + uid).length) {
                if (!$("#" + uid).val()) {
                    $.idialog.show({icon: "warning", msg: "请输入用户名！"});
                    return false;
                } else {
                    ajaxData = "mobile=" + $("#" + telID).val() + "&username=" + $("#" + uid).val();
                }
            }
            var picture_code=$("#picture_code").val();
            if(picture_code.length<4){
                $.idialog.show({icon: "warning", msg: "发送手机验证码前请填写图片验证码！"});
                return false;
            }
			ajaxData+='&picture_code='+picture_code;
            $(this).attr("disabled", true);
            $.ajax({
                dataType: 'json',
                type: 'POST',
				url:ajaxURL+"/"+Date.parse(new Date())+parseInt(100000000*Math.random()),
                data: ajaxData,
                success: function(data) {


		    		$("#"+msgID).removeClass().addClass(data.status?"green":"red").show().html(data.status?"验证码发送成功！":data.msg);
                    if (data.status) {
                        //发送成功，倒计时
                        $("#" + buttonID).removeClass("button02");
                        timer(60);
                    } else {
                        $("#" + buttonID).removeAttr("disabled");
                        $("#" + telID).trigger("focus");
                        $('#verfiy_img').trigger('click');
                    }
                }
            });
        });
    };
    /**
     * 获取手机验证码
     * @param buttonID 获取手机验证码按钮ID　
     * @param ajaxURL  获取验证码URL
     * @param telID 手机号码ID
     * @param msgID 验证码发送状态消息ID
     *
     * */

    this.getPhoneCodeWithNoPhone = function(buttonID, ajaxURL, msgID) {
        $("#" + buttonID).click(function() {
            var picture_code=$("#picture_code").val();
            if(picture_code.length<4){
                $.idialog.show({icon: "warning", msg: "发送手机验证码前请填写图片验证码！"});
                return false;
            }
            $(this).attr("disabled", true);
            $.ajax({
                dataType: 'json',
                type: 'POST',
                url: ajaxURL + "/" + Date.parse(new Date()) + parseInt(100000000 * Math.random()),
                data:'&picture_code='+picture_code,
                success: function(data) {
                    if (data.status) {
                        $("#" + msgID).show().html("验证码发送成功！").css('color','#238744');
                        //发送成功，倒计时
                        $("#" + buttonID).removeClass("button02");
                        timer(60);
                    } else {
                        $("#" + msgID).show().html(data.msg).css('color','red');
                        $("#" + buttonID).removeAttr("disabled");
                        $('#verfiy_img').trigger('click');
                    }
                }
            });
        });
    };
    /**
     * ajax 登录初始化检查表单
     * **/
    this.initLoginCheck = function(formID, ajaxURL,locationUrl) {
        $.formValidator.initConfig({
            formID: formID,
            debug: false,
            submitOnce: false,
            buttons: $("#button"),
            ajaxForm: {
                type: "POST",
                dataType: "json",
                url: ajaxURL,
                data: {
                    username: function () {
                        return $("#username").val();
                    }, password: function() {
                        return encrypt("password", $("#sendnumber").val().toLowerCase());
                        //return encode64(xxtea_encrypt(utf16to8($("#password").val()), $("#uniqKey").val()));
                    }, cookietime: function() {
                        return $("#cookietime").val()
                    }, referer: function() {
                        return $("#referer").val()
                    }
                },
                beforeSend: function() {
                    $("#logindig").hide();
                    $.idialog.show({icon: "loading", msg: "登录中.请稍候..."});
                },
                success: function (data) {
                    $.idialog.close();
                    if(data.status == 0){
                        $.idialog.show({icon: "faild", msg: data.msg});
                    } else if (data.status == 1) {
                        $("Body").append('<div display="none">' + data.msg + '</div>');
                        window.setTimeout(function () {
                            window.location.href = locationUrl
                        }, 300);
                    } else if (data.status == 2) {
                        $.idialog.show({icon: "faild", msg: data.msg});
                    } else if (data.status == 3) {
                        $(".tip_box").show();
                        $("#logindig").hide();
                        $('.ct-ct1').show();
                        $('.step1').hide();
                        $('.step2').hide();
                        $('.step3').hide();
                        var datas = {
                            username: data.user,
                            cookietime: $("#cookietime").val(),
                            origin: data.systemCode
                        };
                        $(".btn-agree").bind("click",function (event) {
                            $(this).attr("disabled","disabled");
                            setTimeout(function(){$(".btn-agree").removeAttr("disabled")},3000)
                            $.post("/NewLogin/agree", datas, function (data) {
                                if(data.status == 1) {
                                    $('.ct-ct1').hide();
                                    $('.step3').show();
                                    $('.tip-close').hide();
                                    $(".step3").attr("data-src",data.location);
                                } else if(data.status == 0) {
                                    $(".tip_box").hide();
                                    $('.ct-ct1').hide();
                                    $('.tip-close').hide();
                                    $.idialog.show({icon: "faild", msg: data.msg});
                                }
                            },"json");
                            return true;
                        });
                        $(".btn-sub").bind("click",function(){
                            var link_url=$(".step3").attr("data-src");
                            window.location.href=link_url;
                        });
                        $('.tip-close1').bind("click",function () {
                            $(".btn-agree").unbind();
                            $('.tip-close1').unbind();
                            var datas = {
                                username: data.user,
                                cookietime: $("#cookietime").val(),
                                origin: data.systemCode
                            };
                            $.post("/NewLogin/notAgree", datas, function (data) {
                                $(this).attr("disabled","disabled");
                                setTimeout(function(){$(".btn-agree").removeAttr("disabled")},3000)
                                if(data.status == 1) {
                                    if(data.origin == 1) {
                                        window.location.href = data.refer;
                                    } else {
                                        $(".tip_box").hide();
                                        $('.ct-ct1').hide();
                                        $('.ct-ct2').hide();
                                        $.idialog.show({icon: "faild", msg: "非常抱歉您没有选择升级一账通,请到您注册的网站登陆,祝您生活愉快!"});
                                    }
                                } else if(data.status == 0) {
                                    $.idialog.show({icon: "faild", msg: data.msg});
                                }
                            },"json");

                        });
                    } else if(data.status == 4) {
                        $(".tip_box").show();
                        $('.tip-close').removeClass("tip-close1");
                        $('.tip-close').addClass("tip-close2");
                        $("#logindig").hide();
                        $('.ct-ct1').hide();
                        $('.step1').show();
                        $('.step2').hide();
                        $('.step3').hide();
                        $("#firstuser").val(data.firstuser);
                        var obj = data.data;
                        var html = '';
                        $(".ac-list").children().remove();
                        $('.tip-close2').bind("click",function () {
                            $(".btn-next2").unbind();
                            $('.tip-close2').unbind();
                            $(".tip_box").hide();
                            $(".s2-psd").attr("value","");
                            $(".s2-phone").attr("value","");
                            $(".verify-code").attr("value","");
                            var username = $("#username").val();
                            var firstuser = $("#firstuser").val();
                            var origin = 0;
                            $.each(obj,function(i){
                                if(this.userName == username) {
                                    origin = this.systemCode;
                                }
                            });
                            var datas = {
                                username: username,
                                firstuser: firstuser,
                                cookietime: $("#cookietime").val(),
                                origin: origin
                            };
                            $.post("/NewLogin/notAgree", datas, function (data) {
                                $(this).attr("disabled","disabled");
                                //setTimeout(function(){$(".btn-agree").removeAttr("disabled")},3000)
                                if(data.status == 1) {
                                    if(data.origin == 1) {
                                        window.location.href = data.refer;
                                    } else {
                                        $.idialog.show({icon: "faild", msg: "非常抱歉您没有选择升级一账通,请到您注册的网站登陆,祝您生活愉快!"});
                                    }
                                } else if(data.status == 0) {
                                    $.idialog.show({icon: "faild", msg: data.msg});
                                }
                            },"json");
                        });
                        $.each(obj,function(i){
                            if(i==0)
                                html += '<li data-id="'+this.userId+'" data-phone="'+this.mobile+'" data-origin="'+this.systemCode+'" class="selected">'+this.userName+'<img src="/Public/Images/ac-selected.png"></li>';
                            else
                            html += '<li data-id="'+this.userId+'" data-phone="'+this.mobile+'" data-origin="'+this.systemCode+'">'+this.userName+'<img src="/Public/Images/ac-selected.png"></li>';
                        })
                        $(".ac-list").append(html);
                        $(".ac-list li").live("click",function(){
                            $(".ac-list li").removeClass("selected");
                            $(this).addClass("selected");
                        });
                        $(".btn-next1").click(function(){
                            if($(".step1 .check-box input").attr("checked")!="checked"){
                                return false;
                            };
                            $('.step1').hide();
                            $('.step2').show();
                            $(".step2 p span").text($(".ac-list").children(".selected").text());
                            $(".step2").attr("data-phone",$(".ac-list").children(".selected").attr("data-phone"));
                            $(".step2").attr("data-id",$(".ac-list").children(".selected").attr("data-id"));
                            $(".step2").attr("data-origin",$(".ac-list").children(".selected").attr("data-origin"));
                            $(".step2 .s2-img").attr("src", "/NewLogin/verify");
                        });
                        $(".step2 .s2-img").click(function(){
                            $(this).attr("src", "/NewLogin/verify/"+Math.random());
                        });
                        $(".btn-sent").click(function(){
                            var verify = $(".verify").val();
                            var mobile=$(".s2-phone").val();
                            var firstuser = $("#firstuser").val();
                            var pwds = $("#s2-psd").val();
                            var psd = encrypt("s2-psd", verify);
                            if(pwds == '') {
                                $(".s2-psd").addClass("err");$(".err-psd").show();
                                $(".err-psd span").text("密码不能为空");
                                return false;
                            }
                            if(pwds.length < 6 || pwds.length > 20) {
                                $(".s2-psd").addClass("err");$(".err-psd").show();
                                $(".err-psd span").text("密码长度在6-20位");
                                return false;
                            }
                            validatemobile(mobile);
                            if(verify == '' || verify.length != 4) {
                                $(".verify").addClass("err");$(".err-verify").show();
                                $(".err-verify span").text("图片验证码错误");
                                $(".step2 .s2-img").attr("src", "/NewLogin/verify/"+Math.random());
                                return false;
                            } else {
                                var _this=$(this);
                                $.post("/NewLogin/step2",{"mobile":mobile,"firstuser":firstuser,"psd":psd,"user":$(".step2 p span").text()},function(data){
                                    if(data.status == 0) {
                                        $(".step2 .s2-img").attr("src", "/NewLogin/verify/"+Math.random());
                                        $(".s2-phone").addClass("err");$(".err-phone").show();
                                        $(".err-phone span").text(data.msg);
                                        return false;
                                    } else if(data.status == 2) {
                                        $(".step2 .s2-img").attr("src", "/NewLogin/verify/"+Math.random());
                                        $(".verify").addClass("err");$(".err-verify").show();
                                        $(".err-verify span").text(data.msg);
                                        return false;
                                    } else if(data.status == 3) {
                                        $(".step2 .s2-img").attr("src", "/NewLogin/verify/"+Math.random());
                                        $(".s2-phone").addClass("err");$(".err-phone").show();
                                        $(".err-phone span").text(data.msg);
                                        return false;
                                    } else {
                                        var $obj = _this ;
                                        settime($obj[0]);
                                    }
                                },"json");

                            }
                        });
                        $(".btn-next2").bind("click",function(){
                            var verify = $(".verify").val();
                            var s2_psd= encrypt("s2-psd", verify);
                            var s2_phone=$(".s2-phone").val();
                            var s2_code=$(".verify-code").val();
                            var uid = $(".step2").attr("data-id");
                            var cookietime = $("#cookietime").val();
                            var origin = $(".step2").attr("data-origin");
                            var firstuser = $("#firstuser").val();
                            var pwds = $("#s2-psd").val();
                            var psd = encrypt("s2-psd", verify);
                            if(pwds == '') {
                                $(".s2-psd").addClass("err");$(".err-psd").show();
                                $(".err-psd span").text("密码不能为空");
                                return false;
                            }
                            if(pwds.length < 6 || pwds.length > 20) {
                                $(".s2-psd").addClass("err");$(".err-psd").show();
                                $(".err-psd span").text("密码长度在6-20位");
                                return false;
                            }
                            validatemobile(s2_phone);
                            if(verify == '' || verify.length != 4) {
                                $(".verify").addClass("err");$(".err-verify").show();
                                $(".err-verify span").text("图片验证码错误");
                                $(".step2 .s2-img").attr("src", "/NewLogin/verify/"+Math.random());
                                return false;
                            }
                            if($.trim(s2_psd)==""){
                                $(".s2-psd").addClass("err");$(".err-psd").show();
                                $(".err-psd span").text("请输入登录密码");
                                return false;
                            }
                            if($.trim(s2_code)==""){
                                $(".verify-code").addClass("err");$(".err-code").show();
                                $(".err-code span").text("请输入手机验证码");
                                return false;
                            }
                            var data={"mobile":s2_phone,"password":s2_psd,"code":verify,"verify":s2_code,"uid":uid,"cookietime":cookietime,"origin":origin,firstuser:firstuser,"user":$(".step2 p span").text()}
                            $.post("/NewLogin/step3",data,function(data){
                                if(data.status == 0) {
                                    $(".verify-code").addClass("err");$(".err-code").show();
                                    $(".err-code span").text(data.msg);
                                } else if(data.status == 1) {
                                    $(".step2").hide();
                                    $('.step3').show();
                                    $(".step3").attr("data-src",data.refer);
                                } else if(data.status == 2) {
                                    $(".verify").addClass("err");$(".err-verify").show();
                                    $(".err-verify span").text("图片验证码错误");
                                    $(".step2 .s2-img").attr("src", "/NewLogin/verify/"+Math.random());
                                }
                            },"json");
                        });
                        $(".btn-sub").bind("click",function(){
                            var link_url=$(".step3").attr("data-src");
                            window.location.href=link_url;
                        });
                        function validatemobile(mobile)
                        {
                            if(mobile.length==0)
                            {
                                $(".step2 .s2-img").attr("src", "/NewLogin/verify/"+Math.random());
                                $(".s2-phone").addClass("err");$(".err-phone").show();
                                $(".err-phone span").text("请输入手机号码！");
                                document.form1.mobile.focus();
                                return false;
                            }
                            if(mobile.length!=11)
                            {
                                $(".step2 .s2-img").attr("src", "/NewLogin/verify/"+Math.random());
                                $(".s2-phone").addClass("err");$(".err-phone").show();
                                $(".err-phone span").text("请输入有效的手机号码！");
                                document.form1.mobile.focus();
                                return false;
                            }

                            var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(17[078]|199))+\d{8})$/;
                            //var myreg = /^(1[358][0-9]|14[57]|17[078]|199)\d{8}$/;
                            if(!myreg.test(mobile))
                            {
                                $(".step2 .s2-img").attr("src", "/NewLogin/verify/"+Math.random());
                                $(".s2-phone").addClass("err");$(".err-phone").show();
                                $(".err-phone span").text("请输入有效的手机号码！");
                                document.form1.mobile.focus();
                                return false;
                            }
                        }
                    }
                }
            }
        });


    };

	/**
	 * 手机校验码
	 *
	 * */
	var chk_code_onError = '';
	this.checkPhoneCode=function(codeID,telID,ajaxURL){
		var reg="^\\d{6}$";
		$("#" + codeID).focus(function(){
			if(!$("#" + telID).val()){
					$("#" + telID).trigger("focus");
						return false;
			}
		}).formValidator({onShow: "", onFocus: "", onCorrect: ""}).regexValidator({regExp:reg, onError: "验证码为6位数字"}).inputValidator({
			min: 1,max:6,
			onError: "验证码不能为空"}).ajaxValidator({
			dataType: "json",
			type: 'POST',
			timeout: 5000,
			url: ajaxURL,
			beforeSend: function() {
					if(!$("#" + telID).val()){
						$("#" + telID).trigger("focus");
						return false;
					}else if(!$("#chk_code").val()){
						$("#chk_code").trigger("focus");
						return false;
					}else{
						return true;
					}

			},
			data: {tel: function() {
					return $("#" + telID).val()
				}, chk_code: function() {
					return $("#chk_code").val()
				}},
			success: function(data) {
				if(!data.status){
					chk_code_onError = data.msg;
				}
				return data.status?true:false;
			},
			onError: function() {
				if (chk_code_onError) {
					return chk_code_onError;
				} else {
					return "验证码不正确";
				}
			}
		});
	};


	/**
	 * 手机校验码，不需要手机号
	 *
	 * */
	this.checkPhoneCodeWithNoPhone=function(codeID,ajaxURL){
		var reg="^\\d{6}$";
		$("#" + codeID).formValidator({onShow: "", onFocus: "请输入动态验证码", onCorrect: "&nbsp;"}).regexValidator({regExp:reg, onError: "验证码为6位数字"}).ajaxValidator({
			dataType: "json",
			type: 'POST',
			timeout: 5000,
			url: ajaxURL,
			beforeSend: function() {
					 if(!$("#chk_code").val()){
						$("#chk_code").trigger("focus");
						return false;
					}else{
						return true;
					}

			},
			data: {chk_code: function() {
					return $("#chk_code").val()
				}},
			success: function(data) {
				if(!data.status){
					chk_code_onError = data.msg;
				}
				return data.status?true:false;
			},
			onError: function() {
				if (chk_code_onError) {
					return chk_code_onError;
				} else {
					return "验证码不正确";
				}
			}
		});
	};

	/**
	 * 检查来源
	 * */
	this.checkFromId = function(id,ajaxURL) {
		$("#" + id).formValidator({
			onShow: "",
			onFocus: "",
			onCorrect: "&nbsp;"
		}).inputValidator({
			min: 1,
			max: 32,
			onError: this.ug.notNull
		}).ajaxValidator({
			type: "POST",
			dataType: "json",
			async: true,
			url: ajaxURL,
			data: {
				shijiid: function() {
					return $("#"+id).val();
				},
				fromid: function() {
					return $("#fromid").val();
				}
			},
			success: function(data) {
				return parseInt(data) == 0 ? false : true;
			},
			onError: this.ug.IdHasReg

        });

    };
	/**
	 * 检查数金网来源
	 * */
	this.checkFromSjwId = function(id,ajaxURL) {
		$("#" + id).formValidator({
			onShow: "",
			onFocus: "",
			onCorrect: "&nbsp;"
		}).inputValidator({
			min: 1,
			max: 32,
			onError: this.ug.notNull
		});

    };

	function encrypt_pwd(mask,passwordlist){
		var mask = $("#" + mask).val();
		if (mask) {
			$(passwordlist).each(function(index) {
				$(index).val($(this).attr("name"), mask);
			})
		}
	}
	/**
	 * 修改密码，交易密码表单检查
	 * **/
	this.initForm=function(formID,ajaxURL,mask,passwordlist){

		var waiting=this.ug.syslog;
		$.formValidator.initConfig({formID: formID, debug: false, submitOnce: false,

			ajaxForm: {
				type: "POST",
				dataType: "json",
				url: ajaxURL,
				data:$("#"+formID).serialize(),
				beforeSend: function() {
					$.idialog.show({icon: "loading", msg:waiting})
				},
				data:{sendnumber:function(){return $("#sendnumber").val()},password:function(){	return encode64(xxtea_encrypt(utf16to8($("#password").val()), $("#uniqKey").val()));},opassword:function(){	return  encode64(xxtea_encrypt(utf16to8($("#opassword").val()), $("#uniqKey").val()));},repassword:function(){	return  encode64(xxtea_encrypt(utf16to8($("#repassword").val()), $("#uniqKey").val()));}} ,
				success: function(data) {
					if (data.status == 1) {
						$.idialog.show({icon: "loading", msg: "<font style='font-size:14px;font-weight:800;color:red'>"+data.msg+",跳转中....[<a href='"+data.url+"'>没反应点击这里</a>]</font>", location: data.url})
					} else {
						$.idialog.show({icon: "faild", msg: data.msg})
					}
				}
			}
		});
	};

	/**
	 * 找回登录密码
	 * **/
	this.initFindPwdForm=function(formID,ajaxURL){
		$.formValidator.initConfig({formID: formID, debug: false, submitOnce: false,

			ajaxForm: {
				type: "POST",
				dataType: "json",
				url: ajaxURL,
				data:$("#"+formID).serialize(),
				beforeSend: function() {
					$.idialog.show({icon: "loading", msg:"系统正在处理您的请求，请稍候"})
				},
				data:{username:function(){return $("#username").val()},tel:function(){return $("#tel").val()},
				chk_code:function(){return $("#chk_code").val()},
				password:function(){	return encode64(xxtea_encrypt(utf16to8($("#password").val()), $("#uniqKey").val()));},
				repassword:function(){	return encode64(xxtea_encrypt(utf16to8($("#repassword").val()), $("#uniqKey").val()));}} ,
				success: function(data) {
					if (data.status == 1) {
						$.idialog.show({icon: "loading", msg: "<font style='font-size:14px;font-weight:800;color:red'>"+data.msg+",跳转中....[<a href='"+data.url+"'>没反应点击这里</a>]</font>", location: data.url})
					} else {
						$.idialog.show({icon: "faild", msg: data.msg})
					}
				}
			}
		});
	};

		/**
	 * 发送邮件找回登录密码
	 * **/
	this.initFindPwdFormByEmail=function(formID,ajaxURL){
		$.formValidator.initConfig({formID: formID, debug: false, submitOnce: false,

			ajaxForm: {
				type: "POST",
				dataType: "json",
				url: ajaxURL,
				data:$("#"+formID).serialize(),
				beforeSend: function() {
					$.idialog.show({icon: "loading", msg:"系统正在发送找回密码邮件，请稍候"})
				},
				data:{username:function(){return $("#username").val()},
				email:function(){return $("#email").val()},
				sendnumber:function(){return $("#sendnumber").val()}
				,"__hash__":function(){
						return	$("input:hidden[name=__hash__]").val()
						}
				} ,
				success: function(data) {
					if (data.status == 1) {
						$.idialog.show({icon: "loading", msg: "<font style='font-size:14px;font-weight:800;color:red'>"+data.msg+",跳转中....[<a href='"+data.url+"'>没反应点击这里</a>]</font>", location: data.url})
					} else {
						$.idialog.show({icon: "confirm", msg: data.msg})
					}
				}
			}
		});
	};

	/**
	 * 邮件链接找回密码
	 * */
	this.initFindPwdFormLink=function(formID,ajaxURL){
		$.formValidator.initConfig({formID: formID, debug: false, submitOnce: false,

			ajaxForm: {
				type: "POST",
				dataType: "json",
				url: ajaxURL,
				beforeSend: function() {
					$.idialog.show({icon: "loading", msg:"系统正在处理中，请稍候"})
				},
				data:{user_id:function(){return $("#user_id").val()},emailcode:function(){return $("#emailcode").val()},password:function(){	return encrypt("password", $("#emailcode").val());},repassword:function(){	return encrypt("repassword", $("#emailcode").val());}} ,
				success: function(data) {
					if (data.status == 1) {
						$.idialog.show({icon: "loading", msg: "<font style='font-size:14px;font-weight:800;color:red'>"+data.msg+",跳转中....[<a href='"+data.url+"'>没反应点击这里</a>]</font>", location: data.url})
					} else {
						$.idialog.show({icon: "faild", msg: data.msg})
					}
				}
			}
		});
	};

	/*
	 * 邮件认证
	 * **/
	this.initEmailAuthentication=function(formID,ajaxURL){
		$.formValidator.initConfig({formID: formID, debug: false, submitOnce: false,
			ajaxForm: {
				type: "POST",
				dataType: "json",
				url: ajaxURL,
				beforeSend: function() {
					$.idialog.show({icon: "loading", msg:"系统正在处理中，请稍候"})
				},
				data:{opt:function(){return 'modify'},phone:function(){return $("#phone").val()},phone_code:function(){return $("#phone_code").val()},email:function(){return $("#email").val()},sendnumber:function(){return $("#sendnumber").val()},"__hash__":$("input[type=hidden]").val()} ,
				success: function(data) {
					if (data.status == 1) {
						$.idialog.show({icon: "loading", msg: "<font style='font-size:14px;font-weight:800;color:red'>"+data.msg+",跳转中....[<a href='"+data.url+"'>没反应点击这里</a>]</font>", location: data.url})
					} else {
						$.idialog.show({icon: "faild", msg: data.msg})
					}
				}
			}
		});
	};

	//修改绑定手机/Account/phoneauthentication
	this.initPhoneAuthentication=function(formID,ajaxURL){
		$.formValidator.initConfig({formID: formID, debug: false, submitOnce: false,
			ajaxForm: {
				type: "POST",
				dataType: "json",
				url: ajaxURL,
				beforeSend: function() {
					$.idialog.show({icon: "loading", msg:"系统正在处理中，请稍候"})
				},
				data:{tel:function(){return $("#tel").val()},phones:function(){return $("#phones").val()},chk_code:function(){return $("#chk_code").val();} } ,
				success: function(data) {
					if (data.status == 1) {
						$.idialog.show({icon: "loading", msg: "<font style='font-size:14px;font-weight:800;color:red'>"+data.msg+",跳转中....[<a href='"+data.url+"'>没反应点击这里</a>]</font>", location: data.url})
					} else {
						$.idialog.show({icon: "faild", msg: data.msg})
					}
				}
			}
		});
	};
	/**
	 * 检查邮件随机码
	 * */
	this.checkEmailCode=function(emailcode){
		var reg="^\\d{6}$";
		$("#"+emailcode).formValidator({ onShow:"请输入随机码",onFocus:"随机码为6位",onCorrect:"&nbsp;"}).regexValidator({regExp:reg, onError: "随机码为6位数字"})
	};

	//手机认证表单初始化
	this.initPhoneAuthenticationForm=function(formID,ajaxURL){
		$.formValidator.initConfig({formID: formID, debug: false, submitOnce: false,
			ajaxForm: {
				type: "POST",
				dataType: "json",
				url: ajaxURL,
				data:$("#"+formID).serialize(),
				beforeSend: function() {
					$.idialog.show({icon: "loading", msg:"认证中，请稍候"})
				},
				data:{tel:function(){return $("#tel").val()},chk_code:function(){return $("#chk_code").val()}} ,
				success: function(data) {
					if (data.status == 1) {
						$.idialog.show({icon: "loading", msg: "<font style='font-size:14px;font-weight:800;color:red'>"+data.msg+",跳转中....[<a href='"+data.url+"'>没反应点击这里</a>]</font>", location: data.url})
					} else {
						$.idialog.show({icon: "faild", msg: data.msg})
					}
				}
			}
		});
	};

	/**
	 * 登录检查表单字段是否为空
	 * */
	this.checkEmpty = function(id, msg) {
		$("#" + id).formValidator({
			onShow: "",
			onFocus: "",
			onCorrect: ""
		}).inputValidator({
			min: 1,
			onError: msg
		});
	};
	/**
	 * 服务器端检测验证码
	 * */
	this.checkCaptcha = function(id, ajaxURL) {
            return true;
		$("#" + id).formValidator({
			onShow: "",
			onFocus: "",
			onCorrect: "&nbsp;"
		}).inputValidator({
			min: 1,
			max: 4,
			onError: "验证码输入错误或已失效"
		}).ajaxValidator({
			type: "POST",
			dataType: "JSON",
			async: true,
			url: ajaxURL,
			data: {
				sendnumber: function() {
					return $("#sendnumber").val();
				}
			},
			success: function(data) {
				return data == "1" ? true : false;
			},
			buttons: $("#button"),
			onError: "验证码输入错误或已失效",
			onWait: "&nbsp;"
		});
	};
}

function disableSpace() {
	$("input").keydown(function(e) {
		if (e.which == 32){return false;} }).change(function() {
		$(this).val($(this).val().replace(/\s/g, ""));
	})
}

function fnVal(val) {
	if (/^[0-9]+$/.test(val)) {
		return "不能全部是数字";
	}
	return true;
}

function fnValcheck(val) {
    if (/^[0-9]+$/.test(val) || /^[A-Za-z]+$/.test(val)) {
        return "必须使用字母与数字的组合,字母区分大小写";
    }
    var c;
    for (var i = 0; i < val.length; i++) {
        c = val.charAt(i);
        if ((c >= 0 && c <= 9) || (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z')) {
            break;
        }
    }
    if (i == val.length)
         return "必须使用字母与数字的组合,字母区分大小写";
    return true;
}

/**
 * 判断输入密码的类型
 * */
function CharMode(iN) {
	if (iN >= 48 && iN <= 57) //数字
		return 1;
	if (iN >= 65 && iN <= 90) //大写
		return 2;
	if (iN >= 97 && iN <= 122) //小写
		return 4;
	else
		return 8;
}
/**
 * bitTotal函数  计算密码模式
 * */
function bitTotal(num) {
	modes = 0;
	for (i = 0; i < 4; i++) {
		if (num & 1)
			modes++;
		num >>>= 1;
	}
	return modes;
}
/**
 * 返回强度级别
 * */
function checkStrong(sPW) {
	if (sPW.length <= 4)
		return 0; //密码太短
	Modes = 0;

	for (i = 0; i < sPW.length; i++) {
		//密码模式
		Modes |= CharMode(sPW.charCodeAt(i));
	}
	if (sPW.length <= 8) {
		Modes = 1;
	}
	return bitTotal(Modes);
}

//显示颜色
function pwStrength(pwd) {
	var S_level = "";
	var O_color = "#e1e1e1";
	var L_color = "#c32929";
	var M_color = "#e1af00";
	var H_color = "#22a317";
	if (pwd == null || pwd == '') {
		Lcolor = Mcolor = Hcolor = O_color;
	} else {
		S_level = checkStrong(pwd);
		switch (S_level) {
			case 0:
				Lcolor = Mcolor = Hcolor = O_color;
				break;
			case 1:
				Lcolor = L_color;
				Mcolor = Hcolor = O_color;
				break;
			case 2:
				Lcolor = Mcolor = M_color;
				Hcolor = O_color;
				break;
			default:
				Lcolor = Mcolor = Hcolor = H_color;
		}

	}
	$('#strength_L').css('background-color', Lcolor);
	$('#strength_M').css('background-color', Mcolor);
	$('#strength_H').css('background-color', Hcolor);
	return S_level;
}

 function timer(defSec) {
	 defSec=defSec<=60&&defSec>=0?defSec:60;
	$("#J_btn_email_code").html(defSec--+"秒后可重新发送").attr("disabled",true).addClass('button-gray');
	if(defSec < 0){
		$("#J_btn_email_code").html("获取验证码").removeAttr("disabled").removeClass('button-gray').addClass("button02");
		$("#msg_info").html("<span style='color:#333333'>没收到动态验证码?请拨打<font color=red><b>4000-050-828</b></font>联系我们吧!</span>");
	}
	else
	{
		window.setTimeout("timer("+defSec+")",1000);
	}
 }
