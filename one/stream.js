/**
 * Created by nian on 17/4/20.
 */

/*let events = require('events');
let eventEmitter = new events.EventEmitter();
let fs = require('fs');
let data = '';

//读取
let read = () => {
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
}


//写入
let write = () => {
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
}

eventEmitter.on('read',read);
eventEmitter.on('write',write);

eventEmitter.emit('read');*/


/*let fs = require('fs');
let readerStream = fs.createReadStream('../node学习笔记.md')
let writerStream = fs.createWriteStream('../coypone.md');

readerStream.pipe(writerStream)

console.log('管道流完成');*/


/*let fs = require('fs');
let zlib = require('zlib');
fs.createReadStream('../node学习笔记.md')
    .pipe(zlib.createGzip())
    .pipe(fs.createWriteStream('../node学习笔记.md.gz'));*/


let fs = require('fs');
let zlib = require('zlib');
fs.createReadStream('../node学习笔记.md.gz')
    .pipe(zlib.createGunzip())
    .pipe(fs.createWriteStream('../node学习笔记copy.md'))



















