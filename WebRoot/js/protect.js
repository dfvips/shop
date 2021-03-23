$(function(){
	document.onkeydown=$.onKeyDown;
	document.oncontextmenu=$.onTextMenu;
});
(function($){
	$.extend({
		onKeyDown: function(){
		    var e = window.event||arguments[0];
		    if(e.keyCode==123){
		    	alert('请尊重作者劳动成果!如有疑问请联系邮箱：admin@dreamfly.work');
		            return false;
		    }else if((e.ctrlKey)&&(e.shiftKey)&&(e.keyCode==73)){
		    	alert('请尊重作者劳动成果!如有疑问请联系邮箱：admin@dreamfly.work');
		            return false;
		    }else if((e.ctrlKey)&&(e.keyCode==85)){
		            alert('请尊重作者劳动成果!如有疑问请联系邮箱：admin@dreamfly.work');
		            return false;
		    }else if((e.ctrlKey)&&(e.keyCode==83)){
		           alert('请尊重作者劳动成果!如有疑问请联系邮箱：admin@dreamfly.work');
		           return false;
		    }
		},
		onTextMenu:function(){
			alert('请尊重作者劳动成果!如有疑问请联系邮箱：admin@dreamfly.work');
		    return false;
		}
	});
})(jQuery);