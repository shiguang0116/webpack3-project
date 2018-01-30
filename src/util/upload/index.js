'use strict';
require('./index.css');
var _yoo = require('util/yoo.js');

// 文件上传
var Upload = function(id){
	// 文件上传
    this.$fileImgBox 	= $('#' + id + ' .sg-file-img');
    this.$fileImg 		= $('#' + id + ' .sg-file-img img');
    this.$fileInfo 		= $('#' + id + ' .sg-file-info');
    this.$fileInp 		= $('#' + id + ' .sg-file-inp');
    this.data 			= '';
}
Upload.prototype.init = function (param){
	// 初始化选项
	var size 		= param.size || 2048*1024,
		showInfo 	= param.showInfo || false,
		success		= param.success || '';
	this.bindEvent(size, showInfo, success);
}
Upload.prototype.bindEvent = function(size, showInfo, success){
	var _this = this;
    // change事件
    this.$fileInp.change(function(){
        //检查文件是否选择
        if(!_this.$fileInp.val()){
        	_yoo.errTip('没有选择任何文件');
            return;
        }
        //获取file的引用
        var file = _this.$fileInp[0].files[0];
        // 图片格式
        if(file.type !== 'image/jpeg' && file.type !== 'image/png' && file.type !== 'image/gif'){
            _yoo.errTip('图片格式不正确');
            return;
        }
        // 图片大小
        if(file.size > size){
        	if (size/1024/1024>1) {
            	_yoo.errTip('图片大小不能超过' + size/1024/1024 + 'M');
        	}else{
        		_yoo.errTip('图片大小不能超过' + size/1024 + 'kb');
        	}
            return;
        }
        // 获取file信息
        if (showInfo) {
        	_this.$fileInfo.html('文件'+file.name+'<br>'+'大小'+file.size+'<br>'+'修改'+file.lastModifiedDate+'<br>');
        }
        //读取文件
        var reader = new FileReader();
        reader.onload = function(e){
            _this.data = e.target.result;
            _this.$fileImg.attr("src", _this.data).css("display","block");
	        // 回调函数
	        typeof success === 'function' && success(_this.data.split('base64,')[1]);
        }
        // 以DataURL的形式读取文件:
        reader.readAsDataURL(file);
    });
}

module.exports = Upload;