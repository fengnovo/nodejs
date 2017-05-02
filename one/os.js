const os = require('os');
console.log('你的CPU是：'+os.arch());
console.log('你的可用内存是：'+Math.floor(os.freemem()/1024/1024)+'M');
console.log('每个CPU/CPU核的信息:\n'+JSON.stringify(os.cpus(), null, 20));