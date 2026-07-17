(() => {
  document.querySelectorAll('[data-current-year]').forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  /*
   * Deelbare links op de pagina Info Diabetes Liga blijven
   * correct uitgelijnd wanneer uitgestelde afbeeldingen laden.
   */
  const infoPage = document.querySelector('.info-page');

  if (infoPage) {
    const alignInfoHashTarget = () => {
      const targetId = decodeURIComponent(
        window.location.hash.replace('#', '')
      );
      const target = document.getElementById(targetId);

      if (!target) {
        return;
      }

      window.requestAnimationFrame(() => {
        const root = document.documentElement;
        const previousScrollBehavior = root.style.scrollBehavior;

        root.style.scrollBehavior = 'auto';
        target.scrollIntoView({ block: 'start' });
        root.style.scrollBehavior = previousScrollBehavior;
      });
    };

    window.addEventListener('load', alignInfoHashTarget, { once: true });
    window.addEventListener('hashchange', alignInfoHashTarget);

    infoPage.querySelectorAll('img[loading="lazy"]').forEach((image) => {
      if (!image.complete) {
        image.addEventListener('load', alignInfoHashTarget, { once: true });
      }
    });
  }

  const now = new Date();

  document.querySelectorAll('[data-clock-year]').forEach((element) => {
    element.textContent = now.getFullYear();
  });

  const startOfYear = new Date(now.getFullYear(), 0, 1);
  const elapsedMinutes = Math.max(
    0,
    Math.floor((now - startOfYear) / 60000)
  );

  const diagnosesThisYear = Math.floor(elapsedMinutes / 17);

  const midnight = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const minutesToday = Math.floor((now - midnight) / 60000);
  const diagnosesToday = Math.floor(minutesToday / 17);

  document.querySelectorAll('[data-diagnoses-year]').forEach((element) => {
    element.textContent = diagnosesThisYear.toLocaleString('nl-BE');
  });

  document.querySelectorAll('[data-diagnoses-today]').forEach((element) => {
    element.textContent = diagnosesToday.toLocaleString('nl-BE');
  });

  const countdownElement = document.querySelector(
    '[data-next-diagnosis]'
  );

  if (countdownElement) {
    const updateCountdown = () => {
      const currentTime = new Date();

      const startOfToday = new Date(
        currentTime.getFullYear(),
        currentTime.getMonth(),
        currentTime.getDate()
      );

      const elapsedSeconds = Math.floor(
        (currentTime - startOfToday) / 1000
      );

      const intervalSeconds = 17 * 60;
      const remainingSeconds =
        intervalSeconds - (elapsedSeconds % intervalSeconds);

      const minutes = String(
        Math.floor(remainingSeconds / 60)
      ).padStart(2, '0');

      const seconds = String(
        remainingSeconds % 60
      ).padStart(2, '0');

      countdownElement.textContent = `${minutes}:${seconds}`;
    };

    updateCountdown();
    window.setInterval(updateCountdown, 1000);
  }

  /*
   * Zwevende terug-naar-bovenknop
   */
  const backToTopButton = document.createElement('button');

  backToTopButton.type = 'button';
  backToTopButton.className = 'back-to-top';
  backToTopButton.setAttribute(
    'aria-label',
    'Terug naar boven'
  );
  backToTopButton.setAttribute(
    'title',
    'Terug naar boven'
  );

  backToTopButton.innerHTML = `
    <span class="back-to-top-icon" aria-hidden="true">↑</span>
    <span class="back-to-top-label">Boven</span>
  `;

  document.body.appendChild(backToTopButton);

  const updateBackToTopVisibility = () => {
    const shouldShow = window.scrollY > 420;

    backToTopButton.classList.toggle(
      'is-visible',
      shouldShow
    );
  };

  backToTopButton.addEventListener('click', () => {
    const reducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    window.scrollTo({
      top: 0,
      behavior: reducedMotion ? 'auto' : 'smooth'
    });
  });

  window.addEventListener(
    'scroll',
    updateBackToTopVisibility,
    { passive: true }
  );

  updateBackToTopVisibility();

  /*
   * Centrale afspeelknop voor de video op de homepage
   */
  document.querySelectorAll('[data-video-play]').forEach((button) => {
    const videoId = button.getAttribute('aria-controls');
    const video = document.getElementById(videoId);

    if (!video) {
      return;
    }

    button.addEventListener('click', () => {
      video.play().catch(() => {
        button.classList.remove('is-hidden');
      });
    });

    video.addEventListener('play', () => {
      button.classList.add('is-hidden');
    });

    video.addEventListener('pause', () => {
      button.classList.remove('is-hidden');
    });

    video.addEventListener('ended', () => {
      button.classList.remove('is-hidden');
    });
  });

  /*
   * YouTube-video's pas laden nadat de bezoeker ze selecteert
   */
  document.querySelectorAll('[data-youtube-video]').forEach((button) => {
    button.addEventListener('click', () => {
      const videoId = button.dataset.youtubeVideo;
      const preview = button.closest('.youtube-preview');

      if (!preview || !/^[A-Za-z0-9_-]{11}$/.test(videoId)) {
        return;
      }

      const iframe = document.createElement('iframe');
      const videoTitle = button.getAttribute('aria-label')
        ?.replace(/^Speel /, '')
        .replace(/ af$/, '');

      iframe.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
      iframe.title = videoTitle || 'YouTube-video';
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      iframe.referrerPolicy = 'strict-origin-when-cross-origin';
      iframe.allowFullscreen = true;

      preview.replaceChildren(iframe);
      iframe.focus();
    });
  });

  /*
   * Fotoalbums van vorige activiteiten
   */
  const photoAlbumsContainer = document.querySelector('[data-photo-albums]');

  if (photoAlbumsContainer) {
    const yearFilter = document.querySelector('[data-photo-year-filter]');
    const lightbox = document.querySelector('[data-photo-lightbox]');
    const lightboxTitle = document.querySelector('[data-photo-lightbox-title]');
    const lightboxMeta = document.querySelector('[data-photo-lightbox-meta]');
    const lightboxImage = document.querySelector('[data-photo-lightbox-image]');
    const lightboxStage = document.querySelector('[data-photo-stage]');
    const photoCounter = document.querySelector('[data-photo-counter]');
    const previousButton = document.querySelector('[data-photo-previous]');
    const nextButton = document.querySelector('[data-photo-next]');
    const closeButton = document.querySelector('[data-photo-close]');
    const zoomButton = document.querySelector('[data-photo-zoom]');
    const downloadLink = document.querySelector('[data-photo-download]');

    let photoAlbums = [];
    let activeAlbum = null;
    let activeAlbumIndex = -1;
    let activePhotoIndex = 0;
    let touchStartX = 0;

    const getPhotoFileName = (path) => {
      const parts = path.split('/');
      return parts[parts.length - 1] || 'foto.jpg';
    };

    const setZoom = (shouldZoom) => {
      if (!lightboxStage || !zoomButton) {
        return;
      }

      lightboxStage.classList.toggle('is-zoomed', shouldZoom);
      zoomButton.setAttribute('aria-pressed', String(shouldZoom));
      zoomButton.textContent = shouldZoom ? 'Verkleinen' : 'Vergroten';

      if (!shouldZoom) {
        lightboxStage.scrollTo({ top: 0, left: 0 });
      }
    };

    const updateLightbox = () => {
      if (!activeAlbum || !lightboxImage) {
        return;
      }

      const photoPath = activeAlbum.photos[activePhotoIndex];
      const totalPhotos = activeAlbum.photos.length;

      lightboxTitle.textContent = activeAlbum.title;
      lightboxMeta.textContent = activeAlbum.date || 'Datum niet vermeld';
      lightboxImage.src = photoPath;
      lightboxImage.alt = `${activeAlbum.title}, foto ${activePhotoIndex + 1} van ${totalPhotos}`;
      photoCounter.textContent = `Foto ${activePhotoIndex + 1} van ${totalPhotos}`;
      downloadLink.href = photoPath;
      downloadLink.setAttribute('download', getPhotoFileName(photoPath));

      const totalGalleryPhotos = photoAlbums.reduce(
        (total, album) => total + album.photos.length,
        0
      );
      const hasMultiplePhotos = totalGalleryPhotos > 1;

      previousButton.disabled = !hasMultiplePhotos;
      nextButton.disabled = !hasMultiplePhotos;
      setZoom(false);

      if (hasMultiplePhotos) {
        const isLastPhotoInAlbum = activePhotoIndex === totalPhotos - 1;
        const nextAlbumIndex = isLastPhotoInAlbum
          ? (activeAlbumIndex + 1) % photoAlbums.length
          : activeAlbumIndex;
        const nextPhotoIndex = isLastPhotoInAlbum
          ? 0
          : activePhotoIndex + 1;
        const nextPhoto = photoAlbums[nextAlbumIndex].photos[nextPhotoIndex];
        const preloadImage = new Image();

        preloadImage.src = nextPhoto;
      }
    };

    const updateActiveAlbumHash = () => {
      if (!activeAlbum) {
        return;
      }

      window.history.replaceState(null, '', `#${activeAlbum.id}`);
    };

    const showPreviousPhoto = () => {
      if (!activeAlbum) {
        return;
      }

      if (activePhotoIndex > 0) {
        activePhotoIndex -= 1;
      } else {
        activeAlbumIndex = (
          activeAlbumIndex - 1 + photoAlbums.length
        ) % photoAlbums.length;
        activeAlbum = photoAlbums[activeAlbumIndex];
        activePhotoIndex = activeAlbum.photos.length - 1;
        updateActiveAlbumHash();
      }

      updateLightbox();
    };

    const showNextPhoto = () => {
      if (!activeAlbum) {
        return;
      }

      if (activePhotoIndex < activeAlbum.photos.length - 1) {
        activePhotoIndex += 1;
      } else {
        activeAlbumIndex = (
          activeAlbumIndex + 1
        ) % photoAlbums.length;
        activeAlbum = photoAlbums[activeAlbumIndex];
        activePhotoIndex = 0;
        updateActiveAlbumHash();
      }

      updateLightbox();
    };

    const openPhotoAlbum = (album) => {
      activeAlbumIndex = photoAlbums.findIndex(
        (photoAlbum) => photoAlbum.id === album.id
      );
      activeAlbum = album;
      activePhotoIndex = 0;
      updateLightbox();

      if (window.location.hash !== `#${album.id}`) {
        window.history.pushState(null, '', `#${album.id}`);
      }

      if (typeof lightbox.showModal === 'function') {
        lightbox.showModal();
      } else {
        lightbox.setAttribute('open', '');
      }

      document.body.classList.add('photo-lightbox-open');
      closeButton.focus();
    };

    const closePhotoAlbum = () => {
      if (lightbox.open && typeof lightbox.close === 'function') {
        lightbox.close();
      } else {
        lightbox.removeAttribute('open');
      }
    };

    const createPhotoAlbumCard = (album, index) => {
      const article = document.createElement('article');
      const openButton = document.createElement('button');
      const cover = document.createElement('span');
      const coverImage = document.createElement('img');
      const photoCount = document.createElement('span');
      const content = document.createElement('span');
      const date = document.createElement('span');
      const title = document.createElement('span');
      const action = document.createElement('span');

      article.className = 'photo-album-card';
      article.id = album.id;
      article.dataset.photoYear = album.year || 'zonder-datum';

      openButton.className = 'photo-album-open';
      openButton.type = 'button';
      openButton.setAttribute('aria-label', `Bekijk fotoalbum ${album.title}`);
      openButton.addEventListener('click', () => openPhotoAlbum(album));

      cover.className = 'photo-album-cover';
      coverImage.src = album.photos[0];
      coverImage.alt = '';
      coverImage.loading = index < 4 ? 'eager' : 'lazy';
      coverImage.decoding = 'async';

      photoCount.className = 'photo-album-count';
      photoCount.textContent = `${album.photos.length} foto${album.photos.length === 1 ? '' : '’s'}`;

      content.className = 'photo-album-content';
      date.className = 'photo-album-date';
      date.textContent = album.date || 'Datum niet vermeld';

      title.className = 'photo-album-title';
      title.setAttribute('role', 'heading');
      title.setAttribute('aria-level', '2');
      title.textContent = album.title;

      action.className = 'photo-album-action';
      action.textContent = 'Bekijk album';

      cover.append(coverImage, photoCount);
      content.append(date, title, action);
      openButton.append(cover, content);
      article.append(openButton);

      return article;
    };

    const renderPhotoAlbums = () => {
      const selectedYear = yearFilter?.value || 'all';
      const visibleAlbums = selectedYear === 'all'
        ? photoAlbums
        : photoAlbums.filter((album) => (
          (album.year || 'zonder-datum') === selectedYear
        ));
      const fragment = document.createDocumentFragment();

      visibleAlbums.forEach((album, index) => {
        fragment.append(createPhotoAlbumCard(album, index));
      });

      photoAlbumsContainer.replaceChildren(fragment);
    };

    const addYearOptions = () => {
      const years = [...new Set(
        photoAlbums.map((album) => album.year).filter(Boolean)
      )].sort((first, second) => Number(second) - Number(first));

      years.forEach((year) => {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        yearFilter.append(option);
      });

      if (photoAlbums.some((album) => !album.year)) {
        const option = document.createElement('option');
        option.value = 'zonder-datum';
        option.textContent = 'Datum niet vermeld';
        yearFilter.append(option);
      }
    };

    yearFilter?.addEventListener('change', renderPhotoAlbums);
    previousButton?.addEventListener('click', showPreviousPhoto);
    nextButton?.addEventListener('click', showNextPhoto);
    closeButton?.addEventListener('click', closePhotoAlbum);

    zoomButton?.addEventListener('click', () => {
      setZoom(!lightboxStage.classList.contains('is-zoomed'));
    });

    lightboxImage?.addEventListener('dblclick', () => {
      setZoom(!lightboxStage.classList.contains('is-zoomed'));
    });

    lightboxStage?.addEventListener('touchstart', (event) => {
      touchStartX = event.changedTouches[0].screenX;
    }, { passive: true });

    lightboxStage?.addEventListener('touchend', (event) => {
      if (lightboxStage.classList.contains('is-zoomed')) {
        return;
      }

      const touchEndX = event.changedTouches[0].screenX;
      const swipeDistance = touchEndX - touchStartX;

      if (Math.abs(swipeDistance) < 50) {
        return;
      }

      swipeDistance < 0 ? showNextPhoto() : showPreviousPhoto();
    }, { passive: true });

    lightbox?.addEventListener('click', (event) => {
      if (event.target === lightbox) {
        closePhotoAlbum();
      }
    });

    lightbox?.addEventListener('close', () => {
      document.body.classList.remove('photo-lightbox-open');
      setZoom(false);
    });

    document.addEventListener('keydown', (event) => {
      if (!lightbox?.open) {
        return;
      }

      if (event.key === 'ArrowLeft') {
        showPreviousPhoto();
      }

      if (event.key === 'ArrowRight') {
        showNextPhoto();
      }
    });

    fetch('site/data/photos.json', { cache: 'no-store' })
      .then((response) => {
        if (!response.ok) {
          throw new Error('De fotogegevens konden niet worden geladen.');
        }

        return response.json();
      })
      .then((albums) => {
        photoAlbums = albums.filter((album) => (
          album
          && album.id
          && album.title
          && Array.isArray(album.photos)
          && album.photos.length > 0
        ));

        addYearOptions();
        renderPhotoAlbums();

        const linkedAlbum = document.getElementById(
          window.location.hash.replace('#', '')
        );

        if (linkedAlbum) {
          window.requestAnimationFrame(() => {
            linkedAlbum.scrollIntoView({ block: 'center' });
            linkedAlbum.querySelector('button')?.focus();
          });
        }
      })
      .catch(() => {
        photoAlbumsContainer.innerHTML = '<p class="notice">De fotoalbums konden niet worden geladen. Probeer de pagina opnieuw te openen.</p>';
      });
  }

  /*
   * Doorzoekbare presentaties en documenten
   */
  const downloadsList = document.querySelector('[data-downloads-list]');

  if (downloadsList) {
    const searchInput = document.querySelector('[data-download-search]');
    const clearButton = document.querySelector('[data-download-clear]');
    const searchStatus = document.querySelector('[data-download-status]');
    const noResults = document.querySelector('[data-download-no-results]');
    let downloadItems = [];

    const normalizeDownloadText = (value) => (
      (value || '')
        .toString()
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
    );

    const getDownloadFileName = (path) => {
      const parts = (path || '').split('/');
      return decodeURIComponent(parts[parts.length - 1] || '').toLowerCase();
    };

    const createDownloadIndex = (indexItems) => {
      const indexByFile = new Map();

      indexItems.forEach((item) => {
        if (!item) {
          return;
        }

        const searchableText = normalizeDownloadText([
          item.bestand,
          item.oude_naam,
          item.titel,
          item.datum,
          item.datum_bestandsvorm,
          item.tekst
        ].join(' '));

        [item.bestand, item.oude_naam].forEach((fileName) => {
          if (fileName) {
            indexByFile.set(fileName.toLowerCase(), searchableText);
          }
        });
      });

      return indexByFile;
    };

    const createDownloadCard = (item, index, indexByFile) => {
      const article = document.createElement('article');
      const coverLink = document.createElement('a');
      const coverImage = document.createElement('img');
      const fileType = document.createElement('span');
      const content = document.createElement('div');
      const date = document.createElement('p');
      const title = document.createElement('h2');
      const speaker = document.createElement('p');
      const openLink = document.createElement('a');
      const fileName = getDownloadFileName(item.file);

      article.className = 'download-card';
      article.id = item.id;

      coverLink.className = 'download-card-cover';
      coverLink.href = item.file;
      coverLink.target = '_blank';
      coverLink.rel = 'noopener';
      coverLink.setAttribute('aria-label', `Open ${item.title}`);

      coverImage.src = item.cover;
      coverImage.alt = '';
      coverImage.loading = index < 6 ? 'eager' : 'lazy';
      coverImage.decoding = 'async';

      fileType.className = 'download-file-type';
      fileType.textContent = item.kind === 'pdf' ? 'PDF' : 'Afbeelding';

      content.className = 'download-card-content';
      date.className = 'download-card-date';
      date.textContent = item.date;

      title.textContent = item.title;

      speaker.className = 'download-card-speaker';
      speaker.textContent = item.speaker;

      openLink.className = 'button download-card-button';
      openLink.href = item.file;
      openLink.target = '_blank';
      openLink.rel = 'noopener';
      openLink.textContent = item.kind === 'pdf' ? 'Open PDF' : 'Open afbeelding';

      coverLink.append(coverImage, fileType);
      content.append(date, title, speaker, openLink);
      article.append(coverLink, content);

      const visibleText = normalizeDownloadText([
        item.title,
        item.speaker,
        item.date,
        item.year,
        fileName
      ].join(' '));

      item.searchText = `${visibleText} ${indexByFile.get(fileName) || ''}`;
      item.element = article;

      return article;
    };

    const filterDownloads = () => {
      const query = normalizeDownloadText(searchInput.value);
      const searchWords = query.split(' ').filter(Boolean);
      let visibleDownloads = 0;

      downloadItems.forEach((item) => {
        const isMatch = searchWords.length === 0 || searchWords.every(
          (word) => item.searchText.includes(word)
        );

        item.element.hidden = !isMatch;

        if (isMatch) {
          visibleDownloads += 1;
        }
      });

      clearButton.disabled = searchInput.value.length === 0;
      noResults.hidden = visibleDownloads !== 0;
      searchStatus.textContent = query
        ? `${visibleDownloads} ${visibleDownloads === 1 ? 'download' : 'downloads'} gevonden`
        : '';
    };

    searchInput.disabled = true;

    searchInput.addEventListener('input', filterDownloads);

    clearButton.addEventListener('click', () => {
      searchInput.value = '';
      filterDownloads();
      searchInput.focus();
    });

    Promise.all([
      fetch('site/data/downloads.json', { cache: 'no-store' })
        .then((response) => {
          if (!response.ok) {
            throw new Error('De downloadgegevens konden niet worden geladen.');
          }

          return response.json();
        }),
      fetch('site/data/downloads-index.json', { cache: 'no-store' })
        .then((response) => response.ok ? response.json() : [])
        .catch(() => [])
    ])
      .then(([downloads, downloadIndex]) => {
        const indexByFile = createDownloadIndex(downloadIndex);
        const fragment = document.createDocumentFragment();

        downloadItems = downloads.filter((item) => (
          item
          && item.id
          && item.title
          && item.file
          && item.cover
        ));

        downloadItems.forEach((item, index) => {
          fragment.append(createDownloadCard(item, index, indexByFile));
        });

        downloadsList.replaceChildren(fragment);
        searchInput.disabled = false;

        const linkedDownload = document.getElementById(
          window.location.hash.replace('#', '')
        );

        if (linkedDownload) {
          window.requestAnimationFrame(() => {
            linkedDownload.scrollIntoView({ block: 'center' });
            linkedDownload.querySelector('a')?.focus();
          });
        }
      })
      .catch(() => {
        downloadsList.innerHTML = '<p class="notice">De downloads konden niet worden geladen. Probeer de pagina opnieuw te openen.</p>';
        searchInput.disabled = true;
        clearButton.disabled = true;
      });
  }
})();
