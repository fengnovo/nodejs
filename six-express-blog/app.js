/**
 * 应用程序启动入口文件
 */

var express = require('express');
var swig = require('swig');

//创建app应用，相当于http.createServer()
var app = express(); 
var mongoose = require('mongoose');
var bodyParser = require('body-parser'); //处理post过来的数据
var Cookies = require('cookies');
var User = require('./models/user.js');

//配置expres的模板引擎
app.engine('html',swig.renderFile);
//设置模板文件的存放目录
app.set('views','./views');
//第一个参数固定为'view engine'，第二参数是上面的一致
app.set('view engine','html');
app.use('/public',express.static(__dirname+'/public'));


//开发时设置取消模板缓存
swig.setDefaults({
    cache: false,
    autoescape: false
})

// app.get('/',function(req,res,next){
//     /**
//      * 第一个参数对应views下面的名称对应html文件
//      */
//     res.render('index');
// })

app.use(bodyParser.urlencoded({extended: true}))  //设置能解析参数，否则req.body undefined

app.use(function(req,res,next){
    req.cookies = new Cookies(req,res);
    req.blogUserInfo = {};  //
    try {
        var userCookies = req.cookies.get('blogUserInfo');
        if(userCookies){
            req.blogUserInfo = JSON.parse(userCookies);
            User.findById(req.blogUserInfo._id).then(function(user){
                // console.log(user);
                req.blogUserInfo._id = user._id;
                req.blogUserInfo.isAdmin = Boolean(user.isAdmin);
                // console.log(req.blogUserInfo);
                next();
            });
        }else{
            next();
        }
    } catch (error) {
        console.log(error);
        next();
    }
})

app.use('/',require('./routers/main'));    
app.use('/admin',require('./routers/admin'));    
app.use('/api',require('./routers/api'));   


// mongoose.Promise = global.Promise;  
mongoose.connect('mongodb://localhost:27017/blog',function(err){
    if(err){
        console.log('数据库连接失败');
    }else{
        console.log('数据库连接成功');
        //监听请求
        app.listen(8081);
        console.log('正在监听8081端口，http://localhost:8081');
    }
}); //通过mongoose连接mongodb
