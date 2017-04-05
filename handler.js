/**
 * Created by xinbob on 4/5/17.
 *
 * handler
 */

var fs = require('fs');
var handler = module.exports;


handler.showIndex = function (req, res) {
    // 开放首页
    fs.readFile('./db.json', 'utf8', function (err, data) {
        if (err) throw err;

        data = JSON.parse(data);
        res.render('index', data);
    })
};

handler.showAdd = function (req, res) {
    res.render('add', {
        title: 'NodeJS'
    });
};

handler.doAdd = function (req, res) {
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
                id: 88,
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

};

handler.handleStaticRes = function (req, res) {
    // 开放页面资源请求
    var filePath = '.' + req.url;
    fs.readFile(filePath, function (err, data) {
        if (err) return res.end('404 Not Found.');
        res.end(data);
    })
};





