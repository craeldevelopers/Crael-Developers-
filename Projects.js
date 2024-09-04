const carouselWrapper = document.querySelector('.carousel-wrapper');
const projectCards = document.querySelectorAll('.project-card');

let currentIndex = 0;
let isDragging = false;
let startX = 0;
let currentTranslate = 0;
let previousTranslate = 0;

function setCarouselPosition() {
    const cardWidth = projectCards[currentIndex].offsetWidth;
    const carouselWidth = carouselWrapper.offsetWidth;
    const offset = (carouselWidth - cardWidth) / 2;

    currentTranslate = -currentIndex * (cardWidth + 30) + offset;
    previousTranslate = currentTranslate;
    carouselWrapper.style.transform = `translateX(${currentTranslate}px)`;
}

function startDrag(event) {
    isDragging = true;
    startX = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    carouselWrapper.classList.add('grabbing');
}

function endDrag() {
    isDragging = false;
    const movedBy = currentTranslate - previousTranslate;

    if (movedBy < -100 && currentIndex < projectCards.length - 1) {
        currentIndex += 1;
    } else if (movedBy > 100 && currentIndex > 0) {
        currentIndex -= 1;
    }

    setCarouselPosition();
    carouselWrapper.classList.remove('grabbing');
}

function dragging(event) {
    if (isDragging) {
        const currentPosition = event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
        currentTranslate = previousTranslate + currentPosition - startX;
        carouselWrapper.style.transform = `translateX(${currentTranslate}px)`;
    }
}

carouselWrapper.addEventListener('mousedown', startDrag);
carouselWrapper.addEventListener('mouseup', endDrag);
carouselWrapper.addEventListener('mouseleave', endDrag);
carouselWrapper.addEventListener('mousemove', dragging);

carouselWrapper.addEventListener('touchstart', startDrag);
carouselWrapper.addEventListener('touchend', endDrag);
carouselWrapper.addEventListener('touchmove', dragging);

window.addEventListener('resize', setCarouselPosition);

// Initialize the carousel position
setCarouselPosition();
