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

    prevBtn.addEventListener('click', () => slideChanger('back'));
    nextBtn.addEventListener('click', slideChanger);

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



