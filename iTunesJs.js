$(document).ready(function () {
    document.getElementById('songLimit').value = 50;

    $(window).scroll(function () {
        if($(this).scrollTop() > 150) {
            $('#toTop').fadeIn('slow');
        } else {
            $('#toTop').fadeOut('slow');
        }
    });

    $('#toTop').on('click', function () {
        $('html, body').animate({scrollTop: 0}, 800);
    })
});

function doIt() {
    var artist = document.getElementById('searchField').value;
    var limit = $('#songLimit').val();
    var url = 'https://itunes.apple.com/search?limit=' + limit + '&term=' + artist;

    $.ajax({
        url: url,
        type: 'GET',
        crossDomain: true,
        dataType: 'jsonp',
        success: function (result) {
            console.log(result);
            process(result)
        },
        error: function () {
            alert('Failed!');
        }
    });
}

function process(res) {
    document.getElementById('searchOutput').innerHTML = '';
    var html = '<table><tr><th><span id="trackName">TRACK NAME</span><div id="artistDiv"><span id="artist">ARTIST</span></div></th></tr>';
    for(var i = 0; i < res.results.length; i++) {
        var song = res.results[i];
        html += '<tr class="tableRow">';
        html += '<td><span class="number">'+ (i+1) +'</span><a target="_blank" href='+ song.trackViewUrl +'><img src='+ song.artworkUrl30+'></a><span class="name">'+ song.trackName +'</span>' +
            '<div class="artistDiv"><span class="artist">'+ song.artistName +'</span></div></td>';
        html += '</tr>'
    }
    html += '</table>';
    $('#searchOutput').append(html).find('tr').hide();
    for(var l = 0; l < $('.tableRow').length+1; l++) {
        $("tr:nth-of-type("+ (l+1) +")").delay(10 * l).fadeIn(100);
    }
    if($('.tableRow').length == 0) {
        var message = $('<p style="text-align: center">no results</p>');
        message.appendTo($('#searchOutput')).hide().slideDown('slow');
    }
}
