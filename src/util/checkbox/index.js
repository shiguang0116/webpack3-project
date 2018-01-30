require('./index.css')

// checkbox复选框
function Checkbox(id){
	this.oParent = $('#' + id)
	this.oItem = this.oParent.find('.sg-checkbox-item')
	this.value = []
	this.init()
}
Checkbox.prototype.init = function(){
	this.getValue();
	var _this = this
	this.oItem.click(function(){
		if ($(this).hasClass('sg-checkbox-checked')) {
			$(this).removeClass('sg-checkbox-checked')
		}else{
			$(this).addClass('sg-checkbox-checked')
		}
		_this.getValue()
	})
}
Checkbox.prototype.getValue = function(){
	this.value = []
	var obj = this.oParent.find('.sg-checkbox-checked')
	for (var i = obj.length - 1; i >= 0; i--) {
		this.value.push(obj.eq(i).attr('data-value'))
	}
}

module.exports = Checkbox;


