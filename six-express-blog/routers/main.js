var express = require('express');

var router = express.Router();

router.get('/',function(req,res,next){
    res.render('main/index',{
        blogUserInfo: req.blogUserInfo
    });
});

module.exports = router;