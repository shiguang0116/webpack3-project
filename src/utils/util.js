'use strict';

var Hogan = require('hogan.js');
var conf = {
    serverHost : ''
};

var util = {
    // 网络请求
    request : function(param){
        var _this = this;
        $.ajax({
            type        : param.method  || 'POST',
            url         : param.url     || '',
            dataType    : param.type    || 'json',
            data        : param.data    || '',
            success     : function(res){
                // 请求数据成功
                if(res.ReturnCode === 'success'){
                    typeof param.success === 'function' && param.success(res.ReturnData, res.ReturnMessage);
                }
                // 请求数据错误
                else if(res.ReturnCode === 'error'){
                    typeof param.error === 'function' && param.error(res.ReturnMessage);
                }
                // 没有登录状态，需要强制登录
                else if(res.status === 10){
                    _this.doLogin();
                }
            },
            error       : function(err){
                typeof param.error === 'function' && param.error(err.statusText);
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
        window.location.href = '/assets/index/user-login.html?redirect=' + encodeURIComponent(window.location.href);
    },
    goHome : function(){
        window.location.href = '/assets/index/index.html';
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

module.exports = util;