/**
 * Created by xinbob on 4/5/17.
 *
 * handler
 */

var fs = require('fs');
var formidable = require('formidable');

// NodeJS default  exports = module.exports; return module.exports;
// var handler = module.exports;

// 显示首页
exports.showIndex = function (req, res) {
    // 开放首页
    fs.readFile('./db.json', 'utf8', function (err, data) {
        if (err) throw err;

        data = JSON.parse(data);
        res.render('index', data);
    })
};

// 显示添加英雄
exports.showAdd = function (req, res) {
    res.render('add', {
        title: 'NodeJS'
    });
};
// 添加英雄
exports.doAdd = function (req, res) {

    // parse a file upload
    var form = new formidable.IncomingForm();

    form.uploadDir = "./img/"; // 配置上传的文件保存路径

    form.keepExtensions = true; // 保持文件扩展名

    form.parse(req, function (err, fields, files) {
        if (err) {
            throw err
        }

        console.log(fields);
        console.log(files.avatar);
    });
    // content = decodeURI(content);

    // 将查询字符串格式的数据转为{ }
    // var body = {};
    // content.split('&').forEach(function (item) {
    //     var temp = item.split('=');
    //     body[temp[0]] = temp[1];
    // });

    // 先查询数据库文件 修改后再写回去
    // fs.readFile('./db.json', function (err, data) {
    //     // 读文件 data是string类型
    //
    //     if (err) {
    //         res.end(JSON.stringify({
    //             err_code: 500,
    //             message: err.message
    //         }))
    //     }
    //
    //     // String转{ }
    //     data = JSON.parse(data);
    //     data.heros.push({
    //         id: 88,
    //         name: body.name,
    //         gender: body.gender,
    //         avatar: 'img/133.jpg'
    //     });
    //
    //     // { }转String 准备写入数据库
    //     data = JSON.stringify(data, null, '    ');
    //
    //     // 写入数据库
    //     fs.writeFile('./db.json', data, function (err) {
    //         if (err) {
    //             // 发生错误 返回错误信息给服务端 JSON格式
    //             res.end(JSON.stringify({
    //                 err_code: 500,
    //                 message: err.message
    //             }))
    //         }
    //
    //         // 写入成功 返回给客户端
    //         res.end(JSON.stringify({
    //             err_code: 0,
    //         }));
    //     })
    // })


};

// 处理静态资源
exports.handleStaticRes = function (req, res) {
    // 开放页面资源请求
    var filePath = '.' + req.url;
    fs.readFile(filePath, function (err, data) {
        if (err) return res.end('404 Not Found.');
        res.end(data);
    })
};





