'use strict';
require('./index.less');

// 选项卡
var Tab = function(id){
	this.oParent 	= document.getElementById(id);
	this.aLi 		= document.querySelectorAll('#' + id + ' .sg-tab-nav>li');
	this.aItem	 	= document.querySelectorAll('#' + id + ' .sg-tab-item');
	this.index 		= 0;
	// html5新加标签（ie8+）
    // document.querySelector(); //  返回单个node，如果有多个匹配元素就返回第一个
    // document.querySelectorAll(); // 返回一个nodeList集合
}
Tab.prototype.init = function (){
	var This = this;
	for (var i = this.aLi.length-1;i>=0;i--){
		this.aLi[i].index = i;
		this.aLi[i].onclick = function(){
			This.change(this);
		};
	};
};
Tab.prototype.change = function(obj) {
	for (var i = this.aLi.length - 1; i >= 0; i--) {
		this.aLi[i].className = "";
		this.aItem[i].style.display = "none";
	};
	obj.className = "active";
	this.aItem[obj.index].style.display = "block";	
};
Tab.prototype.autoplay = function(time){
	var time = time || 3000;
	var This = this;
	setInterval(function(){
		This.index ++;
		if(This.index == This.aLi.length){
			This.index = 0;
		}
		This.aLi[This.index].index = This.index;
		This.change(This.aLi[This.index]);
	},time);
};

module.exports = Tab;