'use strict';

require('./index.css');
var _yoo     = require('util/yoo.js');

// 通用页面尾部
var footer = {
    init : function(){
        // _yoo.modalPhoto({text: '为电话费'})
        this.scroll();
    },
    scroll : function(){
        // document.getElementById('footer').style.display = 'block';
        var scroll = document.getElementById('scroll').offsetTop-64
        var footer = document.getElementById('footer').offsetTop
        if (scroll > footer){
            document.getElementById('footer').style.position = 'fixed';
            document.getElementById('footer').style.bottom = '0';
        }
    }
};

// new Vue({
//     el: '#buyer',
//     created: function(){
//         this.$Message.config({
//             top: 50,
//             duration: 3000
//         });
//         // this.$Message.success("sdjfgshdg")
//     }
// })

$(function(){
    footer.init();
})