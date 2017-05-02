let fs = require('fs');

//同步读取
let content = fs.readFileSync('../node学习笔记.md');

console.log(content.toString());

//异步读取
fs.readFile('../node学习笔记.md',(error,data) => {
    if(error){
        console.log(error);
        return;
    }
    console.log(data.toString());
});

//简单写
fs.writeFile('../简单写入.txt','简单写入的内容',(error,data)=>{
    if(error){
        console.log(error);
    }else{
        console.log(data);
    }
})
