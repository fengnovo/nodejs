var express = require('express');

var router = express.Router();

router.get('/msgs',function(req,res,next){
    res.send('Api msgs');
});

module.exports = router;