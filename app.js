/**
 * Created by xinbob on 4/5/17.
 */

var http = require('http');
// var fs = require('fs');
// var template = require('art-template');

// 通过node执行app的时候 其实所有的依赖都已经被加载进来了
var render = require('./render');
var router = require('./router');

var server = http.createServer();

server.on('request', function (req, res) {

    // 初始化 render
    render(res);

    // 初始化路由
    router(req, res);
});


server.listen(3000, function () {
    console.log('server is running...');
});