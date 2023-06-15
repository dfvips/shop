(function($){
	$.extend({
		back:function(){
			window.location.replace("m.home");
		},
		loadcss: function() {
			let flag = $.IsPC();
			if (flag == true) {
				if($('link[href="css/order_mobile.css"]')[0]!=undefined){
					$('link[href="css/order_mobile.css"]')[0].setAttribute("href", "css/order_pc.css");
				}
				$('html,body').animate({scrollTop: 61},500);
				 let stateObject = {};    
			 	 let title = $("title").html();     
			  	 let newUrl = 'order';    
				 history.pushState(stateObject, title, newUrl);
			} else {
				if($('link[href="css/order_pc.css"]')[0]!=undefined){
					$('link[href="css/order_pc.css"]')[0].setAttribute("href", "css/order_mobile.css");
				}
				 let stateObject = {};    
			 	 let title = $("title").html();     
			  	 let newUrl = 'm.order';    
				 history.pushState(stateObject, title, newUrl);
			}
		},
		backpc:function(){
			window.location.replace("home");
		},
		checkiflogin:function(){
			if($.islogin()){
				let figureurl=decodeURI($.cookie('figureurl'));
				let username=decodeURI($.cookie('username'));
				$("#logined>img").attr("src",figureurl);
				$("#logined>span").html(username);
				$("#logined").css('display','flex');
				$("#login").html("退出登录");
				$("#login").attr("onclick","$.logout()");
				$("#login").css("color", "rgba(0, 0, 0, 0.25)");
			}else{
				$("#logined").css('display','none');
				$("#login").html("登录/注册");
				$("#login").attr("onclick","$.tologin()");
				$("#login").css("color", "#555555");
			}
		},
		ordercheck:function(){
			if($.cookie('ordernum')==null){
				if($.IsPC()==false){
					window.location.replace("m.home");
				}else{
					window.location.replace("home");
				}
			}else{
				$("body").css("display","block");
				$("#order_num").html($.cookie('ordernum'));
				$("#order_time").html(decodeURI($.cookie('nowtime')));
				$("#order_price").html("￥"+Number(decodeURI($.cookie('orderprice'))).toFixed(2));
				$("#inner>span>span").html("￥"+Number(decodeURI($.cookie('orderprice'))).toFixed(2));
				$("#inner>div>span>#num").html($.cookie('ordernum'));
				$("#inner>div>span>#time").html(decodeURI($.cookie('nowtime')));
			}
		}
	});
})(jQuery);
$(document).ready(function(){
	$.loadcss();
	$.checkiflogin();
	$.ordercheck();
});
window.onresize = function() {
	$.loadcss();
	$.checkiflogin();
	$.ordercheck();
}