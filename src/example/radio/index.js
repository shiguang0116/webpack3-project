var Radio 		= require('components/radio/index.js')

var color 	= new Radio('radio1')

$('#submit').click(function(){
	var param = {
		color 	: color.value,
	}
	console.log(param)
})