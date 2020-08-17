Number.prototype.map = function (in_min, in_max, out_min, out_max) {
    var mapped = (this - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
    if(out_min < out_max) {
        if(mapped > out_max) return out_max;
        if(mapped < out_min) return out_min;
    } else {
        if(mapped < out_max) return out_max;
        if(mapped > out_min) return out_min;
    }

    return mapped;
}

function getScroll() {
    var scr = document.body.scrollTop;
    if(scr == 0) return document.documentElement.scrollTop;
    return scr;
}

window.onresize = function() {
    var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    console.log('W: ' + width);
}



function logoLoad() {
    var moved = false;
    var scroll = getScroll() != 0;
    if(((window.innerWidth > 0) ? window.innerWidth : screen.width) <= 750) {
        $('header img').css('transition', 'none');
        $('header img').css('transform', 'translate(0, 0)');
        $('header img').css('width', '65px');
        moved = true;
    }
    $('header img').css('opacity', '1');

    //var bigPictureLogo = Math.min(500, (window.innerWidth > 0) ? window.innerWidth : screen.width);

    //$('header img').css('width', bigPictureLogo+'px');
    //$('header img').css('transform', 'translate(0, 100px)');
    setTimeout(function() {
        if(!moved) {
            $('header img').css('transform', 'translate(0, 0)');
            $('header img').css('width', '65px');
        }
        setTimeout(function() {
            if(getScroll() > 0) {
                $('header img').css('transition', '1s');
                $('.cs_main_wrapper').css('transition', 'none');
                scrollFunction();
                $('header').css('transition', 'none');
                $('header h1').css('opacity', 1);
                window.onscroll = function() {scrollFunction()};
                $('.cs_main_wrapper').css('opacity', 1);
                $('.cs_section_hr').css('opacity', 1);
                $('footer').css('opacity', 1);
                setTimeout(function() {
                    $('header img').css('transition', 'none');
                    $('header h1').css('transition', 'none');
                }, (scroll ? 1000 : 800));
                return;
            }
            $('.cs_main_wrapper').css('opacity', 1);
            $('.cs_section_hr').css('opacity', 1);
            $('header h1').css('opacity', 1);
            $('footer').css('opacity', 1);
            $('header').css('background', 'linear-gradient(90deg, rgba(74,91,103,0.5) 0%, rgba(34,88,103,0.5) 35%, rgba(74,91,103,0.5) 100%)');
            window.onscroll = function() {scrollFunction()};
            $('header').css('transition', 'none');
            $('header img').css('transition', 'none');
            $('header h1').css('transition', 'none');
            scrollFunction();
        }, moved ? 190 : 1000);
    }, moved ? 10 : 400);
}



function scrollFunction() {
    var scroll = getScroll();

    
    var limit = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
        document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );


    var scroll_max = limit - window.innerHeight;

    var factor = Math.min(Math.max(scroll_max, 10), 160); // 160
    if(factor == 0) factor = 160;

    var header_height = scroll.map(0, factor, 160, 53);

    var header_alpha = scroll.map(0, factor, 0.5, 1);


    $('header').css('height', header_height + 'px')
    .css('background', 'linear-gradient(90deg, rgba(74,91,103,'+header_alpha+') 0%, rgba(34,88,103,'+header_alpha+') 35%, rgba(74,91,103,'+header_alpha+') 100%)');

    var img = scroll.map(0, factor, 0, -154);

    var h1_x = scroll.map(0, factor, 0, 25);
    var h1_y = scroll.map(0, factor, 0, -43);

    $('header img').css('transform', 'translate('+img+'px, 0)');
    $('header h1').css('transform', 'translate('+h1_x+'px, '+h1_y+'px)');
    
    var h1_font = scroll.map(0, factor, 48, 40);
    var img_w = scroll.map(0, factor, 65, 40);

    $('.cs_logo h1').css('font-size', h1_font+'px');
    $('.cs_logo img').css('width', img_w+'px');

    var logopad = scroll.map(0, factor, 20, 5);

    $('.cs_logo').css('padding-top', logopad+'px');

}

function restoreInstagram() {
    $('#cs_inst').html(' можете посетить мой <span class="cs_instagram">инстаграм</span>.');
}

var page_loading = false;

function openPage(page) {
    page_loading = true;
    $('.cs_main_content').fadeOut(200);
    setTimeout(function() {
        restoreAll();
        $('#cs_page_' + page).fadeIn(200);
        page_loading = false;
    }, 200);
}

function restoreAll() {
    restoreInstagram();
    restoreFeedback();
}

function messageSent() {
    $('#formResultMessage').css('color', 'green');
    $('#formResultMessage').html('Сообщение отправлено');
    $('#formResultMessageInfo').html(document.getElementById('message').value);
    $('#formResultMessageCredentials').html(document.getElementById('name').value + ' (' + document.getElementById('email').value + ')');
}

function messageError() {
    $('#formResultMessage').css('color', 'red');
    $('#formResultMessage').html('Не удалось отправить сообщение');
    $('#formResultMessageInfo').html(document.getElementById('message').value);
    $('#formResultMessageCredentials').html(document.getElementById('name').value + ' (' + document.getElementById('email').value + ')');
}

function restoreFeedback() {
    $('.feedback input[type=submit]').prop("disabled", false);
    $('.feedback form').removeClass('unvisible');
    $('.formLoading').addClass('hidden');
    $('.formResult').addClass('hidden');
    $('#formResultMessageCredentials').addClass('hidden');
    $('.feedback input[type=text]').val('');
    $('.feedback input[type=email]').val('');
    $('.feedback textarea').val('');
}

function showFeedbackResponse() {
    $('.formLoading').addClass('hidden');
    $('.formResult').removeClass('hidden');
    $('#formResultMessageCredentials').removeClass('hidden');
    page_loading = false;
}

function sendFeedback() {
    page_loading = true;
    $('.feedback input[type=submit]').prop("disabled", true);
    $('.feedback form').addClass('unvisible');
    $('.formLoading').removeClass('hidden');
    
    $.ajax({
        type: 'POST',
        url: $("#feedbackForm").attr("action"),
        data: $("#feedbackForm").serialize(), 
        success: function(response) {
            console.log(response);
            if(response.status) messageSent();
            else messageError();
            showFeedbackResponse();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr);
            messageError();
            showFeedbackResponse();
        }
      });
}


$(document).ready(function() {
    logoLoad();


    $('.cs_main_wrapper nav a').on('click', function(e) {
        e.preventDefault();
        if(page_loading) return;
        if($(this).hasClass('cs_nav_selected')) return;
        $('.cs_main_wrapper nav a').removeClass('cs_nav_selected');
        $(this).addClass('cs_nav_selected');
        openPage($(this).attr('data-page'));
    });

    $('.cs_sect').on('click', '.cs_instagram', function () {
        $('#cs_inst').html('... серьёзно, оно вам надо?');
    });
});


// img          transform: translate(-187px, 0);

// h1               transform: translate(25px, -65px);

// header div       padding-top: 5px;

// header           height: 92px;
//                  background: linear-gradient(90deg, rgba(74,91,103,1) 0%, rgba(34,88,103,1) 35%, rgba(74,91,103,1) 100%);

// .cs_section_hr_top  margin-top: 160px -> 92px