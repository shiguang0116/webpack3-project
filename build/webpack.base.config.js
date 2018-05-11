'use strict'
const webpack             = require('webpack');
const path                = require('path');
const ExtractTextPlugin   = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin   = require('html-webpack-plugin');
const util                = require('./util.js');
const config              = require('./config.js');

// 配置
const webpackBaseConfig = {
    entry: Object.assign(util.getEntries('./src/pages/**/*.js'),
        {'app' : ['@/main.js']}
    ),
    output: {
        path        : config.assetsRoot,   //存放打包后文件的输出目录 
        filename    : util.assetsPath('js/[name].js'),
        publicPath  : config.assetsPublicPath,                                  //指定资源文件引用的目录 
    },
    module: {
        rules: [
            { 
                test: /\.css$/, 
                loader: ExtractTextPlugin.extract({  
                    fallback: "style-loader",  
                    use: "css-loader"  
                })
            },
            { 
                test: /\.less$/, 
                loader: ExtractTextPlugin.extract({  
                    fallback: "style-loader",  
                    use: "css-loader!less-loader"
                }) 
            },
            { 
                test: /\.(png|jpe?g|gif|svg|woff2?|eot|ttf|otf)\??.*$/, 
                loader: 'url-loader',
                options: {
                    limit: 100,
                    name: util.assetsPath('image/[name].[ext]')
                }
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
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
        ]
    },
    // 配置路径
    resolve : {
        extensions: ['.vue', '.js', ',json'],
        alias : {
            'vue'           : 'vue/dist/vue.js',
            'build'         : path.resolve(__dirname, '../build'),
            '@'             : path.resolve(__dirname, '../src'),
            'common'        : path.resolve(__dirname, '../src/common'),
            'components'    : path.resolve(__dirname, '../src/components'),
            'pages'         : path.resolve(__dirname, '../src/pages'),
            'utils'         : path.resolve(__dirname, '../src/utils')
        },
    },
    plugins: [
        // 独立通用模块
        new webpack.optimize.CommonsChunkPlugin({
            name : 'app',
            minChunks: 3,
        }),
        // 把css单独打包到文件里
        new ExtractTextPlugin(util.assetsPath('css/[name].css')),
    ]
};

// 配置html文件
const pages = util.getEntries('./src/pages/**/*.html')
for(let page in pages) {
    let urlType = util.urlType(page)
    let title = util.title(page)
    let baseTitle = ' - 及时油'
    let conf = {
        template    : pages[page], 
        filename    : urlType + '/' + page + '.html',
        title       : title + baseTitle,
        favicon     : './favicon.ico',
        inject      : true,
        hash        : true,
        chunks      : ['app', page],
        chunksSortNode: 'dependency'
    }
    webpackBaseConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

module.exports = webpackBaseConfig;
