var express = require('express');

var router = express.Router();
var Category = require('../models/category.js');
var Article = require('../models/article.js');
var Category = require('../models/category.js');

var resData = {
}

router.use(function(req,res,next){
    resData.blogUserInfo = req.blogUserInfo;
    resData.categories = [];
    Category.find().then(function(categories){
        // console.log(categories);
        resData.categories = categories;
        next();
    });
})

router.get('/',function(req,res,next){
    console.log('------------/');
    var limit = 5;
    var pages = 0;
    var count = 0;
    var pagesArr = [];
    var page = Number(req.query.page || 1);
    var category = req.query.category || '';
    var skip;

    resData.category = category;
    resData.articles = {
        page: page,
        limit: limit,
        count: count,
        pages: pages,
        pagesArr: pagesArr,
        data: []
    };


    var where = {}
    if(category){
        where.category = category;
    }
    console.log(where);
    
        
    if(category){
        Article.where(where).count().then(function(count){
            resData.articles.count = count; //文章总条数
            pages = Math.ceil(count/limit); //向上取整，3.5取4
            page = Math.min(page,pages);    //取值不能超过pages
            page = Math.max(page,1);        //取值不能小于1
            skip = ( page -1 ) * limit;     //设置取范围页数
            /**
             * 1,升序     时间戳从小到大  从最新到最久
             * -1,降序    时间戳从大到小
             */
            resData.articles.pages = pages;
            for(var i=1;i<=pages;i++){
                pagesArr.push(i);
            }
            resData.articles.pagesArr = pagesArr;
            if(category){
                return Article.where(where).find().sort({_id:-1}).limit(limit).skip(skip).populate(['category','user'])
            }else{
                return Article.find().sort({_id:-1}).limit(limit).skip(skip).populate(['category','user'])
            }
        }).then(function(articles){
            // console.log(articles);
            resData.articles.data = articles;
            console.log(JSON.stringify(resData));
            res.render('main/index',resData);
        });
    }else{
        Article.count().then(function(count){
            resData.articles.count = count; //文章总条数
            pages = Math.ceil(count/limit); //向上取整，3.5取4
            page = Math.min(page,pages);    //取值不能超过pages
            page = Math.max(page,1);        //取值不能小于1
            skip = ( page -1 ) * limit;     //设置取范围页数
            /**
             * 1,升序     时间戳从小到大  从最新到最久
             * -1,降序    时间戳从大到小
             */
            resData.articles.pages = pages;
            for(var i=1;i<=pages;i++){
                pagesArr.push(i);
            }
            resData.articles.pagesArr = pagesArr;
            if(category){
                return Article.where(where).find().sort({_id:-1}).limit(limit).skip(skip).populate(['category','user'])
            }else{
                return Article.find().sort({_id:-1}).limit(limit).skip(skip).populate(['category','user'])
            }
        }).then(function(articles){
            // console.log(articles);
            resData.articles.data = articles;
            console.log(JSON.stringify(resData));
            res.render('main/index',resData);
        });
    }
    
});


router.get('/detail',function(req,res,next){
    console.log('------------/detail');
    var id = req.query.id || 0;
    console.log(id);
    
    Article.findOne({
        _id: id
    }).populate(['category','user']).then(function(article){
        // console.log(article);
        if(!article){
                res.render('admin/error',{
                blogUserInfo: req.blogUserInfo,
                message: '该文章不存在'
            });
        }else{
            resData.category = article.category.id;
            resData.detail = article;
            article.viewsNum ++;
            article.save();
            console.log(resData);
            res.render('main/detail',resData);
        }
    });
    
    
});

module.exports = router;