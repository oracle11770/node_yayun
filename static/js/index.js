$(function(){ 
    function checkVaild(){
        return false
    }
    $('#yayunLogo img').click(function(e){
        window.location.href = 'https://www.baidu.com/s?wd='+encodeURI('今日新鲜事')
    })
    $('#yayun_query').focus(function(e){
        $('#yayun_query').css('border-color', '#2d78f4')
    })
    $('#yayun_query').blur(function(e){
        $('#yayun_query').css('border-color', '#b8b8b8')
    })
    // $('#yayun_query').keydown(function(e){
    //     var timer = ''
    //     if(e.keyCode === 13){
    //         $('#yayunID').click()
    //     }else{
    //         if(timer){
    //             clearTimeout(timer)
    //         }
    //         timer = setTimeout(function(){
    //             $('#yayunID').click()
    //         },200)
    //     }
    // })
    var flag = true;
    $('#yayun_query').delegate('#yayun_query input', 'input', function () {
            if (!flag) //默认都可。 输入法时 截断
                $('#yayunID').click()
        }).on('compositionstart', function () {
            flag = true;
            console.log('输入法，录入开始');
        }).on('compositionend', function () {
            flag = false;
            $('#yayunID').click()//在input之后执行 所以需要手动调用一次
            console.log('输入法，输入结束');
        })

    $('#yayunID').click(function(e){
        var word = $('#yayun_query').val()
        if(word){
            window.location.href = '/query?word=' + word + '&source=word'
        }
    })

})