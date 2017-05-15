var mongoose = require('mongoose');

//博客分类的表结构
module.exports = new mongoose.Schema({
    title: String,      //文章标题
    category: {
        type: mongoose.Schema.Types.ObjectId,//类型
        ref: 'Article' //引用
    },                  //文章分类
    author: {
        type:String,     //文章作者
        default: ''
    },
    description: {
        type: String,        //文章描述
        default: ''
    },
    content: {
        type:String,     //文章内容
        default: ''
    }
})