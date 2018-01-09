'use strict';

var _yoo = require('util/yoo.js');

var _service = {
    // 用户登录
    login : function(formData, resolve, reject){
        _yoo.request({
            url     : _yoo.getServerUrl('/passport/login'),
            data    : formData,
            success : resolve,
            error   : reject
        });
    },
    // 用户注册
    register : function(formData, resolve, reject){
        _yoo.request({
            url     : _yoo.getServerUrl('/user/register.do'),
            data    : formData,
            success : resolve,
            error   : reject
        });
    },
    // 检查登录状态
    checkLogin : function(resolve, reject){
        _yoo.request({
            url     : _yoo.getServerUrl('/passport/checklogin'),
            success : resolve,
            error   : reject
        });
    },
    // 获取用户信息
    getUserInfo : function(resolve, reject){
        _yoo.request({
            url     : _yoo.getServerUrl('/passport/getuserinfo'),
            success : resolve,
            error   : reject
        });
    },
    // 登出
    logout : function(resolve, reject){
        _yoo.request({
            url     : _yoo.getServerUrl('/passport/logout'),
            success : resolve,
            error   : reject
        });
    },
    // 重置密码
    resetPassword : function(formData, resolve, reject){
        _yoo.request({
            url     : _yoo.getServerUrl('/passport/resetpassword'),
            data    : formData,
            success : resolve,
            error   : reject
        });
    },
    // 更新个人信息
    updateUserInfo : function(formData, resolve, reject){
        _yoo.request({
            url     : _yoo.getServerUrl('/passport/updateuserinfo.do'),
            data    : formData,
            success : resolve,
            error   : reject
        });
    },
}

module.exports = _service;