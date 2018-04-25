var Upload = require('components/upload/index.js')

var upload1 = new Upload('file1')
var data = ''
upload1.init({
	size: 20*1024,
	success: function(res){
		data = res
	}
})
$("#get-url").click(function(){
	console.log(data)
})
