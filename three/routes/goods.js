var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/del/:id', function(req, res, next) {
  console.log(req.params);
  console.log(req.params.id);
  res.send(`商品${req.params.id}删除`);
});

router.get('/add', function(req, res, next) {
  res.send('商品添加');
});

module.exports = router;
