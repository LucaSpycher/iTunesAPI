


function doIt() {
    var artist = document.getElementById('searchField').value;
    var limit = 50;
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
    var html = '<table>';
    for(var i = 0; i<res.results.length; i++) {
        html += '<tr class="tableRow">';
        html += '<td>'+ (i+1) +'</td><th>'+ res.results[i].trackName +'</th>';
        html += '</tr>'
    }
    html += '</table>';
    $('#searchOutput').append(html);
    for(var l = 0; l < $('.tableRow').length; l++) {
        $('table:nth-child('+ (i+1) +')').toggle().delay(l * 400).fadeToggle('slow');
    }
}
