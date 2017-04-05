/**
 * Created by xinbob on 4/5/17.
 */

var http = require('http');
// var fs = require('fs');
// var template = require('art-template');

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