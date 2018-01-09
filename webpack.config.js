var webpack             = require('webpack');
var ExtractTextPlugin   = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin   = require('html-webpack-plugin');

// 环境变量配置，dev / online
var WEBPACK_ENV         = process.env.WEBPACK_ENV || 'dev';

// 获取html-webpack-plugin参数的方法 
var getHtmlConfig = function(pre, name, title){
    return {
        template    : './src/view/' + name + '.html',
        filename    : pre + '/' + name + '.html',
        favicon     : './favicon.ico',
        title       : title,
        inject      : true,     //当传入 true或者 ‘body’时所有javascript资源将被放置在body元素的底部，“head”则会放在head元素内
        hash        : true,
        chunks      : ['common', name],   //引入文件.js
        // chunksSortMode
    };
};
// webpack config
var config = {
    entry: {
        'common':                       ['./src/page/common/common.js'],
        'index':                        ['./src/page/index/index.js']
    },
    output: {
        publicPath  : '/assets/',                    //指定资源文件引用的目录 
        path        : __dirname + '/assets/',        //存放打包后文件的输出目录 
        filename    : 'js/[name].js'
    },
    module: {
        loaders: [
            { 
                test: /\.css$/, 
                loader: ExtractTextPlugin.extract("style-loader","css-loader") 
            },
            { 
                test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, 
                loader: 'url-loader?limit=100&name=image/[name].[ext]' 
            },
            {
                test: /\.string$/, 
                loader: 'html-loader',
                query : {
                    minimize : true,
                    removeAttributeQuotes : false
                }
            },
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/, // 防止将node_modules 中的js 转码
                loader: 'babel-loader'
            }
        ]
    },
    // 配置路径
    resolve : {
        alias : {
            node_modules    : __dirname + '/node_modules',
            util            : __dirname + '/src/util',
            page            : __dirname + '/src/page',
            service         : __dirname + '/src/service',
            image           : __dirname + '/src/image'
        },
        // extensions: ['html']
    },
    plugins: [
        // 独立通用模块到js/common.js
        new webpack.optimize.CommonsChunkPlugin({
            name : 'common',
            filename : 'js/common.js'
        }),
        // 把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
        // html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index', 'index', '及时油'))
    ]
};

if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8080/');
};

module.exports = config;

// --host 192.168.31.39 -d