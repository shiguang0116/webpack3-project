'use strict';
require('./index.css')
var _yoo 		= require('util/yoo.js');
var template  	= require('./index.string');

// select下拉框
function Select(id, param){
	this.$Parent 		= $('#' + id)
	this.$Inp			= this.$Parent.find('.sg-select-inp')
	this.$Placeholder	= this.$Parent.find('.sg-select-placeholder')
	this.$Selected		= this.$Parent.find('.sg-select-selected')
	this.$Up			= this.$Parent.find('.sg-select-arrow-up')
	this.$Down			= this.$Parent.find('.sg-select-arrow-down')
	this.$Dropdown 		= this.$Parent.find('.sg-select-dropdown')
	this.$Item 			= null
	this.value 			= ''
	// 初始化选项 
	this.renderData		= param.data || '';
	this.init()
}
Select.prototype.init = function(){
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
Select.prototype.bindEvent = function(){
	var _this = this
	// 点击select 下拉框显示
	this.$Inp.click(function(e){
		_this.show()
		e.stopPropagation();
	})
	// 点击document 下拉框隐藏
	$(document).click(function(){
		_this.hide()
	})
	// 点击 选择
	this.$Item.click(function(){
		_this.selected($(this))
	})
}
Select.prototype.selected = function(obj){
	// 选择处理
	this.$Placeholder.hide()
	this.$Selected.show().text(obj.text()).attr("data-value", obj.attr("data-value"))
	this.value = this.$Selected.attr("data-value")
}
Select.prototype.show = function(){
	this.$Dropdown.show()
	this.$Up.show()
	this.$Down.hide()
}
Select.prototype.hide = function(){
	this.$Dropdown.hide()
	this.$Up.hide()
	this.$Down.show()
}
Select.prototype.render = function(obj){
    var html = _yoo.renderHtml(template, {
    	data : this.renderData
    });
    this.$Dropdown.html(html)
    this.$Item = this.$Parent.find('.sg-select-item')
};

module.exports = Select;


