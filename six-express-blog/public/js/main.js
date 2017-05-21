$(function(){
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
                    // $('#loginPanel').hide();
                    // $('#usrNam').html(data.userInfo.username);
                    // $lf.find('[name="username"]').val('');
                    // $lf.find('[name="password"]').val('');
                    // $('#userInfo').show();
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

    function refreshComment(comments) {
        var commentDom = '';
        for(var i = 0;i<comments.length; i++){
            commentDom += '<li><span class="pull-left">'+comments[i].username+'</span>'   
                        +'<span class="pull-right">'+formatDate(comments[i].postTime)+'</span><br />'
                        +'<p>'+comments[i].content+'</p></li>'
        }
        if($('#hasNoComment')[0]){
            $('#hasNoComment').remove();
            $('#commentArea').append('<ul class="comment-ul">'+commentDom+'</ul>');
        }else{
            $('.comment-ul').html(commentDom);
        }
        $('#commentNum').text(comments.length);
    }



    $('#commentBtn').click(function(e){
        e.preventDefault();
        e.stopPropagation();
        $.ajax({
            type: 'post',
            url: '/api/detail/comment',
            data: {
                articleId: $('#articleId').val(),
                content: $('#comment').val()
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