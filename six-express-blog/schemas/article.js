var mongoose = require('mongoose');

//博客分类的表结构
module.exports = new mongoose.Schema({
    title: String,              //文章标题
    category: {
        type: mongoose.Schema.Types.ObjectId,//类型
        ref: 'Category' //引用
    },                  //文章分类
    user: {
        type: mongoose.Schema.Types.ObjectId,//文章作者，类型 
        ref: 'User'     //引用
    },
    addTime: {
        type: Date,             //文章创建时间
        default: new Date()  
    },
    viewsNum: {     
        type: Number,           //文章阅读量
        default: 0
    },
    description: {
        type: String,           //文章描述
        default: ''
    },
    content: {
        type:String,            //文章内容
        default: ''
    },
    comments: {                 //文章评论
        type: Array,
        default: []
    }
})