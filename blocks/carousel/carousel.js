import { fetchPlaceholders } from '../../scripts/placeholders.js';

let carouselId = 0;

/*
  SIMPLE IMAGE CAROUSEL
  Works with structure:

  .carousel
    > div (row)
      > div
        > picture/img
*/

export default async function decorate(block) {
  carouselId += 1;

  const rows = [...block.children];
  if (!rows.length) return;

  const placeholders = await fetchPlaceholders();

  block.classList.add('carousel');
  block.setAttribute('id', `carousel-${carouselId}`);
  block.setAttribute('role', 'region');
  block.setAttribute(
    'aria-roledescription',
    placeholders.carousel || 'Carousel'
  );

  /* -------------------------
     CREATE STRUCTURE
  ------------------------- */

  const container = document.createElement('div');
  container.className = 'carousel-slides-container';

  const slidesWrapper = document.createElement('ul');
  slidesWrapper.className = 'carousel-slides';

  const indicatorsNav = document.createElement('nav');
  indicatorsNav.setAttribute(
    'aria-label',
    placeholders.carouselSlideControls || 'Carousel Controls'
  );

  const indicators = document.createElement('ol');
  indicators.className = 'carousel-slide-indicators';

  const navButtons = document.createElement('div');
  navButtons.className = 'carousel-navigation-buttons';
  navButtons.innerHTML = `
    <button class="slide-prev" aria-label="Previous Slide"></button>
    <button class="slide-next" aria-label="Next Slide"></button>
  `;

  /* -------------------------
     CREATE SLIDES
  ------------------------- */

  rows.forEach((row, idx) => {
    const slide = document.createElement('li');
    slide.className = 'carousel-slide';
    slide.dataset.index = idx;

    slide.append(...row.children);
    slidesWrapper.append(slide);

    /* indicators */
    const dot = document.createElement('li');
    dot.innerHTML = `<button aria-label="Go to slide ${idx + 1}"></button>`;
    dot.querySelector('button').dataset.index = idx;
    indicators.append(dot);

    row.remove();
  });

  indicatorsNav.append(indicators);

  container.append(navButtons);
  container.append(slidesWrapper);

  block.append(container);
  block.append(indicatorsNav);

  /* -------------------------
     LOGIC
  ------------------------- */

  let currentIndex = 0;
  const slides = slidesWrapper.querySelectorAll('.carousel-slide');

  function updateIndicators(index) {
    indicators.querySelectorAll('button').forEach((btn, i) => {
      btn.disabled = i === index;
    });
  }

  function showSlide(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;

    currentIndex = index;

    slidesWrapper.scrollTo({
      left: slides[index].offsetLeft,
      behavior: 'smooth',
    });

    updateIndicators(index);
  }

  /* -------------------------
     EVENTS
  ------------------------- */

  navButtons.querySelector('.slide-prev').onclick = () =>
    showSlide(currentIndex - 1);

  navButtons.querySelector('.slide-next').onclick = () =>
    showSlide(currentIndex + 1);

  indicators.querySelectorAll('button').forEach((btn) => {
    btn.onclick = () => showSlide(parseInt(btn.dataset.index, 10));
  });

  /* -------------------------
     AUTO PLAY (3s)
  ------------------------- */

  setInterval(() => {
    showSlide(currentIndex + 1);
  }, 3000);

  updateIndicators(0);
}
