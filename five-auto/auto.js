var fs = require('fs');

var filedir = './source';

fs.watch(filedir,function(ev,file){
    // console.log(ev+'/'+file);


    fs.readdir(filedir,function(error,dataList){

        var arr = [];

        dataList.forEach(function(f) {
            if(f.toString().indexOf('.DS_Store')>-1){   //mac会自动生成.DS_Store文件
                return
            }
            var info = fs.statSync(filedir+'/'+f);

            if(info.mode == 33188){         //mac生成的文件mode是33188
                arr.push(filedir+'/'+f);
            }
            // console.log(arr);
        });
        

        var content = '';
        arr.forEach(function(f){
             var c = fs.readFileSync(f);
             content += c.toString() + '\n';  
        })

        console.log(content);

        fs.writeFile('./build/main.js',content);
    })
})