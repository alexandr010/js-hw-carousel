const container = document.querySelector('.slides')
let slides = container.querySelectorAll('.slide')
let currentSlide = 0;
let slideInterval = setInterval(nextSlide, 2000);
let isPlaying = true;
const pauseButton = document.querySelector('#pause');
const nextButton = document.querySelector('#next');
const prevButton = document.querySelector('#prev');
let indicatorsContainer = document.querySelector('#indicators-container');
let indicators = indicatorsContainer.querySelectorAll('.indicator');

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
    pauseButton.innerHTML = 'Play';
    isPlaying = false;
    clearInterval(slideInterval);
}

function playSlideShow (){
    pauseButton.innerHTML = 'Pause';
    isPlaying = true;
    slideInterval =  setInterval(nextSlide, 2000);
}

pauseButton.addEventListener('click', () => {
    console.log(pauseButton);
    if(isPlaying) {
        pauseSlideShow();
    }
    else {
        playSlideShow();
    }
});

function indicate(event){
    let target = event.target;
    if (target.classList.contains('indicator')){
        pauseSlideShow();
        goToSlide(+target.getAttribute('data-slide-to'));
    }
}
indicatorsContainer.addEventListener('click', indicate);

nextButton.addEventListener('click', () => {
    nextSlide();
    pauseSlideShow();
});
prevButton.addEventListener('click', () => {
    prevSlide();
    pauseSlideShow();
})
