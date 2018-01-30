var Radio 		= require('util/radio/index.js')
var Checkbox 	= require('util/Checkbox/index.js')

var color 	= new Radio('radio1')
var fruits = new Checkbox('checkbox1')

$('#submit').click(function(){
	var param = {
		color 	: color.value,
		fruits	: fruits.value,
	}
	console.log(param)
})