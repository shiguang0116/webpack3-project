'use strict';

require('./index.less');
// 轮播图
var Carousel = function(id){
	this.$imgs 		= $("#" + id + " .sg-banner-item")
	this.$dotsBox 	= $("#" + id + " .sg-banner-dots")
	this.$dots 		= $("#" + id + " .sg-banner-dots li")
	this.$banner 	= $("#" + id + " .sg-banner")
	this.$con 		= $("#" + id + " .sg-banner-con")
	this.$btn 		= $("#" + id + " .sg-banner-btn")
	this.$left 		= $("#" + id + " .sg-banner-left")
	this.$right 	= $("#" + id + " .sg-banner-right")
	this.length 	= this.$imgs.length
	this.index 		= 0
	this.time 		= ''
	// 滑动
	this.L 			= 0
	this.W 			= this.$imgs[0].offsetWidth
	// 竖向轮播
	this.T 			= 0
	this.H 			= this.$imgs[0].offsetHeight
}
Carousel.prototype.init = function(param){
	// 初始化选项
	var delay 			= param.delay || 3000,
		isVertical 		= param.isVertical || false,
		continuePlay 	= param.continuePlay || false,
		hideDots 		= param.hideDots || false,
		hideBtn 		= param.hideBtn || false,
		type 			= param.type || '';
	// 竖向轮播
	if (isVertical) {
		this.length = this.$imgs.length * 2
		this.$con.css("height", this.H * this.length + "px")
		this.$con[0].innerHTML += this.$con[0].innerHTML
	}
	// 动画类型
	if (type == 'slide') {
		this.length = this.$imgs.length * 2
		this.$con.css("width", this.W * this.length + "px")
		this.$con[0].innerHTML += this.$con[0].innerHTML
	}
	var _this = this;
	// 第一张显示
	this.change(0, type, isVertical);
	// 自动轮播
	this.autoplay(delay, type, isVertical);
	// banner悬浮事件
	this.bannerEvent(continuePlay, delay, type, isVertical)
	// dots悬浮事件
	this.dotsEvent(hideDots, type, isVertical)
	// 左右按钮事件
	this.btnEvent(hideBtn, type, isVertical)
}
Carousel.prototype.autoplay = function(delay, type, isVertical){
	var _this = this;
	this.time = setInterval(function(){
		_this.index++;
		if(_this.index == _this.length){	
			_this.index = 0;
		};
		_this.change(_this.index, type, isVertical);
	}, delay);
}
Carousel.prototype.change = function(i, type, isVertical){
	// 横向轮播
	if (!isVertical) {
		this.across(i, type)
	}
	// 竖向轮播
	if (isVertical) {
		this.vertical(i, type)
	}
}
Carousel.prototype.across = function(i, type){
	var _this = this;
	if (!type) {
		this.changeDots(i);
		this.$imgs.hide();
		this.$imgs.eq(i).show();
	}
	// 淡入淡出
	if (type == 'fade') {
		this.changeDots(i);
		this.$imgs.fadeOut();
		this.$imgs.eq(i).fadeIn();
	}
	// 滑动
	if (type == 'slide') {
		// 改变dots
		var j = i;
		if (j == this.length/2) {j = 0};
		this.changeDots(j);
		// 改变图片
		this.L = - this.W * i + "px";
		this.$con.animate({left: this.L},300,function(){
			if (i == _this.length/2) {
				_this.index = 0
				_this.$con[0].style.left = 0 + "px";
			}
		});
	}
}
Carousel.prototype.vertical = function(i, type){
	var _this = this;
	// 改变dots
	var j = i;
	if (j == this.length/2) {j = 0};
	this.changeDots(j);
	// 改变dots方向
	this.$dotsBox.addClass('sg-banner-dots-vertical')
	// 改变图片
	this.T = -this.H * i + "px";
	this.$con.animate({top: this.T},300,function(){
		if (i == _this.length/2) {
			_this.index = 0
			_this.$con[0].style.top = 0 + "px";
		}
	});
}
Carousel.prototype.changeDots = function(i){
	this.$dots.eq(i).addClass("active").siblings().removeClass("active");
}
Carousel.prototype.bannerEvent = function(continuePlay, delay, type, isVertical){
	var _this = this;
	// 继续轮播
	if (continuePlay) {
		// do nothing
	}else{
		// 鼠标悬浮停止轮播	移出继续轮播
		this.$banner.hover(
			function(){
				clearInterval(_this.time);
			},
			function(){
				_this.autoplay(delay, type, isVertical);
			}
		);
	}
}
Carousel.prototype.dotsEvent = function(hideDots, type, isVertical){
	var _this = this;
	// 隐藏dots
	if (hideDots) {
		this.$dotsBox.css("display","none")
	// dots悬浮事件
	}else{
		// 鼠标移上圆点变色，显示对应图片
		this.$dots.mouseover(function(){
			_this.index = $(this).index(); // ▲ 重新给index赋值
			_this.change(_this.index, type, isVertical);
		});
	}
}
Carousel.prototype.btnEvent = function(hideBtn, type, isVertical){
	var _this = this;
	// 隐藏btn
	if (hideBtn) {
		this.$btn.css("display","none")
	// 按钮点击事件
	}else{
		// 左边按钮	
		this.$left.click(function(){
			_this.index--;
			_this.change(_this.index, type, isVertical);
		});
		// 右边按钮	
		this.$right.click(function(){
			_this.index++;
			if(_this.index == this.length){	
				_this.index = 0;
			};
			_this.change(_this.index, type, isVertical);
		});
	}
}

module.exports = Carousel;