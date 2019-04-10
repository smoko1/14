var carouselOptions = {
    draggable: false,
    contain: true,
    pageDots: false,
    cellSelector: '.carousel-cell',
    hash: true
}

var slideTemplate = document.querySelector('#slide-template').innerHTML;
Mustache.parse(slideTemplate);

var slidesHtml = slideData.reduce(function (acc, slide, index) {
    slide.id = index;
    return acc += Mustache.render(slideTemplate, slide)
}, '');


document.querySelector('.carousel').insertAdjacentHTML('afterbegin', slidesHtml);

var carousel = new Flickity('.carousel', carouselOptions);
var progressBar = document.querySelector('.progress-bar');
carousel.on('scroll', function (progress) {
    progress = Math.max(0, Math.min(1, progress));
    progressBar.style.width = progress * 100 + '%';
});
var MapCenter ;
carousel.on('change', function (index) {
    if (MapCenter) {
        newCoords = slideData[index].coords;
        map.panTo(newCoords);
    }
})

var btnReset = document.querySelector('.my-btn');
btnReset.addEventListener('click', function () {
    carousel.select(0, false, false);
})

var map = document.querySelector('map');
window.initMap = function () {
    map = new google.maps.Map(
        document.getElementById('map'), {zoom: 12, center: slideData[0].coords});

    slideData.forEach(function (slide, index) {
        var marker = new google.maps.Marker({
            position: slide.coords,
            map: map,
            title: slide.title
        });
        marker.addListener('click', function () {
            MapCenter = true;
            carousel.select(index, false, false);
        });
    });
};
