(() => {
  const apps = {
    activiteiten: {
      name: 'Activiteiten-app',
      description: 'Bekijk de activiteiten van Diabetes in Beweging in de extern gehoste Jotform-app.',
      url: 'https://eu.jotform.com/nl/app/243115564264353'
    },
    scanner: {
      name: 'Koolhydraten Scanner',
      description: 'Maak met een foto een indicatieve schatting van de koolhydraten in een maaltijd.',
      url: 'scanner/'
    },
    calculator: {
      name: 'Koolhydraten Calculator',
      description: 'Zoek een voedingsmiddel en bereken een indicatieve hoeveelheid koolhydraten voor uw portie.',
      url: 'calculator/'
    },
    duel: {
      name: 'Koolhydraten Duel',
      description: 'Oefen spelenderwijs met de hoeveelheid koolhydraten in verschillende voedingsmiddelen.',
      url: 'duel/'
    },
    website: {
      name: 'Zet Diabetes in Beweging op uw gsm',
      description: 'Plaats ons herkenbare pictogram tussen uw andere apps. Met één tik op dat pictogram opent u daarna onze website.',
      url: '../index.html'
    }
  };

  const selectedKey = new URLSearchParams(window.location.search).get('app');
  const selectedApp = apps[selectedKey] || apps.website;
  const nameElement = document.querySelector('[data-app-name]');
  const descriptionElement = document.querySelector('[data-app-description]');
  const launchButton = document.querySelector('[data-launch-app]');
  const desktopTitle = document.querySelector('[data-desktop-title]');
  const desktopIntro = document.querySelector('[data-desktop-intro]');
  const desktopStepOne = document.querySelector('[data-desktop-step-one]');
  const desktopStepTwo = document.querySelector('[data-desktop-step-two]');
  const desktopStepThree = document.querySelector('[data-desktop-step-three]');
  const androidStepOne = document.querySelector('[data-android-step-one]');
  const iosStepOne = document.querySelector('[data-ios-step-one]');
  const deviceNotice = document.querySelector('[data-install-device]');
  const panels = document.querySelectorAll('[data-platform]');
  const userAgent = navigator.userAgent || '';

  document.title = `${selectedApp.name} installeren | Diabetes in Beweging`;
  if (nameElement) nameElement.textContent = selectedApp.name;
  if (descriptionElement) descriptionElement.textContent = selectedApp.description;
  if (launchButton) {
    launchButton.href = selectedApp.url;
    launchButton.textContent = selectedKey === 'website'
      ? 'Ga naar de startpagina om af te ronden'
      : 'Toepassing openen';

    if (/^https?:/i.test(selectedApp.url)) {
      launchButton.target = '_blank';
      launchButton.rel = 'noopener noreferrer';
    }
  }

  let platform = 'desktop';
  if (selectedKey === 'website') {
    if (desktopTitle) {
      desktopTitle.textContent = 'Ga verder op uw gsm';
    }
    if (desktopIntro) {
      desktopIntro.textContent = 'Het pictogram van Diabetes in Beweging kan alleen via uw gsm tussen uw andere apps worden geplaatst.';
    }
    if (desktopStepOne) {
      desktopStepOne.textContent = 'Open de website van Diabetes in Beweging op uw gsm.';
    }
    if (desktopStepTwo) {
      desktopStepTwo.innerHTML = 'Open het menu en kies <strong>Onze Diabetes-apps</strong>.';
    }
    if (desktopStepThree) {
      desktopStepThree.innerHTML = 'Ga naar <strong>Zet onze website tussen de apps op uw gsm</strong> en tik op <strong>Zo zet u dit op uw gsm</strong>. U krijgt dan automatisch de juiste stappen voor uw gsm te zien.';
    }
    if (androidStepOne) {
      androidStepOne.innerHTML = 'Lees eerst alle stappen hieronder. Tik daarna op de groene knop <strong>Ga naar de startpagina om af te ronden</strong>.';
    }
    if (iosStepOne) {
      iosStepOne.innerHTML = 'Lees eerst alle stappen hieronder. Tik daarna op de groene knop <strong>Ga naar de startpagina om af te ronden</strong>.';
    }
  }

  let deviceText = selectedKey === 'website'
    ? 'Computer herkend.'
    : 'Computer herkend. Probeer de toepassing hier uit en open deze uitleg daarna op uw gsm.';

  if (/iPhone|iPad|iPod/i.test(userAgent)) {
    platform = 'ios';
    deviceText = 'iPhone of iPad gedetecteerd. Hieronder staan de stappen voor Safari.';
  } else if (/Android/i.test(userAgent)) {
    platform = 'android';
    deviceText = 'Android-toestel gedetecteerd. Hieronder staan de stappen voor Google Chrome.';
  }

  panels.forEach((panel) => {
    panel.hidden = panel.dataset.platform !== platform;
  });

  if (selectedKey === 'website' && platform === 'desktop' && launchButton) {
    launchButton.hidden = true;
  }

  if (deviceNotice) deviceNotice.textContent = deviceText;
})();
