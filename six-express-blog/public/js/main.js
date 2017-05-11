$(function(){
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
            }
        })
    });



})