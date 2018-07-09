'use strict';
import './index.less';
import util from'utils/util.js';

// 通用页面尾部
const footer = {
    init : function(){
        this.handleFooter();
    },
    handleFooter : function(){
        const oFoot = document.getElementById('footer')
        const oBody = document.getElementsByTagName('body')[0]
        util.handleFooter(oBody,oFoot,64)
    }
};

$(function(){
    footer.init();
})