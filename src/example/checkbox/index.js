var Checkbox 	= require('components/checkbox/index.js')

var fruits = new Checkbox('checkbox1')

$('#submit').click(function(){
	var param = {
		fruits	: fruits.value,
	}
	console.log(param)
})