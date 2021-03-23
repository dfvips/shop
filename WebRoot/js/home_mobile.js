/**
 * 
 */
let code;
let flag=0;
let index =   layer.open({
    type: 2
    ,content: '正在加载中'
  });
let orgphone=0;
let orgemail=0;
document.onreadystatechange = completeLoading;

function completeLoading() {
    if (document.readyState == "complete") {
    	layer.close(index);
    }
}
window.onresize = function() {
	$.checkurl();
	$.loadhtml();
	$.checkcarnum();
};
$(document).ready(function() {
	$.checkurl();
	$.loadhtml();
	$.searchmsg();
	$.checkcarnum();
	$('.carousel').carousel({
	  interval: 3000
	});
/*	(function(history){
	    let pushState = history.pushState;
	    history.pushState = function(state) {
	        if (typeof history.onpushstate == "function") {
	            history.onpushstate({state: state});
	        }
	        return pushState.apply(history, arguments);
	    };
	})(window.history);
	history.onpushstate = function(e) {
		$.checkurl();
	}*/
	window.addEventListener('popstate', function(event) {
		$.init();
		$.checkurl();
	});
	$("#search_text").focus(function(){
		  $("#search").css("border","1px solid #23a6d5");
		  $("#search_text").attr("placeholder","");
		  $("#header>#logo").addClass("active");
		  $("#header>.user").css('display','none');
		  $('#search').animate({'width':'66%'},500,'swing');
		  $(".btnserach_iconfont").addClass("active");
		});
	$("#search_text").blur(function(){
		  $("#search").css("border","1px solid #e0e0e0");
		  $("#search_text").attr("placeholder","请输入您要搜索的商品");
		  $('#header>#logo').removeClass("active");
		  $('#search').animate({'width':'60%'},500,'swing');
		  setTimeout(function() {
			  $("#header>.user").css('display','block');
		  }, 500)
		  $(".btnserach_iconfont").removeClass("active");
		});	
	(function(){
		let $containers = $('[data-animation]:not([data-animation-child]), [data-animation-container]');
		$containers.scrollAnimations();
	}());
	$("#nav_title h2").click(function(){
		$("#nav_title h2").removeClass("active_title");
		$(this).addClass("active_title");
		let id=$(this).attr('id');
	  	if(id!="box_slideshow"){
	    	$('#silide_home').hide(1000);
	    	$("#content").css('margin-top','88px');
     	}else{
     		$('#silide_home').show(1000);
     		$("#content").css('margin-top','0');
     	}
		$("div[id*=box_]").hide(1000);
		$('div#'+id).show(1000);
	});
	$('#footer>div').click(function(){
		$('#footer>div>span').removeClass("active");
		$(this).children("span").addClass("active");
		$.init();
		if($(this).attr('id')=="home"){
			 $("title").html("DreamFly手机商城——主页")
			 let stateObject = {};    
		 	 let title = $("title").html();     
		  	 let newUrl = 'm.home';  
			 history.pushState(stateObject, title, newUrl);
			let a=$(".active_title");
			let id=a.attr('id');
	     	if(id!="box_slideshow"){
		    	$('#silide_home').css('display','none');
		    	$("#content").css('margin-top','88px');
	     	}else{
	     		$('#silide_home').fadeIn(1000);
	     		$("#content").css('margin-top','0');
	     	}
     		$("#content").fadeIn(1000);
     		$("#nav_title").fadeIn(1000);
		}else if($(this).attr('id')=="type"){
			$("title").html("DreamFly手机商城——分类")
			$(".aui-flexView").fadeIn(1000);
			 let stateObject = {};    
		 	 let title = $("title").html();     
		  	 let newUrl = 'm.category';  
			 history.pushState(stateObject, title, newUrl);
		}else if($(this).attr('id')=="me"){
				$("#header").fadeOut(1000);
				$("#title_me").fadeIn(1000);
				$("title").html("DreamFly手机商城——个人中心")
				 let stateObject = {};    
			 	 let title = $("title").html();     
			  	 let newUrl = 'm.me';  
				 history.pushState(stateObject, title, newUrl);
				 $.checkiflogin();
		}
	});
	$("#content")[0].addEventListener('touchstart', $.start);
	 $("#search_text").on('input propertychange',function(){
		 let val=$(this).val();
		 if(val!=""&&val!=null){
			 $("title").html("DreamFly手机商城——主页")
			 let stateObject = {};    
		 	 let title = $("title").html();     
		  	 let newUrl = "m.item?product="+$("#search_text").val();
			 history.pushState(stateObject, title, newUrl);
		 }else{
			 $("title").html("DreamFly手机商城——主页")
			 let stateObject = {};    
		 	 let title = $("title").html();     
		  	 let newUrl = "m.home";
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
	         window.location.href="m.item?product="+encodeURI(encodeURI($("#search_text").val()));
	     }  
	 });
	 $("#search>.btnserach_iconfont").click(function(){
		 window.location.href="m.item?product="+encodeURI(encodeURI($("#search_text").val()));
	 });
	$('.aboutme>ul>li>img').on('tap', function(e){
		let file=$("#file");
		file.click();
	});
	if($.isapple()==true){
		$('.aboutme>ul>li>img').css('margin-top','-16px');
	}
	$.loadusermsg();
});
(function($) {
	$.extend({
		loadhtml:function(){
			let flag = $.IsPC();
			if (flag == true) {
				window.location.replace("home");
			}
		},
		start:function(e){
			$("#content")[0].addEventListener('touchend', release);
		    let startX = e.changedTouches[0].pageX;
		    let X=0;
		    function release(event) {
		    	 $("#content")[0].removeEventListener('touchend', release);
			     let moveEndX = event.changedTouches[0].pageX;
			     X = moveEndX - startX;
			     if ( X > 120 ) {
			     	let a=$(".active_title").prev();
			     	let id="";
			     	if(a.html()!=undefined){
			 	    	id=a.attr('id');
			     	}else{
			     		let last=$("#nav_title").children("h2").size()-1;
			     		a=$("#nav_title").children("h2:eq("+last+")");
			     		id=a.attr('id');
			     	}
			     	if(id!="box_slideshow"){
				    	$('#silide_home').hide(1000);
				    	$("#content").css('margin-top','88px');
			     	}else{
			     		$('#silide_home').show(1000);
			     		$("#content").css('margin-top','0');
			     	}
			     	$(".active_title").removeClass("active_title");
			     	a.addClass("active_title");
			     	$("div[id*=box_]").hide(1000);
			 		$('div#'+id).show(1000);
			     }
			     else if ( X < -120 ) {
			     	let a=$(".active_title").next();
			     	let id="";
			     	if(a.html()!=undefined){
			 	    	id=a.attr('id');
			     	}else{
			     		a=$("#nav_title").children("h2:eq(0)");
			     		id=a.attr('id');
			     	}
			     	if(id!="box_slideshow"){
				    	$('#silide_home').hide(1000);
				    	$("#content").css('margin-top','88px');
			     	}else{
			     		$('#silide_home').show(1000);
			     		$("#content").css('margin-top','0');
			     	}
			     	$(".active_title").removeClass("active_title");
			     	a.addClass("active_title");
			     	$("div[id*=box_]").hide(1000);
			 		$('div#'+id).show(1000);
			     }
		    };
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
						$("div[id=box_slideshow]").append($.loadbox_tuijian(data));
						$("div[id=box_phone]").append($.loadbox(data.phone,"phoneimg_box"));
						$("div[id=box_tv]").append($.loadbox(data.tv,"tvimg_box"));
						$("div[id=box_pc]").append($.loadbox(data.pc,"pcimg_box"));
						$("div[id=box_earphone]").append($.loadbox(data.earphone,"earphoneimg_box"));
						$("div[id=box_watch]").append($.loadbox(data.other,"watchimg_box"));
						$('.scrolltab-content>.scrolltab-content-item:eq(0)').html($.loaditem(data.phone,'手机'));
						$('.scrolltab-content>.scrolltab-content-item:eq(1)').html($.loaditem(data.tv,'电视'));
						$('.scrolltab-content>.scrolltab-content-item:eq(2)').html($.loaditem(data.pc,'笔记本'));
						$('.scrolltab-content>.scrolltab-content-item:eq(3)').html($.loaditem(data.earphone,'耳机'));
						$('.scrolltab-content>.scrolltab-content-item:eq(4)').html($.loaditem(data.other,'手环'));
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
		loadbox_tuijian:function(data){
			let result=data.phone;
			let html='';
			for(let i=0;i<3;i++){
				let goods_name=result[i].name;
				let goods_desc=result[i].desc_s;
				let goods_price=result[i].price;
/*				let goods_del=result[i].del;*/
				let img=result[i].img_l;
				let good_id=result[i].id;
				html+='<a id="img_box" class="'+good_id+'" onclick="$.togoods(this)"><span class="info">'+
				'<span class="info">'+goods_name+'</span><span class="goods_desc">'+goods_desc+'</span><span class="goods_price">'+goods_price+'</span></span>'+
				'<img src="'+img+'">';
				if(i==0){
					html+='<span class="product-sign yellow">新品</span></a>';
				}else if(i==1){
					html+='<span class="product-sign dack">爆款</span></a>';
				}else{
					html+='<span class="product-sign pink">热销</span>';
				}
			}
			let result1=data.pc;
			for(let i=6;i<result1.length;i++){
				let goods_name=result1[i].name;
				let goods_desc=result1[i].desc_s;
				let goods_price=result1[i].price;
/*				let goods_del=result1[i].del;*/
				let img=result1[i].img_l;
				let good_id=result1[i].id;
				html+='<a id="img_box" class="'+good_id+'" onclick="$.togoods(this)"><span class="info">'+
				'<span class="info">'+goods_name+'</span><span class="goods_desc">'+goods_desc+'</span><span class="goods_price">'+goods_price+'</span></span>'+
				'<img src="'+img+'">';
				if(i%2==0){
					html+='<span class="product-sign dack">新品</span></a>';
				}else if(i%3==0){
					html+='<span class="product-sign yellow">爆款</span></a>';
				}else{
					html+='<span class="product-sign pink">热销</span>';
				}
			}
			let result2=data.earphone;
			for(let i=5;i<result2.length;i++){
				let goods_name=result2[i].name;
				let goods_desc=result2[i].desc_s;
				let goods_price=result2[i].price;
/*				let goods_del=result2[i].del;*/
				let img=result2[i].img_l;
				let good_id=result2[i].id;
				html+='<a id="img_box" class="'+good_id+'" onclick="$.togoods(this)"><span class="info">'+
				'<span class="goods_name">'+goods_name+'</span><span class="goods_desc">'+goods_desc+'</span><span class="goods_price">'+goods_price+'</span></span>'+
				'<img src="'+img+'">';
				if(i%2==0){
					html+='<span class="product-sign dack">新品</span></a>';
				}else if(i%3==0){
					html+='<span class="product-sign yellow">爆款</span></a>';
				}else{
					html+='<span class="product-sign pink">热销</span>';
				}
			}
			return html;
		},
		loadbox: function (result,id) {
			let html='';
			for(let i=0;i<result.length;i++){
				let goods_name=result[i].name;
				let goods_desc=result[i].desc_s;
				let goods_price=result[i].price;
				let goods_del=result[i].del;
				let img=result[i].img_l;
				let good_id=result[i].id;
					html+='<a id="'+id+'" class="'+good_id+'" onclick="$.togoods(this)"><span class="info">'+
					'<span class="goods_name">'+goods_name+'</span><span class="goods_desc">'+goods_desc+'</span><span class="goods_price">'+goods_price;
				if(goods_del!=null&&goods_del!=''){
					html+='<del>'+goods_del+'</del>';
				}
				html+='</span></span><img src="'+img+'" class="img-responsive center-block"></a>'
			}
			return html;
		},
		loaditem:function (result,cname) {
			let html="";
			html='<strong class="scrolltab-content-title">'+cname+'</strong><div><div class="aui-flex-links">';
			for(let i=0;i<result.length;i++){
				let goods_name=result[i].name;
				let img=result[i].img;
				let id=result[i].id;
				html+='<a id='+id+' class="aui-flex-links-item" onclick="$.togoods(this)"><div class="aui-flex-links-img"><img src="'+img+'" alt=""></div>'+
				'<div class="aui-flex-links-text">'+goods_name+'</div></a> ';
			}
			html+='</div></div>';
			return html;
		},
		init:function(){
			$('#silide_home').fadeOut(1000);
     		$("#content").fadeOut(1000);
     		$("#nav_title").fadeOut(500);
     		$(".aui-flexView").fadeOut(1000);
     		$(".aboutme").fadeOut(1000);
			$("#header").fadeIn(1000);
			$("#title_me").fadeOut(1000);
		},
		getParam:function(){
			let link=window.location.href;
		    let index=link.lastIndexOf("\/")
		    link=link.substring(index + 1,link.length);
		    return link;
		},
		checkurl:function(){
			let link=$.getParam();
			$('#footer>div>span').removeClass("active");
			if(link=="m.home"){
				$("title").html("DreamFly手机商城——主页")
				$("#footer>#home>span").addClass("active");
				let a=$(".active_title");
				let id=a.attr('id');
		     	if(id!="box_slideshow"){
			    	$('#silide_home').css('display','none');
			    	$("#content").css('margin-top','88px');
		     	}else{
		     		$('#silide_home').fadeIn(1000);
		     		$("#content").css('margin-top','0');
		     	}
	     		$("#content").fadeIn(1000);
	     		$("#nav_title").fadeIn(1000);
			}else if(link=="m.category"){
				$("title").html("DreamFly手机商城——分类")
				$("#footer>#type>span").addClass("active");
				$(".aui-flexView").fadeIn(1000);
			}else if(link=="m.me"){
				$("#header").fadeOut(1000);
				$("#title_me").fadeIn(1000);
				$("title").html("DreamFly手机商城——个人中心")
				$("#footer>#me>span").addClass("active");
				$.checkiflogin();
			}
		},
		tome:function(){
			window.location.replace("m.me");
		},
		uploadImg:function (ele) {
		        let image=ele.files[0];
		        let formData = new FormData();
		        formData.append('smfile',image);
		        let index;
		        $.ajax({
		            url: 'UploadFiles',
		            type: 'POST',
					dataType : "json",
		            data:formData,
		            beforeSend: function(){
		            	$.changlayertopc();
		            	index = layer.load(1, {
		            		  shade: [0.3,'#000']
	            		});
		            },
		            success: function(data){
		            	layer.close(index);
		            	let img=data.images;
		            	if(img==null||img==undefined){
		            		img=data.data.url;
		            	}
		            	$('.aboutme>ul>li>img').attr("src",img);
		            	let indd;
						$.ajax({
							url : "Updateusermsg",
							dataType : "jsonp",
							async : true,
							data : "id=" + $.cookie('userid') + "&figureurl=" + img,
							type : "POST",
							beforeSend: function(){
								indd = layer.load(1, {
				            		  shade: [0.3,'#000']
			            		});
							},
							success : function(data) {
								let result = data.result;
								if (result == "success") {
									  layer.close(indd);
									  console.clear();
									  $.cookie('figureurl',encodeURI(img));
								} else {
									  console.clear();
									  layer.close(indd);
									  layer.msg('修改出错了');
								}
							},
							error : function() {
								//请求出错处理 
								console.log("请求异常");
							}
						});
		            },
		            error: function(data){
		                console.log("上传失败");
		            },
		            cache: false,
		            contentType: false,
		            processData: false
		        });
		},
		upload:function(){
			let file=$("#file");
			file.click();
		},
		isapple:function(){
			let u = navigator.userAgent;
			isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
			return isiOS;
		},
		changname:function(){
			$.changlayertopc();
			layer.prompt({title: '请输入你要修改的昵称', formType: 3}, function(text, index){
			let indd;
				$.ajax({
					url : "Updateusermsg",
					dataType : "jsonp",
					async : true,
					data : "id=" + $.cookie('userid') + "&username=" + text,
					type : "POST",
					beforeSend: function(){
						indd = layer.load(1, {shade: false});
					},
					success : function(data) {
						let result = data.result;
						if (result == "success") {
							  layer.close(index);
							  layer.close(indd);
							  console.clear();
							  $.cookie('username',encodeURI(text));
							  $(".aboutme>ul>li:eq(1)>span").html(text);
						} else {
							  console.clear();
							  layer.close(index);
							  layer.close(indd);
							  layer.msg('修改出错了');
						}
					},
					error : function() {
						//请求出错处理 
						console.log("请求异常");
					}
				});
			});
		},
		changsex:function(){
			$.changlayertomobile();
			let gender="男";
			  let index=layer.open({
				    content: '请选择您的性别'
				    ,btn: ['女', '男']
				    ,skin: 'footer'
				    ,yes: function(index,type){
						if (type==1) {
							$.changsexajax(index,'女');
						} else {
							layer.close(index);
						}
				    }
					,no: function(index){
						$.changsexajax(index,'男');
					}
					,success: function(){
						let obj = document.querySelector('.layui-m-layerbtn');
						let newbtn = document.createElement('span');
						newbtn.textContent = '取消';
						newbtn.setAttribute('yes', '');
						newbtn.setAttribute('type', 2);
						obj.appendChild(newbtn);
					}
				  });
		},
		checkiflogin:function(){
			if($.islogin()==true){
				$(".aboutme").fadeIn(1000);
			 }else{
				$.changlayertopc();
				layer.open({
					    content: '您还没有登录，点击确定跳转登录'
					    ,btn: ['确定', '取消']
				});
				$(".layui-layer-title").html("DreamFly手机商城"); 
				$(".layui-layer-btn0").click(function(){
					$.changlayertomobile();
					let index =   layer.open({
					    type: 2
					});
				    setTimeout(function() {
				    	layer.close(index);
				    	window.location.replace("m.userlogin");
				    }, 2500);
				});
				$('.layui-layer-close1,.layui-layer-btn1').click(function(){
					window.location.replace("m.home");
				});
			 }
		},
		optionno:function(){
	    	$('#footer>div>span').removeClass("active");
			$("#home").children("span").addClass("active");
			$.init();
			let a=$(".active_title");
			let id=a.attr('id');
	     	if(id!="box_slideshow"){
		    	$('#silide_home').css('display','none');
		    	$("#content").css('margin-top','88px');
	     	}else{
	     		$('#silide_home').fadeIn(1000);
	     		$("#content").css('margin-top','0');
	     	}
     		$("#content").fadeIn(1000);
     		$("#nav_title").fadeIn(1000);
		},
		changlayertopc:function(){
			$("head").remove('script[src="formwork/layer_mobile.js"]');
			$("head").append('<script src="formwork/layer.js"></script>');
		},
		changlayertomobile:function(){
			$("head").remove('script[src="formwork/layer.js"]');
			$("head").append('<script src="formwork/layer_mobile.js"></script>');
		},
		changephone:function(){
			if($("section.aboutme>ul>li:eq(3)>span").html()=="未绑定手机号"){
				$.changphoneajax();
			}else{
				$.changlayertopc();
				let index=layer.prompt({title: '请验证您的手机号', 
							  formType: 3
				});
				$(".layui-layer-content").html('<div id="mydiv1"><span id="myspan1">您当前的手机号：</span>'
						+'<input type="text" name="input1" value="'
						+$("section.aboutme>ul>li:eq(3)>span").html()
						+'" readonly id="myinput1" ></div><span id="myspan2">请输入验证码:</span>'
						+'<div id="mydiv2"><input type="text" class="layui-layer-input" value="" id="myinput2"> '
						+'<a id="mybtn1">获取验证码</a></div>');
				$(".layui-layer-content>#mydiv2>#myinput2").focus(function(){
					  $(".layui-layer-content>#mydiv2").css("border","1px solid rgba(71,145,255,.66)");
					});
				$(".layui-layer-content>#mydiv2>#myinput2").blur(function(){
					$(".layui-layer-content>#mydiv2").css("border","1px solid #e6e6e6");
					});
				orgphone=$("#myinput1").val();
				$("a[id='mybtn1']").click(function(){
					if(flag==0){
						$(this).attr('disabled', "true");
						$.sendphone($(this),$("#myinput1").val());
					}else{
						layer.msg('点击太频繁了');
					}
				});
				$(".layui-layer-btn0").click(function(){
					if($.cmd5x($("#myinput2").val())==code){
						layer.close(index);
						flag=0;
						$.changlayertomobile();
						let o=layer.open({
						    type: 2
						    ,content: '加载中'
					    });
						setTimeout(function() {
							layer.close(o);
							$.changphoneajax();
						}, 1000);
					}else{
						layer.msg('验证码错误');
					}
				});
			}
		},
		changeemail:function(){
			if($("section.aboutme>ul>li:eq(4)>span").html()=="未绑定邮箱"){
				$.changemailajax();
			}else{
				$.changlayertopc();
				let index=layer.prompt({title: '请验证您的邮箱', 
							  formType: 3
				});
				$(".layui-layer-content").html('<div id="mydiv1"><span id="myspan1">您当前的邮箱：</span>'
						+'<input type="text" name="input1" value="'
						+$("section.aboutme>ul>li:eq(4)>span").html()
						+'" readonly id="myinput1" ></div><span id="myspan2">请输入验证码:</span>'
						+'<div id="mydiv2"><input type="text" class="layui-layer-input" value="" id="myinput2"> '
						+'<a id="mybtn1">获取验证码</a></div>');
				$(".layui-layer-content>#mydiv2>#myinput2").focus(function(){
					  $(".layui-layer-content>#mydiv2").css("border","1px solid rgba(71,145,255,.66)");
					});
				$(".layui-layer-content>#mydiv2>#myinput2").blur(function(){
					$(".layui-layer-content>#mydiv2").css("border","1px solid #e6e6e6");
					});
				orgemail=$("#myinput1").val();
				$("a[id='mybtn1']").click(function(){
					if(flag==0){
						$(this).attr('disabled', "true");
						$.sendemail($(this),$("#myinput1").val());
					}else{
						layer.msg('点击太频繁了');
					}
				});
				$(".layui-layer-btn0").click(function(){
					if($.cmd5x($("#myinput2").val())==code){
						layer.close(index);
						flag=0;
						$.changlayertomobile();
						let o=layer.open({
						    type: 2
						    ,content: '加载中'
					    });
						setTimeout(function() {
							layer.close(o);
							$.changemailajax();
						}, 1000);
					}else{
						layer.msg('验证码错误');
					}
				});
			}
		},
		changepwd:function(){
			$.changlayertopc();
			console.log($.cookie("usertoken"));
			if($.cookie("usertoken")!=' '){
				layer.prompt({title: '请输入原密码，并确认', formType: 1}, function(pass, index){
					if($.cmd5x(pass)==$.cookie("usertoken")){
						  layer.close(index);
						  $.changepwdajax();
					}else{
						layer.msg('原密码错误');
					}
				});
			}else{
				if(decodeURI($.cookie('phone'))==" "&&decodeURI($.cookie('email'))==" "){
					layer.msg('请先绑定邮箱/手机号');
				}else{
					$.changepwdajax();
				}
			}
		},
		logoutmobile:function(){
		   $.changlayertomobile();
		   layer.open({
				    content: '是否确认退出登录？'
				    ,btn: ['取消', '确定']
				    ,skin: 'footer'
				    ,no: function(index){
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
						layer.close(index);
					    let indexa=layer.open({
							    type: 2
							    ,content: '正在退出登录...'
					    });
					    setTimeout(function() {
					    	layer.close(indexa);
					    	window.location.replace("m.home");
					    }, 1500);
				    }
		    });
		},
		aboutus:function(){
			$.changlayertopc();
/*			layer.open({
				  type: 1,
				  skin: 'layui-layer-lan',
				  closeBtn: 0,
				  anim: 2,
				  shadeClose: true,
				  content: '作者：梦丶随心飞<br/>时间：2019.11-2019.12'
		    });*/
			layer.alert('作者：梦丶随心飞<br/>时间：2019.11-2019.12', {
				  title: 'DreamFly手机商城',
				  icon: 4,
				  skin: 'layer-ext-moon'
			})
		},
		tolist:function(){
			window.location.href="m.list";
		},
		loadusermsg:function(){
			if($.cookie('userid')!=undefined){
				let gender;
				let phone;
				let email;
				if(decodeURI($.cookie('gender'))!=" "){
					gender=decodeURI($.cookie('gender'));
				}else{
					gender='男';
				}
				if(decodeURI($.cookie('phone'))!=" "){
					phone=decodeURI($.cookie('phone'));
				}else{
					phone='未绑定手机号';
				}
				if(decodeURI($.cookie('email'))!=" "){
					email=decodeURI($.cookie('email'));
				}else{
					email='未绑定邮箱';
				}
				$("section.aboutme>ul>li:eq(0)>img").attr('src',decodeURI($.cookie('figureurl')));
				$("section.aboutme>ul>li:eq(1)>span").html(decodeURI($.cookie('username')));
				$("section.aboutme>ul>li:eq(2)>span").html(gender);
				$("section.aboutme>ul>li:eq(3)>span").html(phone);
				$("section.aboutme>ul>li:eq(4)>span").html(email);
			}
		},
		changsexajax:function(index,gender){
			let indd;
			$.ajax({
				url : "Updateusermsg",
				dataType : "jsonp",
				async : true,
				data : "id=" + $.cookie('userid') + "&gender=" + gender,
				type : "POST",
				beforeSend: function(){
					indd =   layer.open({
					    type: 2
					    ,content: '修改中,请稍后'
				    });
				},
				success : function(data) {
					let result = data.result;
					if (result == "success") {
					    console.clear();
						$(".aboutme>ul>li:eq(2)>span").html(gender);
						$.cookie('gender',encodeURI(gender));
						layer.close(index);
						layer.close(indd);
					} else {
						  console.clear();
						  layer.close(index);
						  layer.close(indd);
						  layer.msg('修改出错了');
					}
				},
				error : function() {
					//请求出错处理 
					console.log("请求异常");
				}
			});
		},
		changepwdajax:function(){
		  layer.prompt({title: '请输入新密码，并确认', formType: 1}, function(text, index){
			    let indd;
				$.ajax({
					url : "Updateusermsg",
					dataType : "jsonp",
					async : true,
					data : "id=" + $.cookie('userid') + "&password=" + $.cmd5x(text),
					type : "POST",
					beforeSend: function(){
						indd =  layer.load(1, {
							  shade: [0.3,'rgb(0,0,0)']
						});
					},
					success : function(data) {
						let result = data.result;
						if (result == "success") {
						    console.clear();
						    $.cookie("usertoken",$.cmd5x(text));
							layer.close(index);
							layer.close(indd);
							layer.msg('修改成功');
						} else {
							  console.clear();
							  layer.close(index);
							  layer.close(indd);
							  layer.msg('修改出错了');
						}
					},
					error : function() {
						//请求出错处理 
						console.log("请求异常");
					}
				}); 
			  });
		},
		sendcode:function(ele){
			let time = 21;
			flag=1;
			let timer = setInterval(function() {
				if (time <= 1) {
					ele.html("获取验证码");
					ele.removeAttr("disabled");
					clearInterval(timer);
					flag=0;
					return false;
				}
				time--;
				ele.html(time + "s后重试");
			}, 1000);
		},
		sendphone:function(ele,phone){
			$.ajax({
				url : "Getcode",
				dataType : "jsonp",
				async : true,
				data : "state=msg&code=other&phone=" + phone,
				type : "POST",
				beforeSend : function() {
					$.sendcode(ele);
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
		},
		sendemail:function(ele,email){
			$.ajax({
				url : "Getcode",
				dataType : "jsonp",
				async : true,
				data : "state=msg&code=other&email=" + email,
				type : "POST",
				beforeSend : function() {
					$.sendcode(ele);
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
		},
		changphoneajax:function(){
			$.changlayertopc();
			let index=layer.prompt({title: '请输入您的新手机号', 
				  formType: 3
			});
			$(".layui-layer-content").html('<div id="mydiv1"><span id="myspan3">手机号：</span>'
					+'<input type="text" name="input1" id="myinput3" ></div><span id="myspan2">请输入验证码:</span>'
					+'<div id="mydiv2"><input type="text" class="layui-layer-input" value="" id="myinput2"> '
					+'<a id="mybtn3">获取验证码</a></div>');
			$("a[id='mybtn3']").click(function(){
				if($("#myinput3").val()==orgphone){
					layer.msg('手机号未变更');
				}else if($.isPoneAvailable($("#myinput3").val())==false){
					layer.msg('手机号格式不正确');
				}else{
					if(flag==0){
						$(this).attr('disabled', "true");
						$.sendphone($(this),$("#myinput3").val());
					}else{
						layer.msg('点击太频繁了');
					}
				}
			});
			$(".layui-layer-content>#mydiv2>#myinput2").focus(function(){
				  $(".layui-layer-content>#mydiv2").css("border","1px solid rgba(71,145,255,.66)");
				});
			$(".layui-layer-content>#mydiv2>#myinput2").blur(function(){
				$(".layui-layer-content>#mydiv2").css("border","1px solid #e6e6e6");
				});
			$(".layui-layer-btn0").click(function(){
				if($.cmd5x($("#myinput2").val())==code){
					let indd;
					$.ajax({
						url : "Updateusermsg",
						dataType : "jsonp",
						async : true,
						data : "id=" + $.cookie('userid') + "&phone=" + $("#myinput3").val(),
						type : "POST",
						beforeSend : function() {
							indd = layer.load(1, {
								  shade: [0.3,'rgb(0,0,0)']
							});
						},
						success : function(data) {
							if(data.result=='success'){
								$.cookie('phone',encodeURI($("#myinput3").val()));
								$("section.aboutme>ul>li:eq(3)>span").html($("#myinput3").val());
								layer.close(indd);
								layer.close(index);
								layer.msg('修改成功');
							}else{
								layer.close(indd);
								layer.close(index);
								layer.msg('修改出错了');
							}
						},
						error : function() {
							//请求出错处理 
							console.log("请求异常");
						}
					});		
					flag=0;
				}else{
					layer.msg('验证码错误');
				}
			});
		},
		changemailajax:function(){
			$.changlayertopc();
			let index=layer.prompt({title: '请输入您的新邮箱', 
				  formType: 3
			});
			$(".layui-layer-content").html('<div id="mydiv1"><span id="myspan3">邮箱：</span>'
					+'<input type="text" name="input1" id="myinput3" ></div><span id="myspan2">请输入验证码:</span>'
					+'<div id="mydiv2"><input type="text" class="layui-layer-input" value="" id="myinput2"> '
					+'<a id="mybtn3">获取验证码</a></div>');
			$("a[id='mybtn3']").click(function(){
				if($("#myinput3").val()==orgemail){
					layer.msg('邮箱未变更');
				}else if($.isEmailAvailable($("#myinput3").val())==false){
					layer.msg('邮箱格式不正确');
				}else{
					if(flag==0){
						$(this).attr('disabled', "true");
						$.sendemail($(this),$("#myinput3").val());
					}else{
						layer.msg('点击太频繁了');
					}
				}
			});
			$(".layui-layer-content>#mydiv2>#myinput2").focus(function(){
				  $(".layui-layer-content>#mydiv2").css("border","1px solid rgba(71,145,255,.66)");
				});
			$(".layui-layer-content>#mydiv2>#myinput2").blur(function(){
				$(".layui-layer-content>#mydiv2").css("border","1px solid #e6e6e6");
				});
			$(".layui-layer-btn0").click(function(){
				if($.cmd5x($("#myinput2").val())==code){
					let indd;
					$.ajax({
						url : "Updateusermsg",
						dataType : "jsonp",
						async : true,
						data : "id=" + $.cookie('userid') + "&email=" + $("#myinput3").val(),
						type : "POST",
						beforeSend : function() {
							indd = layer.load(1, {
								  shade: [0.3,'rgb(0,0,0)']
							});
						},
						success : function(data) {
							if(data.result=='success'){
								$.cookie('email',encodeURI($("#myinput3").val()));
								$("section.aboutme>ul>li:eq(4)>span").html($("#myinput3").val());
								layer.close(indd);
								layer.close(index);
								layer.msg('修改成功');
							}else{
								layer.close(indd);
								layer.close(index);
								layer.msg('修改出错了');
							}
						},
						error : function() {
							//请求出错处理 
							console.log("请求异常");
						}
					});		
					flag=0;
				}else{
					layer.msg('验证码错误');
				}
			});
		}
	});
})(jQuery);
