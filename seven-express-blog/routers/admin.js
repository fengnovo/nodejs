var express = require('express');

var router = express.Router();
var User = require('../models/user.js');
var Category = require('../models/category.js');
var Article = require('../models/article.js');

router.use(function(req,res,next){
    if(!req.blogUserInfo.isAdmin){
        res.send('对不起，只有管理员权限才能访问');
    }else{
        next();
    }

});

router.get('/',function(req,res,next){
    res.render('admin/index',{
        blogUserInfo: req.blogUserInfo
    });
});

/**
 * 用户管理
 * limit(number) 限制获取的数据条数
 * skip(2) 忽略数据的条数
 * 1： 1-2 skip:0    -->（当前页-1） * limit
 * 2： 3-4 skip:2
 */
router.get('/user',function(req,res,next){

    var page = Number(req.query.page || 1);
    var limit = 2;
    var skip;
    var pages = 0;

    User.count().then(function(count){
        // console.log(count);
        pages = Math.ceil(count/limit); //向上取整，3.5取4
        page = Math.min(page,pages);   //取值不能超过pages
        page = Math.max(page,1);    //取值不能小于1
        skip = ( page -1 ) * limit;

        User.find().limit(limit).skip(skip).then(function(users){
            // console.log(users);
            res.render('admin/user_index',{
                blogUserInfo: req.blogUserInfo,
                users: users,
                page: page,
                pages: pages,
                count: count
            });
        });
    });    
});



/**
 * 分类的列表
 */
router.get('/category',function(req,res,next){

    var page = Number(req.query.page || 1);
    var limit = 20;
    var skip;
    var pages = 0;

    Category.count().then(function(count){
        // console.log(count);
        pages = Math.ceil(count/limit); //向上取整，3.5取4
        page = Math.min(page,pages);   //取值不能超过pages
        page = Math.max(page,1);    //取值不能小于1
        skip = ( page -1 ) * limit;
        /**
         * 1,升序     时间戳从小到大  从最新到最久
         * -1,降序    时间戳从大到小
         */

        Category.find().sort({_id:-1}).limit(limit).skip(skip).then(function(categories){
            // console.log(users);
            res.render('admin/category_index',{
                blogUserInfo: req.blogUserInfo,
                categories: categories,
                page: page,
                pages: pages,
                count: count
            });
        });
    });   

});

/**
 * 分类的添加
 */
router.get('/category/add',function(req,res,next){
    res.render('admin/category_add',{
        blogUserInfo: req.blogUserInfo,
    });
});


/**
 * 分类的添加
 */
router.post('/category/add',function(req,res,next){
    // console.log(req.body);
    var name = req.body.name || '';

    if(name == ''){
        res.render('admin/error',{
            blogUserInfo: req.blogUserInfo,
            message: '名称不能为空'
        });
    }else{

        Category.findOne({
            name: name
        }).then(function(category){
            if(category){
                 res.render('admin/error',{
                    blogUserInfo: req.blogUserInfo,
                    message: '该分类名称已存在'
                });
            }else{
                return new Category({
                    name: name
                }).save();
            }
        }).then(function(newCategory){
             res.render('admin/success',{
                blogUserInfo: req.blogUserInfo,
                message: '添加成功！',
                url: '/admin/category'
            });
        })

       
    }
});

/**
 * 分类的修改
 */
router.get('/category/edit',function(req,res,next){
    var id = req.query.id || 0;
    console.log(id);
    Category.findOne({
        _id: id
    }).then(function(category){
        if(!category){
                res.render('admin/error',{
                blogUserInfo: req.blogUserInfo,
                message: '该分类不存在'
            });
        }else{
            res.render('admin/category_edit',{
                blogUserInfo: req.blogUserInfo,
                category: category
            });
        }
    });
});

/**
 * 分类的修改
 */
router.post('/category/edit',function(req,res,next){
    var id = req.body.id || 0;
    var name = req.body.name || '';
    console.log({id:id,name:name});
    Category.findOne({
        _id: id
    }).then(function(category){
        if(!category){
            res.render('admin/error',{
                blogUserInfo: req.blogUserInfo,
                message: '该分类不存在'
            });
        }else{
            if(name == category.name){
                res.render('admin/success',{
                    blogUserInfo: req.blogUserInfo,
                    message: '保存成功',
                    url: '/admin/category'
                });
                return Promise.reject();
            }else{
                return Category.findOne({
                    name: name
                })
            }
        }
    }).then(function(sameCategory){
        if(sameCategory){
            res.render('admin/error',{
                blogUserInfo: req.blogUserInfo,
                message: '该分类名称已存在！'
            });
            return Promise.reject();
        }else{
            return Category.update({
                _id: id
            },{
                name: name
            });
        }
    }).then(function(){
        res.render('admin/success',{
            blogUserInfo: req.blogUserInfo,
            message: '修改成功',
            url: '/admin/category'
        });
    })
});


/**
 * 分类的删除
 */
router.get('/category/delete',function(req,res,next){
    var id = req.query.id || 0;

    Category.findOne({
        _id: id
    }).then(function(category){
        if(!category){
                res.render('admin/error',{
                blogUserInfo: req.blogUserInfo,
                message: '该分类不存在'
            });
        }else{
            Category.remove({
                _id: id
            }).then(function(){
                res.render('admin/success',{
                    blogUserInfo: req.blogUserInfo,
                    message: '删除成功',
                    url: '/admin/category'
                });
            });
        }
    });

    
});



/**
 * 文章的列表
 */
router.get('/article',function(req,res,next){
    var page = Number(req.query.page || 1);
    var limit = 5;
    var skip;
    var pages = 0;

    Article.count().then(function(count){
        // console.log(count);
        pages = Math.ceil(count/limit); //向上取整，3.5取4
        page = Math.min(page,pages);   //取值不能超过pages
        page = Math.max(page,1);    //取值不能小于1
        skip = ( page -1 ) * limit;
        /**
         * 1,升序     时间戳从小到大  从最新到最久
         * -1,降序    时间戳从大到小
         */

        Article.find().sort({_id:-1}).limit(limit).skip(skip).populate(['category','user']).then(function(articles){
            // console.log(articles[0]);
            res.render('admin/article_index',{
                blogUserInfo: req.blogUserInfo,
                articles: articles,
                page: page,
                pages: pages,
                count: count
            });
        });
    });   
    

});

/**
 * 文章的添加
 */
router.get('/article/add',function(req,res,next){
    Category.find().sort({_id:-1}).then(function(categories){
        res.render('admin/article_add',{
            blogUserInfo: req.blogUserInfo,
            categories: categories
        });
    });
});

/**
 * 文章的添加处理post
 */
router.post('/article/add',function(req,res,next){
    console.log(req.body);
    var category = req.body.category;
    var title = req.body.title;
    var description = req.body.description;
    var content = req.body.content;

    if(title == ''){
        res.render('admin/error',{
            blogUserInfo: req.blogUserInfo,
            message: '标题不能为空'
        });
        return;
    }else if(description == ''){
        res.render('admin/error',{
            blogUserInfo: req.blogUserInfo,
            message: '描述不能为空'
        });
        return;
    }else if(content == ''){
        res.render('admin/error',{
            blogUserInfo: req.blogUserInfo,
            message: '内容不能为空'
        });
        return;
    }else{
        new Article({
            category: category,
            title: title,
            user: req.blogUserInfo._id,
            description: description,
            content: content
        }).save().then(function(rs){
            // console.log(rs);
            if(rs){
                res.render('admin/success',{
                    blogUserInfo: req.blogUserInfo,
                    message: '保存成功！'
                });
            }else{
                res.render('admin/error',{
                    blogUserInfo: req.blogUserInfo,
                    message: '保存出错！'
                });
            }
        });


    }
});

/**
 * 文章的修改
 */
router.get('/article/edit',function(req,res,next){
    var id = req.query.id || 0;
    console.log(id);
    
    Article.findOne({
        _id: id
    }).populate('category').then(function(article){
        // console.log(article);
        if(!article){
                res.render('admin/error',{
                blogUserInfo: req.blogUserInfo,
                message: '该文章不存在'
            });
        }else{
            Category.find().sort({_id:-1}).then(function(categories){
                res.render('admin/article_edit',{
                    blogUserInfo: req.blogUserInfo,
                    article: article,
                    categories: categories
                });
            });
        }
    });
});

/**
 * 文章的修改post请求
 */
router.post('/article/edit',function(req,res,next){
    var id = req.body.id || 0;
    var category = req.body.category || '';
    var title = req.body.title || '';
    var description = req.body.description || '';
    var content = req.body.content || '';
    // console.log({
    //                 category: category,
    //                 title: title,
    //                 description: description,
    //                 content: content
    //             });
    Article.findOne({
        _id: id
    }).then(function(article){
        if(!article){
            res.render('admin/error',{
                blogUserInfo: req.blogUserInfo,
                message: '该文章不存在'
            });
        }else{
            return Article.update({
                _id: id
            },{
                category: category,
                title: title,
                description: description,
                content: content
            });
        }
    }).then(function(){
        res.render('admin/success',{
            blogUserInfo: req.blogUserInfo,
            message: '该文章修改成功',
            url: '/admin/article/edit?id='+id
        });
    })
});

/**
 * 内容的删除
 */
router.get('/article/delete',function(req,res,next){
    var id = req.query.id || 0;

    Article.findOne({
        _id: id
    }).then(function(article){
        if(!article){
                res.render('admin/error',{
                blogUserInfo: req.blogUserInfo,
                message: '该文章不存在'
            });
        }else{
            Article.remove({
                _id: id
            }).then(function(){
                res.render('admin/success',{
                    blogUserInfo: req.blogUserInfo,
                    message: '该文章删除成功',
                    url: '/admin/article'
                });
            });
        }
    });
});

module.exports = router;