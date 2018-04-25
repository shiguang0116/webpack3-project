'use strict';
require('./index.css');
var util 		= require('utils/util.js');
var template  	= require('./index.string');

// 选择列表 平铺
var SelectTile = function(id, param){
	this.$parent 		= $('#' + id);
	this.$list 			= this.$parent.find('.sg-select-tile');
	this.$item 			= null;
	this.$res 			= null;
	this.$no 			= null;
	this.index 			= 0;
	// 初始化选项 
	this.renderData		= param.renderData || '';
	this.showRes		= param.showRes || false;
	this.selectedData 	= param.selectedData || {};
	this.filterFn 		= param.filterFn || '';
	this.fn 			= param.fn || '';
	this.init(param)
};
SelectTile.prototype.init = function (){
	var _this = this;
	// 渲染列表
	this.render()
	// 选择商品
	this.$item.on("click", "dd", function(){
		_this.index = $(this).parents('.sg-select-tile-item').index(this.$parent)
		_this.change(this)
		if (_this.showRes) {
			_this.showResFn(this)
		}
	})
};
SelectTile.prototype.change = function (obj){
	// debugger
	// 联动数据
	if (this.index == 1) {
		var dataKey = $(obj).attr('data-key') ? $(obj).attr('data-key') : '';
		this.renderData = typeof this.filterFn === 'function' ? this.filterFn(dataKey) : this.renderData
		this.init()
	}
	// 改变样式
	$(obj).addClass("sg-selected-tile").siblings().removeClass("sg-selected-tile");
	// 记录被选择的数据
	var key = Object.keys(this.selectedData);
	var dataKey = $(obj).attr('data-key') ? $(obj).attr('data-key') : '';
	this.selectedData[key[this.index]] = dataKey;
	typeof this.fn === 'function' && this.fn(this.selectedData)
};
// 获取select列表的html
SelectTile.prototype.render = function(obj){
    var html = util.renderHtml(template, {
    	renderData : this.renderData
    });
    this.$list.html(html)
    this.$item 	= this.$parent.find('.sg-select-tile-item');
	this.$res 	= this.$parent.find('.sg-select-tile-result');
	this.$no 	= this.$res.find('.sg-select-tile-no');

	$(obj).addClass("sg-selected-tile").siblings().removeClass("sg-selected-tile");

};
SelectTile.prototype.showResFn = function (obj){
	// 显示节点
	this.$res.css("display","block")
	// 如果选择全部，清除已选择的选项
	if ($(obj).hasClass("sg-select-tile-all")) {
		$("#sg-select-tile" + this.index).remove();
	// 复制被选择的节点
	}else{
		var copyThis = $(obj).clone();
		if ($("#sg-select-tile" + this.index).length > 0) {
			$("#sg-select-tile" + this.index + " span").html($(obj).text());
		} else {
			$(".sg-select-tile-result dl").append(copyThis.attr("id", "sg-select-tile" + this.index));
		}
	}
	// 隐藏提示
	if(this.$res.find('dd').length > 1) {
		this.$no.hide();
	} else {
		this.$no.show();
	}
};

module.exports = SelectTile;