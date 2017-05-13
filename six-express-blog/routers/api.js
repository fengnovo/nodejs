var express = require('express');

var router = express.Router();
var User = require('../models/users.js');

//统一返回格式
var responseData = {
        code: 0,
        message: ''
    };


/**
 * 用户注册：
 * 1.用户名不能为空
 * 2.密码不能为空
 * 3.两次输入密码必须一致
 * 4.用户名是否已经被注册
 */
router.post('/user/registe',function(req,res,next){
    console.log(req.body);
    var username = req.body.username;
    var password = req.body.password;
    var repassword = req.body.repassword;
    if(username == ''){
        responseData = {
            code: 1,
            message: '用户名不能为空!'
        }
        res.json(responseData);
        return;
    }else if(password == ''){
        responseData = {
            code: 2,
            message: '密码不能为空!'
        }
        res.json(responseData);
        return;
    }else if(password != repassword){
        responseData = {
            code: 3,
            message: '两次输入密码必须一致!'
        }
        res.json(responseData);
        return;
    }else {
        //查询数据库
        User.findOne({
            username: username
        }).then(function(userInfo){
            if(userInfo){
                responseData = {
                    code: 4,
                    message: '该用户名是否已经被注册！'
                }
                res.json(responseData);
                return;
            }else{
                var user = new User({
                    username: username,
                    password: password
                });
                return user.save();
                
            }
        }).then(function(newUserInfo){
            responseData = {
                code: 0,
                message: '注册成功！'
            }
            res.json(responseData);
        });
        
    }

    


});


router.post('/user/login',function(req,res,next){
    var username = req.body.username;
    var password = req.body.password;
    if(username == ''){
        responseData = {
            code: 1,
            message: '用户名不能为空!'
        }
        res.json(responseData);
    }else if(password == ''){
        responseData = {
            code: 2,
            message: '密码不能为空!'
        }
        res.json(responseData);
    }else {
        User.findOne({
            username: username
        }).then(function(userInfo){
            if(userInfo){
                console.log(userInfo);
                if(userInfo.password != password){
                    responseData = {
                        code: 3,
                        message: '输入的密码错误！'
                    }
                    res.json(responseData);
                    return;
                }else{
                    responseData = {
                        code: 0,
                        message: '登录成功！'
                    }
                    res.json(responseData);
                    return;
                }
            }else{
                var user = new User({
                    username: 4,
                    password: '该用户名不存在！'
                });
                res.json(responseData);
            }
        });
    }
});

module.exports = router;