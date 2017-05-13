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
                    $('#loginPanel').hide();
                    $('#usrNam').html($lf.find('[name="username"]').val().trim());
                    $lf.find('[name="username"]').val('');
                    $lf.find('[name="password"]').val('');
                    $('#userInfo').show();
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
        $('#userInfo').hide();
        $('#loginPanel').show();
    })

    
    // toastr["success"](" 注册成功！");
    //toastr["error"]("Inconceivable!")
    //toastr["warning"]("I do not think that means what you think it means.")
    //toastr["info"]("Have fun storming the castle!")

})