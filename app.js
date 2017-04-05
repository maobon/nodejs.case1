/**
 * Created by xinbob on 4/5/17.
 */

var http = require('http');
var fs = require('fs');
var template = require('art-template');

var server = http.createServer();

server.on('request', function (req, res) {
    // 请求路径
    var url = req.url;
    // 请求方法
    var method = req.method.toLowerCase();

    // 初始化 render
    initRender(res);

    /**
     * index 首页
     */
    if (method === 'get' && url === '/') {
        // 开放首页
        fs.readFile('./db.json', 'utf8', function (err, data) {
            if (err) throw err;

            data = JSON.parse(data);
            res.render('index', data);
        })

    }

    /**
     * add 添加英雄
     */
    else if (method === 'get' && url === '/add') {
        res.render('add', {
            title: 'NodeJS'
        });

    } else if (method === 'post' && url === '/add') {

        // 接收数据
        // (查询字符串格式) 客户端post发送过来的数据
        var content = ''; // username=xinyi&age=28&home=beijing

        // request对象的data事件中接收
        // 每接收一段 就回调一次该事件
        // form表单可能一段一段发送过来
        req.on('data', function (chunk) {
            content += chunk;
        });

        // request对象的end事件 参数传递完成时回调
        req.on('end', function () {
            content = decodeURI(content);

            // 将查询字符串格式的数据转为{ }
            var body = {};
            content.split('&').forEach(function (item) {
                var temp = item.split('=');
                body[temp[0]] = temp[1];
            });

            // 先查询数据库文件 修改后再写回去
            fs.readFile('./db.json', function (err, data) {
                // 读文件 data是string类型

                if (err) {
                    res.end(JSON.stringify({
                        err_code: 500,
                        message: err.message
                    }))
                }

                // String转{ }
                data = JSON.parse(data);
                data.heros.push({
                    id: 1,
                    name: body.name,
                    gender: body.gender,
                    avatar: 'img/133.jpg'
                });

                // { }转String 准备写入数据库
                data = JSON.stringify(data, null, '    ');

                // 写入数据库
                fs.writeFile('./db.json', data, function (err) {
                    if (err) {
                        // 发生错误 返回错误信息给服务端 JSON格式
                        res.end(JSON.stringify({
                            err_code: 500,
                            message: err.message
                        }))
                    }

                    // 写入成功 返回给客户端
                    res.end(JSON.stringify({
                        err_code: 0,
                    }));
                })


            })

        });
    }

    /**
     * 开放资源的请求
     */
    else if (method === 'get' && url.indexOf('/node_modules/') === 0
        || url.indexOf('/img/') === 0) {
        // 开放页面资源请求

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