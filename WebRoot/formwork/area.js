;
(function () {
    $.fn.getArea = function (options) {
        var defaults = {
            jsonUrl: 'json/area.json',
            elePage: 'body',
            inpEle: '#getArea',
            areaMask: '.area-larger-mask',
            confirmArea: '.confirm-area-control',
            cancelArea: '.cancel-area-control',
            scrollItem: '.area-item',
            defaultSplit: ",",
            eventInpFocus: 'focus',
            eventTouchStart: 'touchstart',
            eventTouchMove: 'touchmove',
            eventClick: 'click',
            startY: 0,
            endY: 0,
            moveY: 0,
            lengthY: 0,
            nowTop: 0,
            scrollTime: '200ms',
            oldTop: 0,
            newTop: 0,
            eleLength: 0,
            scrollNum: 0,
            areaData: [],
            cityList: [],
            regionList: [],
            scrollProvince: 0,
            scrollCity: 0,
            scrollRegion: 0,
            provinceObj: {
                'name': '',
                'code': '',
                'index': ''
            },
            cityObj: {
                'name': '',
                'code': '',
                'index': ''
            },
            regionObj: {
                'name': '',
                'code': '',
                'index': ''
            },
            normalArea: true,
            defaultArea: [18, 2, 3],
            inpVal: ''
        };
        var params = $.extend(defaults, options);
        $(this).each(function () {
            var _this = $(this);
            getAreaContent();
            $(this).on(params.eventInpFocus, function () {
            	$.unScroll();
                $.getJSON(params.jsonUrl, function (data) {
                    $('.area-province-scroll').empty();
                    params.areaData = data[0];
                    $.each(params.areaData, function (k, v) {
                        var province = '<div data-code="' + v.provinceCode + '">' + v.provinceName + '</div>';
                        $('.area-province-scroll').append(province);
                    });
                    params.inpVal = $(params.inpEle).val();
                    if (params.inpVal !== '') {
                        handleAreaInput();
                    } else {
                        $(params.scrollItem).eq(0).css('top', params.defaultArea[0] * -40);
                        initArea(1, params.defaultArea[0], params.defaultArea[1]);
                        initArea(2, params.defaultArea[1], params.defaultArea[2]);
                    }
                    saveareaMsg(0, params.defaultArea[0]);
                    saveareaMsg(1, params.defaultArea[1]);
                    saveareaMsg(2, params.defaultArea[2]);
                    params.scrollProvince = params.defaultArea[0];
                    params.scrollCity = params.defaultArea[1];
                    params.scrollRegion = params.defaultArea[2];
                });
                $(params.areaMask).fadeIn(200);
            });
            $(params.elePage).on(params.eventClick, params.confirmArea, function () {
                var html = params.provinceObj.name + params.defaultSplit + params.cityObj.name + params.defaultSplit + params.regionObj.name;
                $(params.inpEle).val(html);
                $(params.areaMask).fadeOut(200);
                clearAreaList();
                $.scroll();
            });
            $(params.elePage).on(params.eventClick, params.cancelArea, function () {
                $(params.areaMask).fadeOut(200);
                clearAreaList();
                $.scroll();
            });
            $(params.elePage).on(params.eventClick, '#areaScrollMask', function (e) {
            	$.scroll();
                if (e.target.id === 'areaScrollMask') $(params.areaMask).fadeOut(200);
            });
            $(params.elePage).on('touchstart', params.scrollItem, function (e) {
                var $this = $(this);
                if (e.cancelable) {
                    if (!e.defaultPrevented) {
                        e.preventDefault();
            			console.clear();
                    }
                }else{
        			console.clear();
                }
                params.startY = e.originalEvent.changedTouches[0].pageY;
                params.oldTop = Number($this.css('top').split('p')[0]);
            });
            $(params.elePage).on('touchmove', params.scrollItem, function (e) {
                var $this = $(this);
                params.nowTop = Number($this.css('top').split('p')[0]);
                params.endY = e.originalEvent.changedTouches[0].pageY;
                params.moveY = params.endY - params.startY;
                params.newTop = Math.round(params.oldTop + params.moveY);
                if (params.nowTop <= 0) {
                    if (params.moveY < 0) {
                        if (params.newTop >= 40 - ($this.children().outerHeight())) {
                            if (params.newTop % 40 <= -20) {
                                params.scrollNum = Math.round(params.newTop / 40);
                                $this.css('top', params.scrollNum * 40);
                            } else if (params.newTop % 40 > -20) {
                                params.scrollNum = Math.round(params.newTop / 40);
                                $this.css('top', params.scrollNum * 40);
                            }
                        }
                    } else if (params.moveY > 0) {
                        if (params.newTop <= 0) {
                            if (params.newTop % 40 >= 20) {
                                params.scrollNum = Math.round(params.newTop / 40) + 1;
                                $this.css('top', params.scrollNum * 40);
                            } else if (params.newTop % 40 < 20) {
                                params.scrollNum = Math.round(params.newTop / 40);
                                $this.css('top', params.scrollNum * 40);
                            }
                        }
                    }
                }
            });
            $(params.elePage).on('touchend', params.scrollItem, function (e) {
                var $this = $(this);
                var areaIndex = $('.area-item').index($this);
                switch (areaIndex) {
                case 0:
                    saveareaMsg(0, -params.scrollNum);
                    params.scrollProvince = -params.scrollNum;
                    params.cityList = params.areaData[-params.scrollNum].areaVOList;
                    loadAreaList(areaIndex + 1, params.cityList);
                    loadAreaList(areaIndex + 2, params.cityList[0].areaVOList);
                    saveareaMsg(1, 0);
                    saveareaMsg(2, 0);
                    setAreaOpen(params.scrollProvince, 0, 0);
                    break;
                case 1:
                    saveareaMsg(1, -params.scrollNum);
                    params.scrollCity = -params.scrollNum;
                    try {
                        params.regionList = params.cityList[-params.scrollNum].areaVOList;
                        loadAreaList(areaIndex + 1, params.regionList);
                        saveareaMsg(2, 0);
                        setAreaOpen(params.scrollProvince, params.scrollCity, 0);
                	}catch(err){
                		
                	}
                    break;
                case 2:
                    params.scrollRegion = -params.scrollNum;
                    setAreaOpen(params.scrollProvince, params.scrollCity, params.scrollRegion);
                    saveareaMsg(2, -params.scrollNum);
                    break;
                default:
                    break;
                }
            });

            function loadAreaList(areaIndex, areaArr) {
                $(params.scrollItem).eq(areaIndex).children().empty();
                $(params.scrollItem).eq(areaIndex).css('top', 0);
                if (areaIndex === 1) {
                    $.each(areaArr, function (k, v) {
                        var areaItem = '<div data-id="' + v.cityCode + '">' + v.cityName + '</div>';
                        $(params.scrollItem).eq(areaIndex).children().append(areaItem);
                    });
                } else if (areaIndex === 2) {
                    $.each(areaArr, function (k, v) {
                        var areaItem = '<div data-id="' + v.countyCode + '">' + v.countyName + '</div>';
                        $(params.scrollItem).eq(areaIndex).children().append(areaItem);
                    });
                }
            }

            function initArea(areaIndex, initIndex, index) {
                if (areaIndex === 1) {
                    params.cityList = params.areaData[initIndex].areaVOList;
                    $.each(params.cityList, function (k, v) {
                        var item = '<div data-id="' + v.cityCode + '">' + v.cityName + '</div>';
                        $(params.scrollItem).eq(areaIndex).children().append(item);
                    });
                } else if (areaIndex === 2) {
                    params.regionList = params.cityList[initIndex].areaVOList;
                    $.each(params.regionList, function (k, v) {
                        var item = '<div data-id="' + v.countyCode + '">' + v.countyName + '</div>';
                        $(params.scrollItem).eq(areaIndex).children().append(item);
                    });
                }
                $(params.scrollItem).eq(areaIndex).css('top', index * -40);
            }

            function clearAreaList() {
                $(params.scrollItem).eq(0).children().empty();
                $(params.scrollItem).eq(1).children().empty();
                $(params.scrollItem).eq(2).children().empty();
            }

            function saveareaMsg(index, scrollIndex) {
                if (index === 0) {
                    params.provinceObj.name = $('.area-province-scroll>div').eq(scrollIndex).text();
                    params.provinceObj.code = $('.area-province-scroll>div').eq(scrollIndex).attr('data-id');
                    params.provinceObj.index = scrollIndex;
                } else if (index === 1) {
                    params.cityObj.name = $('.area-city-scroll>div').eq(scrollIndex).text();
                    params.cityObj.code = $('.area-city-scroll>div').eq(scrollIndex).attr('data-id');
                    params.cityObj.index = scrollIndex;
                } else if (index === 2) {
                    params.regionObj.name = $('.area-region-scroll>div').eq(scrollIndex).text();
                    params.regionObj.code = $('.area-region-scroll>div').eq(scrollIndex).attr('data-id');
                    params.regionObj.index = scrollIndex;
                }
            }

            function setAreaOpen(indexPro, indexCity, indexReg) {
                params.defaultArea[0] = indexPro;
                params.defaultArea[1] = indexCity;
                params.defaultArea[2] = indexReg;
            }

            function getAreaContent() {
                var html = '<div class="area-larger-mask" id="areaScrollMask">' +
                    '<div class="area-larger-main">' +
                    '<div class="area-control">' +
                    '<button class="cancel-area-control">取消</button>' +
                    '<div class="title-area-control">选择地区</div>' +
                    '<button class="confirm-area-control">确定</button>' +
                    '</div>' +
                    '<div class="area-main">' +
                    '<div class="area-list-scroll">' +
                    '<div class="area-item">' +
                    '<div class="area-province-scroll">' +
                    '</div>' +
                    '</div>' +
                    '<div class="area-item">' +
                    '<div class="area-city-scroll">' +
                    '</div>' +
                    '</div>' +
                    '<div class="area-item">' +
                    '<div class="area-region-scroll">' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
                $('body').append(html);
            }

            function handleAreaInput() {
                var areaNum = params.inpVal.split(params.defaultSplit);
                var provinceList = [];
                $('.area-province-scroll>div').each(function () {
                    provinceList.push($(this).text());
                });
                var provinceIndex = provinceList.indexOf(areaNum[0]);
                params.defaultArea[0] = provinceIndex;
                $(params.scrollItem).eq(0).css('top', provinceIndex * -40);
                var cityList = [];
                params.cityList = params.areaData[provinceIndex].areaVOList;
                for (var i = 0; i < params.cityList.length; i++) {
                    cityList.push(params.cityList[i].cityName);
                }
                var cityIndex = cityList.indexOf(areaNum[1]);
                params.defaultArea[1] = cityIndex;
                initArea(1, provinceIndex, cityIndex);
                var regionList = [];
                params.regionList = params.cityList[cityIndex].areaVOList;
                for (var i = 0; i < params.regionList.length; i++) {
                    regionList.push(params.regionList[i].countyName);
                }
                var regionIndex = regionList.indexOf(areaNum[2]);
                params.defaultArea[2] = regionIndex;
                initArea(2, cityIndex, regionIndex);
            }
        });
    }
})(jQuery);