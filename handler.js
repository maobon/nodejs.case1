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

    // req.query 使用node url核心模块
    // 直接将请求路径中的查询字符串转为对象 作为一个属性 添加到req对象上面
    // 此处直接使用
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

    // 之前 req.query 使用node url核心模块
    // 直接将请求路径中的查询字符串转为对象 作为一个属性 添加到req对象上面
    // 此处直接使用
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

        if (files.avatar.size === 0) {
            // 用原来的
            body.avatar = fields.origin_avatar;
            fs.unlink(files.avatar.path);

        } else {

            body.avatar = files.avatar.path;
        }

        // 修改库中的英雄信息
        model.updateById(body, function (err) {
            if (err) {
                return res.end(JSON.stringify({
                    err_code: 500,
                    message: err.message
                }))
            }

            res.end(JSON.stringify({
                err_code: 0
            }))
        })

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

    // formidable插件 处理带有文件的表单上传
    var form = new formidable.IncomingForm();

    form.uploadDir = "./img/"; // 配置上传的文件保存路径
    form.keepExtensions = true; // 保持文件扩展名

    // 获取客户端传递过来的参数
    form.parse(req, function (err, fields, files) {
        if (err) {
            throw err;
        }

        // 表单数据
        var body = fields;
        // 头像
        // body.avatar = files.avatar.path;

        body.avatar = body.avatar_src;

        // 写入数据库
        model.addHero(body, function (err) {
            if (err) {
                return res.end(JSON.stringify({
                    err_code: 500,
                    message: err.message
                }));
            }

            // 写入db成功后返回给客户端 写入成功
            res.end(JSON.stringify({
                err_code: 0
            }));
        })

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

/**
 * 上传头像预览
 *
 * @param req
 * @param res
 */
exports.doUpload = function (req, res) {

    // formidable插件 处理带有文件的表单上传
    var form = new formidable.IncomingForm();

    form.uploadDir = "./upload/"; // 配置上传的文件保存路径
    form.keepExtensions = true; // 保持文件扩展名

    // 获取客户端传递过来的参数
    form.parse(req, function (err, fields, files) {
        if (err) {
            return res.end(JSON.stringify({
                err_code: 500,
                message: err.message
            }));
        }

        var body = fields;
        // 临时头像 预览使用
        body.avatar = files.avatar.path;

        res.end(JSON.stringify({
            err_code: 0,
            result: '/' + body.avatar
        }))
    });

}




