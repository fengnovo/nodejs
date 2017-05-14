var express = require('express');

var router = express.Router();
var Category = require('../models/category.js');

router.get('/',function(req,res,next){

    Category.find().then(function(categories){
        console.log(categories);
        res.render('main/index',{
            blogUserInfo: req.blogUserInfo,
            categories: categories
        });
    });
    
});

module.exports = router;