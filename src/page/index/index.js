// 'use strict';

require('./index.css');
var nav     = require('page/common/nav/index.js');
var _yoo    = require('util/yoo.js');
// form组件
require('../../example/form/index.js');
// 组件用例
require('../../example/select/index.js');
require('../../example/cascade/index.js');
require('../../example/datepicker/index.js');
require('../../example/upload/index.js');
require('../../example/selectTile/index.js');
require('../../example/tab/index.js');
require('../../example/slider/index.js');
// 第三方插件
// var echarts = require('echarts') //全部引入
var echarts = require('echarts/lib/echarts'); //按需引入
// 引入折线图
require('echarts/lib/chart/line');          
require('echarts/lib/component/title');     //标题组件
require('echarts/lib/component/legend');    //图例组件
require('echarts/lib/component/tooltip');   //提示框组件
require('echarts/lib/component/toolbox');   //工具箱组件
// 引入饼图
require('echarts/lib/chart/pie');

// 页面
var page = {
    chartOption1: {
        title: {
            text: '油品数据',
            textStyle: {
                color: '#333',
                fontWeight: 500,
            }
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            orient: 'vertical',
            right: '12',
            textStyle: {
                color: '#888',
                fontSize: 14,
                padding: [0, 0, 0, 5]
            },
            data:['柴油','汽油','轻质燃油']
        },
        grid: {
            left: '12',
            right: '20',
            top: '90',
            containLabel: true,
            borderColor: 'red',
            tooltip: {
                borderColor: 'red'
            }
        },
        toolbox: {
            // show: false
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['1月','2月','3月'],
            axisLine : {  
                lineStyle:{  
                    color:'#8F8B8B '  
                }  
            }
        },
        yAxis: {
            type: 'value',
            axisLine : {  
                lineStyle:{  
                    color:'#8F8B8B '  
                }  
            },
            splitLine: {
                lineStyle: {
                    color: '#e9e9e9'
                }
            },
            axisTick: {
                length: '3'
            }
        },
        series: [
            {
                name:'柴油',
                type:'line',
                data:[100, 55, 322],
                itemStyle : {  
                    normal : {  
                        color:'#FAAF76 ',  
                        lineStyle:{  
                            color:'#FAAF76 '  
                        }  
                    }  
                },
            },
            {
                name:'汽油',
                type:'line',
                data:[56, 99, 333],
                itemStyle : {  
                    normal : {  
                        color:'#76CDD3',  
                        lineStyle:{  
                            color:'#76CDD3'  
                        }  
                    }  
                },
            },
            {
                name:'轻质燃油',
                type:'line',
                data:[0, 244, 122],
                itemStyle : {  
                    normal : {  
                        color:'#FFDD76',  
                        lineStyle:{  
                            color:'#FFDD76'  
                        }  
                    }  
                },
            },
        ]
    },
    chartOption2: {
        title: {
            text: '油品比例'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            bottom: '10',
            textStyle: {
                color: '#888',
                fontSize: 14,
                padding: [0, 10, 0, 0]   //上、右、下、左
            },
            data:['柴油','汽油','轻质燃油'],
            itemWidth: 12,
            itemHeight: 12,
            borderRadius: 6,
        },
        series: {
            type: 'pie',
            data: [
                {name: '柴油', value: 12},
                {name: '汽油', value: 23},
                {name: '轻质燃油', value: 19}
            ],
            color:['#FAAF76','#76CDD3','#FFDD76'],
            radius : '55%',
            // label:{            //饼图图形上的文本标签
            //     normal:{
            //         show:true,
            //         position:'inner', //标签的位置
            //         textStyle : {
            //             fontWeight : 300 ,
            //             fontSize : 14    //文字的字体大小
            //         },
            //         formatter:'{d}%'
            //     }
            // },
            itemStyle:{ 
                normal:{ 
                    label:{ 
                       show: true, 
                       formatter: '{b}：{d}%' 
                    }
                } 
            } 
        } 
    },
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        this.drawLine(); // 绘制图表
    },
    bindEvent : function(){
        var _this = this;
    },
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        var myChart1 = echarts.init(document.getElementById('myChart1'))
        var myChart2 = echarts.init(document.getElementById('myChart2'))
        // 绘制图表
        myChart1.setOption(this.chartOption1);
        myChart2.setOption(this.chartOption2);
    },
};

$(function(){
    page.init();
})
