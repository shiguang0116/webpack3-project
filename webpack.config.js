var webpack             = require('webpack');
var path                = require('path');
var ExtractTextPlugin   = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin   = require('html-webpack-plugin');
var fs                  = require('fs');
var util                = require('./webpack.util.js');

var env                 = util.trim(process.env.WEBPACK_ENV)

fs.open('./env.js', 'w', function(err, fd) {
    var buf = env === 'dev' ? 'export default "dev";' : 'export default "online";';
    fs.write(fd, buf, 0, buf.length, 0, function(err, written, buffer) {});
});

// 配置
var config = {
    entry: Object.assign(util.getEntries('./src/pages/**/*.js'),
        {'main' : ['./src/main.js']}
    ),
    output: {
        path        : path.resolve(__dirname, './dist/'),   //存放打包后文件的输出目录 
        filename    : util.assetsPath('js/[name].js'),
        publicPath  : '/',                                  //指定资源文件引用的目录 
    },
    devServer: {
        contentBase: "./dist", //本地服务器所加载的页面所在的目录
        inline: true,
        host: 'localhost',
        port: 8080,
        open: true,
        openPage: '/index',
        proxy: {
            "/api": {
                target: "http://192.168.31.234",
                pathRewrite: {"^/api" : ""}     //后面是重写的新路径
            }
        }
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

module.exports = config;
