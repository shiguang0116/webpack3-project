'use strict';
import env from 'build/env.js';
import Hogan from 'hogan.js';

const baseurl     = env === 'development' ? '/api' : '';

const util = {
    getApiUrl : function(param){
        let apiURL  = param.apiURL || '/api',
            url     = param.url || '';
        if (env === 'development') {
            if (url.indexOf('://') > -1) {
                let index = url.indexOf('/',url.indexOf('://')+3)
                url = url.substring(index)
            }
        }else{
            apiURL = ''
        }
        return apiURL + url
    },
    // 网络请求
    ajax : function(param){
        var _this = this;
        $.ajax({
            type        : param.method || 'POST',
            url         : util.getApiUrl({
                            apiURL: param.apiURL || '',
                            url: param.url || '',
                        }),
            data        : param.data || '',
            dataType    : param.type || 'json',
            success     : function(res){
                var res = res
                // 请求数据成功
                if(res.ReturnCode === 'success'){
                    typeof param.success === 'function' && param.success(res.ReturnData);
                }
                // 请求数据错误
                else if(res.ReturnCode === 'error'){
                    util.errTip(res.ReturnMessage)
                }
                // 没有登录状态，需要强制登录
                else if(res.status === 10){
                    _this.doLogin();
                }
            },
            error       : function(err){
                util.errTip(err.statusText)
            }
        });
    },
    // 获取服务器地址
    getServerUrl : function(path){
        return conf.serverHost + path;
    },
    // 获取url参数
    getUrlParam : function(name){
        var reg     = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
        var result  = window.location.search.substr(1).match(reg);
        return result ? decodeURIComponent(result[2]) : null;
    },
    // 渲染html模板
    renderHtml : function(htmlTemplate, data){
        var template    = Hogan.compile(htmlTemplate),
            result      = template.render(data);
        return result;
    },
     // 字段的验证，支持非空、手机、邮箱的判断
    validate : function(value, type){
        var value = $.trim(value);
        // 非空验证
        if('require' === type){
            return !!value;
        }
        // 手机号验证
        if('phone' === type){
            return /^1\d{10}$/.test(value);
        }
        // 邮箱格式验证
        if('email' === type){
            return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
        }
    },
    // 统一登录处理
    doLogin : function(){
        window.location.href = '/index/user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    goHome : function(){
        window.location.href = '/index/index.html';
    },
    // 成功提示
    sucTip : function(msg, time){
        var msg     = msg || '操作成功！',
            time    = time || 5000;
        $("#sg-msg").addClass('sg-msg-success').find('.sg-msg-text').html(msg);
        $("#sg-msg").animate({top: "50px",opacity: "1"}, 300).delay(time).fadeOut(300);
    },
    // 错误提示
    errTip : function(msg, time){
        var msg     = msg || '操作失败！',
            time    = time || 5000;
        $("#sg-msg").addClass('sg-msg-error').find('.sg-msg-text').html(msg);
        $("#sg-msg").animate({top: "50px",opacity: "1"}, 300).delay(time).fadeOut(300);
    },
    // 模态框
    modal : function(param){
        var title       = param.title || '确定',
            content     = param.content || '确定执行此操作吗？',
            cancelText  = param.cancelText || '取消',
            confirmText = param.confirmText || '确定',
            cancelFn    = param.cancelFn || '',
            confirmFn   = param.confirmFn || '';
        $("#sg-modal-title span").text(title);
        $("#sg-modal-body").text(content);
        $("#sg-modal-cancel").text(cancelText);
        $("#sg-modal-confirm").text(confirmText);
        // 显示与关闭模态框
        $("#sg-modal").fadeIn(300);
        $("#sg-modal-close").click(function(){
            $("#sg-modal").css("display","none")
        });
        $("#sg-modal").click(function(){
            $("#sg-modal").css("display","none")
        });
        // 确定按钮回调函数
        $("#sg-modal-confirm").click(function(){
            $("#sg-modal").css("display","none")
            typeof confirmFn === 'function' && confirmFn();
        });
        // 取消按钮回调函数
        $("#sg-modal-cancel").click(function(){
            $("#sg-modal").css("display","none")
            typeof cancelFn === 'function' && cancelFn();
        });
        // 阻止冒泡
        $("#sg-modal-con").click(function(event){
            event.stopPropagation();
        })
    },
    modalPhoto: function(param){
        var title   = param.title || '图片';
        if (param.url) {
            $("#sg-modal-photo-body img").attr("src",param.url).css("display","inline-block");
        }else if(param.text){
            $("#sg-modal-photo-body .text").text(param.text).css("display","block");
        }
        $("#sg-modal-photo-title").text(title);
        // 显示与关闭模态框
        $("#sg-modal-photo").fadeIn(300);
        $("#sg-modal-photo-close").click(function(){
            $("#sg-modal-photo").css("display","none")
        });
        $("#sg-modal-photo").click(function(){
            $("#sg-modal-photo").css("display","none")
        });
        // 阻止冒泡
        $("#sg-modal-photo-con").click(function(event){
            event.stopPropagation();
        })
    },
    //设置cookie
    setCookie: function(c_name,c_pwd,exdays) {
        var exdate=new Date();//获取时间
        exdate.setTime(exdate.getTime() + 24*60*60*1000*exdays);//保存的天数
        //字符串拼接cookie
        window.document.cookie="userName"+ "=" +c_name+";path=/;expires="+exdate.toGMTString();
        window.document.cookie="userPwd"+"="+c_pwd+";path=/;expires="+exdate.toGMTString();
    },
    //读取cookie
    getCookie:function (formData) {
        if (document.cookie.length>0) {
          var arr=document.cookie.split('; ');//这里显示的格式需要切割一下自己可输出看下
          for(var i=0;i<arr.length;i++){
            var arr2=arr[i].split('=');//再次切割
            //判断查找相对应的值
            if(arr2[0]=='userName'){
              formData.username=arr2[1];//保存到保存数据的地方
            }else if(arr2[0]=='userPwd'){
              formData.password=arr2[1];
            }
          }
        }
    },
    //清除cookie
    clearCookie:function () {
        this.setCookie("","",-1);//修改2值都为空，天数为负1天就好了
    },
    // 拆数组
    sliceArray: function(arr, num){
        var result = [];
        for(var i = 0; i<arr.length; i+=num) {
            result.push(arr.slice(i, i+num))
        }
        return result;  
    },
    // 复制
    copyText : function (oInp,obj) {
        oInp.value = obj.innerText; // 修改文本框的内容
        oInp.select(); // 选中文本
        document.execCommand("copy"); // 执行浏览器复制命令
    },
    // 格式化数据
    getList : function(obj){
        var list = [],
            obj  = obj || [];
        for (var i=0; i<obj.length; i++) {
            list.push({
                key: Object.keys(obj[i])[0],
                value: Object.values(obj[i])[0]
            })
        }
        return list
    },
    // 数据过滤
    filterList : function(obj){
        return obj
    },
    // 条件刷选
    filterSelected : function (obj) {
        var selectData = obj.selectData;
        if (obj.productList) {
            var product = obj.productList;
        }else{
            var product = obj.orderList;
        }
        if (!product) {
            return product;
        }
        // 条件过滤
        if (selectData.type || 
            selectData.from || 
            selectData.mark || 
            selectData.level || 
            obj.searchData ) {
            return  product.filter(function (item) {
                return Object.keys(item).some(function(key) {
                    return  (selectData.type ? item.OilType == selectData.type : true) &&
                            (selectData.from ? item.OilFrom == selectData.from : true) &&
                            (selectData.mark ? item.OilCode == selectData.mark : true) &&
                            (selectData.level ? item.OilLevel == selectData.level : true) &&
                            (obj.searchData ? String(item[key]).toLowerCase().indexOf(obj.searchData.toLowerCase()) > -1 : true)

                })
            })
        }
        return product;
    },
    // 排序

    // 事件监听
    addEvent : function (obj, event, fn, type){
        var type = type || false
        if(obj.attachEvent){
            obj.attachEvent("on"+event,fn,type)
        }else{
            obj.addEventListener(event,fn,type)
        }
    },
    
};

/********************************************表单验证**************************************************/
util.validate = function(){
    return {
        email: function(value){
            let re = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
            if (!re.test(value)) {
                return true
            }
        },
        number: function(value){
            let re = /^[0-9]+\.?[0-9]*$/;
            if (!re.test(value)) {
                return true
            }
        },
        // 联系电话
        phone: function(value){
            let re = /^1[0-9]{10}$/;
            var re2 = /^((0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
            if (!re.test(this.Phone) && !re2.test(this.Phone)) {
                return true
            }
        }
    }
}

/********************************************字符窜**************************************************/
// 清除前后空格
util.trim = function(str) { 
    return str.replace(/(^\s*)|(\s*$)/g, ""); 
}

/*********************************************日期*******************************************************/

// 获取需要的时间格式
util.getFormatDate = function (param){
    var time    = param.time ? new Date(param.time) : new Date(),   //已知时间
        format  = param.format || 'yyyy-MM-dd';                     //时间格式
    function tf(i){return (i < 10 ? '0' : '') + i};  
    return format.replace(/yyyy|MM|dd|HH|mm|ss/g, function(a){  
        switch(a){  
            case 'yyyy':  
                return tf(time.getFullYear());
                break;  
            case 'MM':  
                return tf(time.getMonth() + 1);  
                break;  
            case 'mm':  
                return tf(time.getMinutes());
                break;  
            case 'dd':  
                return tf(time.getDate());  
                break;  
            case 'HH':  
                return tf(time.getHours());  
                break;  
            case 'ss':  
                return tf(time.getSeconds());  
                break;  
        }  
    })  
};
// 获取上个月的日期
util.getLastMonthData =  function (){
    var now = util.getFormatDate()
    var arr = now.split('-')
    arr[1] = arr[1] - 1
    if (arr[1] == 0) {
        arr[0] = arr[0]-1
        arr[1] = 12
    }
    if (arr[1]<10) {
        arr[1] = '0' + arr[1]
    }
    var last = arr.join('-')
    return last;
}
// 获取前后几天的日期
util.getOtherDay =  function (param){
    var time    = param.time ? new Date(param.time) : new Date(),   //已知时间
        format  = param.format || 'yyyy-MM-dd',                     //时间格式: ''
        dd      = param.dd || 6;                                    //前后几天: number
    var timestamp = time.getTime() + 3600 * 1000 * 24 * dd
    var otherDay = util.getFormatDate({time: timestamp,format:format})
    return otherDay;
}

// 处理页脚
util.handleFooter = function(obj1,obj2,pd,h) { // obj: DOM对象  h: number
    var h = h || 0;
    var sh = document.documentElement.clientHeight; //页面对象高度（即BODY对象高度加上Margin高）
    obj1.style.minHeight = (sh - h) + 'px'; 
    obj1.style.position = 'relative'; 
    obj1.style.paddingBottom = pd + 'px'; 
    obj2.style.position = 'absolute'; 
    obj2.style.bottom = '0'; 
    obj2.style.display = 'block'; 
}

module.exports = util;