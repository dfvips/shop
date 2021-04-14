let timeall=0;
$(document).ready(function() {
	$('#dusername').attr("disabled", "disabled");
	$('#password').attr("disabled", "disabled");
	$.loadcss();
	window.onresize = function() {
		$.loadcss();
	}
	$(function() {
		FastClick.attach(document.body);
	});
	$("#input_code").focus(function() {
		$("#getcode").css("border-bottom", "1px solid #3385ff");
	});
	$("#input_code").blur(function() {
		$("#getcode").css("border-bottom", "1px solid #CDCDCD");
	});
});
(function($) {
	let logintype;
	let code;
	let account;
	$.extend({
		login : function() {
			let username = $("#dusername").val();
			let password = $("#password").val();
			let ep = $("#ep").val();
			let input_code = $("#input_code").val();
			if (logintype == "oldlogin") {
				if ((username == "" || username == null) && (password == "" || password == null)) {
					$("#tip").html("手机号/邮箱、密码不能为空");
					$.showtip();
				} else if (username == "" || username == null) {
					$("#tip").html("手机号/邮箱不能为空");
					$.showtip();
				} else if (password == "" || password == null) {
					$("#tip").html("密码不能为空");
					$.showtip();
				} else if ($.isPoneAvailable(username) == false && $.isEmailAvailable(username) == false) {
					$("#tip").html("手机号/邮箱不正确");
					$.showtip();
				} else {
					$.ajax({
						url : "Login",
						dataType : "jsonp",
						async : true,
						data : "state=oldlogin&username=" + username + "&password=" + $.cmd5x(password),
						type : "POST",
						success : function(data) {
							let result = data.result;
							if (result != "success") {
								$("#tip").html("用户名或密码错误");
								$.showtip();
							} else {
								$.loginsuccess();
							}
						},
						error : function() {
							//请求出错处理 
							$("#tip").html("登录异常，请重试");
							$.showtip();
						}
					});
				}
			} else {
				if ((ep == "" || ep == null) && (code == "" || code == null)) {
					$("#tip").html("手机号/邮箱、验证码不能为空");
					$.showtip();
				} else if (ep == "" || ep == null) {
					$("#tip").html("手机号/邮箱不能为空");
					$.showtip();
				} else if (ep != account || code != $.cmd5x(input_code)) {
					$("#tip").html("验证码错误");
					$.showtip();
				} else {
					if(timeall==0){
						let ind=null;
						$.ajax({
							url : "Login",
							dataType : "jsonp",
							async : true,
							data : "state=msg&ep=" + ep,
							type : "POST",
							beforeSend: function(){
							     // Handle the beforeSend event
								ind=layer.open({
									    type: 2
									    ,content: '正在登录中...'
							    });
							},
							success : function(data) {
								layer.close(ind);
								let result = data.result;
								if (result == "false") {
									$("#tip").html("登录异常，请重试");
									$.showtip();
								} else {
									$.loginsuccess();
								}
							},
							error : function() {
								//请求出错处理 
								layer.close(ind);
								$("#tip").html("登录异常，请重试");
								$.showtip();
							}
						});
						timeall+=1;
					}
				}
			}
			return false;
		},
		loginsuccess : function() {
			$("#cc1").css("float", "left");
			$(".parent").css("opacity", "0.5");
			$.loading();
			setTimeout(function() {
				if($.IsPC()==true){
					window.location.replace("home");
				}else{
					window.location.replace("m.home");
				}
				
			}, 2000);
		},
		sendcode : function() {
			if ($("#code").html() == "获取验证码") {
				if ($.isPoneAvailable($("#ep").val()) == false && $.isEmailAvailable($("#ep").val()) == false) {
					$("#tip").html("手机号/邮箱不正确");
					$("#tip").css("display", "block");
					$("#tip").fadeOut(1900);
					$("#tip").css("padding-left", "11%");
					$("#tip").css("padding-top", "20px");
					setTimeout(function() {
						$("#tip").css("display", "none");
					}, 2000);
				} else {
					if ($.isEmailAvailable($("#ep").val()) == true) {
						$("#code").removeAttr('onclick');
						$('#code').attr('disabled', "true");
						account = $("#ep").val();
						$.ajax({
							url : "Getcode",
							dataType : "jsonp",
							async : true,
							data : "email=" + $("#ep").val()+"&state=login",
							type : "POST",
							beforeSend : function() {
								$.showcodetip();
							},
							success : function(data) {
								let result = data.code;
								code = result;
							},
							error : function() {
								//请求出错处理 
								console.log("发送出错");
							}
						});
					} else if ($.isPoneAvailable($("#ep").val()) == true) {
						$("#code").removeAttr('onclick');
						$('#code').attr('disabled', "true");
						account = $("#ep").val();
						$.ajax({
							url : "Getcode",
							dataType : "jsonp",
							async : true,
							data : "state=msg&code=login&phone=" + $("#ep").val(),
							type : "POST",
							beforeSend : function() {
								$.showcodetip();
							},
							success : function(data) {
								let result = data.code;
								code = result;
							},
							error : function() {
								//请求出错处理 
								console.log("发送出错");
							}
						});
					}
				}
			}
		},
		showcodetip : function() {
			var time = 21;
			var timer = setInterval(function() {
				if (time <= 1) {
					$("#code").css("width", "32%");
					$("#input_code").css("width", "68%");
					$("#code").html("获取验证码");
					$("#code").fadeIn(5000);
					$("#code").attr("onclick", "$.sendcode()");
					$('#code').removeAttr("disabled");
					clearInterval(timer);
					return false;
				}
				time--;
				$("#code").css("width", "68%");
				$("#input_code").css("width", "32%");
				$("#code").html("发送成功,请" + time + "s后重试");
			}, 1000);
		},
		qqlogin : function() {
			window.location.replace("Login?state=qqlogin");
		},
		alipaylogin : function() {
			window.location.replace("Login?state=alipaylogin");
		},
		weibologin : function() {
			window.location.replace("Login?state=weibologin");
		},
		forget:function(){
			window.location.href="forget";
		},
		changedefault : function() {
			$('#dusername').removeAttr("disabled");
			$('#password').removeAttr("disabled");
			$(".codelogin").hide(1900);
			$("#changdefault").css("display", "none");
			$(".default").show(1900);
			$("#backdefault").fadeIn(500);
			logintype = "oldlogin";
			setTimeout(function() {
				$('#ep').attr("disabled", "disabled");
				$('#input_code').attr("disabled", "disabled");
			}, 2000);
		},
		backdefault : function() {
			$('#ep').removeAttr("disabled");
			$('#input_code').removeAttr("disabled");
			$(".default").hide(1900);
			$("#backdefault").css("display", "none");
			$(".codelogin").show(1900);
			$("#changdefault").fadeIn(500);
			logintype = "newlogin";
			setTimeout(function() {
				$('#dusername').attr("disabled", "disabled");
				$('#password').attr("disabled", "disabled");
			}, 2000);
		},
		loadcss : function() {
			let flag = $.IsPC();
			if (flag == true) {
				if($('link[href="https://cdn.jsdelivr.net/gh/dfvips/shop/WebRoot/css/login_mobile.css"]')[0]!=undefined){
					$('link[href="https://cdn.jsdelivr.net/gh/dfvips/shop/WebRoot/css/login_mobile.css"]')[0].setAttribute("href", "https://cdn.jsdelivr.net/gh/dfvips/shop/WebRoot/css/login_pc.css");
				}
			 	 var stateObject = {};    
			 	 var title = $("title").html();     
			  	 var newUrl = 'userlogin';    
				 history.pushState(stateObject, title, newUrl);
			} else {
				if($('link[href="https://cdn.jsdelivr.net/gh/dfvips/shop/WebRoot/css/login_pc.css"]')[0]!=undefined){
					$('link[href="https://cdn.jsdelivr.net/gh/dfvips/shop/WebRoot/css/login_pc.css"]')[0].setAttribute("href", "https://cdn.jsdelivr.net/gh/dfvips/shop/WebRoot/css/login_mobile.css");
				}
				 var stateObject = {};    
			 	 var title = $("title").html();     
			  	 var newUrl = 'm.userlogin';    
				 history.pushState(stateObject, title, newUrl);
			}
		},
		showtip : function() {
			$("#tip").css("display", "block");
			$("#tip").fadeOut(1900);
			$("#tip").css("padding-left", "11%");
			$("#tip").css("padding-bottom", "1.8%");
			$("#tip").css("padding-top", "1.8%");
			$("#btn").css("margin-top","0");
			setTimeout(function() {
				$("#btn").css("margin-top","3.5%");
				$("#tip").css("display", "none");
			}, 2000);
		},
		loading : function() {
			var loaders = [
				{
					width : 100,
					height : 100,
					stepsPerFrame : 1,
					trailLength : 1,
					pointDistance : .02,
					fps : 30,
					fillColor : '#7ed3f2',
					step : function(point, index) {
						this._.beginPath();
						this._.moveTo(point.x, point.y);
						this._.arc(point.x, point.y, index * 7, 0, Math.PI * 2, false);
						this._.closePath();
						this._.fill();
					},
					path : [
						[ 'arc', 50, 50, 30, 0, 360 ]
					]
				},
			];
			var d,
				a,
				container = document.getElementById('cc1');
			for (var i = -1, l = loaders.length; ++i < l;) {
				d = document.createElement('div');
				d.className = 'l';
				a = new Sonic(loaders[i]);
				d.appendChild(a.canvas);
				container.appendChild(d);
				a.play();
			}
		}
	});
})(jQuery);