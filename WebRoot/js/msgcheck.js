(function($){
	var reg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
	var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
	
	$.extend({
		isPoneAvailable: function(phone){
		    if (!myreg.test(phone)) {
		        return false;
		    } else {
		        return true;
		    }
		},
		isEmailAvailable:function(email){
			if(reg.test(email)){
				return true;
			}else{
				 return false;
			}
		}
	});
})(jQuery);