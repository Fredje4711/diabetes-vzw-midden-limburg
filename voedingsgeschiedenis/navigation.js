'use strict';

const currentYear = document.querySelector('[data-current-year]');
const backToTopButton = document.querySelector('[data-back-to-top]');
const moduleNavigation = document.querySelector('.module-navigation');

if (moduleNavigation) {
  const modulePath = '/voedingsgeschiedenis/';
  const currentPath = window.location.pathname;
  const isOverviewPage = currentPath.endsWith(modulePath)
    || currentPath.endsWith(`${modulePath}index.html`);

  if (!isOverviewPage) {
    const overviewLink = moduleNavigation.querySelector('a');

    if (overviewLink) {
      overviewLink.textContent = 'Naar het tijdlijnoverzicht';
    }

    try {
      const previousUrl = new URL(document.referrer);
      const cameFromModule = previousUrl.origin === window.location.origin
        && previousUrl.pathname.includes(modulePath)
        && previousUrl.pathname !== currentPath;

      if (cameFromModule) {
        const previousPageButton = document.createElement('button');
        previousPageButton.className = 'previous-page-button';
        previousPageButton.type = 'button';
        previousPageButton.textContent = '← Terug naar de vorige pagina';

        previousPageButton.addEventListener('click', () => {
          if (window.history.length > 1) {
            window.history.back();
            return;
          }

          if (overviewLink) {
            window.location.href = overviewLink.href;
          }
        });

        moduleNavigation.prepend(previousPageButton);
      }
    } catch {
      // Zonder geldige verwijzende pagina blijft het tijdlijnoverzicht beschikbaar.
    }
  }
}

if (currentYear) {
  currentYear.textContent = String(new Date().getFullYear());
}

if (backToTopButton) {
  const updateBackToTopVisibility = () => {
    backToTopButton.classList.toggle('is-visible', window.scrollY > 500);
  };

  backToTopButton.addEventListener('click', () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
  });

  window.addEventListener('scroll', updateBackToTopVisibility, { passive: true });
  updateBackToTopVisibility();
}
