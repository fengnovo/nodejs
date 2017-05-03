var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  let data = { 
    title: 'Express',
    content: '这是内容',
    students: ['张三','李四','王五']
 };
  res.render('index', data);
});

router.get('/topic', function(req, res, next) {
  res.send('这是一个留言板');
});

module.exports = router;
