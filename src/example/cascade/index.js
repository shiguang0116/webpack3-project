var Cascade 	= require('components/cascade/index.js')
// var data 		= require('components/cascade/cities.js')

var data = [
		        {
		            value: 'beijing',
		            name: '北京',
		            children: [
		                {
		                    value: 'gugong',
		                    name: '故宫'
		                },
		                {
		                    value: 'tiantan',
		                    name: '天坛'
		                },
		                {
		                    value: 'wangfujing',
		                    name: '王府井'
		                }
		            ]
		        }, 
		        {
		            value: 'jiangsu',
		            name: '江苏',
		            children: [
		                {
		                    value: 'nanjing',
		                    name: '南京',
		                    children: [
		                        {
		                            value: 'fuzimiao',
		                            name: '夫子庙',
		                        }
		                    ]
		                },
		                {
		                    value: 'suzhou',
		                    name: '苏州',
		                    children: [
		                        {
		                            value: 'zhuozhengyuan',
		                            name: '拙政园',
		                        },
		                        {
		                            value: 'shizilin',
		                            name: '狮子林',
		                        }
		                    ]
		                }
		            ],
		        }
	        ]
var city 	= new Cascade('cascade1', {
	data : data
})

$('.btn').click(function(){
	var param = {
		city	: city.value
	}
	console.log(param)
})

// new Vue({
//     el: '#app2',
//     data () {
//         return {
//             value1: [],
//             data: [
// 		        {
// 		            value: 'beijing',
// 		            name: '北京',
// 		            children: [
// 		                {
// 		                    value: 'gugong',
// 		                    name: '故宫'
// 		                },
// 		                {
// 		                    value: 'tiantan',
// 		                    name: '天坛'
// 		                },
// 		                {
// 		                    value: 'wangfujing',
// 		                    name: '王府井'
// 		                }
// 		            ]
// 		        }, 
// 		        {
// 		            value: 'jiangsu',
// 		            name: '江苏',
// 		            children: [
// 		                {
// 		                    value: 'nanjing',
// 		                    name: '南京',
// 		                    children: [
// 		                        {
// 		                            value: 'fuzimiao',
// 		                            name: '夫子庙',
// 		                        }
// 		                    ]
// 		                },
// 		                {
// 		                    value: 'suzhou',
// 		                    name: '苏州',
// 		                    children: [
// 		                        {
// 		                            value: 'zhuozhengyuan',
// 		                            name: '拙政园',
// 		                        },
// 		                        {
// 		                            value: 'shizilin',
// 		                            name: '狮子林',
// 		                        }
// 		                    ]
// 		                }
// 		            ],
// 		        }
// 	        ]
//         }
//     }
// })
