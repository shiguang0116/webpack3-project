'use strict';
require('./index.css');
//选项卡
var oParent = null;
var aInp = null;
var aLi = null;
var Tab = function(id){
	this.oParent 	= document.getElementById(id);
	this.aInp 		= this.oParent.getElementsByTagName('input');
	this.aLi	 	= this.oParent.getElementsByTagName('li');
	this.index 		= 0;
}
Tab.prototype.init = function (){
	var This = this;
	for (var i = this.aInp.length-1;i>=0;i--){
		this.aInp[i].index = i;
		this.aInp[i].onclick = function(){
			This.change(this);
		};
	};
};
Tab.prototype.change = function(obj) {
	for (var i = this.aInp.length - 1; i >= 0; i--) {
		this.aInp[i].className = "";
		this.aLi[i].style.display = "none";
	};
	obj.className = "active";
	this.aLi[obj.index].style.display = "block";	
};
Tab.prototype.autoplay = function(){
	var This = this;
	setInterval(function(){
		This.index ++;
		if(This.index == This.aInp.length){
			This.index = 0;
		}
		This.aInp[This.index].index = This.index;
		This.change(This.aInp[This.index]);
	},1000);
};

module.exports = Tab;