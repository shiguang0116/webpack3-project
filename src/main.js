/**
 * @description: 主入口文件，该文件下的所有引用文件最后会被打包成 main.js 和 main.css
 * @author: guang.shi <https://blog.csdn.net/guang_s> 
 * @date: 2018-01-09 13:39:34 
 */

import './main.less';

import '@/utils/util.js';
import '@/common/header/index.js';
import '@/common/footer/index.js';

// components 全局引用（如果需要单独引用的，在对应页面js文件里引入即可）
import '@/components/empty/empty.js';
