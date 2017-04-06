/**
 * Created by xinbob on 4/5/17.
 *
 * handler
 */

var fs = require('fs');
var formidable = require('formidable');
var model = require('./model');

// NodeJS default  exports = module.exports; return module.exports;
// var handler = module.exports;

/**
 * 显示首页
 *
 * @param req
 * @param res
 */
exports.showIndex = function (req, res) {

    model.queryAll(function (err, data) {
        if (err) {
            res.end(JSON.stringify({
                err_code: 500,
                message: err.message
            }));
        }

        res.render('index', data);
    })
};

/**
 * 查看某位英雄的信息
 *
 * @param req
 * @param res
 */
exports.showHeroInfo = function (req, res) {

    // **** 待处理
    var heroId = req.query.id;

    model.queryHeroById(heroId, function (err, hero) {
        if (err) {
            return res.end(JSON.parse({
                err_code: 500,
                message: err.message
            }));
        }

        // 渲染info.html
        res.render('info', {
            hero: hero
        });
    })
};


/**
 * 查看某位英雄的信息
 *
 * @param req
 * @param res
 */
exports.showEditHeroInfo = function (req, res) {

    // **** 待处理
    var heroId = req.query.id;

    model.queryHeroById(heroId, function (err, hero) {
        if (err) {
            return res.end(JSON.parse({
                err_code: 500,
                message: err.message
            }));
        }

        // edit.html
        res.render('edit', {
            hero: hero
        });
    })
};

/**
 * 编辑某一位英雄的信息
 *
 * @param req
 * @param res
 */
exports.doEditHeroInfo = function (req, res) {
    // formidable 插件
    var form = new formidable.IncomingForm();

    form.uploadDir = "./img/";
    form.keepExtensions = true;

    form.parse(req, function (err, fields, files) {
        if (err) {
            res.end(JSON.stringify({
                err_code: 500,
                message: err.message
            }));
        }

        var body = fields;


    });

};


/**
 * 显示添加英雄
 *
 * @param req
 * @param res
 */
exports.showAdd = function (req, res) {
    res.render('add', {
        title: 'NodeJS'
    });
};


/**
 * 添加英雄
 *
 * @param req
 * @param res
 */
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

};


/**
 * 处理静态资源
 *
 * @param req
 * @param res
 */
exports.handleStaticRes = function (req, res) {
    // 开放页面资源请求
    var filePath = '.' + req.url;
    fs.readFile(filePath, function (err, data) {
        if (err) return res.end('404 Not Found.');
        res.end(data);
    })
};





