var Select 		= require('components/select/index.js')
var util 		= require('utils/util.js')

var data = [{"1":"中国石化"},{"2":"中国石油"},{"3":"中国海油"},{"4":"中国化工"},{"5":"中国中化"},{"6":"美孚石油"},{"7":"地炼"}]
var city 	= new Select('select1',{
	data: util.getList(data)
})