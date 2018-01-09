'use strict';

require('./index.css');
var _yoo     = require('util/yoo.js');
var _service = require('service/service.js');

// 通用页面头部
var header = {
    init : function(){
        this.bindEvent();
        this.loadUserInfo();
    },
    bindEvent : function(){
        
    },
    // 加载用户信息
    loadUserInfo : function(){
        _service.checkLogin(function(res, msg){
            _yoo.sucTip()
        }, function(err){
            // _yoo.errTip(err)
        });
    }
};

header.init();