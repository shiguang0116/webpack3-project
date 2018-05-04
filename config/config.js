var webpack             = require('webpack');
var path                = require('path');
var ExtractTextPlugin   = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin   = require('html-webpack-plugin');

var config              = require('./index.js');
var util                = require('./util.js');

// 环境变量配置，dev / online
var env                 = process.env.WEBPACK_ENV || 'dev';

// 配置
var config = {
    entry: Object.assign(util.getEntries('./src/pages/**/*.js'),
        {'main' : ['./src/main.js']}
    ),
    output: {
        path        : config.dev.assetsRoot,                //存放打包后文件的输出目录 
        filename    : util.assetsPath('js/[name].js'),
        publicPath  : config.dev.assetsPublicPath,          //指定资源文件引用的目录 
    },
    devServer: {
        contentBase: config.dev.assetsRoot,     //本地服务器所加载的页面所在的目录
        inline: true
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
                loader: 'url-loader?limit=100&name='+util.assetsPath('image/[name].[ext]') //!image-webpack?{ progressive:true, optimizationLevel: 7 }
                // loader: 'url-loader',
                // options: {
                //     limit: 10000,
                //     name: util.assetsPath('image/[name].[hash:7].[ext]')
                // }
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
        ]
    },
    // 配置路径
    resolve : {
        extensions: ['', '.vue', '.js', ',json'],
        alias : {
            'vue'           : 'vue/dist/vue.js',
            '@'             : path.resolve(__dirname, './src'),
            'common'        : path.resolve(__dirname, './src/common'),
            'components'    : path.resolve(__dirname, './src/components'),
            'pages'         : path.resolve(__dirname, './src/pages'),
            'utils'         : path.resolve(__dirname, './src/utils')
        },
    },
    plugins: [
        // 独立通用模块
        new webpack.optimize.CommonsChunkPlugin({
            name : 'main',
            filename : util.assetsPath('js/main.js'),
            minChunks: 3,
        }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name : 'vendor',
        //     filename : 'js/vendor.js',
        //     chunks: ['vendor'],
        //     minChunks: Infinity , //保证 vendor entry 里的模块都只放在 vendor.js 里
        // }),
        // 把css单独打包到文件里
        new ExtractTextPlugin(util.assetsPath('css/[name].css')),
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
