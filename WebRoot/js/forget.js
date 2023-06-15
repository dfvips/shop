let index = layer.open({
    type: 2
    ,content: '正在努力加载中...'
 });
document.onreadystatechange = completeLoading;

function completeLoading() {
    if (document.readyState == "complete") {
    	layer.close(index);
    }
}

$(document).ready(function() {
	$.loadcss();
	window.onresize = function() {
		$.loadcss();
	}
	$(function() {
		FastClick.attach(document.body);
	});
	$("#input_code").focus(function(){
		$("#getcode").css("border-bottom","1px solid #3385ff");
	});
	$("#input_code").blur(function(){ 
		$("#getcode").css("border-bottom","1px solid #CDCDCD"); 
	});
	let dataList = [ "0", "1" ];
	let options = {
		dataList : dataList,
		success : function() {
			console.log("show");
		},
		fail : function() {
			console.log("fail");
		}
	};
	SliderBar("slideBar", options);
});
(function($) {
	let logintype;
	let code;
	let account;
	let flag=false;
	$.extend({
		loadcss : function() {
			let flag = $.IsPC();
			if (flag == true) {
				if($('link[href="css/forget_mobile.css"]')[0]!=undefined){
					$('link[href="css/forget_mobile.css"]')[0].setAttribute("href", "css/forget_pc.css");
				}
				 var stateObject = {};    
			 	 var title = $("title").html();     
			  	 var newUrl = 'forget';    
				 history.pushState(stateObject, title, newUrl);
			} else {
				if($('link[href="css/forget_pc.css"]')[0]!=undefined){
					$('link[href="css/forget_pc.css"]')[0].setAttribute("href", "css/forget_mobile.css");
				}
				 var stateObject = {};    
			 	 var title = $("title").html();     
			  	 var newUrl = 'm.forget';    
				 history.pushState(stateObject, title, newUrl);
			}
		},
		sendcode : function() {
			if ($("#code").html() == "获取验证码") {
				if ($.isPoneAvailable($("#ep").val()) == false && $.isEmailAvailable($("#ep").val()) == false) {
					$("#tip").html("手机号/邮箱不正确");
					$.showtip();
				} else {
					if ($.isEmailAvailable($("#ep").val()) == true) {
						$("#code").removeAttr('onclick');
						$('#code').attr('disabled', "true");
						account = $("#ep").val();
						$.ajax({
							url : "Getcode",
							dataType : "jsonp",
							async : true,
							data : "email=" + $("#ep").val()+"&state=find",
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
							data : "state=msg&code=pwd&phone=" + $("#ep").val(),
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
		showtip:function(){
		  	   $("#tip").css("display","block");
		  	   $("#tip").fadeOut(1900);
		  	   $("#tip").css("padding-left","11%");
		  	   $("#tip").css("padding-top","20px");
		  	   setTimeout(function(){  
		  		   $("#tip").css("display","none");
		  	   },2000);
		},
		showtip1:function(){
		  	   $("#tip1").css("display","block");
		  	   $("#tip1").fadeOut(1900);
		  	   $("#tip1").css("padding-left","11%");
		  	   $("#tip1").css("padding-top","20px");
		  	   $("#checkep").css("margin-top", "3%");
		  	   setTimeout(function(){  
		  		   $("#tip1").css("display","none");
		  		 $("#checkep").css("margin-top", "6%");
		  	   },2000);
		},
		forget:function (){
			let ep=$("#ep").val();
			let password=$("#password").val();
			let repassword=$("#repassword").val();
			let input_code=$("#input_code").val();
			if(code!=$.cmd5x(input_code)){
				$("#tip").html("验证码错误");
				$.showtip();
			}else if(password!=repassword){
				   $("#tip").html("两次输入密码不一致");
				   $.showtip();
			}else{
				$.ajax({
					url : "Findpwd",
					dataType : "jsonp",
					async : true,
					data : "ep="+ep+"&password="+$.cmd5x(password),
					type : "POST",
					success : function(data) {
					   let result = data.result;
					   if(result!="success"){
				    	   $("#tip").html("修改失败，请重试");
				    	   $.showtip();
				       }else{
				    	   $.findsuccess();
				       }
					},
					error : function() {
						//请求出错处理 
						console.log("发送出错");
					}
				});
			}
			return false;
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
		showslide: function(){
            if($("#ep").val()==null||$("#ep").val()==''){
            	$("#tip1").html("手机号/邮箱不能为空");
				$.showtip1();
            }
            else if($.isPoneAvailable($("#ep").val()) == false && $.isEmailAvailable($("#ep").val()) == false){
            	$("#tip1").html("手机号/邮箱格式错误");
				$.showtip1();
            }
            else{
    			$('#slideBar').show(500);
            }
		},
		tologin:function(){
			window.location.replace("userlogin");
		},
		findsuccess : function() {
			$("#cc1").css("float", "left");
			$(".parent").css("opacity", "0.5");
			$.loading();
			$.showcodetip=null;
		    $("#code").html("获取验证码");
		    $("#code").removeAttr('onclick');
		    $('#code').attr('disabled', "true");
			setTimeout(function() {
				   $('input').val('');
				   $(".parent").css("opacity", "1");
				   $("#cc1").css("display", "none");
		    	   $("#btn").val("修改成功，点我去登录");
		    	   $("#btn").removeAttr('onclick');
		    	   $("#btn").attr("onclick", "$.tologin()");
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