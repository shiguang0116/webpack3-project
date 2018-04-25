var SelectTile 	= require('components/selectTile/index.js');
var util 		= require('utils/util.js');

// 选择列表
var component = {
	selectedData: {
		oilfrom: '',
		oiltype: '',
		oilcode: '',
		oillevel: ''
	},
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
		var _this = this;
		var data = {"OilCode":[{"1":"0#"},{"2":"5#"},{"3":"10#"},{"4":"89#"},{"5":"92#"},{"6":"95#"},{"7":"98#"},{"8":"-10#"},{"9":"-20#"},{"10":"-35#"},{"11":"无"}],"OilFrom":[{"1":"中国石化"},{"2":"中国石油"},{"3":"中国海油"},{"4":"中国化工"},{"5":"中国中化"},{"6":"美孚石油"},{"7":"地炼"}],"OilLevel":[{"1":"国Ⅳ"},{"2":"国Ⅴ"},{"3":"国VI"},{"4":"无"}],"OilMap":{"1":{"OilCode":["10","9","8","3","2","1"],"OilFrom":["7","1","6","4","3","2","1"],"OilLevel":["3","2","1"]},"2":{"OilCode":["10","1","2","3","8","9"],"OilFrom":[],"OilLevel":["3","2","1"]},"3":{"OilCode":["5","4","7","6"],"OilFrom":[],"OilLevel":["3","2"]},"4":{"OilCode":["11","100"],"OilFrom":[],"OilLevel":["4"]}},"OilType":[{"1":"普柴"},{"2":"车柴"},{"3":"汽油"},{"4":"轻燃"}]}
    	// 初始化组件
    	new SelectTile('select1',{
			// showRes: true,
			renderData: _this.filterList(data),
			selectedData: _this.selectedData,
			filterFn: function(dataKey){
				return _this.filterList(data, dataKey)
			},
			fn: function(res){
				_this.selectedData = res
				// 条件刷选
				console.log(_this.selectedData)
			}
		})
    },
    filterList : function(data, dataKey){
        return [
			{
				title: "油品来源",
				list: util.getList(data.OilFrom)
			},
			{
				title: "油品种类",
				list: util.getList(data.OilType)
			},
			{
				title: "油品标号",
				list: util.getList(this.filterCodeList(data, dataKey))
			},
			{
				title: "油品级别",
				list: util.getList(this.filterLevelList(data, dataKey))
			}
		];
    },
    filterCodeList: function(data, dataKey){
        if (dataKey) {
        	var a = data.OilMap[dataKey]['OilCode'];
	        return data.OilCode.filter(function(item){
	            return Object.keys(item).some(function(key){
	                return a.indexOf(key) > -1
	            })
	        })
        }
		return data.OilCode
    },
    filterLevelList: function(data, dataKey){
        if (dataKey) {
        	var a = data.OilMap[dataKey]['OilLevel'];
	        return data.OilLevel.filter(function(item){
	            return Object.keys(item).some(function(key){
	                return a.indexOf(key) > -1
	            })
	        })
        }
		return data.OilLevel
    },
    bindEvent : function(){
        var _this = this;
    }
};

component.init()


