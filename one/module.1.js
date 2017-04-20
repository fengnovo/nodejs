/**
 * Created by nian on 17/4/19.
 */

var a =  100;
console.log(a);

global.a = 200;
console.log(a);

console.log(global.a);

/*
100
100
200*/
