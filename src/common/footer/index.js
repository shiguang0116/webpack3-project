'use strict';

require('./index.less');
var util     = require('utils/util.js');

// 通用页面尾部
var footer = {
    init : function(){
        this.handleFooter();
    },
    handleFooter : function(){
        var oFoot = document.getElementById('footer')
        var oBody = document.getElementsByTagName('body')[0]
        util.handleFooter(oBody,oFoot,64)
    }
};

$(function(){
    footer.init();
})