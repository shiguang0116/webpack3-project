'use strict';
import './index.less';
import util from'utils/util.js';

// 页面
const page = {
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        util.ajax({
            url: '/passport/checklogin',
        })
        util.ajax({
            url: '/product/getproductlistall',
        })
    },
    bindEvent : function(){
        const _this = this;
    },
};

$(function(){
    page.init();
})
