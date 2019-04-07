var carouselOptions = {
    draggable: false,
    contain: true,
    pageDots: false,
    cellSelector: '.carousel-cell',
    hash: true

}
var slideTemplate = document.querySelector('#slide-template').innerHTML;
Mustache.parse(slideTemplate);

var slidesHtml = slideData.reduce(function(acc,slide,index) {
    slide.id = index;
    return acc += Mustache.render(slideTemplate, slide)
}, '');

document.querySelector('.carousel').insertAdjacentHTML('afterbegin', slidesHtml);

var carousel = new Flickity('.carousel', carouselOptions);
var progressBar = document.querySelector('.progress-bar');
carousel.on('scroll', function (progress) {
    progress = Math.max(0, Math.min(1, progress));
    progressBar.style.width = progress * 100 + '%';
})

var btnReset = document.querySelector('.my-btn');
btnReset.addEventListener('click', function () {
    carousel.select(0, false, false);
});
