'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const scroll = document.querySelector('.btn--scroll-to');
const s1 = document.getElementById('section--1');
const s2 = document.getElementById('section--2');
const s3 = document.getElementById('section--3');
const navLink = document.querySelector('.nav__links');
const navClass = document.querySelectorAll('.nav__link');
const operation = document.querySelector('.operations__tab-container');
const operationBtn = document.querySelectorAll('.operations__tab');
const operationContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const allSection = document.querySelectorAll('.section');
const allSlide = document.querySelectorAll('.slide');
const dotContainer = document.querySelector('.dots');

// Operations BuildUp

operation.addEventListener('click',function(e) {
  const clk = e.target.closest('.operations__tab');
  console.log(clk);

  operationBtn.forEach(b => b.classList.remove('operations__tab--active'));
  clk.classList.add('operations__tab--active');

  if(!clk) return;

  operationContent.forEach(c => c.classList.remove('operations__content--active'));

  document.querySelector(`.operations__content--${clk.dataset.tab}`).classList.add('operations__content--active');
});


// Sticky nav
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function(entries) {
  const [entry] = entries;
  if(!entry.isIntersecting)   nav.classList.add('sticky');
  
  else  nav.classList.remove('sticky');
}

const navObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});

navObserver.observe(header);


// Pop Up Section Effect 
const popUp = function (entries) {
  const [entry] = entries;
  
  if(!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');

  secEffect.unobserve(entry.target);


}

const secEffect = new IntersectionObserver(popUp,{
  root: null,
  threshold: 0.15

});
allSection.forEach(s => {
  s.classList.add('section--hidden');
  secEffect.observe(s);

  
});


// Lazy loading image

const allimg = document.querySelectorAll('img[data-src]');

const lazyImg = function(entries) {
  const [entry] = entries;

  if(!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load',function() {
    entry.target.classList.remove('lazy-img');
  });

  imgLoad.unobserve(entry.target);

}

const imgLoad = new IntersectionObserver(lazyImg,{
  root: null,
  threshold: 0.1,
  rootMargin: '-130px'
});
allimg.forEach(img => {
  imgLoad.observe(img);
  
})

// SLider Component

const slider = document.querySelector('.slider');
//slider.style.transform = 'scale(0.5)';
//slider.style.overflow = 'visible';
allSlide.forEach((s,i)=> {
  dotContainer.insertAdjacentHTML('beforeend',
    `<button class="dots__dot" data-slide="${i}"> </button>`);
  s.style.transform=`translateX(${i * 100}%)`;
})

const alldots = document.querySelectorAll('.dots__dot');

const activeDot = function(slide) {
  alldots.forEach(d => {
    d.classList.remove('dots__dot--active');
    
    if(Number(d.dataset.slide) === slide)  {
     
      d.classList.add('dots__dot--active');
    }
  });
  
};
activeDot(0);

const btnRht = document.querySelector('.slider__btn--right');
const btnLft = document.querySelector('.slider__btn--left');
let curr = 0 ;

const nextSlide = function() {
  allSlide.forEach((s,i)=> {
    
    if(curr === 2) curr = -1;
    s.style.transform=`translateX(${(i-curr-1) * 100}%)`;
  });
  activeDot(curr+1);
  curr++;

};

const prevSlide = function() {
  allSlide.forEach((s,i)=> {
    if(curr === 0) curr = 3;
    s.style.transform=`translateX(${(i-curr+1) * 100}%)`;
  });
  activeDot(curr-1);
  curr--;
};
btnRht.addEventListener('click',nextSlide);

btnLft.addEventListener('click',prevSlide);

document.addEventListener('keydown',function (e) {
  
  if(e.key === 'ArrowLeft') prevSlide();
  else if(e.key === 'ArrowRight') nextSlide();
})

dotContainer.addEventListener('click',function(e) {
  if(!e.target.classList.contains('dots__dot')) return;

  const num = Number(e.target.dataset.slide);
  activeDot(num);
  allSlide.forEach((s,i)=> {
    s.style.transform=`translateX(${(i-num) * 100}%)`;
  });
  
});


// Fading Animation
const animationFn = function(e) {
  if(e.target.classList.contains('nav__link')) {
    const sibling = e.target.closest('.nav').querySelectorAll('.nav__link');
    const logo = e.target.closest('.nav').querySelector('.nav__logo');

    sibling.forEach(s => {
      if(s != e.target) s.style.opacity=this;
    });

    logo.style.opacity=this;
    
  }
};

nav.addEventListener('mouseover',animationFn.bind(0.5));

nav.addEventListener('mouseout',animationFn.bind(1));






// Modal Window

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// Scrolling Learn More
scroll.addEventListener('click',function() {
  s1.scrollIntoView({behavior:'smooth'});
});

// Scrolling NavList 
navLink.addEventListener('click',function(e) {

 if(e.target.getAttribute('href') !== "bankIndex.html" && e.target.getAttribute('href') !== '#' ){
    e.preventDefault();
    
    const st = e.target.getAttribute('href');
    if(st !== '#' && st!== "bankIndex.html") document.querySelector(st).scrollIntoView({behavior:'smooth'});
  }
});
