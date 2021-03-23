let useprice="";
let reqid;
let reqname;
let reqimg;
let reqprice;
let reqtype;
let reqcolor;
let reqnum;
let time=0;
let ttt=0;
let parm="";
$(document).ready(function(){
	parm=$.getParam("product");
	$.loadcss();
	$.loadhtml(parm);
	$.checkcarnum();
	$("#type_price>#name").html($.updatetitle());
	$("#poduct_choose").val($.updatetitle());
	window.onresize = function() {
		$.loadcss();
		$.checklogin();
		$.checkcarnum();
	}
	$('#content_pc>#box_top>#silide_home_pc_fix_box>.carousel').carousel({
		  interval: 4000
	});
	$('.carousel').carousel({
		  interval: 0
	});
	$.getaddress();
	$.checklogin();
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
    $(function(){
        $('#getArea').getArea({
            defaultArea: [18, 2, 3],
            inpEle: '#getArea',
            normalArea: true
        });
    });
    $("div [id=group]").each(function () {
		$(this).children("div").click(function(){     
			$(this).siblings().removeClass("check");
			$(this).siblings().children("p").removeClass("active");
        	$(this).addClass("check");
        	$(this).children("p").addClass("active");
        	$("#type_price>#name").html($.updatetitle());
        });
    });
    $('div[id^="choose"]').each(function () {
    	let id=$(this).attr('id');
    	if(id!="choose_num"){
    		$(this).children("div").click(function(){     
    			$(this).siblings().removeClass("active");
            	$(this).addClass("active");
            	$("#count>span>span").html($.updatetitle_pc());
            });
    	}
    });
    $('#silide_home>.carousel-indicators>li').click(function(){

    	 let i=Number($(this).attr("data-slide-to"));
/*    	 $('#silide_home>.carousel-inner>.carousel-item:eq('+i+')').addClass("carousel-item-next");
    	 $('.carousel').carousel('next');*/ 
    	 $('.carousel').carousel(i);
    });
    $('.carousel-indicators>img').click(function(){
	   	 let i=Number($(this).attr("data-slide-to"));
	   	 //重新实现bootstrap点击滑动到指定位置方法1
/*	   	 $('#silide_home_pc>.carousel-inner>.carousel-item:eq('+i+')').addClass("carousel-item-next");
	   	 $('#content_pc>#box_top>.carousel').carousel('next');*/
	   	 //重新实现bootstrap点击滑动到指定位置方法2
	   	 $('#content_pc>#box_top>#silide_home_pc_fix_box>.carousel').carousel(i);
   });
   $("#silide_panel>.carousel-indicators>span").click(function(){
  	 
	   	 let i=Number($(this).attr("data-slide-to"));
	   	 //重新实现bootstrap点击滑动到指定位置方法1
/*	   	 $('#silide_home_pc>.carousel-inner>.carousel-item:eq('+i+')').addClass("carousel-item-next");
	   	 $('#content_pc>#box_top>.carousel').carousel('next');*/
	   	 //重新实现bootstrap点击滑动到指定位置方法2
	   	 $('#silide_panel.carousel').carousel(i);
 });
   $(function () {            
            $(window).bind("scroll", function () {
                let sTop = parseInt($(window).scrollTop());
				let ss=$('#box_msg_pc').height()-$('#silide_home_pc').height();
				//标题栏
				if(sTop>=60){
					$("#header_pc").fadeOut(500);
					$("#nav_bar").fadeIn(500);
					$("#nav_bar").css({"position":"fixed","left":"0","top":"0","right":"0","z-index":"999999"});
					$("#box_top").css({"padding-top":"6%"});
				}else{
					$("#nav_bar").fadeOut(500);
					$("#header_pc").fadeIn(500);
					$("#nav_bar").css({"display":"none","position":"relative"});
					$("#box_top").css({"padding-top":"0"});
				}
				//产品概述
				if(sTop>$.getTop($(".box_content_container"))&&sTop<$.getTop($(".box_content_msg"))){
					$("#nav_bar>#nav_inner>#inner_right>a:eq(0)").addClass('active');
				}else{
					$("#nav_bar>#nav_inner>#inner_right>a:eq(0)").removeClass('active');
				}
				//规格参数
				if(sTop>$.getTop($(".box_content_msg"))){
					$("#nav_bar>#nav_inner>#inner_right>a:eq(1)").addClass('active');
				}else{
					$("#nav_bar>#nav_inner>#inner_right>a:eq(1)").removeClass('active');
				}
				//图片轮播
                if (sTop >= 60&&sTop<=ss) {
					$("#silide_home_pc_fix_box").css({"position":"fixed","width":"32%","margin-top":"-5%"});
                }else if(sTop>ss){
					$("#silide_home_pc_fix_box").css({"position":"absolute","width":"40%","margin-top":ss+"px"});
				}else {
					$("#silide_home_pc_fix_box").css({"position":"relative","width":"40%","margin-top":"0"});
                } 
            });
	});
   $('#silide_home_pc>.carousel-inner')[0].addEventListener('mousedown', function(event){
	   $.start($(this),event);
   });
   $("#btn_action>div:eq(1)").click(function(){
	   reqprice=$("#price_pc").html();
		if($("#choose_rom>.active").html()!=undefined){
			reqtype=$("#choose_rom>.active").html().replace(/<.*/g, "").replace("+","%2B");
		}else{
			reqtype="";
		}
		reqcolor=$("#choose_color>.active").html();
		reqnum=$("#add_cut_pc>input").val();
	   $.ajax({
			url : "AddToCar",
			dataType : "jsonp",
			async : true,
			data : "id="+reqid+"&name="+reqname+"&img="+reqimg+"&price="+reqprice+"&type="+reqtype+"&color="+reqcolor+"&num="+reqnum,
			type : "POST",
			success : function(data) {
				let num=Number(reqnum)+Number(parseInt($("#car>#span-car").html().match(/\d+/ig)));
				console.log(num);
				if(isNaN(num)){
					num=reqnum;
				}
				$("#car>#span-car").html("购物车("+num+")");
				$("#add_cut_pc>input").val(1);
				$("#add_pc").addClass("active");	
				$.checknum();
				$("#count>span>span").html($.updatetitle_pc());
				if(reqtype==""){
					reqtype=reqtype;
				}else{
					reqtype=reqtype+" "
				}
				layer.tips('已成功将 '+reqname+' '+reqtype.replace("%2B","+")+reqcolor+'×'+reqnum+' 添加到购物车', '#btn_action>div:eq(1)', {
					  tips: [1, '#3595CC'],
					  time: 4000
				});
			},
			error : function() {
				//请求出错处理 
				console.log("请求异常");
			}
		});
   });
    $(".pick-area").pickArea();
    $("#count>span>span").html($.updatetitle_pc());
    let ipt = $('#number');
    ipt.on('keyup',function(){
        if(! /^\d+$/.test(this.value)){
            this.value='';
        }
    })
    $('#nav_bar>#nav_inner>#inner_right>a').click(function(){
    	 if($(this).index()==0){
        	 $.scrollTo($(".box_content_container"),1500);
    	 }else if($(this).index()==2){
    		 $.scrollTo($(".box_content_msg"),1500);
    	 }
    });
    $("#nav_bar>#nav_inner>span").click(function(){
    	 $.scrollTo(null,1500);
    });
	(function(){
		let $containers = $('[data-animation]:not([data-animation-child]), [data-animation-container]');
		$containers.scrollAnimations();
	}());
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
	$("#btn_action>div:eq(0)").click(function(){
	    reqprice=$("#price_pc").html();
		if($("#choose_rom>.active").html()!=undefined){
				reqtype=$("#choose_rom>.active").html().replace(/<.*/g, "").replace("+","%2B");
		}else{
				reqtype="";
		}
		reqcolor=$("#choose_color>.active").html();
		reqnum=$("#add_cut_pc>input").val();
		if($.islogin()==true){
			let userid=$.cookie('userid');
			let index=layer.confirm('请确认您的订单:'+'<br/>商品信息：'+$("#count>span>span").html()+'<br/>付款金额：'+$("#count>h2>span").html(), {
				  btn: ['确认','取消'] //按钮
				}, function(){
					$.ajax({
						url : "TakeOrder",
						dataType : "jsonp",
						async : true,
						data : "userid="+userid+"&id="+reqid+"&name="+reqname+"&img="+reqimg+"&price="+reqprice+"&type="+reqtype+"&color="+reqcolor+"&num="+reqnum,
						type : "POST",
						success : function(data) {
							if(data.result=="success"){
							    layer.close(index);
							    window.location.replace("order");
							}else{
								layer.msg('交易出错了');
							}
						},
						error : function() {
							//请求出错处理 
							console.log("请求异常");
						}
					});
				}, function(){
				   layer.close(index);
				});
			$(".layui-layer-title").html("DreamFly手机商城——订单确认"); 
		}else{
			let confirm=layer.confirm('您还没有登录,请登录后购买', {
				  title:'登录确认',
				  btn: ['好的','再看看'] //按钮
				}, function(){
					layer.close(confirm);
					let par=layer.open({
						  type: 2,
						  area: ['750px', '558px'],
						  fixed: false, 
						  maxmin: false,
						  title:'DreamFly手机商城——登录',
						  content: ['userlogin','no'],
						  success:function(layero, index){
							  var body = layer.getChildFrame("body",index);
							  console.log(body.find(".parent"));
							  body.find(".parent").css("border-radius","0");
							  body.find(".footer").css("display","none");
							  body.find("#btn,.btn_qq,.btn_alipay,.btn_weibo").click(function(){
								  let inter=setInterval(function() {
										 if($.islogin()==true){
											 layer.close(par);
											 $.checklogin();
											 clearInterval(inter);
										 }
								  }, 1000);
							  });
						  }
						});
				}, function(){
				  layer.close(confirm);
				});
		}
	});
	 $("#logined").mouseenter(function(){
		 layer.tips('个人中心设置在手机端哦!', '#logined', {
				  tips: [4, '#3595CC'],
		 });
     });
	 $("#logined").mouseleave(function(){
		 layer.closeAll('tips'); 
     });
});
let startX=0;
(function($){
	let s_top=0;
	$.extend({
		getParam:function(paramName){
		    paramValue = "", isFound = !1; 
		    if (window.location.search.indexOf("?") == 0 && window.location.search.indexOf("=") > 1) { 
		        arrSource = unescape(window.location.search).substring(1, window.location.search.length).split("&"), i = 0; 
		        while (i < arrSource.length && !isFound) arrSource[i].indexOf("=") > 0 && arrSource[i].split("=")[0].toLowerCase() == paramName.toLowerCase() && (paramValue = arrSource[i].split("=")[1], isFound = !0), i++ 
		    } 
		    return paramValue == "" && (paramValue = null), paramValue;
		},
		loadhtml:function(link_name){
			$.ajax({
				url : "Getgoodsmsg",
				dataType : "jsonp",
				async : false,
				data : "link_name="+link_name,
				type : "POST",
				success : function(data) {
					let result = data.result;
					if (result == "success") {
						$("title").html("DreamFly手机商城-"+data.name);
						$("#content_pc>#nav_bar>#nav_inner>span").html(data.name);
						$("#box_msg_pc>#box_msg_pc_title").html(data.name);
						$("#content_mobile>#center>h2:eq(0)").html(data.name);
						$("#box_msg_pc>span>#des_tip").html($.getfont(data.describe));
						$("#box_msg_pc>span:eq(0)").append(data.describe.replace($.getfont(data.describe), ""));
						$("#content_mobile>#center>span>#des_tip").html($.getfont(data.describe));
						$("#content_mobile>#center>span:eq(0)").append(data.describe.replace($.getfont(data.describe), ""));
						reqid=data.id;
						reqname=data.name;
						reqimg=data.carousel[0];
						let carousel_html="";
						let carousel_indicators_html="";
						let carousel_indicators_moblie="";
						let choose_color_html="";
						let choose_color_mobile="";
						let choose_rom_html="";
						let choose_rom_mobile="";
						let describe_img="";
						let tbody_html="";
						//图片轮播
						for(let i=0;i<data.carousel.length;i++){
							carousel_indicators_html+='<img data-target="#silide_home_pc"  data-slide-to="'+i+'"';
							if(i==0){
								carousel_indicators_moblie+='<li data-target="#silide_home" data-slide-to="0" class="active"></li>';
								carousel_html+='<div class="carousel-item active">';
								carousel_indicators_html+=' class="active" ';
							}else{
								carousel_html+='<div class="carousel-item">';
								carousel_indicators_moblie+='<li data-target="#silide_home" data-slide-to="'+i+'"></li>';
							}
							carousel_html+='<img src="'+data.carousel[i]+'"></div>';
							carousel_indicators_html+='src="'+data.carousel[i]+'">';
						}
						$("#silide_home_pc>.carousel-inner").html(carousel_html);
						$("#content_mobile>#silide_home>.carousel-inner").html(carousel_html);
						$("#content_mobile>#silide_home>.carousel-indicators").html(carousel_indicators_moblie);
						$("#silide_home_pc>.carousel-indicators").html(carousel_indicators_html);
						$(".pop-product>.pop-product-top>.pop-product-msg>img").attr('src',data.carousel[0]);
						//颜色
						for(let i=0;i<data.detail.color.length;i++){
							if(i==0){
								choose_color_html+='<div class="active">'+data.detail.color[i]+'</div>';
								choose_color_mobile+='<div class="check"><p class="active">'+data.detail.color[i]+'</p></div>';
							}else{
								choose_color_html+='<div>'+data.detail.color[i]+'</div>';
								choose_color_mobile+='<div><p>'+data.detail.color[i]+'</p></div>';
							}
						}
						$("#box_msg_pc>#choose_color").append(choose_color_html);
						$('#scoll_content>#group:eq(1)').html(choose_color_mobile);
						//版本
						if(data.detail.type!=undefined){
							for(let i=0;i<data.detail.type.length;i++){
								if(i==0){
									choose_rom_html+='<div class="active">'+data.detail.type[i].rom+'<span>'+data.detail.type[i].price+'</span></div>';
									choose_rom_mobile+='<div class="check"><p class="active">'+data.detail.type[i].rom+'<span>￥'+data.detail.type[i].price+'</span></p></div>';
								}else{
									choose_rom_html+='<div>'+data.detail.type[i].rom+'<span>'+data.detail.type[i].price+'</span></div>';
									choose_rom_mobile+='<div><p>'+data.detail.type[i].rom+'<span>￥'+data.detail.type[i].price+'</span></p></div>';
								}
							}
							$("#box_msg_pc>#choose_rom").append(choose_rom_html);
							$('#scoll_content>#group:eq(0)').html(choose_rom_mobile);
						}else{
							$("#box_msg_pc>#choose_rom").css("display","none");
							$('#scoll_content>#group:eq(0)').css("display","none");
							$('#scoll_content>#title:eq(0)').css("display","none");
							useprice=data.detail.price;
						}
						//详情
						for(let i=0;i<data.describe_imgs.length-1;i++){
							describe_img+='<img src="'+data.describe_imgs[i]+'" data-animation-child data-animation="fadeIn" data-animation-delay="'+200*(i+1)+'ms">';
						}
						$("#box_content>#box_content_img").html(describe_img);
						$("#silide_panel>.carousel-inner>.carousel-item>#img_div").html(describe_img);
						//参数
						for(let i=0;i<data.paralist.length;i++){
							if(data.paralist[i].msg0!=undefined){
								tbody_html+='<tr><th>'+data.paralist[i].title+'</th><td>'+'<h2>'+data.paralist[i].msg0.toString().replace(/\n/g, "<br/>")+'</h2><br/>'+data.paralist[i].msg1.toString().replace(/\n/g, "<br/>")+'</td></tr>';
							}else{
								tbody_html+='<tr><th>'+data.paralist[i].title+'</th><td>'+data.paralist[i].msg1.toString().replace(/\n/g, "<br/>")+'</td></tr>';
							}
						}
						$("#box_content>#content_msg>table>tbody").html(tbody_html);
						$("#silide_panel>.carousel-inner>.carousel-item>#msg_div>table>tbody").html(tbody_html);
					} else {
						if($.IsPC()==false){
							$("#center").css("display","none");
							layer.open({
							    content: '您访问的商品不存在或已下架'
							    ,btn: '确定'
							});
							$(".layui-layer-title").html("DreamFly手机商城"); 
							$(".layui-layer-btn0,.layui-layer-close1").click(function(){
						    	window.location.replace("m.home");
							});
						}else{
							$("#blank").css("display","block");
							$("#content_pc").css("display","none");
							$(".footer_pc").css("position","absolute");
						}
					}
				},
				error : function() {
					//请求出错处理 
					console.log("请求异常");
				}
			});
		},
		loadcss : function() {
			let flag = $.IsPC();
			if (flag == true) {
				if($('link[href="css/goods_mobile.css"]')[0]!=undefined){
					$('link[href="css/goods_mobile.css"]')[0].setAttribute("href", "css/goods_pc.css");
				}
				$('html,body').animate({scrollTop: 61},500);
				 var stateObject = {};    
			 	 var title = $("title").html();     
			  	 var newUrl = 'item?product='+parm;    
				 history.pushState(stateObject, title, newUrl);
			} else {
				if($('link[href="css/goods_pc.css"]')[0]!=undefined){
					$('link[href="css/goods_pc.css"]')[0].setAttribute("href", "css/goods_mobile.css");
				}
				 var stateObject = {};    
			 	 var title = $("title").html();     
			  	 var newUrl = 'm.item?product='+parm;    
				 history.pushState(stateObject, title, newUrl);
			}
		},
		copylink:function(){
			$("#copy_text").html(window.location.href);
			let clipboard = new ClipboardJS('.btn_copy');
			clipboard.on('success', function(e) {
			    console.info('Action:', e.action);
			    console.info('Text:', e.text);
			    console.info('Trigger:', e.trigger);
			    $("#copy_text").html('');
			    e.clearSelection();
			    $('.pop-content>span').css('margin-left',"0");
			    $('.pop-content>span').html("复制成功");
			    $('.share_btn').html("确定");
			});
			clipboard.on('error', function(e) {
			    console.error('Action:', e.action);
			    console.error('Trigger:', e.trigger);
			});
		},
		share:function(){
		    $('.pop-content>span').html("&#xe60c;&nbsp;&nbsp;复制链接");
		    $('.pop-content>span').css('margin-left',"-20px");
		    $('.share_btn').html("取消");
			$(".pop").addClass("modal-active");	
			if($(".sharebg").length>0){
				$(".sharebg").addClass("sharebg-active");
			}else{
				$("body").append('<div class="sharebg"></div>');
				$(".sharebg").addClass("sharebg-active");
			}
			$(".sharebg-active,.share_btn").click(function(){
				$(".pop").removeClass("modal-active");	
				setTimeout(function(){
					$(".sharebg-active").removeClass("sharebg-active");	
					$(".sharebg").remove();	
				},300);
			});
		},
		showchoice:function(){
			if(Number($("#num_show").text())==1){
				$("#cut").removeClass("active");
			}
			$("#type_price>#name").html($.updatetitle());
			$(".pop-product").addClass("modal-active");	
			if($(".sharebg").length>0){
				$(".sharebg").addClass("sharebg-active");
			}else{
				$("body").append('<div class="sharebg"></div>');
				$(".sharebg").addClass("sharebg-active");
			}
			$(".sharebg-active,.pop-product-top>.iconfont").click(function(){
				$(".pop-product").removeClass("modal-active");	
				setTimeout(function(){
					$("#poduct_choose").val($.updatetitle());
					$(".sharebg-active").removeClass("sharebg-active");	
					$(".sharebg").remove();	
				},300);
			});
			$(".pop-product>#addtocar>input").click(function(){
				let number=Number($('#num_show').text())+Number($(".fix_bottom>#fix_bottom_inner>#car>#car_num").text());
				reqprice=$("#type_price>#price").html();
				if($(".type>.check>.active").html()!=undefined){
					reqtype=$(".type>.check>.active").html().replace(/<.*/g, "").replace("+","%2B");
				}else{
					reqtype="";
				}
				reqcolor=$(".color>.check>.active").html();
				reqnum=$("#add_cut>#num_show").html();
				if(time==0){
					$.ajax({
						url : "AddToCar",
						dataType : "jsonp",
						async : true,
						data : "id="+reqid+"&name="+reqname+"&img="+reqimg+"&price="+reqprice+"&type="+reqtype+"&color="+reqcolor+"&num="+reqnum,
						type : "POST",
						success : function(data) {
							layer.open({
							    content: '已成功将 '+reqname+' '+reqtype.replace("%2B","+")+reqcolor+'×'+reqnum+' 添加到购物车'
							    ,skin: 'msg'
							    ,time: 2000
						    });
							$(".layui-layer-title").html("DreamFly手机商城"); 
							$('#num_show').html("1");
							$("#add").addClass("active");
							$.checknum();
							$(".fix_bottom>#fix_bottom_inner>#car>#car_num").html(number);
							$(".fix_bottom>#fix_bottom_inner>#car>#car_num").css("display","inline");
							setTimeout(function(){
								$(".pop-product").removeClass("modal-active");	
								$("#poduct_choose").val($.updatetitle());
								$(".sharebg-active").removeClass("sharebg-active");	
								$(".sharebg").remove();	
								time=0;
							},300);
						},
						error : function() {
							//请求出错处理 
							console.log("请求异常");
						}
					});
					time++;
				}
			});
		},
		bodyScroll:function (e){  
            if (e.cancelable) {
                if (!e.defaultPrevented) {
                    e.preventDefault();
                }
            }
		},
		unScroll:function(){
		    document.body.addEventListener('touchmove',$.bodyScroll,{ passive: false });  
		},
		scroll:function (){
		    document.body.removeEventListener('touchmove',$.bodyScroll,{ passive: false });   
		},
		cut:function(){
			$("#add").addClass("active");
			let now=$("#num_show").html();
			if(now>1){
				now--;
				$("#num_show").html(now);
				if(now==1){
					$("#cut").removeClass("active");
				}
			}else{
				$("#cut").removeClass("active");
			}
        	$("#type_price>#name").html($.updatetitle());
		},
		add:function(){
			$("#cut").addClass("active");
			let now=$("#num_show").html();
			if(now<20){
				let now=$("#num_show").html();
				now++;
				$("#num_show").html(now);
				if(now==20){
					$("#add").removeClass("active");
				}
			}else{
				$("#add").removeClass("active");
			}
        	$("#type_price>#name").html($.updatetitle());
		},
		updatetitle:function(){
	       	let title=$('title').text().replace("DreamFly手机商城-", "");
        	let name="";
        	for(i=0;i<$(".check>.active").length;i++){
        		name+=" "+$(".check>.active")[i].innerText.replace(/￥.*/, "");
        	}
        	if(useprice==""){
            	$("#type_price>#price").html($(".check>.active>span").html());
            	$("#center>#price").html($(".check>.active>span").html());
        	}else{
        		$("#type_price>#price").html("￥"+useprice);
            	$("#center>#price").html("￥"+useprice);
        	}
        	return title+name+'×'+$('#num_show').text();
		},
		updatetitle_pc:function(){
			let title=$('title').text().replace("DreamFly手机商城-", "");
        	let name="";
        	for(i=0;i<$('div[id^="choose"]>.active').length;i++){
        		name+=" "+$('div[id^="choose"]>.active')[i].innerText;
        	}
        	$("#count>h2>span").html($.updateprice());
        	$("#box_msg_pc>#price_pc").html($.updatetitleprice());
        	return title+name+'×'+$('#num_show_pc').val().replace(/￥.*/,"");
		},
		openbaidu:function(){
			window.open("https://www.baidu.com/s?ie=utf-8&wd="+$("#city").html(), "_blank"); 
		},
		start:function(ele,e){
			e.preventDefault();
			startX=e.clientX;
			ele[0].addEventListener('mouseup',function(e){
				$.release(e);
			});
		},
		release:function(e){
			let nowX=e.clientX;
			let X=startX-nowX;
			if(X<-50){
				 $('#content_pc>#box_top>#silide_home_pc_fix_box>.carousel').carousel('prev');
			}else if(X>50){
				 $('#content_pc>#box_top>#silide_home_pc_fix_box>.carousel').carousel('next');
			}
		},
		cut_pc:function(){
			$("#add_pc").addClass("active");
			let now=$("#num_show_pc").val();
			if(now>1){
				now--;
				$("#num_show_pc").val(now);
				if(now==1){
					$("#cut_pc").removeClass("active");
				}
			}
			$("#count>span>span").html($.updatetitle_pc());
		},
		add_pc:function(){
			$("#cut_pc").addClass("active");
			let now=$("#num_show_pc").val();
			if(now<20){
				now++;
				$("#num_show_pc").val(now);
				if(now==20){
					$("#add_pc").removeClass("active");
				}
			}
			$("#count>span>span").html($.updatetitle_pc());
		},
		checknum:function(e){
			$("#num_show_pc").val($("#num_show_pc").val().replace(/\D/g,''));
			let now=$("#num_show_pc").val();
			$("#add_pc").addClass("active");
			$("#cut_pc").addClass("active");
			if(now>20||now<1){
				if(now>20){
					$("#num_show_pc").val(20);
					$("#add_pc").removeClass("active");
				}else{
					$("#num_show_pc").val(1);
					$("#cut_pc").removeClass("active");
				}
			}else if(now==20){
				$("#add_pc").removeClass("active");
			}else if(now==1){
				$("#cut_pc").removeClass("active");
			}
			$("#count>span>span").html($.updatetitle_pc());
		},
		updateprice:function(){
			let price;
			let num=$("#num_show_pc").val();
			if(useprice==""){
				price=$('div[id^="choose"]>.active>span').html().replace("￥", "").replace(/<.*/, "");
			}else{
				price=useprice;
			}
			return "￥"+price*num;
		},	
		updatetitleprice:function(){
			let price;
			if(useprice==""){
				price="￥"+$('div[id^="choose"]>.active>span').html();
			}else{
				price="￥"+useprice;
			}
			return price;
		},
		scrollTo:function(element,speed) {
		    if(!speed){
		      speed = 300;
		    }
		    if(!element){
		      $("html,body").animate({scrollTop:61},speed);
		    }else{
		      if(element.length>0){
		        $("html,body").animate({scrollTop:$(element).offset().top-50},speed);
		      }
		    }
	    },
	    getTop:function(element){
	    	return $(element).offset().top-100;
	    },
	    getfont:function(text){
	    	let r=/「(.*?)」/g;
	    	let result="";
	    	try{
		    	return r.exec(text)[0];
	    	}catch(err){
	    		return "";
	    	}
	    },
	    back:function(){
	    	window.location.href="m.home";
	    },
	    back1:function(){
	    	window.location.href="home";
	    },
	    buy:function(){
			let number=Number($('#num_show').text())+Number($(".fix_bottom>#fix_bottom_inner>#car>#car_num").text());
			reqprice=$("#type_price>#price").html();
			if($(".type>.check>.active").html()!=undefined){
				reqtype=$(".type>.check>.active").html().replace(/<.*/g, "").replace("+","%2B");
			}else{
				reqtype="";
			}
			reqcolor=$(".color>.check>.active").html();
			reqnum=$("#add_cut>#num_show").html();
			if($.islogin()==true){
				let userid=$.cookie('userid');
				let index=layer.confirm('请确认您的订单:'+'<br/>商品信息：'+$("#product-type>input").val()+'<br/>付款金额：'+"￥"+(Number(reqprice.replace("￥",""))*Number(reqnum)), {
					  btn: ['确认','取消'] //按钮
					}, function(){
						if(ttt==0){
							$.ajax({
								url : "TakeOrder",
								dataType : "jsonp",
								async : true,
								data : "userid="+userid+"&id="+reqid+"&name="+reqname+"&img="+reqimg+"&price="+reqprice+"&type="+reqtype+"&color="+reqcolor+"&num="+reqnum,
								type : "POST",
								success : function(data) {
								    layer.close(index);
								    window.location.replace("m.order");
								},
								error : function() {
									//请求出错处理 
									console.log("请求异常");
								}
							});
							ttt++;
						}
					}, function(){
						   layer.close(index);
						});
					$(".layui-layer-title").html("DreamFly手机商城——订单确认"); 
				}else{
					let index=layer.confirm('您还没有登录，请登录后购买', {
						  btn: ['确认','取消'] //按钮
						}, function(){
							window.location.replace("m.userlogin");
						}, function(){
						   layer.close(index);
						});
					$(".layui-layer-title").html("DreamFly手机商城"); 
				}
	      }
	});
})(jQuery);