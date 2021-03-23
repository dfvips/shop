var areaJson;
$.ajax({
	url : "json/areaforpc.json",
	dataType : "json",
	async : false,
	type : "POST",
	success : function(data) {
		areaJson=data;
	},
	error : function() {
	}
});
(function(execute) {
	if (typeof define === 'function' && define.amd) {
	define(['jquery'], execute)
	} else if (typeof exports === 'object') {
	execute(require('jquery'))
	} else {
	execute(jQuery)
	}
	})(function($) {
	'use strict';
	var defaults = {
	"width": "300px",
	"hoverColor": "#7894D4",
	"paddingLeft": "8px",
	"arrowRight": "8px",
	"maxHeight": "220px"
	};
	var pluginName = 'pickArea',
	area = areaJson.data,
	picknum = 0;
	function Plugin(element, options) {
	this.ele = $(element);
	this.identity = null;
	this.format = null;
	this.config = $.extend({},
	defaults, options);
	this.init()
	}
	Plugin.prototype = {
	init: function() {
	this.render()
	},
	render: function() {
	var _this = this;
	var htmlStr = '';
	var format = this.config.format;
	var prename = this.ele.attr("name");
	this.identity = this.getRandomStr();
	this.ele.addClass(this.identity);
	var setFormat = null;
	var contentStr = null;
	if (format && format != "") {
	setFormat = format
	} else if ((prename && prename != "" && !format) || (prename && prename != "" && format && format == "")) {
	setFormat = prename
	} else {
	contentStr = '<div class="pick-show"><input type="hidden" value="" class="pick-area" readonly/><span class="pick-province">请选择省</span><i>/</i><span class="pick-city">请选择市</span><i>/</i><span class="pick-county">请选择区/县</span><em class="pick-arrow"></em></div><ul class="pick-list"></ul>';
	this.format = "p/c/c"
	}
	if (setFormat) {
	var slash = 0,
	arrFor = setFormat.split(""),
	strSpan = "",
	areaArr = setFormat.split("/");
	for (var format_i = 0; format_i < arrFor.length; format_i++) {
	if (arrFor[format_i] == "/") {
	slash++
	}
	}
	if (setFormat.match("province")) {
	if (slash == 0) {
	strSpan = '<span class="pick-province">请选择省</span>';
	this.format = "p"
	} else if (slash == 1) {
	strSpan = '<span class="pick-province">请选择省</span><i>/</i><span class="pick-city">请选择市</span>';
	this.format = "p/c"
	} else if (slash == 2) {
	strSpan = '<span class="pick-province">请选择省</span><i>/</i><span class="pick-city">请选择市</span><i>/</i><span class="pick-county">请选择区/县</span>';
	this.format = "p/c/c"
	}
	contentStr = '<div class="pick-show"><input type="hidden" value="" class="pick-area" readonly/>' + strSpan + '<em class="pick-arrow"></em></div><ul class="pick-list"></ul>'
	} else {
	if (slash == 0) {
	strSpan = '<span class="pick-province">' + areaArr[0] + '</span>';
	this.format = "p"
	} else if (slash == 1) {
	strSpan = '<span class="pick-province">' + areaArr[0] + '</span><i>/</i><span class="pick-city">' + areaArr[1] + '</span>';
	this.format = "p/c"
	} else if (slash == 2) {
	strSpan = '<span class="pick-province">' + areaArr[0] + '</span><i>/</i><span class="pick-city">' + areaArr[1] + '</span><i>/</i><span class="pick-county">' + areaArr[2] + '</span>';
	this.format = "p/c/c"
	}
	contentStr = '<div class="pick-show"><input type="hidden" value="" class="pick-area" readonly/>' + strSpan + '<em class="pick-arrow"></em></div><ul class="pick-list"></ul>'
	}
	}
	this.ele.append(contentStr);
	if (picknum == 1) {
	$("body").append('<input type="hidden" class="pick-area-hidden" value="">');
	$("body").append('<input type="hidden" class="pick-area-dom" value="">')
	}
	if (this.config.paddingLeft) {
	this.ele.find(".pick-show").css({
	"padding-left": parseInt(this.config.paddingLeft) + "px",
	"padding-right": parseInt(this.config.arrowRight) + 16 + "px"
	})
	}
	if (this.config.arrowRight) {
	this.ele.find(".pick-arrow").css("right", parseInt(this.config.arrowRight) + "px")
	}
	if (this.config.width) {
	this.ele.css({
	"width": parseInt(this.config.width) + "px"
	});
	this.ele.find(".pick-list").css({
	"width": parseInt(this.config.width) - 2 + "px"
	});
	var checkNum = null;
	if (this.format == "p/c/c") {
	checkNum = 3
	} else if (this.format == "p/c") {
	checkNum = 2
	} else if (this.format == "p") {
	checkNum = 1
	}
	this.ele.find(".pick-show span").css({
	"max-width": (parseInt(this.config.width) - parseInt(this.config.paddingLeft) - parseInt(this.config.arrowRight) - 16 - this.ele.find("i").outerWidth() * (checkNum - 1) - 12 * checkNum - 10) / checkNum
	})
	}
	if (this.config.arrowColor) {
	this.ele.find(".pick-arrow").css({
	"border-color": this.config.arrowColor + " transparent transparent transparent"
	})
	}
	if (this.config.borderColor) {
	this.ele.find(".pick-show").css("border-color", this.config.borderColor)
	}
	if (this.config.listBdColor) {
	this.ele.find(".pick-list").css("border-color", this.config.listBdColor)
	}
	if (this.config.color) {
	this.ele.find(".pick-show span,.pick-show i").css("color", this.config.color)
	}
	if (this.config.height) {
	this.ele.find(".pick-show").css({
	"height": parseInt(this.config.height) + "px",
	"line-height": parseInt(this.config.height) + "px"
	});
	this.ele.find(".pick-list").css({
	"line-height": parseInt(this.config.height) + "px"
	});
	this.ele.find(".pick-arrow").css({
	"top": Math.floor((parseInt(this.config.height) - 8) / 2) + "px"
	});
	this.ele.find(".pick-show span").css({
	"margin-top": Math.floor((parseInt(this.config.height) - 24) / 2) + "px"
	})
	}
	if (this.config.fontSize) {
	this.ele.css({
	"font-size": parseInt(this.config.fontSize) + "px"
	})
	}
	if (this.config.maxHeight) {
	this.ele.find(".pick-list").css({
	"max-height": parseInt(this.config.maxHeight) + "px"
	})
	}
	$("." + this.identity).on("mouseenter", ".pick-list li,.pick-show span",
	function() {
	$(this).css("background", _this.config.hoverColor)
	}).on("mouseleave", ".pick-list li,.pick-show span",
	function() {
	if (!$(this).attr("class").match("pressActive")) {
	if (!$(this).hasClass("pick-selectedLi")) {
	$(this).css("background", "#fff")
	}
	}
	});
	this.ele.find(".pick-province").click(function(e) {
	var e = e || event;
	e.stopPropagation();
	$(this).parents("body").find(".pick-area span").removeClass("pressActive").css("background", "#fff");
	$(this).parents("body").find(".pick-list").hide();
	$(this).addClass("pressActive").css("background", _this.config.hoverColor).siblings("span").removeClass("pressActive").css("background", "#fff");
	_this.createProvince()
	});
	this.ele.find(".pick-city").click(function(e) {
	var e = e || event;
	e.stopPropagation();
	if (_this.ele.find(".pick-province").html() != "请选择省") {
	$(this).parents("body").find(".pick-area span").removeClass("pressActive").css("background", "#fff");
	$(this).parents("body").find(".pick-list").hide();
	$(this).addClass("pressActive").css("background", _this.config.hoverColor).siblings("span").removeClass("pressActive").css("background", "#fff");
	_this.createCity()
	} else {
	$("body").find(".pick-area").not("." + _this.identity).find(".pick-list").hide();
	$("body").find(".pick-area").not("." + _this.identity).find("span").removeClass("pressActive").css("background", "#fff")
	}
	});
	this.ele.find(".pick-county").click(function(e) {
	var e = e || event;
	e.stopPropagation();
	if (_this.ele.find(".pick-city").html() != "请选择市") {
	$(this).parents("body").find(".pick-area span").removeClass("pressActive").css("background", "#fff");
	$(this).parents("body").find(".pick-list").hide();
	$(this).addClass("pressActive").css("background", _this.config.hoverColor).siblings("span").removeClass("pressActive").css("background", "#fff");
	_this.createCounty()
	} else {
	$("body").find(".pick-area").not("." + _this.identity).find(".pick-list").hide();
	$("body").find(".pick-area").not("." + _this.identity).find("span").removeClass("pressActive").css("background", "#fff")
	}
	});
	this.ele.find(".pick-show").click(function(e) {
	var e = e || event;
	e.stopPropagation();
	if ($(this).next(".pick-list").css("display") == "block") {
	_this.ele.find(".pressActive").removeClass("pressActive").css("background", "#fff");
	_this.ele.find(".pick-list").html("").hide()
	} else {
	$(".pick-list").scrollTop(0);
	$(this).parents("body").find(".pick-area span").removeClass("pressActive").css("background", "#fff");
	$(this).parents("body").find(".pick-list").hide();
	_this.ele.find(".pick-province").addClass("pressActive").css("background", _this.config.hoverColor);
	_this.createProvince()
	}
	})
	},
	createProvince: function() {
	var _this = this;
	var proStr = '';
	var selPro = '';
	if (this.ele.find(".pick-province").html != "") {
	selPro = this.ele.find(".pick-province").html()
	}
	for (var i = 0; i < area.length; i++) {
	if (selPro == area[i].name) {
	proStr += '<li class="ulli pick-selectedLi" style="background:' + this.config.hoverColor + ';color:#fff;font-weight:bold;">' + area[i].name + '</li>'
	} else {
	proStr += '<li class="ulli">' + area[i].name + '</li>'
	}
	}
	this.ele.find(".pick-list").html("").append(proStr).show();
	this.ele.find(".pick-list li").css({
	"padding-left": parseInt(this.config.paddingLeft) + "px"
	});
	this.ele.find(".pick-list li").click(function() {
	_this.setVal(_this, this, "pro")
	})
	},
	createCity: function() {
	var _this = this,
	setPro = '',
	cityJson = "",
	cityStr = '',
	selCity = '';
	setPro = this.ele.find(".pick-province").html();
	if (this.ele.find(".pick-city").html != "") {
	selCity = this.ele.find(".pick-city").html()
	}
	for (var i = 0; i < area.length; i++) {
	if (setPro == area[i].name) {
	cityJson = area[i].cities
	}
	}
	if (cityJson.length != 0) {
	for (var j = 0; j < cityJson.length; j++) {
	if (selCity == cityJson[j].name) {
	cityStr += '<li class="ulli pick-selectedLi" style="background:' + this.config.hoverColor + ';color:#fff;font-weight:bold;">' + cityJson[j].name + '</li>'
	} else {
	cityStr += '<li class="ulli">' + cityJson[j].name + '</li>'
	}
	}
	this.ele.find(".pick-list").html("").append(cityStr).show();
	this.ele.find(".pick-list li").css({
	"padding-left": parseInt(this.config.paddingLeft) + "px"
	});
	this.ele.find(".pick-list li").click(function() {
	_this.setVal(_this, this, "city")
	})
	} else {
	this.ele.find(".pick-list").html("").hide();
	this.ele.find(".pick-show span").removeClass("pressActive")
	}
	},
	createCounty: function() {
	var _this = this,
	setPro = "",
	setCity = '',
	cityJson = "",
	countyJson = "",
	countyStr = '',
	selCounty = '';
	setPro = this.ele.find(".pick-province").html();
	setCity = this.ele.find(".pick-city").html();
	if (setCity == "请选择市") {
	this.ele.find(".pick-show span").removeClass("pressActive");
	return
	} else {
	if (this.ele.find(".pick-county").html != "") {
	selCounty = this.ele.find(".pick-county").html()
	}
	for (var i = 0; i < area.length; i++) {
	if (setPro == area[i].name) {
	cityJson = area[i].cities
	}
	}
	for (var j = 0; j < cityJson.length; j++) {
	if (setCity == cityJson[j].name) {
	countyJson = cityJson[j].district
	}
	}
	for (var t = 0; t < countyJson.length; t++) {
	if (selCounty == countyJson[t].name) {
	countyStr += '<li class="ulli pick-selectedLi" style="background:' + this.config.hoverColor + ';color:#fff;font-weight:bold;">' + countyJson[t].name + '</li>'
	} else {
	countyStr += '<li class="ulli">' + countyJson[t].name + '</li>'
	}
	}
	this.ele.find(".pick-list").html("").append(countyStr).show();
	this.ele.find(".pick-list li").css({
	"padding-left": parseInt(this.config.paddingLeft) + "px"
	});
	this.ele.find(".pick-list li").click(function() {
	_this.setVal(_this, this, "county")
	})
	}
	},
	setVal: function(_this, aim, s) {
	var _this = this;
	_this.ele.find(".pressActive").html($(aim).html());
	if (s == "pro") {
	_this.ele.find(".pick-city").html("请选择市");
	_this.ele.find(".pick-county").html("请选择区/县");
	_this.ele.find(".pick-province").removeClass("pressActive").css("background", "#fff");
	_this.ele.find(".pick-city").addClass("pressActive").css("background", _this.config.hoverColor);
	_this.ele.find("input[type=hidden].pick-area").val(_this.ele.find(".pick-province").html());
	if (this.format == "p") {
	_this.ele.find(".pick-list").hide()
	} else {
	this.createCity()
	}
	$(".pick-list").scrollTop(0);
	$(".pick-area-hidden").val(_this.ele.find(".pick-province").html());
	this.setBack(this)
	} else if (s == "city") {
	_this.ele.find(".pick-county").html("请选择区/县");
	_this.ele.find(".pick-city").removeClass("pressActive").css("background", "#fff");
	_this.ele.find(".pick-county").addClass("pressActive").css("background", _this.config.hoverColor);
	_this.ele.find("input[type=hidden].pick-area").val(_this.ele.find(".pick-province").html() + "/" + _this.ele.find(".pick-city").html());
	if (this.format == "p/c") {
	_this.ele.find(".pick-list").hide()
	} else {
	this.createCounty()
	}
	$(".pick-list").scrollTop(0);
	$(".pick-area-hidden").val(_this.ele.find(".pick-province").html() + " " + _this.ele.find(".pick-city").html());
	this.setBack(this)
	} else if (s == "county") {
	_this.ele.find(".pick-list").hide();
	_this.ele.find(".pick-county").removeClass("pressActive").css("background", "#fff");
	_this.ele.find("input[type=hidden].pick-area").val(_this.ele.find(".pick-province").html() + "/" + _this.ele.find(".pick-city").html() + "/" + _this.ele.find(".pick-county").html());
	$(".pick-list").scrollTop(0);
	$(".pick-area-hidden").val(_this.ele.find(".pick-province").html() + " " + _this.ele.find(".pick-city").html() + " " + _this.ele.find(".pick-county").html());
	this.setBack(this)
	}
	},
	setBack: function(_this) {
	$(".pick-area-dom").val(_this.identity);
	if (typeof _this.config.getVal === "function") {
	_this.config.getVal()
	}
	},
	getRandomStr: function() {
	var str = "",
	alphabet = ['A', 'B', "C", "D", "E", "F", "G", "H", "I", "G", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
	for (var i = 0; i < 26; i++) {
	str += alphabet[parseInt(Math.random() * 26)]
	}
	str += Date.parse(new Date());
	return str
	}
	};
	$.fn[pluginName] = function(options) {
	picknum++;
	return this.each(function(index) {
	new Plugin(this, options)
	})
	};
	$("*").on("click",
	function(e) {
	var e = e || event;
	e.stopPropagation();
	var _this = this;
	if ($(this).hasClass("pick-area") || jQuery.isEmptyObject($(_this).parentsUntil(".pick-area"))) {} else {
	$(".pick-list").scrollTop(0);
	$(".pick-province,.pick-city,.pick-county").removeClass("pressActive").css("background", "#fff");
	$(".pick-list").hide()
	}
	})
	});