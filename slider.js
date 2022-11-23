'use strict'

const slider = document.querySelector('.container');

createDots();
createSlider(slider);

function createSlider(slider) {
    let current;
    let prev;
    let next;

    const prevBtn = document.querySelector('.prevButton');
    const nextBtn = document.querySelector('.nextButton');
    const dots = document.querySelectorAll('.dot');
    const rules = document.styleSheets;
    const swipe = window.matchMedia('(max-width: 768px)');

    if (swipe.matches) {
        createSwipe();
    }

    prevBtn.addEventListener('click', event => {
        slideChanger('back');
    });

    prevBtn.addEventListener('mouseover', event => {
        rules[0].cssRules[3].style.transform = 'translateX(-200%)';
    });

    nextBtn.addEventListener('click', event => {
        slideChanger();
    });

    nextBtn.addEventListener('mouseover', event => {
        rules[0].cssRules[3].style.transform = 'translateX(200%)';
    });

    function startSlider() {
        current = slider.querySelector('.current') ?? slider.firstElementChild;
        prev = current?.previousElementSibling ?? slider.lastElementChild;
        next = current?.nextElementSibling ?? slider.firstElementChild;
    }

    function applyClasses() {
        current.classList.add('current');
        prev.classList.add('prev');
        next.classList.add('next');
    }

    function slideChanger(direction) {
        const classes = ['prev', 'current', 'next'];
        [prev, current, next].forEach(item => item.classList.remove(...classes));

        if (direction === 'back') {
            [prev, current, next] = [
                prev.previousElementSibling || slider.lastElementChild,
                prev,
                current
            ];
        } else {
            [prev, current, next] = [
                current,
                next,
                next.nextElementSibling || slider.firstElementChild
            ];
        }

        applyClasses();
        dotsChanger();
    }

    function dotsChanger() {
        const slides = Array.from(slider.querySelectorAll('.slide'));

        dots.forEach(item => item.classList.remove('active'));
        dots[slides.indexOf(current)].classList.add('active');
    }

    function createSwipe() {
        document.addEventListener('touchstart', handleTouchStart, false);
        document.addEventListener('touchmove', handleTouchMove, false);

        let xDown = null;
        let yDown = null;

        function getTouches(evt) {
            return evt.touches;
        }

        function handleTouchStart(evt) {
            const firstTouch = getTouches(evt)[0];
            xDown = firstTouch.clientX;
            yDown = firstTouch.clientY;
        }

        function handleTouchMove(evt) {
            if ( ! xDown || ! yDown ) {
                return;
            }

            let xUp = evt.touches[0].clientX;
            let yUp = evt.touches[0].clientY;

            let xDiff = xDown - xUp;
            let yDiff = yDown - yUp;

            if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
                if ( xDiff > 0 ) {
                    slideChanger();
                } else {
                    slideChanger('back');
                }
            }
            xDown = null;
            yDown = null;
        }
    }

    startSlider();
    dotsChanger();
    applyClasses();
}

function createDots() {
    const slides = document.querySelectorAll('.slide');
    const container = document.createElement('div');
    container.classList.add('dots');

    for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('span')
        dot.classList.add('dot');
        dot.textContent = '•';

        container.append(dot);
    }

    document.body.appendChild(container);
}



