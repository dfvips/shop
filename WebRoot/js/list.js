(function($){
	$.extend({
		loadcss: function() {
			let flag = $.IsPC();
			if (flag == true) {
				if($('link[href="css/list_mobile.css"]')[0]!=undefined){
					$('link[href="css/list_mobile.css"]')[0].setAttribute("href", "css/list_pc.css");
				}
				$('html,body').animate({scrollTop: 61},500);
				 let stateObject = {};    
			 	 let title = $("title").html();     
			  	 let newUrl = 'list';    
				 history.pushState(stateObject, title, newUrl);
			} else {
				if($('link[href="css/list_pc.css"]')[0]!=undefined){
					$('link[href="css/list_pc.css"]')[0].setAttribute("href", "css/list_mobile.css");
				}
				 let stateObject = {};    
			 	 let title = $("title").html();     
			  	 let newUrl = 'm.list';    
				 history.pushState(stateObject, title, newUrl);
			}
		},
		back:function(){
			window.location.href="m.me";
		},
		home:function(){
			window.location.replace("m.home");
		},
		loadhtmlmobile:function(){
		   let userid=$.cookie('userid');
		   $.ajax({
				url : "ShowOrder",
				dataType : "jsonp",
				async : true,
				data : "userid="+userid,
				type : "POST",
				success : function(data) {
					let html="";
					let htmlpc="";
					if(data.result=='success'){
						let length=data.orderlist.length;
						for(let i=data.orderlist.length-1;i>=0;i--){
							html+='<div id="box_mobile"><div id="box_title"><h2>订单日期：'+data.orderlist[i].orderlist.ordertime.replace(/-/g, "/")+'</h2><p>订单编号：'+data.orderlist[i].orderlist.ordernum+'</p></div>';
							html+='<ul>';
							htmlpc+='<div id="box_pc"><div id="item_title"><div><span>下单时间：'+data.orderlist[i].orderlist.ordertime.replace(/-/g, "/")+'</span><span>订单号：<span>'+data.orderlist[i].orderlist.ordernum+'</span></span></div><div><span>实付金额:</span><span>'+data.orderlist[i].orderlist.priceall+'</span></div></div><ul>';							
							let datalength=data.orderlist[i].orderlist.data.length;
							let num=0;
							for(let j=0;j<datalength;j++){
								html+='<li><img src="'+data.orderlist[i].orderlist.data[j].img+'"/><span>'+data.orderlist[i].orderlist.data[j].name+' ';
								htmlpc+='<li><img src="'+data.orderlist[i].orderlist.data[j].img+'"><div><p>'+data.orderlist[i].orderlist.data[j].name+' ';
								if(data.orderlist[i].orderlist.data[j].type!=''){
									html+=data.orderlist[i].orderlist.data[j].type+' ';
									htmlpc+=data.orderlist[i].orderlist.data[j].type+' ';
								}
								html+=data.orderlist[i].orderlist.data[j].color+' ×'+data.orderlist[i].orderlist.data[j].num+'</span></li>';
								htmlpc+=data.orderlist[i].orderlist.data[j].color+'</p><p>'+data.orderlist[i].orderlist.data[j].price+'</p></div><span>购买数量：'+data.orderlist[i].orderlist.data[j].num+'</span></li>';
								num+=Number(data.orderlist[i].orderlist.data[j].num);
							}
							html+='</ul><div id="box_count"><span>共'+num+'件商品</span><span>实付金额：'+data.orderlist[i].orderlist.priceall+'</span></div></div>';
							htmlpc+='</ul></div>';
						}
						$("#center_mobile").html(html);
						$("#content_pc").html(htmlpc);
					}else{
						$("#footer_mobile").css({'height':'90%','margin-top':'48px','font-size':'1.4rem'});
						$("#footer_mobile").html("无订单记录");
						$("#blank").css("display","flex");
					}
					$.checkbottom();
				},
				error : function() {
					//请求出错处理 
					console.log("请求异常");
				}
			});
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
		tohome:function(){
			window.location.replace("home");
		},
		tocart:function(){
			window.location.replace("cart");
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
						$("#cart>span").html("购物车("+num+")");
					}else{
						$("#cart>span").html("购物车");
					}
				},
				error : function() {
					//请求出错处理 
					console.log("请求异常");
				}
			});
		},
		checkbottom:function(){
			if($("#body_pc")[0].scrollHeight>$("#body_pc")[0].offsetHeight){
				console.log(1);
				$("#body_pc>.footer_pc").css("position","relative");
			}else{
				$("#body_pc>.footer_pc").css("position","absolute");
				console.log(0);
			}
	   }
	});
})(jQuery);
$(document).ready(function(){
	$.loadcss();
	$.loadhtmlmobile();
	$.checkiflogin();
	$.checkcarnum();
	$("#logined").mouseenter(function(){
		 layer.tips('个人中心设置在手机端哦!', '#logined', {
				  tips: [4, '#3595CC'],
		 });
     });
	 $("#logined").mouseleave(function(){
		 layer.closeAll('tips'); 
     });
	 $("#login").click(function(){
			$.loadhtmlmobile();
			$.checkiflogin();
			$.checkcarnum();
	 });
});
window.onresize = function() {
	$.loadcss();
}