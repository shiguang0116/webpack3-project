'use strict';
require('./index.css')
require('../select/index.css')
var util 		= require('utils/util.js');
var template  	= require('./index.string');

// cascade级联
function Cascade(id, param){
	this.$Parent 		= $('#' + id)
	this.$Inp			= this.$Parent.find('.sg-select-inp')
	this.$Placeholder	= this.$Parent.find('.sg-select-placeholder')
	this.$Selected		= this.$Parent.find('.sg-select-selected')
	this.$Up			= this.$Parent.find('.sg-select-arrow-up')
	this.$Down			= this.$Parent.find('.sg-select-arrow-down')
	this.$Dropdown 		= this.$Parent.find('.sg-select-dropdown')
	this.$Item 			= this.$Parent.find('.sg-cascade-item')
	this.value 			= []
	// 初始化选项 
	this.data0			= param.data || '';
	this.data1			= '';
	this.data2			= '';
	this.dataLen		= param.dataLen || ['0','0','0'];
	this.index1			= '';
	this.index2			= '';
	this.init()
}
Cascade.prototype.init = function(){
	// 渲染列表
	this.render()
	// 默认显示项
	for (var i =  0; i < this.$Item.length; i++) {
		if (this.$Item.eq(i).attr("data-value") == this.$Selected.attr("data-value")) {
			this.selected(this.$Item.eq(i))
			break;
		}
	}
	this.bindEvent()
}
Cascade.prototype.bindEvent = function(){
	var _this = this
	// 点击select 下拉框显示
	this.$Inp.click(function(e){
		_this.show()
		e.stopPropagation();
	})
	// 点击document 下拉框隐藏
	$(document).click(function(){
		// _this.hide()
	})
	// 点击 选择处理
	this.$Item.click(function(){
		_this.selected($(this))
	})
}
Cascade.prototype.selected = function(obj){
	var parentIndex = obj.parents('.sg-cascade-menu').index()
	var currentIndex = $('.sg-cascade-menu').eq(parentIndex).find('.sg-cascade-item').index(obj)
	// 记录被选中的各级index
	for (var i = 0; i < this.dataLen.length; i++) {
		if (parentIndex == i) {
			this.dataLen[i] = currentIndex;
			break;
		}
	}	
	// 点击第1级
	if (parentIndex == 0) {
		// 被选中的状态
		this.active(this.data0, currentIndex)
		// 获得下一级数据
		this.data1 = this.data0[currentIndex].children
		// 重新渲染
		this.init()
	}
	// 点击第2级
	if(parentIndex == 1){
		// 被选中的状态
		this.active(this.data1, currentIndex)
		// 获得下一级数据
		this.data2 = this.data0[this.dataLen[1]].children[currentIndex].children
		// 重新渲染
		this.init()
	}
	// 点击第3级
	if(parentIndex == 2){
		// 被选中的状态
		this.active(this.data2, currentIndex)
		// 重新渲染
		this.init()
		// 载入输入框
		this.write()
	}
}
Cascade.prototype.write = function(){
	var $Active = this.$Parent.find('.sg-cascade-item-active')
	var arrVal 	= []
	var arrText = []
	for (var i = 0; i < $Active.length; i++) {
		arrVal.push($Active.eq(i).attr('data-value'))
		arrText.push($Active.eq(i).text())
	}
	this.$Placeholder.hide()
	this.$Selected.show().text(arrText.join('/'))
	this.value = arrVal
}
Cascade.prototype.active = function(data,index){
	for (var i = data.length - 1; i >= 0; i--) {
		data[i].isActive = false
	}
	data[index].isActive = true
}
Cascade.prototype.show = function(){
	this.$Dropdown.show()
	this.$Up.show()
	this.$Down.hide()
}
Cascade.prototype.hide = function(){
	this.$Dropdown.hide()
	this.$Up.hide()
	this.$Down.show()
}
Cascade.prototype.render = function(obj){
    var html = util.renderHtml(template, {
    	data0 	: this.data0,
    	data1 	: this.data1,
    	data2 	: this.data2,
    });
    this.$Dropdown.html(html)
    // this.$Dropdown.append(html)
    this.$Item = this.$Parent.find('.sg-cascade-item')
};

module.exports = Cascade;


