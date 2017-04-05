/**
 * Created by xinbob on 4/5/17.
 */

var fs = require('fs');
var handler = require('./handler');


module.exports = function (req, res) {

    // 请求路径
    var url = req.url;
    // 请求方法
    var method = req.method.toLowerCase();

    /**
     * index 首页
     */
    if (method === 'get' && url === '/') {
        handler.showIndex(req, res);
    }

    /**
     * add 添加英雄
     */
    else if (method === 'get' && url === '/add') {
        handler.showAdd(req, res);

    } else if (method === 'post' && url === '/add') {
        handler.doAdd(req, res);
    }

    /**
     * 静态资源
     */
    else if (method === 'get' && url.indexOf('/node_modules/') === 0
        || url.indexOf('/img/') === 0) {

        handler.handleStaticRes(req, res);
    }

};
