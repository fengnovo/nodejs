/**
 * Created by nian on 17/4/20.
 */
let buf = new Buffer(256);
let len = buf.write('http://www.baidu.com')
console.log('写入的字节：'+len);

console.log(buf.toString('utf8'))

let buf1 = new Buffer(26);
for(let i=0;i<26;i++){
    buf1[i]=i+97;
}
console.log(buf1.toString('utf8',0,5))
console.log(buf1.toString('ascii'))
//console.log(buf1.toJSON())


/*
/!*let buf2 = new Buffer(256)
let buf3 = new Buffer(256)
buf2.write('Hello');
buf3.write('World');*!/
let buf2 = new Buffer('Hello')
let buf3 = new Buffer('World')
//buf2.write('Hello');
//buf3.write('World');
let buf4 = Buffer.concat([buf2,buf3]);
console.log(buf4.toString())*/


/*
let buf6 = new Buffer('abc')
let buf7 = new Buffer('acbd')
let res = buf6.compare(buf7)

if(res<0){
    console.log(buf6+'在'+buf7+'之前');
}else if(res == 0){
    console.log(buf6+'与'+buf7+'相同');
}else{
    console.log(buf6+'在'+buf7+'之后');
}*/

/*

let buf8 = new Buffer('abc')
let buf9 = new Buffer(3)
buf8.copy(buf9)
console.log(buf9.toString());*/

let buf10 = new Buffer('abc')
let buf11 = buf10.slice(0,1)
console.log(buf11.toString());
