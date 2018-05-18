var Input 		= require('components/input/index.js')
var Radio 		= require('components/radio/index.js')
var Checkbox 	= require('components/checkbox/index.js')

var color 	= new Radio('radio1')
var fruits = new Checkbox('checkbox1')

$('#submit').click(function(){
	var param = {
		color 	: color.value,
		fruits	: fruits.value,
	}
	console.log(param)
})