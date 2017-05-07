var mongoose = require('mongoose');

//http://mongoosejs.com/docs/guide.html
//用户的表结构
module.exports = new mongoose.Schema({
    username: String,   //用户名
    password: String    //密码
})