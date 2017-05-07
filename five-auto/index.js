var fs = require('fs');

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
            type: 'file',
            content: '<!DOCTYPE html>\n<html lang="en">\n<head>\n\t'
                    +'<meta charset="UTF-8">\n\t'
                    +'<meta name="viewport" content="width=device-width, initial-scale=1.0">\n\t'
                    +'<meta http-equiv="X-UA-Compatible" content="ie=edge">\n\t'
                    +'<title>Document</title>\n</head>\n'
                    +'<body>\n<h1>Hello World!</h1>\n'
                    +'</body>\n</html>'
        }
    ]
};

if(projectData.name){
    fs.mkdirSync(projectData.name); //mkdirSync同步
    var fileData = projectData.fileData;

    if(fileData && fileData.forEach){
        fileData.forEach(function(f){
            f.path = projectData.name+'/'+f.name;
            f.content = f.content || '';
            switch (f.type) {
                case 'dir':
                    fs.mkdirSync(f.path);
                    break;
                case 'file':
                    fs.writeFileSync(f.path,f.content);
                    break;
                default:
                    break;
            }
        })
    }

}