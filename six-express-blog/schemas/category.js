var mongoose = require('mongoose');

//博客分类的表结构
module.exports = new mongoose.Schema({
     name: String   //分类的名称
})