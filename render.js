/**
 * Created by xinbob on 4/5/17.
 *
 * 初始化 render
 * 将渲染方法作为response对象的一个属性进行添加
 *
 * @param res response
 */

var fs = require('fs');
var template = require('art-template');

module.exports = function (res) {

    // 向response对象上面添加一个属性render 也是一个方法

    /**
     * 真实数据渲染页面
     *
     * @param tplName  模板名称
     * @param data     真实数据
     */
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
};