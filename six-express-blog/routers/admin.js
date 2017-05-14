var express = require('express');

var router = express.Router();

router.use(function(req,res,next){
    if(!req.blogUserInfo.isAdmin){
        res.send('对不起，只有管理员权限才能访问');
    }else{
        res.send('后台管理系统');
    }

});

router.get('/',function(req,res,next){
    res.render('admin/index');
});

module.exports = router;