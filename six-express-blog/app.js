/**
 * 应用程序启动入口文件
 */

var express = require('express');
var swig = require('swig');

//创建app应用，相当于http.createServer()
var app = express(); 

//配置expres的模板引擎
app.engine('html',swig.renderFile);
//设置模板文件的存放目录
app.set('views','./views');
//第一个参数固定为'view engine'，第二参数是上面的一致
app.set('view engine','html');
app.use('/public',express.static(__dirname+'/public'));


//开发时设置取消模板缓存
swig.setDefaults({cache:false})

// app.get('/',function(req,res,next){
//     /**
//      * 第一个参数对应views下面的名称对应html文件
//      */
//     res.render('index');
// })

app.use('/',require('./routers/main'));    
app.use('/admin',require('./routers/admin'));    
app.use('/api',require('./routers/api'));   


//监听请求
app.listen(8081);