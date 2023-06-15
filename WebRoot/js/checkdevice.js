(function($){
	$.extend({
		IsPC:function(){
			var Agents = ["Android", "iPhone",
		        "SymbianOS", "Windows Phone",
		        "iPad", "iPod"];
			var flag = true;
			var userAgentInfo = navigator.userAgent;
		    for (var v = 0; v < Agents.length; v++) {
		        if (userAgentInfo.indexOf(Agents[v]) > 0) {
		            flag = false;
		            break;
		        }
		    }
		    return flag;
		},
		checklogin:function(){
			$.removeele();
			let boolean=$.IsPC();
			if(boolean==true){
				if($.islogin()==true){
					let figureurl=decodeURI($.cookie('figureurl'));
					let username=decodeURI($.cookie('username'));
					$('body').css('min-width','1420px');
					$('.header>#logined,.header_pc>#logined').css("display","flex");
					$('.header,.header_pc').append('<span id="list" onclick="$.tolist()">我的订单</span><div id="car" onclick="$.tocar()"><span id="icon-car"><em class="iconfont-cart"></em></span><span id="span-car">购物车</span></div><span id="login" onclick="$.logout()">退出登录</span><div id="logined"><img src="'+figureurl+'"><span>'+username+'</span></div>');
					$('.header>#login,.header_pc>#login').attr("onclick","$.logout()");
					$('.header>#login,.header_pc>#login').css({"color":"rgba(0,0,0,.25)","margin-right": "10px"});
					$('.header>#list,.header_pc>#list').css({"margin-right": "50px"});
				}else{
					$('body').css('min-width','1240px');
					$('.header>#logined,.header_pc>#logined').css("display","none");
					$('.header,.header_pc').append('<span id="login" onclick="$.tologin()">登录/注册</span><span id="list" onclick="$.tolist()">我的订单</span><div id="car"  onclick="$.tocar()"><span id="icon-car"><em class="iconfont-cart"></em></span><span id="span-car">购物车</span></div><div id="logined"><img><span></span></div>');
					$('.header>#login,.header_pc>#login').css({"margin-right": "50px"});
					$('.header>#list,.header_pc>#list').css({"margin-right": "10px"});
				}
			}else{
				$('body').css('min-width','100%');
			}
			$.addhover();
		},
		logout:function(){
			$.removeCookie("gender");
			$.removeCookie("email");
			$.removeCookie("phone");
			$.removeCookie("address");
			$.removeCookie("loginid");
			$.removeCookie("username");
			$.removeCookie("figureurl");
			$.removeCookie("logintype");
			$.removeCookie("userid");
			$.removeCookie("usertoken");
			let boolean=$.IsPC();
			if(boolean==true){
				$.removeele();
				$('body').css('min-width','1240px');
				$('.header>#logined,.header_pc>#logined').css("display","none");
				$('.header,.header_pc').append('<span id="login" onclick="$.tologin()">登录/注册</span><span id="list" onclick="$.tolist()">我的订单</span><div id="car" onclick="$.tocar()"><span id="icon-car"><em class="iconfont-cart"></em></span><span id="span-car">购物车</span></div><div id="logined"><img><span></span></div>');
				$('.header>#login,.header_pc>#login').css({"margin-right": "50px"});
				$('.header>#list,.header_pc>#list').css({"margin-right": "10px"});
				$("#logined").css('display','none');
				$("#login").html("登录/注册");
				$("#login").attr("onclick","$.tologin()");
				$("#login").css("color", "#555555");
			}else{
				$('body').css('min-width','100%');
			}
			$.addhover();
		},
		tologin:function(){
			window.location.href="userlogin";
		},
		removeele:function(){
			$(".header>#logined,.header_pc>#logined").remove();
			$(".header>#login,.header_pc>#login").remove();
			$(".header>#list,.header_pc>#list").remove();
			$(".header>#car,.header_pc>#car").remove();
		},
		addhover:function(){
			$(".header_pc>#car,.header>#car").mouseover(function(){
			    $('.iconfont-cart').css({
			    	"background": "linear-gradient(-45deg, #ee7752, #7d72db, #23a6d5, #7ed3f2)",
				    "background-size": "300% 300%",
				    "animation": "mybg 5s ease infinite",
				    "color": "transparent",
				    "-webkit-background-clip": "text",
				    "-webkit-text-fill-color": "transparent"
			    });
			    $('#span-car').css({
			    	"background": "linear-gradient(-45deg, #ee7752, #7d72db, #23a6d5, #7ed3f2)",
				    "background-size": "300% 300%",
				    "animation": "mybg 5s ease infinite",
				    "color": "transparent",
				    "-webkit-background-clip": "text",
				    "-webkit-text-fill-color": "transparent"
			    });
			});
			$(".header_pc>#car,.header>#car").mouseout(function(){
				$('.iconfont-cart').removeAttr("style");
				 $('#span-car').removeAttr("style");
				$('.iconfont-cart').css("color","#555555");
				 $('#span-car').css("color","#555555");
				});
		},
		islogin:function(){
			if($.cookie('userid')!=null&&$.cookie('userid')!=""&&$.cookie('userid')!=undefined){
				return true;
			}else{
				return false;
			}
		},
		checkcarnum:function(){
			$.ajax({
				url : "ShowCar",
				dataType : "jsonp",
				async : true,
				type : "POST",
				success : function(data) {
					console.log(data);
					if(data.result=="success"){
						let num=0;
						for(let i=0;i<data.data.length;i++){
							num+=Number(data.data[i].num);
						}
						$("#car>#car_num").html(num);
						$("#car>#car_num").css("display","inline");
						$("#car>#span-car").html($("#car>#span-car").html()+"("+num+")");
					}else{
						$("#car>#car_num").html(0);
						$("#car>#car_num").css("display","none");
						$("#car>#span-car").html("购物车");
					}
				},
				error : function() {
					//请求出错处理 
					console.log("请求异常");
				}
			});
		},
		getaddress:function(){
	    	$.ajax({
					url : "https://apis.map.qq.com/ws/location/v1/ip?key=TKUBZ-D24AF-GJ4JY-JDVM2-IBYKK-KEBCU&output=jsonp&callback=?",//
					dataType : "jsonp",
					jsonp:"callback",
					async : true,
					type : "GET",
					success : function(data) {
						var info = data.result.ad_info;
						var result = info.province + info.city + info.district;
						$("#city").html(result);
					},
					error : function() {//
						//请求出错处理 
						$("#city").html("中国");
				//$("#city").html("广东省深圳市");
						console.log("请求异常");
					}
			});
		},
		tocar:function(){
			if($.IsPC()==true){
				window.location.href="cart";
			}else{
				window.location.replace("m.cart");
			}
		},
		tolist:function(){
			if($.IsPC()==true){
				window.open("list");
			}else{
				window.location.href="m.list";
			}
		}
	});
})(jQuery);