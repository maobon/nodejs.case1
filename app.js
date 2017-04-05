/**
 * Created by xinbob on 4/5/17.
 */

var http = require('http');
var fs = require('fs');
var template = require('art-template');

var server = http.createServer();

server.on('request', function (req, res) {
    var url = req.url;
    var method = req.method.toLowerCase();

    initRender(res);

    if (method === 'get' && url === '/') {
        fs.readFile('./db.json', 'utf8', function (err, data) {
            if (err) throw err;

            data = JSON.parse(data);
            res.render('index', data);
        })

    } else if (method === 'get' && url.indexOf('/node_modules/') === 0
        || url.indexOf('/img/') === 0) {

        var filePath = '.' + url;
        fs.readFile(filePath, function (err, data) {
            if (err) return res.end('404 Not Found.');
            res.end(data);
        })
    }

});

/**
 * 初始化 render
 * 将渲染方法作为response对象的一个属性进行添加
 *
 * @param res response
 */
function initRender(res) {
    // 向response对象上面添加一个属性render 也是一个方法
    res.render = function (tplName, data) {
        // 根据模板名 组建模板路径
        var tplPath = './views/' + tplName + '.html';

        // 读取模板 获取模板字符串
        fs.readFile(tplPath, 'utf8', function (err, tplData) {

            // 如果有错误 则直接返回找不到该模板
            if (err) return res.end('Can not find template ' + tplName);

            // var foo = template.complie(模板字符串 其实是html文件);
            // var generateHTML_String = foo(真实数据);
            var strHTML = template.compile(tplData)(data || {});

            res.end(strHTML);
        })
    }
}


server.listen(3000, function () {
    console.log('server is running...');
});