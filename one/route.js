/**
 * Created by nian on 17/4/20.
 */

let http = require('http');
let url = require('url');

let server = (req,res)=>{
    "use strict";
    let pathname = url.parse(req.url).pathname;
    console.log(pathname);
    res.writeHead(200,{'ContentType':'text/plain'});
    res.write('Hello World!!!');
    res.end();
}

http.createServer(server).listen(3007);