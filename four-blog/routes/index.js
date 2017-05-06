var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient; //mongodb客户端
var ObjectId = require('mongodb').ObjectId;

var url = 'mongodb://localhost:27017/four-blog';
var msg;  //  留言表

MongoClient.connect(url,function(error,db){
    if(error){
      console.log('连接失败！');
      console.log(error);
    }else{
        console.log('连接成功！');
        msg = db.collection('msg');
        console.log(msg);
    }
})

router.get('/', function(req, res, next) {
  msg.find({}).toArray((err,docs)=>{
    if(err){
      console.log(err);
      // res.send(':(  失败!');
      res.render('index', { title: '我的博客',data: docs});
    }else{
      // res.send(docs);
      console.log(docs);
      res.render('index', { title: '我的博客',data: docs});
    }
  })

  

});

router.get('/fa', function(req, res, next) {
  res.render('fa', {title: '请发言'});
});


router.post('/fa', function(req, res, next) {
  //接受post数据，并写入mongodb的msg表
  console.log(req.body);
  msg.insert(req.body,function(err,data){
    if(err){
      res.send(':(  失败!');
    }else{
      res.send('^_^ 成功!');
    }
  })

});

router.get('/api/msgs', function(req, res, next) {
  msg.find({}).toArray((err,docs)=>{
    if(err){
      res.send({ code: '001',data: docs});
    }else{
      res.send({ code: '000',data: docs});
    }
  })
});


router.delete('/api/msg/:id', function(req, res, next) {
  var id = ObjectId(req.params.id);
  console.log(id);
  msg.remove({_id:id},(err,docs)=>{
    if(err){
      res.send({ code:'001',data: "失败",id:id});
    }else{
      res.send({ code:'000', data: "成功", id:id });
    }
  });
  
});




module.exports = router;
