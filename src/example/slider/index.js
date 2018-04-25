var Slider     = require('components/slider/index.js');
// 初始化组件
var slider1 = new Slider('banner1')
slider1.init({
    delay: '30000',
    type: 'slide',
    // hideDots: true,
    continuePlay: true,
    // hideBtn: true,
    // isVertical: true
})