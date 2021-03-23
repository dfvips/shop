(function (window, document) {
    let SliderBar = function (targetDom, options) {
        // 判断是用函数创建的还是用new创建的。这样我们就可以通过MaskShare("dom") 或 new MaskShare("dom")来使用这个插件了  
        if (!(this instanceof SliderBar)) return new SliderBar(targetDom, options);
        // 参数
        this.options = this.extend({
            dataList: []
        }, options);
        // 获取dom
        this.targetDom = document.getElementById(targetDom);
        let dataList = this.options.dataList;
        if (dataList.length > 0) {
            let html = "<div class='slide-box'><div class='slide-img-block'>" +
                "<div class='slide-loading'></div><div class='slide-img-border'>" +
                "<div class='scroll-background slide-top'></div><div class='slide-img-div'>" +
                "<div class='slide-img-nopadding'><img class='slide-img' id='slideImg' src='' />" +
                "<div class='slide-block' id='slideBlock'></div><div class='slide-box-shadow' id='cutBlock'></div></div>" +
                "<div class='scroll-background  slide-img-hint-info' id='slideHintInfo'>" +
                "<div class='slide-img-hint'><div class='scroll-background slide-icon' id='slideIcon'></div>" +
                "<div class='slide-text'><span class='slide-text-type' id='slideType'></span>" +
                "<span class='slide-text-content' id='slideContent'></span></div></div></div></div>" +
                "<div class='scroll-background slide-bottom'>" +
                "<div class='scroll-background slide-bottom-refresh' id='refreshBtn' title='更换图片'></div>" +
                "<p style='color:#0066cc;display:inline;margin-left:5px;'>换一张</p></div></div></div>" +
                "<div class='scroll-background scroll-bar'>" +
                "<div class='scroll-background slide-btn' id='slideBtn'></div>" +
                "<div class='slide-title' id='slideHint'> 按住滑块，拖动完成上面拼图</div></div></div>";
            this.targetDom.innerHTML = html;
            this.slideBtn = document.getElementById("slideBtn");                 // 拖拽按钮              
            this.refreshBtn = document.getElementsByClassName("slide-bottom")[0];             // 换图按钮
            this.slideHint = document.getElementById("slideHint");               // 提示名称
            this.slideImg = document.getElementById("slideImg");                 // 图片
            this.cutBlock = document.getElementById("cutBlock");                 // 裁剪区域
            this.slideBlock = document.getElementById("slideBlock");             // 裁剪的图片
            this.slideIcon = document.getElementById("slideIcon");               // 正确、失败的图标
            this.slideType = document.getElementById("slideType");               // 正确、失败
            this.slideContent = document.getElementById("slideContent");         // 正确、失败的正文
            this.slideHintInfo = document.getElementById("slideHintInfo");       // 弹出
            this.resultX = 0;
            this.startX = 0;
            this.timer = 0;
            this.startTamp = 0;
            this.endTamp = 0;
            this.x = 0;
            this.imgWidth = 0;
            this.imgHeight = 0;
            this.imgList = [];
            this.isSuccess = true;
            for (let i = 1; i < 10; i++) {
                this.imgList.push(i + ".jpg");
            }
        }
        this.init();
    }
    SliderBar.prototype = {
        init: function () {
            this.event();
        },
        extend: function (obj, obj2) {
            for (let k in obj2) {
                obj[k] = obj2[k];
            }
            return obj;
        },
        event: function () {
            let _this = this;
            _this.reToNewImg();
            _this.slideBtn.onmousedown = function(event){
                _this.movestart(_this, event);
            } 
            _this.slideBtn.ontouchstart = function(event){
                _this.movestart(_this, event);
            } 
            _this.refreshBtn.onclick = function(){
                _this.refreshBtnClick(_this);
            }
        },
        refreshBtnClick: function(_this){
            _this.isSuccess = true;
            _this.slideBlock.style.cssText = "";
            _this.cutBlock.style.cssText = "";
            _this.reToNewImg();
        },
        reToNewImg: function () {
            let _this = this;
//            let imgSrc = "http://lorempixel.com/260/116/";
            let imgSrc = "https://unsplash.it/"+sj()+"/"+sj()+"/";
            _this.slideImg.setAttribute("src", imgSrc);
            _this.slideBlock.style.backgroundImage = "url("+ imgSrc +")";
            _this.slideImg.onload = function (e) {
                e.stopPropagation();
                _this.imgWidth = _this.slideImg.offsetWidth;                   // 图片宽
                _this.imgHeight = _this.slideImg.offsetHeight;                 // 图片高
            }
        },
        cutImg: function () {
            let _this = this;
            _this.cutBlock.style.display = "block";
            let cutWidth = _this.cutBlock.offsetWidth;                // 裁剪区域宽
            let cutHeight = _this.cutBlock.offsetHeight;              // 裁剪区域高
            // left 
            _this.resultX = Math.floor(Math.random() * (_this.imgWidth - cutWidth * 2 - 4) + cutWidth);
            // top
            let cutTop = Math.floor(Math.random() * (_this.imgHeight - cutHeight * 2) + cutHeight);
            // 设置样式
            _this.cutBlock.style.cssText = "top:" + cutTop + "px;" + "left:" + _this.resultX + "px; display: block;";
            _this.slideBlock.style.top = cutTop + "px";
            _this.slideBlock.style.backgroundPosition = "-" + _this.resultX + "px -" + cutTop + "px";
            _this.slideBlock.style.opacity = "1";
        },
        movestart:function (_this, e) {
            e.preventDefault();
            if($.IsPC()==false){
                 _this.startX = e.changedTouches[0].pageX;
            }else{
            	_this.startX = e.clientX;
            }
			_this.startTamp = (new Date()).valueOf();
            let target = e.target;
            target.style.backgroundPosition = "0 -216px";
            _this.slideHint.style.opacity = "0";
            if(_this.isSuccess){
                _this.cutImg();
            }
            document.addEventListener('touchmove', move);
            document.addEventListener('touchend', release);
            document.addEventListener('mousemove', move);
    		document.addEventListener('mouseup', release);

            function move(event) {
                if($.IsPC()==false){
                	_this.x = event.changedTouches[0].pageX- _this.startX;
	            }else{
	            	_this.x = event.clientX- _this.startX;
	            }
                if (_this.x < -6) {
                    _this.slideBtn.style.left = "-6px";
                    _this.slideBlock.style.left = "2px";
                } else if (_this.x >= -6 && _this.x <= 222) {
                    _this.slideBtn.style.left = _this.x + "px";
                    _this.slideBlock.style.left = _this.x + "px";
                } else {
                    _this.slideBtn.style.left = "222px";
                    _this.slideBlock.style.left = "222px";
                }
                _this.slideBtn.style.transition = "none";
                _this.slideBlock.style.transition = "none";
                $(".scroll-background")[5].style.background="-webkit-linear-gradient(left, #4acbfd, #4acbfd) no-repeat rgba(16,178,250,0.1)";
                $(".scroll-background")[5].style.backgroundSize=((_this.x+30)/290*100)+"% 100%";
            };

            function release() {
            	let t;
                document.removeEventListener('touchmove', move);
                document.removeEventListener('touchend', release);
                document.removeEventListener('mousemove', move);
                document.removeEventListener('mouseup', release);
                let left = _this.slideBlock.style.left;
                left = parseInt(left.substring(0, left.length-2));
                if(_this.resultX > (left - 8) && _this.resultX < (left + 8)){
                    _this.isSuccess = true;
                    _this.endTamp = (new Date()).valueOf();
                    _this.timer = ((_this.endTamp - _this.startTamp) / 1000).toFixed(1);
                    // 裁剪图片(拼图的一块)
                    _this.slideBlock.style.opacity = "0";
                    _this.slideBlock.style.transition = "opacity 0.6s";
                    // 裁剪的区域(黑黑的那一块)
                    _this.cutBlock.style.opacity = "0";
                    _this.cutBlock.style.transition = "opacity 0.6s";
                    // 正确弹出的图标
                    _this.slideIcon.style.backgroundPosition = "0 -1207px";
                    _this.slideType.className = "slide-text-type greenColor";
                    _this.slideType.innerHTML = "验证通过:";
                    _this.slideContent.innerHTML = "用时" + _this.timer + "s";
                    setTimeout(function(){
                        _this.cutBlock.style.display = "none";
                        _this.slideBlock.style.left = "2px";
                        _this.reToNewImg();
                    }, 600);
                    $('#slideBar').hide(500);
                    $.ajax({
						url : "CheckUser",
						dataType : "jsonp",
						async : true,
						data : "ep="+$("#ep").val(),
						type : "POST",
						success : function(data) {
							let result = data.result;
							if (result != "success") {
								$("#tip1").html("手机号/邮箱不存在");
								$.showtip1();
							} else {
								$("#getcode").css("display","block");
								$("input").css("display","inline");
								$("#checkep").css("display","none");
								$("#ep").attr("readonly", "readonly");
								$("#ep").css("margin-top","4%");
							}
						},
						error : function() {
							//请求出错处理 
							$("#tip").html("网络异常，请重试");
							$.showtip();
						}
					});
                    _this.options.success&&_this.options.success();
                    t=0;
                }else{
                    _this.isSuccess = false;
                    // 设置样式
                    // 裁剪图片(拼图的一块)
                    if(_this.x<0){
                    	_this.x=-2;
                    }
                    _this.slideBlock.style.left = "2px";
                    _this.slideBlock.style.transition = "left 0.6s";
                    // 错误弹出的图标
                    _this.slideIcon.style.backgroundPosition = "0 -1229px";
                    _this.slideType.className = "slide-text-type redColor";
                    _this.slideType.innerHTML = "验证失败:";
                    _this.slideContent.innerHTML = "拖动滑块将悬浮图像正确拼合";
                    _this.options.fail&&_this.options.fail();
                    $(".scroll-background")[5].style.background="-webkit-linear-gradient(left, #ff5b57, #ff5b57) no-repeat rgba(16,178,250,0.1)";
                    $(".scroll-background")[5].style.backgroundSize=(_this.x/222)*100+"% 100%";
                    t=500;
                }
                // 设置样式
                setTimeout(function(){
	                _this.slideHintInfo.style.height = "22px";
			    	let timer=setInterval(function(){
			    		console.log(_this.x);
			            if (_this.x<=1) {
			                clearInterval(timer);
			            }
			            _this.x=_this.x-10;
		            	$(".scroll-background")[5].style.background="-webkit-linear-gradient(left, #4acbfd, #4acbfd) no-repeat rgba(16,178,250,0.1)";
		            	if((_this.x/222)<1){
		            		$(".scroll-background")[5].style.backgroundSize="0% 100%";
		            		_this.slideBtn.style.left = "-6px";
		            	}
		            	if(_this.x>222){
		            		_this.x=222;
		            	}
	                	$(".scroll-background")[5].style.backgroundSize=(_this.x/222)*100+"% 100%";
	                	_this.slideBtn.style.left = _this.x+"px";
			        },30);
                }, t);
                setTimeout(function(){
                    _this.slideHintInfo.style.height = "0px";
                }, 1300);
                _this.slideBtn.style.backgroundPosition = "0 -84px";
//                _this.slideBtn.style.left = "-6px";
//                _this.slideBtn.style.transition = "left 0.6s";
                _this.slideHint.style.opacity = "1";
            }
        }
    }
    window.SliderBar = SliderBar;
}(window, document));
function sj() {
    var x = 216;
    var y = 500;
    var rand = parseInt(Math.random() * (x - y + 1) + y);
    return rand;
}