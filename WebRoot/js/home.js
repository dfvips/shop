let position=0;
let timer=null;
let time=6000;
let index = layer.open({
    type: 2
    ,content: '正在加载中...'
});
document.onreadystatechange = completeLoading;

function completeLoading() {
    if (document.readyState == "complete") {
    	layer.close(index);
    }
}
window.onresize = function() {
	$.loadhtml();
	$.checklogin();
	$.checkcarnum();
};
$(document).ready(function() {
	$.loadhtml();
	$("html,body").animate({
	        scrollTop: 0,
	        screenLeft: 0,
    }, 100);  
	$.checkcarnum();
	var swiper = new Swiper('.swiper-container',{
		autoplay: 2000,
		speed: 1000,
		autoplayDisableOnInteraction: false,
		loop: true,
		centeredSlides: true,
		slidesPerView: 2,
		pagination: '.swiper-pagination',
		paginationClickable: true,
		prevButton: '.swiper-button-prev',
		nextButton: '.swiper-button-next',
        pagination: '.swiper-pagination',
		onInit: function(swiper) {
			swiper.slides[2].className = "swiper-slide swiper-slide-active";
		},
		breakpoints: {
			668: {
				slidesPerView: 1,
			}
		}
	});
	$('.animate').scroll({
		mobile: false,
		once: false
	});
	$.searchmsg();
	$.checklogin();

	$(".box_list>ul>li>a").on('mouseover',function(){
		let a=$('.box_list>ul>li').children($("a"));
		a.next().css('display','none');
		a.css("background","none")
		a.children($("em")).removeAttr("style");
		a.children($("span")).removeAttr("style");
		a.children($("em")).css("color","#e0e0e0");
		a.children($("span")).css("color","#FFF");
		$(this).css("background","rgba(255,255,255,.6)");
		$(this).children($("span")).css({"background": "linear-gradient(-45deg, #ee7752, #7d72db, #23a6d5, #7ed3f2)",
		    "background-size": "300% 300%",
		    "animation": "mybg 5s ease infinite",
		    "color": "transparent",
		    "-webkit-background-clip": "text",
		    "-webkit-text-fill-color": "transparent"});
		$(this).children($("em")).css({"background": "linear-gradient(-45deg, #ee7752, #7d72db, #23a6d5, #7ed3f2)",
		    "background-size": "300% 300%",
		    "animation": "mybg 5s ease infinite",
		    "color": "transparent",
		    "-webkit-background-clip": "text",
		    "-webkit-text-fill-color": "transparent"});
		$(this).next().css({'display':'block','background':'#fff'});
	});
	$(".box_list>ul").on('mouseleave',function(){
		let a=$(this).children($("li")).children($("a"));
		a.css("background","none")
		a.children($("em")).removeAttr("style");
		a.children($("span")).removeAttr("style");
		a.children($("em")).css("color","#e0e0e0");
		a.children($("span")).css("color","#FFF");
		a.next().css('display','none');
	});
	(function(){
		var $containers = $('[data-animation]:not([data-animation-child]), [data-animation-container]');
		$containers.scrollAnimations();
	}());
	timer = setInterval($.divplay, time);
	$("#control").mouseenter(function () {
		   clearInterval(timer);
	});
	$("#control").mouseout(function(){
		   timer=setInterval($.divplay,time);
	});
	$("#box_pcout").mouseenter(function () {
		   clearInterval(timer);
	});
	$("#box_pcout").mouseleave(function(){
		   timer=setInterval($.divplay,time);
	});
	$.getaddress();
	 $("#search_text").on('input propertychange',function(){
		 let val=$(this).val();
		 if(val!=""&&val!=null){
			 $("title").html("DreamFly手机商城——主页")
			 var stateObject = {};    
		 	 var title = $("title").html();     
		  	 var newUrl = "item?product="+$("#search_text").val();
			 history.pushState(stateObject, title, newUrl);
		 }else{
			 $("title").html("DreamFly手机商城——主页")
			 var stateObject = {};    
		 	 var title = $("title").html();     
		  	 var newUrl = "home";
			 history.pushState(stateObject, title, newUrl);
		 }
	     let url_ = 
			$.ajax({
				url : "Search?name="+val,
				dataType : "jsonp",
				async : false,
				type : "POST",
				success : function(data) {
					let result = data.result;
					if (result == "success") {
						html="";
						for(let i=0;i<data.data.length;i++){
							html+='<option value="'+data.data[i].title+'" id="'+data.data[i].result+'">';
							if(i>6){
								break;
							}
						}
						$("#source").html(html);
					} else {
						console.log("数据异常");
					}
				},
				error : function() {
					//请求出错处理 
					console.log("请求异常");
				}
			});
	 });
	 $("#search_text").bind("keypress",function(event){
	     if(event.keyCode == 13){  
	         window.location.href="item?product="+encodeURI(encodeURI($("#search_text").val()));
	     }  
	 });
	 $("#search>.btn_iconfont").click(function(){
		 window.location.href="item?product="+encodeURI(encodeURI($("#search_text").val()));
	 });
/*	$("#city").html(returnCitySN.cname);*/
	 $("#logined").mouseenter(function(){
		 if($("script[src*='layer.js']").length==0){
			 $("head").append('<link rel="stylesheet" href="formwork/theme/default/layer.css?v=3.1.1" id="layuicss-layer">"');
			 $("head").append('<script src="formwork/layer.js"></script>');
			 $('link[href*="layer.css').attr("href","formwork/theme/default/layer.css?v=3.1.1")
			 $("head").remove('script[src="formwork/layer_mobile.js"]');
			 $("head").remove('link[href*="formwork/layer_mobile.css"]');
		 }
		 layer.tips('个人中心设置在手机端哦!', '#logined', {
				  tips: [4, '#3595CC'],
		 });
     });
	 $("#logined").mouseleave(function(){
		 layer.closeAll('tips'); 
     });
});
$(function () {            
            $(window).bind("scroll", function () {
                var sTop = $(window).scrollTop();
                var sTop = parseInt(sTop);
                if (sTop >= 1) {
					$(".header").css({"position":"fixed","background":"hsla(0,0%,100%)"});
					if($.islogin()==true){
						$(".header").css({"min-width":"1420px"});
					}else{
						$(".header").css({"min-width":"1240px"});
					}
                }else {
					$(".header").css({"position":"relative","background":"hsla(0,0%,100%,.95)"});
					if($.islogin()==true){
						$(".header").css({"min-width":"1420px"});
					}else{
						$(".header").css({"min-width":"1240px"});
					}
                } 
            });
});
$("#search_text").focus(function(){
	  $("#search").css("border","1px solid #23a6d5");
	  $("#search_text").attr("placeholder","");
	  $("#box_search>#logo").addClass("active");
	  $(".btn_iconfont").addClass("active");
	});
$("#search_text").blur(function(){
	  $("#search").css("border","1px solid #e0e0e0");
	  $("#search_text").attr("placeholder","请输入您要搜索的商品");
	  $('#box_search>#logo').removeClass("active");
	  $(".btn_iconfont").removeClass("active");
	});
(function($) {
	$.extend({
		openbaidu:function(){
			window.open("https://www.baidu.com/s?ie=utf-8&wd="+$("#city").html(), "_blank"); 
		},
		searchmsg:function(){
			$.ajax({
				url : "Searchgoods",
				dataType : "jsonp",
				async : false,
				type : "POST",
				success : function(data) {
					let result = data.result;
					if (result == "success") {
						$("#phone").html($.loadsearch(data.phone));
						$("#pc").html($.loadsearch(data.pc));
						$("#tv").html($.loadsearch(data.tv));
						$("#earphone").html($.loadsearch(data.earphone));
						$("#other").html($.loadsearch(data.other));
						$("#box_phone").html($.loadbox_phone(data.phone));
						$(".box_list>#box_right").html($.loadtop(data.phone));
						$("#box_tv").html($.loadbox_tv(data.tv));
						$("#box_pcout>#box_pc").html($.loadbox_pc(data.pc));
						$('#box_earphone>#innner:eq(0)>#right').html($.loadbox_earphone(data.earphone,0));
						$('#box_earphone>#innner:eq(1)>#right').html($.loadbox_earphone(data.earphone,1));
						$('#box_watch>#innner>#right').html($.loadbox_watch(data.other));
					} else {
						console.log("数据异常");
					}
				},
				error : function() {
					//请求出错处理 
					console.log("请求异常");
				}
			});
		},
		loadsearch:function(result){
			let html='';
			for(let i=0;i<result.length;i++){
				let img=result[i].img;
				let name=result[i].name;
				let good_id=result[i].id;
				if(i%6==0){
					if(i!=0){
						html+="</ul>";
					}
					html+="<ul>";
					html+='<li><a onclick="$.togoods(this)" id="'+good_id+'"><img src="'+img+'"+ width="40" height="40">'
							+'<span>'+result[i].name+'</span></a></li>';
				}else if(i==result.length){
					html+="</ul>";
				}else{
					html+='<li><a onclick="$.togoods(this)" id="'+good_id+'"><img src="'+img+'"+ width="40" height="40">'
							+'<span>'+result[i].name+'</span></a></li>';
				}
			}
			return html;
		},
		preclick:function(){
			clearInterval(timer);
			$.pre();
		},
		nextclick:function(){
			clearInterval(timer);
			$.next();
		},
		pre:function () {
			if(position>0){
				$("#next").removeClass("disable");
				position-=50;
				$('#box_pc').animate({'left':'-'+position+'%'},1000,'swing');
				if(position==0){
					$("#pre").addClass("disable");
				}
			}
		},
		next:function () {
			if(position<100){
				$("#pre").removeClass("disable");
				position+=50;
				$('#box_pc').animate({'left':'-'+position+'%'},1000,'swing');
				if(position==100){
					$("#next").addClass("disable");
				}
			}
		},
		divplay:function(){
			if(position==0||position==50){
				$.next();
			}else if(position==100){
				position=0;
				$('#box_pc').animate({'left':'-'+position+'%'},1500,'swing');
				$("#pre").addClass("disable");
				$("#next").removeClass("disable");
			}
		},
		loadhtml:function(){
			let flag = $.IsPC();
			if (flag != true) {
				window.location.replace("m.home");
			}
		},
		loadbox_phone:function(result){
			let html='';
			let time=200;
			for(let i=3;i<result.length;i++){
				let goods_name=result[i].name;
				let goods_desc=result[i].desc;
				let goods_price=result[i].price;
/*				let goods_del=result[i].del;*/
				let img=result[i].img_l;
				let good_id=result[i].id;
				html+='<a id="phoneimg_box" class="'+good_id+'" onclick="$.togoods(this)" data-animation-child data-animation="fadeInUp" data-animation-delay="'+time+'ms"><span class="info">'+
				'<span class="goods_name">'+goods_name+'</span><span class="goods_desc">'+goods_desc+'</span><span class="goods_price">'+goods_price+'</span></span>'+
				'<img src="'+img+'" class="img-responsive center-block"></a>'
				time+=200;
			}
			return html;
		},
		loadtop:function(result){
			let html='';
			for(let i=0;i<3;i++){
				let goods_name=result[i].name;
				let goods_desc=result[i].desc;
				let goods_price=result[i].price;
/*				let goods_del=result[i].del;*/
				let img=result[i].img_l;
				let good_id=result[i].id;
				html+='<a id="img_box" class="'+good_id+'" onclick="$.togoods(this)"><span class="info">'+
				'<span class="goods_name">'+goods_name+'</span><span class="goods_desc">'+goods_desc+'</span><span class="goods_price">'+goods_price+'</span></span>'+
				'<img src="'+img+'">';
				if(i==0){
					html+='<span class="product-sign yellow">新品</span></a>';
				}else if(i==1){
					html+='<span class="product-sign dack">爆款</span></a>';
				}else{
					html+='<span class="product-sign pink">热销</span>';
				}
			}
			return html;
		},
		loadbox_tv:function(result){
			let html='';
			let time=500;
			for(let i=0;i<result.length;i++){
				let goods_name=result[i].name;
				let goods_desc=result[i].desc;
				let goods_price=result[i].price;
/*				let goods_del=result[i].del;*/
				let img=result[i].img_l;
				let good_id=result[i].id;
				html+='<a id="tvimg_box" class="'+good_id+'" onclick="$.togoods(this)" data-animation-child data-animation="fadeInUp" data-animation-delay="'+time+'ms"><span class="info">'+
				'<span class="goods_name">'+goods_name+'</span><span class="goods_desc">'+goods_desc+'</span><span class="goods_price">'+goods_price+'</span></span>'+
				'<img src="'+img+'" class="img-responsive center-block"></a>'
				time+=500;
			}
			return html;
		},
		loadbox_pc:function(result){
			let html='';
			for(let i=0;i<result.length;i++){
				let goods_name=result[i].name;
				let goods_desc=result[i].desc;
				let goods_price=result[i].price;
				let goods_del=result[i].del;
				let img=result[i].img_l;
				let good_id=result[i].id;
				html+='<a id="pcimg_box" class="'+good_id+'" onclick="$.togoods(this)"><span class="info">'+
				'<span class="goods_name">'+goods_name+'</span><span class="goods_desc">'+goods_desc+'</span><span class="goods_price">'+goods_price;
				if(goods_del!=null&&goods_del!=''){
					html+='<del>'+goods_del+'</del>';
				}
				html+='</span></span>'+'<img src="'+img+'">';
			}
			return html;
		},
		loadbox_earphone:function(result,page){
			let html='';
			let time=200;
			if(page==0){
				for(let i=0;i<4;i++){
					let goods_name=result[i].name;
					let goods_desc=result[i].desc;
					let goods_price=result[i].price;
					let goods_del=result[i].del;
					let img=result[i].img_l;
					let good_id=result[i].id;
					html+='<a id="earphoneimg_box" class="'+good_id+'" onclick="$.togoods(this)" data-animation-child data-animation="fadeInUp" data-animation-delay="'+time+'ms"><span class="info">'+
					'<span class="goods_name">'+goods_name+'</span><span class="goods_desc">'+goods_desc+'</span><span class="goods_price">'+goods_price;
					if(goods_del!=null&&goods_del!=''){
						html+='<del>'+goods_del+'</del>';
					}
					html+='</span></span>'+'<img src="'+img+'">';
					time+=200;
				}
			}else{
				for(let i=4;i<result.length;i++){
					let goods_name=result[i].name;
					let goods_desc=result[i].desc;
					let goods_price=result[i].price;
					let goods_del=result[i].del;
					let img=result[i].img_l;
					let good_id=result[i].id;
					html+='<a id="earphoneimg_box" class="'+good_id+'" onclick="$.togoods(this)" data-animation-child data-animation="fadeInUp" data-animation-delay="'+time+'ms"><span class="info">'+
					'<span class="goods_name">'+goods_name+'</span><span class="goods_desc">'+goods_desc+'</span><span class="goods_price">'+goods_price;
					if(goods_del!=null&&goods_del!=''){
						html+='<del>'+goods_del+'</del>';
					}
					html+='</span></span>'+'<img src="'+img+'">';
					time+=200;
				}
			}
			return html;
		},
		loadbox_watch:function(result){
			let html='';
			let time=200;
			for(let i=0;i<result.length;i++){
				let goods_name=result[i].name;
				let goods_desc=result[i].desc;
				let goods_price=result[i].price;
				let goods_del=result[i].del;
				let img=result[i].img_l;
				let good_id=result[i].id;
				html+='<a id="watchimg_box" class="'+good_id+'" onclick="$.togoods(this)" data-animation-child data-animation="fadeInUp" data-animation-delay="'+time+'ms"><span class="info">'+
				'<span class="goods_name">'+goods_name+'</span><span class="goods_desc">'+goods_desc+'</span><span class="goods_price">'+goods_price;
				if(goods_del!=null&&goods_del!=''){
					html+='<del>'+goods_del+'</del>';
				}
				html+='</span></span>'+'<img src="'+img+'">';
				time+=200;
			}
			return html;
		}
	});
})(jQuery);