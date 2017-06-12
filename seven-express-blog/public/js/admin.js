$(function(){
    CKEDITOR.replace('content',
        {
            toolbar: 
            [
                //撤销    恢复      加粗     斜体，     下划线        穿过线    清除所有格式        数字列表          实体列表           减小缩进    增大缩进
                ['Undo', 'Redo', 'Bold', 'Italic', 'Underline', 'Strike','RemoveFormat', 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent'],
                //左对 齐             居中对齐          右对齐       取消超链接   表格        引用           行距
                ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'Unlink', 'Table', 'Blockquote'],//, 'lineheight'
                //      图片        水平线        字体     文本颜色     背景颜色    全屏         自写图片上传插件 
                // ['Image','HorizontalRule', 'Font', 'TextColor', 'BGColor', 'Maximize','simpleupload']
                ['HorizontalRule', 'Font', 'TextColor', 'BGColor', 'Maximize']
            ],
            // extraPlugins: 'simpleupload',
            height: 300,
            fullPage: true,
            allowedContent: true,
            font_names: '微软雅黑/微软雅黑; 宋体/宋体;黑体/黑体;仿宋/仿宋_GB2312;楷体/楷体_GB2312;隶书/隶书;幼圆/幼圆; Arial/Arial, Helvetica, sans-serif;Comic Sans MS/Comic Sans MS, cursive;Courier New/Courier New, Courier, monospace;Georgia/Georgia, serif;Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;Tahoma/Tahoma, Geneva, sans-serif;Times New Roman/Times New Roman, Times, serif;Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;Verdana/Verdana, Geneva, sans-serif'
        },
    );
})