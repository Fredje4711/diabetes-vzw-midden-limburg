(() => {
  const userAgent = navigator.userAgent || '';
  const isAppleMobile = /iPhone|iPad|iPod/i.test(userAgent);
  const isAndroid = /Android/i.test(userAgent);
  const status = document.querySelector('[data-device-message]');
  const installButtons = document.querySelectorAll('[data-install-button]');

  let deviceName = 'computer of tablet';
  let buttonText = 'Bekijk de installatie-uitleg';
  let message = 'U bekijkt deze pagina op een computer of tablet. U kunt alle toepassingen hier uitproberen. Open deze website-pagina later op uw gsm om de toepassing(en) als app op uw gsm te plaatsen.';

  if (isAppleMobile) {
    deviceName = 'iPhone of iPad';
    buttonText = 'Installeren op iPhone of iPad';
    message = 'U gebruikt een iPhone of iPad. Bij iedere toepassing vindt u aangepaste stappen voor Safari.';
  } else if (isAndroid) {
    deviceName = 'Android-toestel';
    buttonText = 'Installeren op Android';
    message = 'U gebruikt een Android-toestel. Bij iedere toepassing vindt u aangepaste stappen voor Chrome.';
  }

  if (status) status.textContent = message;

  installButtons.forEach((button) => {
    button.textContent = buttonText;
    button.setAttribute('aria-label', `${buttonText}; gedetecteerd toestel: ${deviceName}`);
  });
})();
