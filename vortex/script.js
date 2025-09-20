document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const wrapper = document.querySelector('.carousel-wrapper');
    
    let currentSlide = 0;
    const totalSlides = slides.length;

    function goToSlide(slideIndex) {
        // Movimenta o wrapper para o slide correto
        wrapper.style.transform = `translateX(-${slideIndex * 100}%)`;
        currentSlide = slideIndex;
    }

    nextButton.addEventListener('click', () => {
        // Avança para o próximo slide, voltando ao primeiro se estiver no último
        const nextSlideIndex = (currentSlide + 1) % totalSlides;
        goToSlide(nextSlideIndex);
    });

    prevButton.addEventListener('click', () => {
         // Volta para o slide anterior, indo para o último se estiver no primeiro
        const prevSlideIndex = (currentSlide - 1 + totalSlides) % totalSlides;
        goToSlide(prevSlideIndex);
    });

    // Inicia no primeiro slide
    goToSlide(0);
});