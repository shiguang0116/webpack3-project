'use strict';

require('./index.css');
var nav     = require('page/common/nav/index.js');
var _yoo    = require('util/yoo.js');
// 组件用例
require('../../example/tab/index.js');
require('../../example/slider/index.js');
require('../../example/upload/index.js');

// 页面
var page = {
    data : {
        
    },
    init : function(){
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
