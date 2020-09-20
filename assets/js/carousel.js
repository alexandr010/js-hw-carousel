const container = document.querySelector('.slides')
const slides = container.querySelectorAll('.slide')
let currentSlide = 0;
let slideInterval = setInterval(nextSlide, 2000);
let isPlaying = true;
const pauseButton = container.querySelector('#pause');
const nextButton = container.querySelector('#next');
const prevButton = container.querySelector('#prev');
const indicatorsContainer = document.querySelector('#indicators-container');
const indicators = indicatorsContainer.querySelectorAll('.indicator');
const SPACE = ' ';
const LEFT_ARROW = 'ArrowLeft';
const RIGHT_ARROW = 'ArrowRight';
let swipeStartX = null;
let swipeEndX = null;

function goToSlide (n) {
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.toggle('active');
    indicators[currentSlide].classList.toggle('active');
}

function nextSlide(){
    goToSlide(currentSlide + 1);
}

function prevSlide() {
    goToSlide(currentSlide - 1);
}

function pauseSlideShow () {
    pauseButton.innerHTML = '<i class="fas fa-play"></i>';
    isPlaying = false;
    clearInterval(slideInterval);
}

function playSlideShow (){
    pauseButton.innerHTML = '<i class="fas fa-pause"></i>';
    isPlaying = true;
    slideInterval =  setInterval(nextSlide, 2000);
}

function playPause(){
    if(isPlaying) {
        pauseSlideShow();
    }
    else {
        playSlideShow();
    }
}

function indicate(event){
    let target = event.target;
    if (target.classList.contains('indicator')){
        pauseSlideShow();
        goToSlide(+target.getAttribute('data-slide-to'));
    }
}

function pressKey(event){
    if(event.key === LEFT_ARROW) {
        prevSlide();
        pauseSlideShow()
    }
    if (event.key === RIGHT_ARROW){
        nextSlide();
        pauseSlideShow()
    }
    if (event.key === SPACE){
        playPause();
    }
}

function swipeStart(e){
    swipeStartX = e.changedTouches[0].pageX;
    console.log(swipeStartX);
}

function swipeEnd(e){
    swipeEndX = e.changedTouches[0].pageX;
    if (swipeStartX - swipeEndX > 100) {
        nextSlide();
        pauseSlideShow()
    }
    if (swipeStartX - swipeEndX < -100){
        prevSlide();
        pauseSlideShow()
    }
    console.log(swipeStartX);
}

pauseButton.addEventListener('click', playPause);
indicatorsContainer.addEventListener('click', indicate);
nextButton.addEventListener('click', () => {
    nextSlide();
    pauseSlideShow();
});
prevButton.addEventListener('click', () => {
    prevSlide();
    pauseSlideShow();
})
document.addEventListener('keydown', pressKey);
document.addEventListener('touchstart', swipeStart);
document.addEventListener('touchend', swipeEnd);