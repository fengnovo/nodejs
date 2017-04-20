process.stdout.write('Hello World!'+'\n')

console.log('通过参数读取:'+process.argv)       // 通过参数读取

console.log('获取执行路径:'+process.execPath)   // 获取执行路径

console.log('平台信息:'+process.platform);  // 平台信息

console.log('当前目录：'+process.cwd());
console.log('当前版本：'+process.version);
console.log(process.memoryUsage());