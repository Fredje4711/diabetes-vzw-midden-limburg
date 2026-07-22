(() => {
  'use strict';

  const LOCAL_BASE = 'http://localhost/diabetes-vzw-midden-limburg/';
  const GITHUB_BASE = 'https://fredje4711.github.io/diabetes-vzw-midden-limburg/';

  const resultsContainer = document.querySelector('[data-anchor-results]');
  if (!resultsContainer) return;

  const searchInput = document.querySelector('[data-anchor-search]');
  const categorySelect = document.querySelector('[data-anchor-category]');
  const resetButton = document.querySelector('[data-anchor-reset]');
  const status = document.querySelector('[data-anchor-status]');
  const totalOutput = document.querySelector('[data-anchor-total]');
  const pageTotalOutput = document.querySelector('[data-page-total]');
  const expandButton = document.querySelector('[data-anchor-expand]');
  const collapseButton = document.querySelector('[data-anchor-collapse]');

  const categoryOrder = [
    'Startpagina',
    'Activiteiten',
    'Diabetesinformatie',
    'Apps en nieuwe toepassingen',
    'Media, downloads en contact',
    'Downloads',
    'Fotoalbums',
    'Voeding door de jaren heen',
    'Overige informatie'
  ];

  let allEntries = [];

  const normalize = (value) => String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();

  const buildUrl = (base, entry) => `${base}${entry.path}#${encodeURIComponent(entry.anchor)}`;

  const createCopyButton = (url, label) => {
    const button = document.createElement('button');
    button.className = 'anchor-copy-button';
    button.type = 'button';
    button.textContent = 'Kopiëren';
    button.setAttribute('aria-label', `${label} kopiëren`);
    button.addEventListener('click', async () => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(url);
        } else {
          const temporaryInput = document.createElement('textarea');
          temporaryInput.value = url;
          temporaryInput.setAttribute('readonly', '');
          temporaryInput.style.position = 'fixed';
          temporaryInput.style.opacity = '0';
          document.body.appendChild(temporaryInput);
          temporaryInput.select();
          document.execCommand('copy');
          temporaryInput.remove();
        }
        button.textContent = 'Gekopieerd';
        window.setTimeout(() => { button.textContent = 'Kopiëren'; }, 1800);
      } catch (error) {
        button.textContent = 'Niet gelukt';
        window.setTimeout(() => { button.textContent = 'Kopiëren'; }, 2200);
      }
    });
    return button;
  };

  const createUrlRow = (environment, url) => {
    const row = document.createElement('div');
    row.className = 'anchor-url-row';

    const name = document.createElement('strong');
    name.textContent = environment;

    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = url;

    row.append(name, link, createCopyButton(url, `${environment}-URL`));
    return row;
  };

  const createEntry = (entry) => {
    const article = document.createElement('article');
    article.className = 'anchor-catalog-entry';

    const headingRow = document.createElement('div');
    headingRow.className = 'anchor-entry-heading';

    const title = document.createElement('h4');
    title.textContent = entry.label;

    const fragment = document.createElement('code');
    fragment.textContent = `#${entry.anchor}`;

    headingRow.append(title, fragment);
    article.append(
      headingRow,
      createUrlRow('Laragon', buildUrl(LOCAL_BASE, entry)),
      createUrlRow('GitHub', buildUrl(GITHUB_BASE, entry))
    );
    return article;
  };

  const createPageGroup = (page, entries, forceOpen) => {
    const details = document.createElement('details');
    details.className = 'anchor-page-group';
    details.open = forceOpen;

    const summary = document.createElement('summary');
    const title = document.createElement('span');
    title.textContent = page;
    const count = document.createElement('small');
    count.textContent = `${entries.length} ${entries.length === 1 ? 'anker' : 'ankers'}`;
    summary.append(title, count);

    const list = document.createElement('div');
    list.className = 'anchor-page-entries';
    entries.forEach((entry) => list.appendChild(createEntry(entry)));
    details.append(summary, list);
    return details;
  };

  const render = () => {
    const query = normalize(searchInput.value.trim());
    const selectedCategory = categorySelect.value;
    const filtered = allEntries.filter((entry) => {
      if (selectedCategory && entry.category !== selectedCategory) return false;
      if (!query) return true;
      return normalize(`${entry.category} ${entry.page} ${entry.label} ${entry.path} ${entry.anchor}`).includes(query);
    });

    const grouped = new Map();
    filtered.forEach((entry) => {
      if (!grouped.has(entry.category)) grouped.set(entry.category, new Map());
      const pages = grouped.get(entry.category);
      if (!pages.has(entry.page)) pages.set(entry.page, []);
      pages.get(entry.page).push(entry);
    });

    resultsContainer.replaceChildren();
    const forceOpen = Boolean(query || selectedCategory);

    categoryOrder.forEach((category) => {
      const pages = grouped.get(category);
      if (!pages) return;

      const details = document.createElement('details');
      details.className = 'anchor-category-group';
      details.open = forceOpen || category === 'Activiteiten';

      const summary = document.createElement('summary');
      const heading = document.createElement('h3');
      heading.textContent = category;
      const categoryCount = [...pages.values()].reduce((sum, entries) => sum + entries.length, 0);
      const count = document.createElement('span');
      count.textContent = `${categoryCount} links`;
      summary.append(heading, count);

      const pageList = document.createElement('div');
      pageList.className = 'anchor-category-pages';
      pages.forEach((entries, page) => {
        pageList.appendChild(createPageGroup(page, entries, forceOpen));
      });

      details.append(summary, pageList);
      resultsContainer.appendChild(details);
    });

    if (!filtered.length) {
      const message = document.createElement('p');
      message.className = 'notice';
      message.textContent = 'Geen ankerlinks gevonden voor deze zoekopdracht.';
      resultsContainer.appendChild(message);
    }

    const pageCount = new Set(filtered.map((entry) => entry.path)).size;
    status.textContent = `${filtered.length} ${filtered.length === 1 ? 'deelbare link' : 'deelbare links'} op ${pageCount} ${pageCount === 1 ? 'pagina' : 'pagina’s'}`;
  };

  const addOptions = () => {
    const available = new Set(allEntries.map((entry) => entry.category));
    categoryOrder.filter((category) => available.has(category)).forEach((category) => {
      const option = document.createElement('option');
      option.value = category;
      option.textContent = category;
      categorySelect.appendChild(option);
    });
  };

  const deduplicate = (entries) => {
    const unique = new Map();
    entries.forEach((entry) => unique.set(`${entry.path}#${entry.anchor}`, entry));
    return [...unique.values()];
  };

  Promise.all([
    fetch('site/data/ankerlinks.json', { cache: 'no-store' }).then((response) => response.json()),
    fetch('site/data/downloads.json', { cache: 'no-store' }).then((response) => response.json()),
    fetch('site/data/photos.json', { cache: 'no-store' }).then((response) => response.json())
  ])
    .then(([staticEntries, downloads, photos]) => {
      const downloadEntries = downloads.map((item) => ({
        category: 'Downloads',
        page: 'Downloads',
        path: 'downloads.html',
        anchor: item.id,
        label: `${item.title}${item.speaker ? ` — ${item.speaker}` : ''}${item.date ? ` (${item.date})` : ''}`
      }));
      const photoEntries = photos.map((album) => ({
        category: 'Fotoalbums',
        page: 'Foto’s',
        path: 'fotos.html',
        anchor: album.id,
        label: `${album.title}${album.date ? ` (${album.date})` : ''}`
      }));

      allEntries = deduplicate([...staticEntries, ...downloadEntries, ...photoEntries]);
      allEntries.sort((a, b) => {
        const categoryDifference = categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
        if (categoryDifference) return categoryDifference;
        return `${a.page} ${a.label}`.localeCompare(`${b.page} ${b.label}`, 'nl', { sensitivity: 'base' });
      });

      totalOutput.textContent = allEntries.length;
      pageTotalOutput.textContent = new Set(allEntries.map((entry) => entry.path)).size;
      addOptions();
      render();
    })
    .catch(() => {
      status.textContent = 'De ankercatalogus kon niet worden geladen. Probeer de pagina opnieuw te openen.';
      resultsContainer.innerHTML = '<p class="notice">De gegevensbestanden konden niet worden geladen.</p>';
    });

  searchInput.addEventListener('input', render);
  categorySelect.addEventListener('change', render);
  resetButton.addEventListener('click', () => {
    searchInput.value = '';
    categorySelect.value = '';
    render();
    searchInput.focus();
  });
  expandButton.addEventListener('click', () => {
    resultsContainer.querySelectorAll('details').forEach((details) => { details.open = true; });
  });
  collapseButton.addEventListener('click', () => {
    resultsContainer.querySelectorAll('details').forEach((details) => { details.open = false; });
  });
})();
