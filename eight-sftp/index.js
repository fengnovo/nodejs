let Client = require('ssh2-sftp-client');
let buildFile = require('./writeFile.js');
(async () => {
    let fileList = await buildFile();
    console.log(fileList);
    if (Object.prototype.toString.call(fileList) === '[object Array]') {
        startUpload(fileList);
    }
})();

let sftp = new Client();
const config = {
    host: '127.0.0.1',
    port: '22',
    username: '*****',
    password: '********'
};
const url = '/home/ubuntu/test3';
const LocalUrl = './fengProject/'


function startUpload(fileList) {
    let connect = sftp.connect(config);
    connect.then(() => {
        return sftp.list(url);
    }).then((data) => {
        console.log('读取列表成功');
        data.forEach(i => {
            console.log(i.name);
        });
        uploadFiles(connect, fileList);
    }).catch((err) => {
        if (err.toString().indexOf('No such file') !== -1) {
            console.log('操作失败，目录不存在！');
            console.log('正在创建此目录...');
            sftp.mkdir(url, false).then(d => {
                console.log('目录创建成功！');
                uploadFiles(connect, fileList);
            }).catch((e) => {
                console.log('目录创建失败！', e);
            });
        } else {
            console.log(err, 'catch error');
        }
    });
}
function uploadFiles(connect, fileList) {
    fileList.forEach(i => {
        uploadFile(connect, i.path);
    });
}

function uploadFile(connect, file) {
    connect.then(() => {
        return sftp.put('.'+file, url+file);
    }).then((data) => {
        console.log(data, '上传成功');
    }).catch((err) => {
        // console.log(err, '上传失败');
        if (err.toString().indexOf('No such file') !== -1) {
            let s = url+file;
            s = s.split('/');
            s = s.slice(0,s.length-1).join('/');
            console.log(`操作失败，${s} 目录不存在！`);
            console.log('正在创建此目录...');
            
            sftp.mkdir(s, false).then(d => {
                console.log('目录创建成功！');
                uploadFile(connect, file);
            }).catch((e) => {
                console.log(e, '目录创建失败！');
            });
        } else {
            console.log(err, '上传失败, catch error');
        }
    });
}