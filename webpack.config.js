var webpack             = require('webpack');
var ExtractTextPlugin   = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin   = require('html-webpack-plugin');
var util                = require('./webpack.util.js');

// 环境变量配置，dev / online
var env                 = process.env.WEBPACK_ENV || 'dev';

// 配置
var config = {
    entry: Object.assign(util.getEntries('./src/pages/**/*.js'),
        {'main' : ['./src/main.js']}
    ),
    output: {
        filename    : 'js/[name].js',
        path        : __dirname + '/assets/',   //存放打包后文件的输出目录 
        publicPath  : '/assets/',               //指定资源文件引用的目录 
    },
    module: {
        loaders: [
            { 
                test: /\.css$/, 
                loader: ExtractTextPlugin.extract("style-loader","css-loader") 
            },
            { 
                test: /\.less$/, 
                loader: ExtractTextPlugin.extract("style-loader","css-loader!less-loader") 
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
                test: /\.js$/,
                exclude: /node_modules/, // 防止将node_modules 中的js 转码
                loader: 'babel'
            },
            {
                test: /\.vue$/, 
                loader: 'vue'
            }
        ]
    },
    vue:{
        loaders:{
          js:'babel'
        }
    },
    babel:{
        presets:['es2015', "stage-2"],
        plugins:['transform-runtime']
    },
    // 配置路径
    resolve : {
        extensions: ['', '.vue', '.js', ',json'],
        alias : {
            '@'             : __dirname + '/src',
            'common'        : __dirname + '/src/common',
            'components'    : __dirname + '/src/components',
            'pages'         : __dirname + '/src/pages',
            'utils'         : __dirname + '/src/utils',
            'vue'           : 'vue/dist/vue.js'
        },
        // extensions: ['html']
    },
    plugins: [
        // 独立通用模块
        new webpack.optimize.CommonsChunkPlugin({
            name : 'main',
            filename : 'js/main.js',
            minChunks: 3,
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name : 'vendor',
        //     filename : 'js/vendor.js',
        //     chunks: ['vendor'],
        //     minChunks: Infinity , //保证 vendor entry 里的模块都只放在 vendor.js 里
        // }),
        // 把css单独打包到文件里
        new ExtractTextPlugin("css/[name].css"),
    ]
};

// 配置html文件
var pages = util.getEntries('./src/pages/**/*.html')
for(var page in pages) {
    var urlType = util.urlType(page)
    var title = util.title(page)
    var baseTitle = ' - 及时油'
    var conf = {
        template    : pages[page], 
        filename    : urlType + '/' + page + '.html',
        title       : title + baseTitle,
        inject      : true,
        hash        : true,
        chunks      : ['main', page],
    }
    config.plugins.push(new HtmlWebpackPlugin(conf));
}

if(env === 'dev'){
    config.entry.main.push('webpack-dev-server/client?http://localhost:8080/');
};

module.exports = config;
