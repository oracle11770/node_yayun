// 引入模块
var express = require('express');
var path = require('path');
var ejs = require('ejs');
 
var app = express();
 
// 设置views路径和模板
app.set('views', './views');
app.set('view engine','ejs');
// app.set('view engine','html')
// app.engine('html', ejs.renderFile);
 
// 静态文件配置
app.use('/',express.static(path.join(__dirname, './static'))); 
// app.use('/static', express.static(path.join(__dirname, '/static')));



app.use(async function(req, res, next) {
    await next()
})

// 预加载路由处理
var router = require('./router/router')
router.init(app)


// 启动一个服务，监听从8888端口进入的所有连接请求
var server = app.listen(3000, function(){
    var host = server.address().address;
    var port = server.address().port;
    console.log('Listening at', host, port);
}); 