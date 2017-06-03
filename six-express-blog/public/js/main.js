$(function(){
    function html_encode(str) {
        var s = "";
        if (str.length == 0) return "";
        s = str.replace(/&/g, "&amp;");
        s = s.replace(/</g, "&lt;");
        s = s.replace(/>/g, "&gt;");
        s = s.replace(/ /g, "&nbsp;");
        s = s.replace(/\'/g, "&#39;");
        s = s.replace(/\"/g, "&quot;");
        s = s.replace(/\n/g, "<br>");
        return s;
    }


    function html_decode(str) {
        var s = "";
        if (str.length == 0) return "";
        s = str.replace(/&amp;/g, "&");
        s = s.replace(/&lt;/g, "<");
        s = s.replace(/&gt;/g, ">");
        s = s.replace(/&nbsp;/g, " ");
        s = s.replace(/&#39;/g, "\'");
        s = s.replace(/&quot;/g, "\"");
        s = s.replace(/<br>/g, "\n");
        return s;
    }

    toastr.options = {
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "rtl": false,
        "positionClass": "toast-bottom-center",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": 300,
        "hideDuration": 1000,
        "timeOut": 2000,
        "extendedTimeOut": 500,
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }

    var $rf = $('#regForm')
    var $lf = $('#loginForm')
    var $lt = $('#login-text');
    
    $('#login2').click(function(){
        $rf.hide();
        $lf.show();
        $lt.text('登录');
    });
    $('#reg1').click(function(){
        $lf.hide();
        $rf.show();
        $lt.text('注册');
    });
    $('#login1').click(function(){
        //登录
        $.ajax({
            type: 'post',
            url: '/api/user/login',
            data: {
                username: $lf.find('[name="username"]').val().trim(),
                password: $lf.find('[name="password"]').val().trim()
            },
            dataType: 'json',
            success: function(data){
                console.log(data);
                if(data.code == 0){
                    toastr["success"](data.message);
                    setTimeout(function(){
                        window.location.reload();
                    },1000);
                }else{
                    toastr["error"](data.message);
                }
                
            }
        })
    });
    $('#reg2').click(function(){
        var reg=/^[a-zA-Z0-9\-]{4,16}$/;
        if(!reg.test($rf.find('[name="username"]').val().trim())){
            toastr["error"]('只能输入字母，数字，下划线');
            return ;
        }
        //注册
        $.ajax({
            type: 'post',
            url: '/api/user/registe',
            data: {
                username: $rf.find('[name="username"]').val().trim(),
                password: $rf.find('[name="password"]').val().trim(),
                repassword: $rf.find('[name="repassword"]').val().trim()
            },
            dataType: 'json',
            success: function(data){
                console.log(data);
                if(data.code == 0){
                    toastr["success"](data.message);
                    $rf.find('[name="username"]').val('');
                    $rf.find('[name="password"]').val('');
                    $rf.find('[name="repassword"]').val('');
                    $('#login2').trigger('click');
                }else{
                    toastr["error"](data.message);
                }
            }
        })
    });

    $('#logout').click(function(){
        $.ajax({
            url: '/api/user/logout',
            success: function(result){
                if(result){
                    toastr["success"]('退出成功！');
                    setTimeout(function(){
                        window.location.reload();
                    },1000);
                }
            }
        });
    })

    
    // toastr["success"](" 注册成功！");
    //toastr["error"]("Inconceivable!")
    //toastr["warning"]("I do not think that means what you think it means.")
    //toastr["info"]("Have fun storming the castle!")

    function formatDate(d){
        var _date = new Date(d);
        function formatNum(num){
            
            return num > 9 ? num : ('0' + num);
        }
        return _date.getFullYear() + '-' + formatNum(_date.getMonth()+1) + '-' + formatNum(_date.getDate()) + ' ' 
        + formatNum(_date.getHours()) + ':' + formatNum(_date.getMinutes()) + ':' + formatNum(_date.getSeconds());  
    }

    //提交评论成功后回调
    function refreshComment(comments) {
        var commentDom = '';
        var timeTip = new Date().getTime();
        for(var i = 0;i<comments.length; i++){
            commentDom += '<li><span class="pull-left">'+comments[i].username+'</span>'   
                        +'<span class="pull-right">'+formatDate(comments[i].postTime)+'</span><br />'
                        +'<p data-name="comment"></p></li>'
        }
        
        if($('#hasNoComment')[0]){
            $('#hasNoComment').remove();
            $('#commentArea').append('<ul class="comment-ul">'+commentDom+'</ul>');
        }else{
            $('.comment-ul').html(commentDom);
        }
        $('[data-name=comment]').map(function(i){
            var ii = html_decode(comments[i].content);
            $(this).text(ii)
        })

        $('#commentNum').text(comments.length);
    }    

    //点击评论按钮
    $('#commentBtn').click(function(e){
        e.preventDefault();
        e.stopPropagation();
        var commentText = $.trim(html_encode($('#comment').val()));
        if(commentText == ''){
            alert('请输入评论内容');
            return;
        }
        $.ajax({
            type: 'post',
            url: '/api/detail/comment',
            data: {
                articleId: $('#articleId').val(),
                content: commentText
            },
            success: function(result){
                console.log(result);
                if(result && result.code == 0){
                    toastr["success"](result.message);
                    $('#comment').val('');
                    refreshComment(result.article.comments.reverse());
                }
            }
        });
    })



})