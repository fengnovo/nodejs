var fs = require('fs');
var delDir = require('./delfile.js');

var projectData = {
    name: 'fengProject',
    fileData : [
        {
            name: 'css',
            type: 'dir'
        },
        {
            name: 'js',
            type: 'dir'
        },
        {
            name: 'imgs',
            type: 'dir'
        },
        {
            name: 'index.html',
            position: '',
            type: 'file',
            content: '<!DOCTYPE html>\n<html lang="en">\n<head>\n\t'
                    +'<meta charset="UTF-8">\n\t'
                    +'<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t'
                    +'<meta http-equiv="X-UA-Compatible" content="ie=edge">\n\t'
                    +'<title>Document</title>\n</head>\n'
                    +'<body>\n<h1>Hello World222!</h1>\n'
                    +'</body>\n</html>'
        },
        {
            name: 'style.css',
            type: 'file',
            position: 'css/',
            content: '.body{color:gray;}'
        },
        {
            name: 'style2.css',
            type: 'file',
            position: 'css/',
            content: '.body{padding:0;}'
        },
        {
            name: 'app.js',
            type: 'file',
            position: 'js/',
            content: 'console.log("55555");'
        },
        {
            name: 'build.js',
            type: 'file',
            position: 'js/',
            content: 'console.log("55555");'
        },
        {
            name: 'app1.js',
            type: 'file',
            position: 'js/',
            content: 'console.log("55555");'
        }
    ]
};





async function buildFiles() {
    return new Promise((resolve, reject) => {
        let obj = [];
        try {
            if(projectData.name){
                fs.mkdirSync(projectData.name); //mkdirSync同步
                var fileData = projectData.fileData;
            
                if(fileData && fileData.forEach){
                    fileData.forEach(function(f){
                        f.path = f.position ? projectData.name+'/'+f.position+f.name : projectData.name+'/'+f.name;
                        f.content = f.content || '';
                        switch (f.type) {
                            case 'dir':
                                fs.mkdirSync(f.path);
                                break;
                            case 'file':
                                fs.writeFileSync(f.path,f.content);
                                let [,type] = f.name.split('.');
                                obj.push({
                                    type,
                                    path: '/' + f.path 
                                });
                                break;
                            default:
                                break;
                        }
                    })
                }
            }
            resolve(obj);
        } catch (error) {
            if (error.toString().indexOf('file already exists') !== -1) {
                delDir(projectData.name);
                resolve(buildFiles());
            } else {
                reject(error);
            }
        }
        

    });
    
}

module.exports = buildFiles;