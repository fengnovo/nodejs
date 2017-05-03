const http = require('http');
const fs = require('fs');

http.get('http://news.163.com/17/0502/20/CJF84FA9000189FH.html', (res)=>{
    //response是对方服务器的响应
    
    res.setEncoding('binary');//二进制（binary）

    var body = '';
    res.on('data',(chunk)=>{
        body += chunk;
    });

    res.on('end',()=>{
        fs.writeFile('../a.html', body, 'binary', (error,data)=>{
            if(!error) console.log('完成!');
        });
    })
})