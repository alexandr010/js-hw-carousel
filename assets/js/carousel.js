class Carousel{
    constructor(carouselSelector) {
        const carousel = document.querySelector(carouselSelector);
        this.container = carousel.querySelector('.slides')
        this.slides = this.container.querySelectorAll('.slide')
        this.currentSlide = 0;
        this.slideInterval = setInterval(() => {
            this.nextSlide();
        }, 2000);
        this.isPlaying = true;
        this.pauseButton = this.container.querySelector('#pause');
        this.nextButton = this.container.querySelector('#next');
        this.prevButton = this.container.querySelector('#prev');
        this.indicatorsContainer = carousel.querySelector('#indicators-container');
        this.indicators = this.indicatorsContainer.querySelectorAll('.indicator');
        this.SPACE = ' ';
        this.LEFT_ARROW = 'ArrowLeft';
        this.RIGHT_ARROW = 'ArrowRight';
        this.swipeStartX = null;
        this.swipeEndX = null;
    }

    goToSlide (n) {
        this.slides[this.currentSlide].classList.toggle('active');
        this.indicators[this.currentSlide].classList.toggle('active');
        this.currentSlide = (n + this.slides.length) % this.slides.length;
        this.slides[this.currentSlide].classList.toggle('active');
        this.indicators[this.currentSlide].classList.toggle('active');
    }

    nextSlide(){
        this.goToSlide(this.currentSlide + 1);
    }

    prevSlide() {
        this.goToSlide(this.currentSlide - 1);
    }

    pauseSlideShow () {
        this.pauseButton.innerHTML = '<i class="fas fa-play"></i>';
        this.isPlaying = false;
        clearInterval(this.slideInterval);
    }

    playSlideShow (){
        this.pauseButton.innerHTML = '<i class="fas fa-pause"></i>';
        this.isPlaying = true;
        this.slideInterval =  setInterval(() => {this.nextSlide()}, 2000);
    }

    playPause(){
        if(this.isPlaying) {
            this.pauseSlideShow();
        }
        else {
            this.playSlideShow();
        }
    }

    next(){
        this.nextSlide();
        this.pauseSlideShow();
    }
    prev() {
        this.prevSlide();
        this.pauseSlideShow();
    }

    indicate(event){
        let target = event.target;
        if (target.classList.contains('indicator')){
            this.pauseSlideShow();
            this.goToSlide(+target.getAttribute('data-slide-to'));
        }
    }

    pressKey(event){
        if(event.key === this.LEFT_ARROW) {
            this.prev();
        }
        if (event.key === this.RIGHT_ARROW){
            this.next();
        }
        if (event.key === this.SPACE){
            this.playPause();
        }
    }

    swipeStart(e){
        this.swipeStartX = e.changedTouches[0].pageX;
    }

    swipeEnd(e){
        this.swipeEndX = e.changedTouches[0].pageX;
        if (this.swipeStartX - this.swipeEndX > 100) {
            this.next();
        }
        if (this.swipeStartX - this.swipeEndX < -100){
            this.prev();
        }
    }

    initListeners(){
        this.pauseButton.addEventListener('click', () => {
            this.playPause();
        });
        this.indicatorsContainer.addEventListener('click', (e) => {
            this.indicate(e);
        });
        this.nextButton.addEventListener('click', () => {
            this.next();
        })
        this.prevButton.addEventListener('click', () => {
            this.prev();
        })
        this.container.addEventListener('keydown', (e) => {
            this.pressKey(e);
        });
        this.container.addEventListener('touchstart', (e) => {
            this.swipeStart(e);
        });
        this.container.addEventListener('touchend', (e) => {
            this.swipeEnd(e);
        });
    }
}