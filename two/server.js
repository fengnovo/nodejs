const http = require('http');
const qs = require('querystring');
const url = require('url');

let _html = `
<h2>请留言</h2>
<form action="postTopic" method="post">
    <p>
        <input type="text" name="msgInput">
    </p>
    <p>
        <input type="submit" value="提交">
    </p>
</form>
`;


http.createServer((req,res)=>{
    console.log(req.url);
    let path = url.parse(req.url).path;
    
    res.writeHead(200,{'content-type':'text/html;charset=utf-8'});
    if(path == '/addTopic'){
        res.write(_html);
        res.end();
    }else if(path == '/postTopic'){
        let msgBody = '';
        req.on('data',(chunk) => {
            msgBody += chunk;
        });
        req.on('end',() => {
            let result = qs.parse(msgBody); //转化为对象
            console.log(result);
            res.write(`谢谢，你提交的内容是${result.msgInput}`);
            res.end();
        });
        
    }else if(path == '/'){
        res.write('<h2>欢迎</h2>');
        res.end();
    }
    
}).listen(3007);
console.log('监听--->   http://localhost:3007');
