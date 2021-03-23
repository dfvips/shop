(function($){
	$.extend({
		togoods:function(e){
			let good_id=e.className;
			if(good_id==""||good_id=='aui-flex-links-item'){
				good_id=e.id;
			}
			good_id=good_id.replace(/ animated fadeInUp/g,"");
			let flag = $.IsPC();
			if (flag == true) {
				window.open("item?product="+good_id, "_blank");
			}else{
				window.location.href="m.item?product="+good_id;
			}
		}
	});
})(jQuery);