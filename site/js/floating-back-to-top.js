'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const backToTopButton = document.querySelector('[data-floating-back-to-top]');

  if (!backToTopButton) {
    return;
  }

  const updateButtonVisibility = () => {
    backToTopButton.classList.toggle('is-visible', window.scrollY > 80);
  };

  backToTopButton.addEventListener('click', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  window.addEventListener('scroll', updateButtonVisibility, { passive: true });
  updateButtonVisibility();
});
