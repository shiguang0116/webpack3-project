/**
 * @description: webpack基础配置文件
 * @author: guang.shi <https://blog.csdn.net/guang_s> 
 * @date: 2018-01-09 11:37:29 
 */
'use strict';

const webpack             = require('webpack');
const path                = require('path');
const ExtractTextPlugin   = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin   = require('html-webpack-plugin');
const CopyWebpackPlugin   = require('copy-webpack-plugin');
const ejs                 = require('ejs');
const util                = require('./util.js');
const config              = require('./config.js');

function resolve(_path){
    return path.resolve(__dirname, '../' + _path);
}

// 配置
const webpackBaseConfig = {
    entry: Object.assign(util.getEntries('./src/pages/**/*.js'),
        { 'main' : '@/main.js' }
    ),
    output: {
        path        : config.assetsRoot,            // 打包后文件的输出目录 
        filename    : 'js/[name].[chunkhash:7].js', // 打包后的文件路径
        publicPath  : config.assetsPublicPath,      // 指定资源文件引用的目录 
    },
    module: {
        rules: [
            { 
                test: /\.css$/, 
                use: ExtractTextPlugin.extract({  
                    fallback: "style-loader",  
                    use: ['css-loader','postcss-loader']
                })
            },
            { 
                test: /\.less$/, 
                use: ExtractTextPlugin.extract({  
                    fallback: "style-loader",  
                    use: [
                        { loader: 'css-loader' },
                        { 
                            loader: 'postcss-loader',
                            options: {
                                // plugins: function() {
                                //     return [
                                //         //一定要写在require("autoprefixer")前面，否则require("autoprefixer")无效
                                //         require('postcss-import')(),
                                //         require("autoprefixer")({
                                //             "browsers": ["Android >= 4.1", "iOS >= 7.0", "ie >= 8"]
                                //         })
                                //     ];
                                // }
                            } 
                        },
                        { loader: 'less-loader' },
                    ]
                }) 
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'images/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'fonts/[name].[hash:7].[ext]'
                }
            },
            {
                test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: 'media/[name].[hash:7].[ext]'
                }
            },
            // {
            //     test: /\.html$/,
            //     exclude: /node_modules/,
            //     use: [{
            //         loader: 'html-loader',
            //         options: {
            //             // minimize: true,
            //             // interpolate: 'require'
            //         }
            //     }]
            // },
            // {
            //     test: /\.js$/,
            //     loader: 'babel-loader',
            //     exclude: /node_modules/
            // },
        ]
    },
    // htmlLoader: {
    //     ignoreCustomFragments: [/\{\{.*?}}/],
    //     root: path.resolve(__dirname, 'dist'),
    //     attrs: ['img:src', 'link:href', 'script:src']
    // },
    externals : {
        'jquery' : 'window.jQuery'  // 在编译时，会把 require('jquery') 替换成 window.jQuery
    },
    // 配置路径
    resolve : {
        extensions: ['.js', '.json'],
        alias : {
            'build' : resolve('build'),
            'dist'  : resolve('dist'),
            '@'     : resolve('src'),
        },
    },
    plugins: [
        // 把通用模块打包到 main.js 里面
        new webpack.optimize.CommonsChunkPlugin({
            name : 'main',
            minChunks: 3,
        }),
        // 把 css 单独打包到文件里
        new ExtractTextPlugin('css/[name].[contenthash:7].css'),
        // 复制文件
        new CopyWebpackPlugin([
            {
                from: resolve('src/libs/**/*.js'),
                to: 'js/[name].[ext]',
                toType: 'template',
            },
            {
                from: resolve('src/libs/**/*.css'),
                to: 'css/[name].[ext]',
                toType: 'template',
            }
        ])
    ]
};

// 配置html文件
const pageObj = util.getEntries('./src/pages/**/*.html');
for(let page in pageObj) {
    let title = util.title(page);
    let conf = {
        pageData  : {
            title: title,
            url: pageObj[page]
        },
        template    : './src/main.html',    // 模板路径
        filename    : page + '.html',   // 打包后的文件路径
        favicon     : './favicon.ico',  // 图标路径
        inject      : true,     // js文件将被放置在body元素的底部
        // minify      : true,     // 压缩
        chunks      : ['main', page],   // 只引入 main 和该页面对应的 js/css 文件
        chunksSortMode: 'manual'    // 控制 chunk 的排序。none | auto（默认）| dependency（依赖）| manual（手动）| {function}
    };
    webpackBaseConfig.plugins.push(new HtmlWebpackPlugin(conf));
}

// 处理ejs语法
global.ejsRender = ejs.render;

// // 自定义插件，处理ejs语法
// function MyPlugin(options) {
//     this.options = options || {};
// }
// MyPlugin.prototype.apply = function(compiler) {
//     compiler.plugin('compilation', function(compilation, options) {
//         // 在html加工前，对里面的ejs语法进行处理
//         compilation.plugin('html-webpack-plugin-before-html-processing', function(htmlPluginData, callback) {
//             htmlPluginData.html = ejs.render(htmlPluginData.html, {
//                 page: htmlPluginData.plugin.options.pageData || {}
//             });
//             callback( null, htmlPluginData );
//         } );
//     });
// };
// webpackBaseConfig.plugins.push(new MyPlugin());

module.exports = webpackBaseConfig;
