/**
 * Created by xinbob on 4/5/17.
 */

var fs = require('fs');
var handler = require('./handler');
var url = require('url');

module.exports = function (req, res) {

    // 请求路径
    var reqUrl = req.url;
    // 请求方法
    var method = req.method.toLowerCase();

    // NodeJS 核心模块 url模块 方便处理URL
    var parseObj = url.parse(reqUrl, true);

    var pathname = parseObj.pathname;
    req.query = parseObj.query;


    /**
     * index 首页
     */
    if (method === 'get' && pathname === '/') {
        handler.showIndex(req, res);
    }

    /**
     * add 添加
     * 英雄
     */
    else if (method === 'get' && pathname === '/add') {
        handler.showAdd(req, res);

    } else if (method === 'post' && pathname === '/add') {
        handler.doAdd(req, res);
    }

    /**
     * 开放访问静态资源
     */
    else if (method === 'get' && pathname.indexOf('/node_modules/') === 0
        || pathname.indexOf('/img/') === 0 || pathname.indexOf('/upload/') === 0) {

        handler.handleStaticRes(req, res);
    }

    /**
     * 查询
     * 某一位英雄的信息
     */
    else if (method === 'get' && pathname === '/info') {
        handler.showHeroInfo(req, res);
    }

    /**
     * 编辑
     * 某一位英雄的信息
     */
    else if (method === 'get' && pathname === '/edit') {
        handler.showEditHeroInfo(req, res);
    } else if (method === 'post' && pathname === '/edit') {
        handler.doEditHeroInfo(req, res);
    }


    /**
     * 上传图片预览接口
     */
    else if (method === 'post' && pathname === '/upload') {
        handler.doUpload(req, res);
    }

    /**
     * 查看全部英雄 单纯请求数据
     */
    else if (method === 'get' && pathname === '/checkall') {
        handler.getAllHero(req, res);
    }

    /**
     *
     */
    else if (method === 'get' && pathname === '/delete') {
        handler.deleteHero(req, res);
    }

};
