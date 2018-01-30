var Select 		= require('util/select/index.js')
var _yoo 		= require('util/yoo.js')

var data = [{"1":"中国石化"},{"2":"中国石油"},{"3":"中国海油"},{"4":"中国化工"},{"5":"中国中化"},{"6":"美孚石油"},{"7":"地炼"}]
var city 	= new Select('select1',{
	data: _yoo.getList(data)
})