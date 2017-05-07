var express = require('express');

var router = express.Router();

router.get('/a',function(req,res,next){
    res.send('Main admin');
});

module.exports = router;