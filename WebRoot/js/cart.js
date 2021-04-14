let checktype=0;
(function($){
	$.extend({
		loadcar:function(){
			$.ajax({
				url : "ShowCar",
				dataType : "jsonp",
				async : true,
				type : "POST",
				success : function(data) {
					if(data.result=="success"){
						let num=0;
						let html="";
						let html_pc="";
						for(let i=data.data.length-1;i>=0;i--){
							let price =data.data[i].price;
							num+=Number(data.data[i].num);
							html+='<li id="cart_item"><span class="iconfont">&#xe614;</span><img src="'+data.data[i].img+'"><div id="detail"><p id="'+data.data[i].id+'" class="'+encodeURI(data.data[i].type+","+data.data[i].color)+'">'+data.data[i].name+'</p><p>'+data.data[i].type+' '+data.data[i].color+'</p><p>'+data.data[i].price+'</p><div><div class="iconfont"id="cut">&#xe612;</div><div id="num_a">'+data.data[i].num+'</div><div class="iconfont active"id="add">&#xe610;</div></div><p id="num_b">×'+data.data[i].num+'</p></div></li>';
							price=price.replace("￥", "");
							html_pc+='<li id="cart_item_pc"><span class="iconfont">&#xe617;</span><span><img src="'+data.data[i].img+'"></span><span id="'+data.data[i].id+'" class="'+encodeURI(data.data[i].type+","+data.data[i].color+","+data.data[i].name)+'">'+data.data[i].name+' '+data.data[i].type+' '+data.data[i].color+'</span><span>'+data.data[i].price+'</span><div><div id="add_cut_pc"><div class="iconfont"id="cut_pc">&#xe612;</div><div id="num_pc">'+data.data[i].num+'</div><div class="iconfont active"id="add_pc">&#xe610;</div></div></div><span id="price_pc">￥'+(Number(price)*Number(data.data[i].num)).toFixed(2)+'</span><span class="iconfont" id="delete"><i>&#xe616;</i></span></li>';
						}
						$("#cart_list").html(html);
						$("#cart_list_pc").html(html_pc);
						$("#car>#car_num").html(num);
						$("#car>#car_num").css("display","inline");
						$("#car>#span-car").html($("#car>#span-car").html()+"("+num+")");
						//PC
						$("#blank").css("display","none");
						$("#content_pc").css("display","block");
						
					}else{
						$("#car>#car_num").html(0);
						$("#car>#car_num").css("display","none");
						$("#car>#span-car").html("购物车");
						//PC
						$("#blank").css("display","flex");
						$("#content_pc").css("display","none");
					}
					$.init();
					if($.IsPC()==false){
						$.checkifcarempty();
					}
					$.checkbottom();
				},
				error : function() {
					//请求出错处理 
					console.log("请求异常");
					$.init();
				}
			});
		},
		loadcss: function () {
			let flag = $.IsPC();
			if (flag == true) {
				if($('link[href="https://cdn.jsdelivr.net/gh/dfvips/shop/WebRoot/css/cart_mobile.css"]')[0]!=undefined){
					$('link[href="https://cdn.jsdelivr.net/gh/dfvips/shop/WebRoot/css/cart_mobile.css"]')[0].setAttribute("href", "https://cdn.jsdelivr.net/gh/dfvips/shop/WebRoot/css/cart_pc.css");
				}
				$('html,body').animate({scrollTop: 61},500);
				 var stateObject = {};    
			 	 var title = $("title").html();     
			  	 var newUrl = 'cart';    
				 history.pushState(stateObject, title, newUrl);
			} else {
				if($('link[href="https://cdn.jsdelivr.net/gh/dfvips/shop/WebRoot/css/cart_pc.css"]')[0]!=undefined){
					$('link[href="https://cdn.jsdelivr.net/gh/dfvips/shop/WebRoot/css/cart_pc.css"]')[0].setAttribute("href", "https://cdn.jsdelivr.net/gh/dfvips/shop/WebRoot/css/cart_mobile.css");
				}
				 var stateObject = {};    
			 	 var title = $("title").html();     
			  	 var newUrl = 'm.cart';    
				 history.pushState(stateObject, title, newUrl);
			}
		},
		checkchange:function(ele){
			if(ele.attr("id")=="check"){
				ele.html("&#xe614;");
				ele.removeAttr("id","check");
			}else{
				ele.html("&#xe613;");
				ele.attr("id","check");
			}
		},
		updatetitle: function(){
			let all=0;
			$("#cart_item>#detail>div>#num_a").each(function(){
				all+=Number($(this).text());
			});
			$("#header_mobile>#left>span").html("共"+all+"件商品");
		},
		checklogin:function(){
			if($.islogin()){
				$("#nav_tip").css('display','none');
				$("#content_mobile").css("top","58px");
			}else{
				$("#nav_tip").css('display','flex');
				$("#content_mobile").css("top","90px");
			}
		},
		init:function(){
			$.updatetitle();
			$.checklogin();
			$('#footer_mobile>div').click(function(){
				if($(this).attr('id')=="home"){
					window.location.replace("m.home");
				}else if($(this).attr('id')=="type"){
					window.location.replace("m.category");
				}else if($(this).attr('id')=="me"){
					window.location.replace("m.me");
				}
			});

				$("#cart_item>span").click(function(){
					$.checkchange($(this));
					if(checktype==1){
						if($("#cart_item>span#check").length>0&&$("#cart_item>span#check").length!=$("#cart_item>span").length){
							$("#right>p").html("反选");
						}else if($("#cart_item>span#check").length==$("#cart_item>span").length){
							$("#right>p").html("取消全选");
						}else{
							$("#right>p").html("全选");
						}
					}else if(checktype==0){
						$.checkifchooseall();
						$.checkprice();
					}
				});
			$("#right>p").click(function(){
				checktype=1;
				$("#btn_default_mobile").css({"transform":"translateY(58px)","transition":".6s"});
				$("#btn_action_mobile").css({"transform":"translateY(0)","transition":"1s"});
				if($(this).html()=="编辑"){
					$(this).html("全选");
					$("#cart_item>span").html("&#xe614;");
				}else if($(this).html()=="全选"){
					$("#cart_item>span").html("&#xe613;");
					$("#cart_item>span").attr("id","check");
					$(this).html("取消全选");
				}else if($(this).html()=="取消全选"){
					$("#cart_item>span").html("&#xe614;");
					$("#cart_item>span").removeAttr("id","check");
					$(this).html("全选");
				}else if($(this).html()=="反选"||$(this).html()=="取消反选"){
					$("#cart_item>span").each(function(){
						$.checkchange($(this));
				    });
					if($(this).html()=="反选"){
						$(this).html("取消反选");
					}else{
						$(this).html("反选");
					}
				}
			});
			//取消
			$("#btn_action_mobile>div:nth-child(2)").click(function(){
				checktype=0;
				$("#right>p").html("编辑");
				$("#cart_item>span").html("&#xe614;");
				$("#cart_item>span").removeAttr("id","check");
				$("#btn_action_mobile").css({"transform":"translateY(58px)","transition":".6s"});
				$("#btn_default_mobile").css({"transform":"translateY(0)","transition":"1s"});
			});
			//删除
			$("#btn_action_mobile>div:nth-child(1)").click(function(){
				let numnow=$.checkchoosenummobile();
				if(numnow>0){
				    $("a:not([href]):not([tabindex])").css("color","#1E9FFF!important");
				    let index=layer.confirm('是否确定删除？', {
					    btn: ['确定','取消'] 
					}, function(){
						let arr="{";
						let colorarr="{";
						let typearr="{";
						$("#cart_item>#detail").each(function(){
							if($(this).parent().children("span:eq(0)").attr("id")=="check"){
								arr+=$(this).children("p:eq(0)").attr("id")+","
								colorarr+=decodeURI($(this).children("p:eq(0)").attr("class").split(',')[1])+",";
								typearr+=decodeURI($(this).children("p:eq(0)").attr("class").split(',')[0])+",";
							}
						});
						arr=arr.slice(0,-1)+"}";
						colorarr=colorarr.slice(0,-1)+"}";
						typearr=typearr.slice(0,-1)+"}";
						$.ajax({
							url : "DeleteGoods",
							dataType : "jsonp",
							data : "id="+encodeURI(arr)+"&color="+encodeURI(colorarr)+"&type="+typearr.replace(/\+/g,'%2B'),
							async : true,
							type : "POST",
							success : function(data) {
								if(data.result=="success"){
									$("#cart_item>#detail").each(function(){
										if($(this).parent().children("span:eq(0)").attr("id")=="check"){
											$(this).parent()[0].remove($(this).parent()[0]);
										}
									});
								}
								$.updatetitle();
								$.checkprice();
								layer.close(index);
								layer.msg('删除成功');
								$.checkifchooseall();
								$.loadcar();
							},
							error : function() {
								//请求出错处理 
								console.log("删除异常");
							}
						});
					}, function(){
						layer.close(index);
					});
				    $(".layui-layer-title").html("DreamFly手机商城");
				    $("a:not([href]):not([tabindex])").css("color","#FFF!important");
				}else{
					layer.tips('至少选择一个您要删除的商品', '#btn_action_mobile>div:eq(0)', {
						  tips: [1, 'rgba(39, 179, 255)']
					});
				}
			});
			//下单
			$("#btn_default_mobile>div:eq(1)").click(function(){
				if($.islogin()==true){
					let numnow=$.checkchoosenummobile();
					if(numnow>0){
					    $("a:not([href]):not([tabindex])").css("color","#1E9FFF!important");
					    let paymsg="";
						$("#cart_item>#detail").each(function(){
							if($(this).parent().children("span:eq(0)").attr("id")=="check"){
								paymsg+="</br>"+$(this).children("p:eq(0)").html()+" "+decodeURI($(this).children("p:eq(0)").attr("class").split(',')[1])+" "+decodeURI($(this).children("p:eq(0)").attr("class").split(',')[0]);
							}
						});
					    let index=layer.confirm('请确认您的订单:'+'<br/>商品信息：'+paymsg+'</br>付款金额：'+$("#btn_default_mobile>div:eq(2)>span").html(), {
						    btn: ['确定','取消'],
						    area: ['80%','40%'],
						    title:'订单确认'
						}, function(){
							let arr="{";
							let colorarr="{";
							let typearr="{";
							let nameattr="{";
							let priceattr="{";
							let numattr="{";
							let imgattr="{";
							$("#cart_item>#detail").each(function(){
								if($(this).parent().children("span:eq(0)").attr("id")=="check"){
									arr+=$(this).children("p:eq(0)").attr("id")+",";
									colorarr+=decodeURI($(this).children("p:eq(0)").attr("class").split(',')[1])+",";
									typearr+=decodeURI($(this).children("p:eq(0)").attr("class").split(',')[0])+",";
									nameattr+=$(this).children("p:eq(0)").html()+",";
									priceattr+=$(this).children("p:eq(2)").html()+",";
									numattr+=$(this).children("p:eq(3)").html().replace("×","")+",";
									imgattr+=$(this).prevAll("img").attr("src")+",";
								}
							});
							arr=arr.slice(0,-1)+"}";
							colorarr=colorarr.slice(0,-1)+"}";
							typearr=typearr.slice(0,-1)+"}";
							nameattr=nameattr.slice(0,-1)+"}";
							priceattr=priceattr.slice(0,-1)+"}";
							numattr=numattr.slice(0,-1)+"}";
							imgattr=imgattr.slice(0,-1)+"}";
							let userid=$.cookie('userid');
							$.ajax({
								url : "DeleteGoods",
								dataType : "jsonp",
								data : "id="+encodeURI(arr)+"&color="+encodeURI(colorarr)+"&type="+typearr.replace(/\+/g,'%2B'),
								async : true,
								type : "POST",
								beforeSend: function(){
								     // Handle the beforeSend event
									var ind = layer.load(1, {
										  shade: [0.1,'#fff'] //0.1透明度的白色背景
									});
							    },
								success : function(data) {
									$.ajax({
										url : "TakeOrder",
										dataType : "jsonp",
										data : "userid="+userid+"&id="+arr+"&name="+nameattr+"&img="+imgattr+"&price="+priceattr+"&type="+typearr.replace(/\+/g,'%2B')+"&color="+colorarr+"&num="+numattr,
										async : true,
										type : "POST",
										beforeSend: function(){
										     // Handle the beforeSend event
											var ind = layer.load(1, {
												  shade: [0.1,'#fff'] //0.1透明度的白色背景
											});
									    },
										success : function(data) {
										    layer.close(index);
										    window.location.replace("m.order");
										},
										error : function() {
											//请求出错处理 
											console.log("操作异常");
										}
									});
								},
								error : function() {
									//请求出错处理 
									console.log("操作异常");
								}
							});
						}, function(){
							layer.close(index);
						});
					    $("a:not([href]):not([tabindex])").css("color","#FFF!important");
					}else{
						layer.tips('至少选择一个商品', '#btn_default_mobile>div:eq(1)', {
							  tips: [1, 'rgba(39, 179, 255)']
						});
					}
				}else{
					let index=layer.confirm('您还没有登录，请登录后购买', {
						  btn: ['确认','取消'],
						  title:'DreamFly手机商城'
						}, function(){
							window.location.replace("m.userlogin");
						}, function(){
						   layer.close(index);
						});
				}
			});
			$("#cart_item>#detail").each(function(){
				$(this).children("div").children("#add").click(function(){
					$(this).prevAll("#cut").addClass("active");
					let now=$(this).prevAll("#num_a").html();
					let id=$(this).parent().parent().children("p:eq(0)").attr("id");
					let color=decodeURI($(this).parent().parent().children("p:eq(0)").attr("class").split(',')[1]);
					let type=decodeURI($(this).parent().parent().children("p:eq(0)").attr("class").split(',')[0]);
					if(now<20){
						now++;
						$(this).prevAll("#num_a").html(now);
						$(this).parent().parent().children("#num_b").html("×"+now);
						if(now==20){
							$(this).removeClass("active");
						}
					}else{
							$(this).removeClass("active");
					}
					$.ajax({
						url : "AddAndCut",
						dataType : "jsonp",
						async : true,
						data : "id="+id+"&action="+"add"+"&color="+color+"&type="+type.replace(/\+/g,'%2B'),
						type : "POST",
						success : function(data) {
							let result = data.result;
							if (result== "success") {
								$.updatetitle();
								$.checkprice();
							} else {
								console.log("操作出错");
							}
						},
						error : function() {
							//请求出错处理 
							console.log("请求异常");
						}
					});
				});
				$(this).children("div").children("#cut").click(function(){
					$(this).nextAll("#add").addClass("active");
					let now=$(this).nextAll("#num_a").html();
					let id=$(this).parent().parent().children("p:eq(0)").attr("id");
					let color=decodeURI($(this).parent().parent().children("p:eq(0)").attr("class").split(',')[1]);
					let type=decodeURI($(this).parent().parent().children("p:eq(0)").attr("class").split(',')[0]);
					if(now>1){
						now--;
						$(this).nextAll("#num_a").html(now);
						$(this).parent().parent().children("#num_b").html("×"+now);
						if(now==1){
							$(this).removeClass("active");
						}
					}else{
							$(this).removeClass("active");
					}
					$.ajax({
						url : "AddAndCut",
						dataType : "jsonp",
						async : true,
						data : "id="+id+"&action="+"cut"+"&color="+color+"&type="+type.replace(/\+/g,'%2B'),
						type : "POST",
						success : function(data) {
							let result = data.result;
							if (result== "success") {
								$.updatetitle();
								$.checkprice();
							} else {
								console.log("操作出错");
							}
						},
						error : function() {
							//请求出错处理 
							console.log("请求异常");
						}
					});
				});
			});
			$("#nav_tip").click(function(){
				window.location.href="m.userlogin";
			});
			$("#btn_default_mobile>div>.iconfont").click(function(){
				if($(this).attr("id")=="check"){
					$("#cart_item>span").html("&#xe614;");
					$("#cart_item>span").removeAttr("id","check");
					$(this).html("&#xe614;");
					$(this).removeAttr("id","check");
					$.checkprice();
				}else{
					$("#cart_item>span").html("&#xe613;");
					$("#cart_item>span").attr("id","check");
					$(this).html("&#xe613;");
					$(this).attr("id","check");
					$.checkprice();
				}
			});
			$("#cart_list_pc").children("#cart_item_pc").children("div").children("#add_cut_pc").each(function(){
				$(this).children("#add_pc").click(function(){
					let now=$(this).prevAll("#num_pc").html();
					let id=$(this).parent().parent().parent().children("span:eq(2)").attr("id");
					let color=decodeURI($(this).parent().parent().parent().children("span:eq(2)").attr("class").split(',')[1]);
					let type=decodeURI($(this).parent().parent().parent().children("span:eq(2)").attr("class").split(',')[0]);
					if(now<20){
						now++;
						$(this).prevAll("#num_pc").html(now);
						if(now==20){
							$(this).removeClass("active");
						}
					}else{
						$(this).removeClass("active");
					}
					console.log(type);
					$.ajax({
						url : "AddAndCut",
						dataType : "jsonp",
						async : true,
						data : "id="+id+"&action="+"add"+"&color="+color+"&type="+type.replace(/\+/g,'%2B'),
						type : "POST",
						success : function(data) {
							let result = data.result;
							if (result== "success") {
								$.checkaddcutnum();
								$.checkallnumpc();
								$.checkallprice();
								$.checknumpricepc();
							} else {
								console.log("操作出错");
							}
						},
						error : function() {
							//请求出错处理 
							console.log("请求异常");
						}
					});
				});
				$(this).children("#cut_pc").click(function(){
					let now=$(this).nextAll("#num_pc").html();
					let id=$(this).parent().parent().parent().children("span:eq(2)").attr("id");
					let color=decodeURI($(this).parent().parent().parent().children("span:eq(2)").attr("class").split(',')[1]);
					let type=decodeURI($(this).parent().parent().parent().children("span:eq(2)").attr("class").split(',')[0]);
					if(now>1){
						now--;
						$(this).nextAll("#num_pc").html(now);
						if(now==1){
							$(this).removeClass("active");
						}
					}else{
							$(this).removeClass("active");
					}
					$.ajax({
						url : "AddAndCut",
						dataType : "jsonp",
						async : true,
						data : "id="+id+"&action="+"cut"+"&color="+color+"&type="+type.replace(/\+/g,'%2B'),
						type : "POST",
						success : function(data) {
							let result = data.result;
							if (result== "success") {
								$.checkaddcutnum();
								$.checkallnumpc();
								$.checkallprice();
								$.checknumpricepc();
							} else {
								console.log("操作出错");
							}
						},
						error : function() {
							//请求出错处理 
							console.log("请求异常");
						}
					});
				});
			});
			$("#cart_list_pc").children("#cart_item_pc").each(function(){
				$(this).children("#delete").click(function(){
					let id=$(this).parent().children("span:eq(2)").attr("id");
					let color=decodeURI($(this).parent().children("span:eq(2)").attr("class").split(',')[1]);
					let type=decodeURI($(this).parent().children("span:eq(2)").attr("class").split(',')[0]);
					$("a:not([href]):not([tabindex])").css("color","#1E9FFF!important");
					let parent=$(this).parent()[0];
				    let index=layer.confirm('是否确定删除？', {
					    btn: ['确定','取消'] 
					}, function(){
						$.ajax({
							url : "DeleteGoods",
							dataType : "jsonp",
							data : "id="+id+"&color="+color+"&type="+type.replace(/\+/g,'%2B'),
							async : true,
							type : "POST",
							success : function(data) {
								if(data.result=="success"){
									parent.remove(parent);
								}
								layer.close(index);
								layer.msg('删除成功');
								$.loadcar();
							},
							error : function() {
								//请求出错处理 
								console.log("删除异常");
							}
						});
					}, function(){
						layer.close(index);
					});
				    $(".layui-layer-title").html("DreamFly手机商城");
				    $("a:not([href]):not([tabindex])").css("color","#FFF!important");
				});
			});
			$("#cart_list_pc").children("#cart_item_pc").each(function(){
				$(this).children(".iconfont:eq(0)").click(function(){
					$.checkchangpc($(this));
					$.checkifchooseallpc();
				});
			});
			$("#item_title>.iconfont:eq(0)").click(function(){
				$.chooseallpc($(this));
			});
			$("#cart_list>#cart_item").each(function(){
				$(this).children("img").click(function(){
					window.location.href="m.item?product="+$(this).parent().children("div").children("p:eq(0)").attr("id");
				});
			});
			$("#cart_list_pc>#cart_item_pc").each(function(){
				$(this).children("span").children("img").click(function(){
					window.location.href="item?product="+$(this).parent().parent().children("span:eq(2)").attr("id");
				});
			});
			$("#count_pay>div").click(function(){
				let length=$("#cart_list_pc").children("#cart_item_pc").children("#check").length;
				if(length>0){
					if($.islogin()==true){				
							let arr="{";
							let colorarr="{";
							let typearr="{";
							let nameattr="{";
							let priceattr="{";
							let numattr="{";
							let imgattr="{";
							let paymsg="";
						   $("#cart_list_pc").children("#cart_item_pc").each(function(){
							   if($(this).children(".iconfont:eq(0)").attr("id")=="check"){
								   arr+=$(this).children("span:eq(2)").attr("id")+",";
								   numattr+=$(this).children("div").children("div").children("#num_pc").html()+",";
								   priceattr+=$(this).children("span:eq(3)").html()+",";
								   imgattr+=$(this).children("span:eq(1)").children("img").attr("src")+",";
								   colorarr+=decodeURI($(this).children("span:eq(2)").attr("class").split(',')[1])+",";
								   typearr+=decodeURI($(this).children("span:eq(2)").attr("class").split(',')[0])+",";
								   nameattr+=decodeURI($(this).children("span:eq(2)").attr("class").split(',')[2])+",";
								   paymsg+="</br>"+$(this).children("span:eq(2)").html()+"×"+$(this).children("div").children("div").children("#num_pc").html();
							   }
						   });	
							arr=arr.slice(0,-1)+"}";
							colorarr=colorarr.slice(0,-1)+"}";
							typearr=typearr.slice(0,-1)+"}";
							nameattr=nameattr.slice(0,-1)+"}";
							priceattr=priceattr.slice(0,-1)+"}";
							numattr=numattr.slice(0,-1)+"}";
							imgattr=imgattr.slice(0,-1)+"}";
							
							let index=layer.confirm('请确认您的订单:'+'<br/>商品信息：'+paymsg+'</br>付款金额：'+$("#count_pay>span>span:eq(2)").html(), {
								  btn: ['确认','取消'],
								  area: ['400px','260px'],
							      title:'DreamFly手机商城——订单确认'
								}, function(){
									let userid=$.cookie('userid');
									$.ajax({
										url : "DeleteGoods",
										dataType : "jsonp",
										data : "id="+arr+"&color="+colorarr+"&type="+typearr.replace(/\+/g,'%2B'),
										async : true,
										type : "POST",
										beforeSend: function(){
										     // Handle the beforeSend event
											var ind = layer.load(1, {
												  shade: [0.1,'#fff'] //0.1透明度的白色背景
											});
									    },
										success : function(data) {
											$.ajax({
												url : "TakeOrder",
												dataType : "jsonp",
												data : "userid="+userid+"&id="+arr+"&name="+nameattr+"&img="+imgattr+"&price="+priceattr+"&type="+typearr.replace(/\+/g,'%2B')+"&color="+colorarr+"&num="+numattr,
												async : true,
												type : "POST",
												beforeSend: function(){
												     // Handle the beforeSend event
													var ind = layer.load(1, {
														  shade: [0.1,'#fff'] //0.1透明度的白色背景
													});
											    },
												success : function(data) {
		/*										    layer.close(index);*/
												    window.location.replace("order");
												},
												error : function() {
													//请求出错处理 
													console.log("操作异常");
												}
											});
										},
										error : function() {
											//请求出错处理 
											console.log("操作异常");
										}
									});
								}, function(){
									layer.close(index);
								});							
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
														 $.checkiflogin();
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
				}else{
					layer.msg('请至少选择一个商品');
				}
			});
			$.checknum();
			$.checkaddcutnum();
			$.checkallnumpc();
			$.checknumpricepc();
		},
		checknum:function(){
			$("#cart_item>#detail").each(function(){
				$(this).children("div").children("#cut").addClass("active");
				$(this).children("div").children("#add").addClass("active");
				let num=$(this).children("div").children("#num_a").text();
				if(num==1){
					$(this).children("div").children("#cut").removeClass("active");
				}else if(num==20){
					$(this).children("div").children("#add").removeClass("active");
				}
			});
		},
		checkprice:function(){
			let all=0;
			let priceall=0;
			$("#cart_item>#detail").each(function(){
				if($(this).parent().children("span:eq(0)").attr("id")=="check"){
					priceall+=Number($(this).children("p:eq(2)").html().replace("￥", ""))*Number($(this).children("p:eq(3)").html().replace("×", ""));
					all+=Number($(this).children("p:eq(3)").html().replace("×", ""));
				}
			});
			$("#btn_default_mobile>div:eq(2)>span").html("￥"+priceall.toFixed(2));
			$("#btn_default_mobile>div:eq(1)").html("购买("+all+")")
		},
		checkifchooseall:function(){
			if($("#cart_item>span").length==0){
				$("#btn_default_mobile>div>.iconfont").html("&#xe614;");
				$("#btn_default_mobile>div>.iconfont").removeAttr("id","check");
			}else{
				if($("#cart_item>span#check").length==$("#cart_item>span").length){
					$("#cart_item>span").html("&#xe613;");
					$("#cart_item>span").attr("id","check");
					$("#btn_default_mobile>div>.iconfont").html("&#xe613;");
					$("#btn_default_mobile>div>.iconfont").attr("id","check");
				}else{
					$("#btn_default_mobile>div>.iconfont").html("&#xe614;");
					$("#btn_default_mobile>div>.iconfont").removeAttr("id","check");
				}
			}
		},
		checkifcarempty:function(){
			if($("#cart_item>span").length==0){
				layer.alert('您的购物车空空如也,去逛逛吧!', {
					  icon: 5,
					  skin: 'layer-ext-moon'
				},function(){
					  window.location.replace("m.home");
				})
				$(".layui-layer-setwin").click(function(){
					window.location.replace("m.home");
				});
				$(".layui-layer-title").html("DreamFly手机商城");
			}
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
			window.location.href="home";
		},
		checkbottom:function(){
			if($("body")[0].scrollHeight>$("body")[0].offsetHeight){
				$("#body_pc>.footer").css("position","relative");
			}else{
				$("#body_pc>.footer").css("position","absolute");
			}
	   },
	   checkaddcutnum:function(){
		   $("#cart_list_pc").children("#cart_item_pc").children("div").children("#add_cut_pc").each(function(){
			   $(this).children("#add_pc").addClass("active");
			   $(this).children("#cut_pc").addClass("active");
			   if($(this).children("#num_pc").html()==1){
				   $(this).children("#cut_pc").removeClass("active");
			   }
			   if($(this).children("#num_pc").html()==20){
				   $(this).children("#add_pc").removeClass("active");
			   }
			   
		   });
	   },
	   checkallnumpc:function(){
		   let all=0;
		   $("#cart_list_pc").children("#cart_item_pc").children("div").children("#add_cut_pc").each(function(){
			   all+=Number($(this).children("#num_pc").html());
		   });
		   $("#count_pay>span>span:eq(0)").html(all);
	   },
	   checkallprice:function(){
		   $("#cart_list_pc").children("#cart_item_pc").each(function(){
			   let price=$(this).children("span:eq(3)").html();
			   price=price.replace("￥","");
			   price=Number(price);
			   let num=Number($(this).children("div").children("#add_cut_pc").children("#num_pc").html());
			   let priceall=(price*num).toFixed(2);
			   $(this).children("#price_pc").html("￥"+priceall);
		   });
	   },
	   checkchangpc:function(ele){
		   if(ele.attr("id")=="check"){
			   ele.removeAttr("id");
			   ele.html("&#xe617;");
		   }else{
			   ele.attr("id","check");
			   ele.html("&#xe618;")
		   };
		   $.checknumpricepc();
	   },
	   chooseallpc:function(ele){
		   if(ele.attr("id")=="check"){
			   ele.removeAttr("id");
			   ele.html("&#xe617;<i>全选</i>");
			   $("#cart_list_pc").children("#cart_item_pc").each(function(){
					$(this).children(".iconfont:eq(0)").removeAttr("id");
					$(this).children(".iconfont:eq(0)").html("&#xe617;");
			   });
			   $.checknumpricepc();
		   }else{
			   ele.attr("id","check");
			   ele.html("&#xe618;<i>取消全选</i>");
			   $("#cart_list_pc").children("#cart_item_pc").each(function(){
					$(this).children(".iconfont:eq(0)").attr("id","check");
					$(this).children(".iconfont:eq(0)").html("&#xe618;")
			   });
			   $.checknumpricepc();
		   };
	   },
	   checkifchooseallpc:function(){
		   if($("#cart_list_pc").children("#cart_item_pc").length==$("#cart_list_pc").children("#cart_item_pc").children("#check").length){
			   $("#item_title>.iconfont:eq(0)").attr("id","check");
			   $("#item_title>.iconfont:eq(0)").html("&#xe618;<i>取消全选</i>");
		   }else{
			   $("#item_title>.iconfont:eq(0)").removeAttr("id");
			   $("#item_title>.iconfont:eq(0)").html("&#xe617;<i>全选</i>");
		   }
	   },
	   checknumpricepc:function(){
		   let num=0;
		   let price=0;
		   $("#cart_list_pc").children("#cart_item_pc").each(function(){
			   if($(this).children(".iconfont:eq(0)").attr("id")=="check"){
				   num+=Number($(this).children("div").children("div").children("#num_pc").html());
				   price+=Number($(this).children("span:eq(3)").html().replace("￥",""))*Number($(this).children("div").children("div").children("#num_pc").html());
			   }
		   });
		   price=price.toFixed(2);
		   $("#count_pay>span>span:eq(1)").html(num);
		   $("#count_pay>span>span:eq(2)").html("￥"+price);
	   },
	   checkchoosenummobile:function(){
		   let num=0;
		   $("#cart_item>#detail").each(function(){
				if($(this).parent().children("span:eq(0)").attr("id")=="check"){
					num+=1;
				}
			});
		   return num;
	   }
	});
})(jQuery);
window.onresize = function() {
	$.loadcss();
}
$(document).ready(function(){
	$.loadcss();
	$.loadcar();
	$.checkiflogin();
	 $("#logined").mouseenter(function(){
		 layer.tips('个人中心设置在手机端哦!', '#logined', {
				  tips: [4, '#3595CC'],
		 });
     });
	 $("#logined").mouseleave(function(){
		 layer.closeAll('tips'); 
     });
});