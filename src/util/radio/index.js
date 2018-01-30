require('./index.css')

// radio
function Radio(id){
	this.oParent = $('#' + id)
	this.oItem = this.oParent.find('.sg-radio-item')
	this.value = this.oParent.find('.sg-radio-checked').attr('data-value')
	this.init()
}
Radio.prototype.init = function(){
	var _this = this
	this.oItem.click(function(){
		$(this).addClass('sg-radio-checked').siblings().removeClass('sg-radio-checked')
		_this.value = $(this).attr('data-value')
	})
}

module.exports = Radio;


