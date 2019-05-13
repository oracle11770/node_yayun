$(function(){ 
    function checkVaild(){
        return false
    }
    $('#yayunLogo img').click(function(e){
        window.location.href = 'https://www.baidu.com/s?wd='+encodeURI('母亲节')
    })
    $('#yayun_query').focus(function(e){
        $('#yayun_query').css('border-color', '#2d78f4')
    })
    $('#yayun_query').blur(function(e){
        $('#yayun_query').css('border-color', '#b8b8b8')
    })
    $('#yayun_query').keydown(function(e){
        var timer = ''
        if(e.keyCode === 13){
            $('#yayunID').click()
        }else{
            if(timer){
                clearTimeout(timer)
            }
            timer = setTimeout(function(){
                $('#yayunID').click()
            },200)
        }
    })
    $('#yayunID').click(function(e){
        var word = $('#yayun_query').val()
        if(word){
            window.location.href = '/query?word=' + word.split('')[word.length-1]
        }
    })
})