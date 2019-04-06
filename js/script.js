'use strict';

(function(){
    var carousel = document.querySelector('.carousel');
    var flkty = new Flickity(carousel, {
        pageDots: false,
        hash: true
    });
    var restart = document.getElementById('restartBtn');
    addEventListener('click', function(event) {
        if (!matchesSelector (event.target, '.my-btn')) {
            return;
        }
        flkty.select(0);
    });
    var progressBar = document.querySelector('.progress-bar');
    flkty.on('scroll', function(progress) {
        progress = Math.max(0, Math.min(1, progress));
        progressBar.style.width = progress * 100 + '%';
    });
})();
