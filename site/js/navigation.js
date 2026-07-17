(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const submenuButtons = document.querySelectorAll('.submenu-toggle');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  submenuButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const parent = button.closest('.has-submenu');
      const shouldOpen = !parent.classList.contains('open');

      document.querySelectorAll('.has-submenu.open').forEach((item) => {
        if (item !== parent) {
          item.classList.remove('open');
          item.querySelector('.submenu-toggle')?.setAttribute(
            'aria-expanded',
            'false'
          );
        }
      });

      parent.classList.toggle('open', shouldOpen);
      button.setAttribute('aria-expanded', String(shouldOpen));
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    nav?.classList.remove('open');
    toggle?.setAttribute('aria-expanded', 'false');
    document.querySelectorAll('.has-submenu.open').forEach((item) => item.classList.remove('open'));
    submenuButtons.forEach((button) => button.setAttribute('aria-expanded', 'false'));
  });
})();
