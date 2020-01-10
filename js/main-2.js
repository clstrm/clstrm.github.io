function strdisp(val, one, two, five) {
    var x = val % 100;
    if(x >= 11 && x <= 19) return five;
    x = x % 10;
    if(x >= 2 && x <= 4) return two;
    if(x == 0 || (x >= 5 && x <= 9)) return five;
    return one;
}

function formatDate(date) {
    var begin = new Date(0);

    var day = date.getDate() - begin.getDate();
    var mon = date.getMonth() - begin.getMonth();
    var year = date.getFullYear() - begin.getFullYear();

    var h = date.getHours() - begin.getHours();
    var m = date.getMinutes() - begin.getMinutes();
    var s = date.getSeconds() - begin.getSeconds();

    var res = '';
    if(year > 0) {
        res += year + ' ' + strdisp(year, 'год', 'года', 'лет') + ' ';
    }

    if(mon > 0) {
        res += mon + ' ' + strdisp(mon, 'месяц', 'месяца', 'месяцев') + ' ';
    }

    if(day > 0) {
        res += day + ' ' + strdisp(day, 'день', 'дня', 'дней') + ' ';
    }

    if(h > 0) {
        res += h + ' ' + strdisp(h, 'час', 'часа', 'часов') + ' ';
    }

    if(m > 0) {
        res += m + ' ' + strdisp(m, 'минута', 'минуты', 'минут') + ' ';
    }

    if(s > 0) {
        //res += s + ' ' + strdisp(s, 'секунда', 'секунды', 'секунд') + ' ';
    }

    return res.trim();
}

var birth = new Date(1999, 4, 4, 5, 45, 0); // 04.05.1999 18:20




$(function () {
    $('.sect').on('click', '.instagram', function () {
        $('#inst').html('... серьёзно, оно вам надо?');
    });

    $(".servicesMenu").hover(function () {
        $(this).find('ul').slideToggle('fast');
    });
});

function restoreInstagram() {
    $('#inst').html(' можете посетить мой <span href="#" class="instagram">инстаграм</span>.');
}