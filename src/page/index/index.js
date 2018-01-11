'use strict';

require('./index.css');
var nav		= require('page/common/nav/index.js');
var _yoo    = require('util/yoo.js');
var Tab     = require('util/tab/index.js');
var Slider	= require('util/slider/index.js');

// 页面
var page = {
    data : {
        
    },
    init : function(){
        // 初始化组件
        var tab1 = new Tab('sg-tab1')
        tab1.init()
        // tab1.autoplay(1000)

        var slider1 = new Slider('banner1')
        slider1.init({
            delay: '2000',
            // type: 'slide',
            // hideDots: true,
            // continuePlay: true,
            // hideBtn: true,
            // isVertical: true
        })
        // var slider2 = new Slider('banner2')
        // slider2.init()

        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        
    },
    bindEvent : function(){
        var _this = this;
        
    }
};

$(function(){
    page.init();
})
