let route = function(opt){
    Object.assign(this, opt)
 }
 route.routers = {
    // 首页相关路由
    index: function(){
        const router = require('./index');
        this.app.use('/',router);
    }
}
route.init = function(app){
    var obj = new this({
        app : app
    });
    for(var key in route.routers){
        console.log(key+' is added. success.');
        if(route.routers[key] instanceof Function){
            route.routers[key].call(obj);
        }
    }
}
module.exports = route