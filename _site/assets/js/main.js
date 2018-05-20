var audio;
var playlist;

index    = 0;
paused   = true;
shuffle  = false;
duration = 0;
loaded   = false;

String.prototype.toMMSS = function () {
    var sec_num = parseInt(this, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return minutes+':'+seconds;
}

class radio {
    static init() {
        // Unhide radio
        $('#radio').css("display", "block");

        // Set init variables
        audio       = $('#radio-audio')[0];
        playlist    = $('#playlist ol').find('li .select');

        // Callbacks
        $('#playlist ol').find('li .select').click(function(e) {
            e.preventDefault();
            radio.select($(this), radio.listen);
        });
        $('#radio-controls-prev').click(radio.prev);
        $('#radio-controls-play').click(radio.play);
        $('#radio-controls-shuffle').click(radio.shuffle);
        $('#radio-controls-next').click(radio.next);
        $('#radio-seek').click(radio.seek);

        audio.addEventListener('loadedmetadata', radio.meta);
        audio.addEventListener('timeupdate', radio.think);
        audio.addEventListener('ended', radio.end);
                
        // Turn volume down
        audio.volume    = .5;

        // Select first song
        radio.select($(playlist[0]));

    }
    static select(track, callback=undefined) {
        radio.setInfo(track);
        index = $(track).parent().index();
        $('#playlist').animate({
            scrollTop: $(track).parent().offset().top - $('#playlist ol').offset().top
        }, 250);

        console.log($(track).parent().position().top - $('#playlist ol').offset().top);

        // TODO: Remove the hamsteralliance.com prefix
        audio.src   = $(track).attr('href');
        audio.load();
        if (callback != undefined) {
            callback();
        }
    }
    static setInfo(track) {
        $(playlist.eq(index).parent().find('.indicator'))
            .removeClass('icon-listen');
        $(track).find('.indicator').addClass('icon-listen');
        $('#radio-current-time').text('...');
        $('#radio-total-time').text('...');
    }
    static listen() {
        audio.play();
        paused = false;
        $('#radio-controls-play').removeClass('icon-play').addClass('icon-pause');
    }
    static play() {
        if (paused) {
            paused = false;
            audio.play();
            $('#radio-controls-play').removeClass('icon-play').addClass('icon-pause');
        } else {
            paused = true;
            audio.pause();
            $('#radio-controls-play').removeClass('icon-pause').addClass('icon-play');
        }
    }
    static shuffle() {
        if (shuffle) {
            shuffle = false;
            $('#radio-controls-shuffle').removeClass('icon-order').addClass('icon-shuffle');
        } else {
            shuffle = true;
            $('#radio-controls-shuffle').removeClass('icon-shuffle').addClass('icon-order');
        }
    }
    static shift(direction) {
        if (index + direction < 0) {
            radio.select(playlist[playlist.length - 1], radio.listen);
            return;
        }
        if (index + direction > playlist.length - 1) {
            radio.select(playlist[0], radio.listen);
            return;
        }
        radio.select(playlist[index + direction], radio.listen);
    }

    static prev() {
        if (audio.currentTime < 3) {
            if (shuffle) {
                var target = $('#playlist ol').find('li').eq(Math.floor(Math.random() * playlist.length ) + 1).find('.select');
                radio.select(target, radio.listen);
            } else {
                radio.shift(-1);
            }
        } else {
            audio.currentTime = 0;
        }
    }

    static next() {
        if (shuffle) {
            var target = $('#playlist ol').find('li').eq(Math.floor(Math.random() * playlist.length ) + 1).find('.select');
            radio.select(target, radio.listen);
        } else {
            radio.shift(1);
        }
    }
    
    static seek(e) {
        if (!loaded) {
            return;
        }
        var zero    = $('#radio-seek').offset().left;
        var pos     = e.pageX;
        var diff    = pos - zero;
        var total   = $('#radio-seek').width();

        audio.currentTime = Math.floor(diff / total * duration);
        $('#radio-seek-current').width(audio.currentTime / duration * total);
    }

    static meta() {
        duration = audio.duration;
        loaded   = true;
        Math.floor(duration);
        $('#radio-total-time').text(duration.toString().toMMSS());
    }
    
    static end() {
        radio.next();
    }

    static think(e) {
        $('#radio-current-time').text(audio.currentTime.toString().toMMSS());
        $('#radio-seek-current').width(audio.currentTime / duration *
        ($('#radio-seek').width()));
    }
}

$(document).ready(function() {
    radio.init();
    $('#panel-links .other-links').find('li a').hover(function() {
        $('.other-links-promo').text($(this).data('desc'));
    }, function() {
        $('.other-links-promo').text('Follow me around the internet.');
    });
});
