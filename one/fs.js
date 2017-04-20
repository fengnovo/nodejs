let fs = require('fs');

let content = fs.readFileSync('../node学习笔记.md');

console.log(content.toString());


fs.readFile('../node学习笔记.md',(error,data) => {
    if(error){
        console.log(error);
        return;
    }
    console.log(data.toString());
});
