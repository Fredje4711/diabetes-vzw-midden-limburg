document.addEventListener('DOMContentLoaded', () => {
    const flashcards = document.querySelectorAll('.flashcard');
    let currentlyFlippedCard = null;

    function setCardState(card, isFlipped) {
        card.classList.toggle('flipped', isFlipped);
        card.setAttribute('aria-pressed', String(isFlipped));
    }

    function toggleCard(card) {
        if (currentlyFlippedCard && currentlyFlippedCard !== card) {
            setCardState(currentlyFlippedCard, false);
        }

        const willFlip = !card.classList.contains('flipped');
        setCardState(card, willFlip);
        currentlyFlippedCard = willFlip ? card : null;
    }

    flashcards.forEach((card, index) => {
        const frontText = card.querySelector('.flashcard-front p')?.textContent.trim() || `Kaart ${index + 1}`;
        card.setAttribute('role', 'button');
        card.setAttribute('aria-pressed', 'false');
        card.setAttribute('aria-label', `Mythe ${index + 1}: ${frontText}. Activeer om het feit te tonen.`);

        card.addEventListener('click', () => toggleCard(card));
        card.addEventListener('keydown', event => {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                toggleCard(card);
            }
        });
    });
});
