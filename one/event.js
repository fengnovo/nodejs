/**
 * Created by nian on 17/4/20.
 */

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

