### server 
```
var http = require('http');
http.createServer(function(req,res){
    console.log(req);
    res.writeHead(200,{'Content-Type':'text/plain'});
    res.end('Hello World!\n');
}).listen(3009);
```

### Node.js REPL(交互式解释器) 读取、执行、打印、循环
```
node
```
##### REPL 命令
###### ctrl + c - 退出当前终端。
###### ctrl + c 按下两次 - 退出 Node REPL。
###### ctrl + d - 退出 Node REPL.
###### 向上/向下 键 - 查看输入的历史命令
###### tab 键 - 列出当前命令
###### .help - 列出使用命令
###### .break - 退出多行表达式
###### .clear - 退出多行表达式
###### .save filename - 保存当前的 Node REPL 会话到指定文件
###### .load filename - 载入当前 Node REPL 会话的文件内容。

### events  
new events.EventEmitter()，先on再emit  
```
let events = require('events');
let eventEmitter = new events.EventEmitter();

let connectHandler = () => {
    "use strict";
    console.log('连接成功');

    eventEmitter.emit('dataReceived');
}
eventEmitter.on('connection',connectHandler)

eventEmitter.on('dataReceived',()=>{
    "use strict";
    console.log('dataReceived，数据接受成功')
})

eventEmitter.emit('connection')

console.log('完')
```



### readFile
同步  
```
let fs = require('fs');
let content = fs.readFileSync('../node学习笔记.md');
console.log(content.toString());
```
异步  
```
fs.readFile('../node学习笔记.md',(error,data) => {
    if(error){
        console.log(error);
        return;
    }
    console.log(data.toString());
});
```

### Buffer(缓冲区)
```
var buf = new Buffer(10); 
var buf = new Buffer([10, 20, 30, 40, 50]);
var buf = new Buffer("http://www.baidu.com", "utf-8");
```
写入  write
```
let buf = new Buffer(256);
let len = buf.write('http://www.baidu.com')
console.log('写入的字节：'+len);
```
读取  toString、toJSON
```
let buf1 = new Buffer(26);  
for(let i=0;i<26;i++){
    buf1[i]=i+97;
}
console.log(buf1.toString('utf8',0,5))
console.log(buf1.toString('ascii'))
console.log(buf1.toJSON())
```
合并  concat
```
/*let buf2 = new Buffer(256)
let buf3 = new Buffer(256)
buf2.write('Hello');
buf3.write('World');*/
let buf2 = new Buffer('Hello')
let buf3 = new Buffer('World')
//buf2.write('Hello');
//buf3.write('World');
let buf4 = Buffer.concat([buf2,buf3]);
console.log(buf4.toString())
```
比较 compare
```
let buf6 = new Buffer('abc')
let buf7 = new Buffer('acbd')
let res = buf6.compare(buf7)

if(res<0){
    console.log(buf6+'在'+buf7+'之前');
}else if(res == 0){
    console.log(buf6+'与'+buf7+'相同');
}else{
    console.log(buf6+'在'+buf7+'之后');
}
```
拷贝 copy
```
let buf8 = new Buffer('abc')
let buf9 = new Buffer(3)
buf8.copy(buf9)
console.log(buf9.toString());
```
剪裁 slice 
```
let buf10 = new Buffer('abc')
let buf11 = buf10.slice(0,1)    //开始角标，结束角标
console.log(buf11.toString());  //a
```
### Stream(流)
##### Stream 有四种流类型：
###### Readable - 可读操作。
###### Writable - 可写操作。
###### Duplex - 可读可写操作.
###### Transform - 操作被写入数据，然后读出结果。
##### 所有的 Stream 对象都是 EventEmitter 的实例。常用的事件有：
###### data - 当有数据可读时触发。
###### end - 没有更多的数据可读时触发。
###### error - 在接收和写入过程中发生错误时触发。
###### finish - 所有数据已被写入到底层系统时触发。
读取流 var readerStream = fs.createReadStream('output.txt')
```
let fs = require('fs');
let data = '';
let readerStream = fs.createReadStream('../node学习笔记.md');
readerStream.setEncoding('utf8');

readerStream.on('data',(chunk)=>{
    "use strict";
    data += chunk;
})

readerStream.on('end',() => {
    "use strict";
    console.log(data)
    eventEmitter.emit('write');
})

readerStream.on('error',(e)=>{
    "use strict";
    console.log(e);
})

console.log('完');
```
写入流 var writerStream = fs.createWriteStream('output.txt')
```
let writerStream = fs.createWriteStream('../coyp.md');
writerStream.write(data,'utf8');
writerStream.end();
writerStream.on('finish',()=>{
    "use strict";
    console.log('写入完成');
})

writerStream.on('error',(e)=>{
    "use strict";
    console.log(e);
})
```
管道流 readerStream.pipe(writerStream);
```
let fs = require('fs');
let readerStream = fs.createReadStream('../node学习笔记.md')
let writerStream = fs.createWriteStream('../coypone.md');

readerStream.pipe(writerStream)

console.log('管道流完成');
```
链式流 readerStream.pipe(zlib.createGzip()).pipe(writerStream);
```
let fs = require('fs');
let zlib = require('zlib');
fs.createReadStream('../node学习笔记.md')
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream('../node学习笔记.md.gz'));
```
```
let fs = require('fs');
let zlib = require('zlib');
fs.createReadStream('../node学习笔记.md.gz')
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream('../node学习笔记copy.md'))
```
### 路由
两个模块，    url和querystring模块
```
                            url.parse(string).query
                                           |
           url.parse(string).pathname      |
                       |                   |
                       |                   |
                     ------ -------------------
http://localhost:8888/start?foo=bar&hello=world
                                ---       -----
                                 |          |
                                 |          |
              querystring(string)["foo"]    |
                                            |
                         querystring(string)["hello"]
```
```
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
```
### 全局对象 Global Obj
##### __filename 表示当前正在执行的脚本的文件名。
##### __dirname 表示当前执行脚本所在的目录。
##### process
```
process.stdout.write('Hello World!'+'\n')

console.log('通过参数读取:'+process.argv)       // 通过参数读取

console.log('获取执行路径:'+process.execPath)   // 获取执行路径

console.log('平台信息:'+process.platform);  // 平台信息

console.log('当前目录：'+process.cwd());
console.log('当前版本：'+process.version);
console.log(process.memoryUsage());
```
### util
#### util.inherits  util.inherits(constructor, superConstructor)是一个实现对象间原型继承 的函数。
Sub 仅仅继承了Base 在原型中定义的函数，而构造函数内部创造的 base 属 性和 sayHello 函数都没有被 Sub 继承

#### util.inspect 一个将任意对象转换 为字符串的方法
```
var util = require('util');
function Person() {
    this.name = 'byvoid';
    this.toString = function() {
        return this.name;
    };
}
var obj = new Person();
console.log(util.inspect(obj));
console.log(util.inspect(obj, true));
```