var express = require('express');

var router = express.Router();

router.post('/user/registe',function(req,res,next){
    console.log(req.body);

    res.send('注册');
});


router.post('/user/login',function(req,res,next){
    console.log(req.body);
    res.send('登录');
});

module.exports = router;