'use strict';

const QUESTIONS_PER_GAME = 10;
const ANSWER_LETTERS = ['A', 'B', 'C', 'D'];

const startScreen = document.getElementById('start-scherm');
const questionScreen = document.getElementById('vraag-scherm');
const reportScreen = document.getElementById('rapport-scherm');
const nameForm = document.getElementById('naam-formulier');
const nameInput = document.getElementById('deelnemer-naam');
const nameError = document.getElementById('naam-fout');
const progressText = document.getElementById('voortgang-tekst');
const progressBar = document.getElementById('voortgang-balk');
const scoreDuringQuiz = document.getElementById('score-tijdens-quiz');
const questionText = document.getElementById('vraag-tekst');
const answersContainer = document.getElementById('antwoorden');
const feedback = document.getElementById('antwoord-feedback');
const nextButton = document.getElementById('volgende-vraag');
const reportSummary = document.getElementById('rapport-samenvatting');
const mistakesSection = document.getElementById('fouten-overzicht');
const mistakesList = document.getElementById('fouten-lijst');
const restartButton = document.getElementById('opnieuw-beginnen');

let participantName = '';
let selectedQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let mistakes = [];
let answerLocked = false;

function shuffle(items) {
  const shuffledItems = [...items];

  for (let index = shuffledItems.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [shuffledItems[index], shuffledItems[randomIndex]] = [shuffledItems[randomIndex], shuffledItems[index]];
  }

  return shuffledItems;
}

function showOnly(screenToShow) {
  [startScreen, questionScreen, reportScreen].forEach((screen) => {
    screen.hidden = screen !== screenToShow;
  });
}

function startQuiz() {
  selectedQuestions = shuffle(window.DIABETES_QUIZ_QUESTIONS).slice(0, QUESTIONS_PER_GAME);
  currentQuestionIndex = 0;
  score = 0;
  mistakes = [];

  showOnly(questionScreen);
  showQuestion();
  window.scrollTo({ top: 0, behavior: 'auto' });
}

function showQuestion() {
  const currentQuestion = selectedQuestions[currentQuestionIndex];
  const shuffledAnswers = shuffle(currentQuestion.answers);

  answerLocked = false;
  answersContainer.replaceChildren();
  feedback.hidden = true;
  feedback.className = 'feedback';
  feedback.textContent = '';
  nextButton.hidden = true;

  progressText.textContent = `Vraag ${currentQuestionIndex + 1} van ${QUESTIONS_PER_GAME}`;
  progressBar.style.width = `${((currentQuestionIndex + 1) / QUESTIONS_PER_GAME) * 100}%`;
  scoreDuringQuiz.textContent = `Score: ${score}`;
  questionText.textContent = currentQuestion.question;

  shuffledAnswers.forEach((answer, index) => {
    const answerButton = document.createElement('button');
    const answerLetter = document.createElement('span');
    const answerText = document.createElement('span');

    answerButton.type = 'button';
    answerButton.className = 'answer-button';
    answerButton.dataset.answer = answer;
    answerButton.addEventListener('click', () => selectAnswer(answer, answerButton));

    answerLetter.className = 'answer-letter';
    answerLetter.setAttribute('aria-hidden', 'true');
    answerLetter.textContent = ANSWER_LETTERS[index];
    answerText.textContent = answer;

    answerButton.append(answerLetter, answerText);
    answersContainer.appendChild(answerButton);
  });

  questionText.setAttribute('tabindex', '-1');
  questionText.focus();
}

function addAnswerMarker(button, text) {
  const marker = document.createElement('span');
  marker.className = 'answer-marker';
  marker.textContent = text;
  button.appendChild(marker);
}

function selectAnswer(selectedAnswer, selectedButton) {
  if (answerLocked) {
    return;
  }

  answerLocked = true;
  const currentQuestion = selectedQuestions[currentQuestionIndex];
  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
  const answerButtons = answersContainer.querySelectorAll('.answer-button');

  answerButtons.forEach((button) => {
    button.disabled = true;

    if (button.dataset.answer === currentQuestion.correctAnswer) {
      button.classList.add('is-correct');
      addAnswerMarker(button, '✓ Juist antwoord');
    }
  });

  if (isCorrect) {
    score += 1;
    feedback.classList.add('correct');
    feedback.textContent = '✓ Juist! Goed gedaan.';
  } else {
    selectedButton.classList.add('is-wrong');
    addAnswerMarker(selectedButton, '✗ Uw gekozen antwoord');
    feedback.classList.add('wrong');
    feedback.textContent = `✗ Niet juist. Het juiste antwoord is: ${currentQuestion.correctAnswer}`;
    mistakes.push({
      question: currentQuestion.question,
      selectedAnswer,
      correctAnswer: currentQuestion.correctAnswer
    });
  }

  scoreDuringQuiz.textContent = `Score: ${score}`;
  feedback.hidden = false;
  nextButton.textContent = currentQuestionIndex === QUESTIONS_PER_GAME - 1
    ? 'Bekijk mijn rapport'
    : 'Volgende vraag';
  nextButton.hidden = false;
  feedback.focus();
}

function showReport() {
  showOnly(reportScreen);
  reportSummary.textContent = `${participantName}, u behaalde ${score} op 10.`;
  mistakesList.replaceChildren();

  if (mistakes.length === 0) {
    mistakesSection.hidden = true;
    const perfectScoreMessage = document.createElement('p');
    perfectScoreMessage.className = 'perfect-score';
    perfectScoreMessage.textContent = '✓ Proficiat! U beantwoordde alle vragen juist.';
    mistakesSection.before(perfectScoreMessage);
  } else {
    mistakesSection.hidden = false;
    mistakes.forEach((mistake, index) => {
      const article = document.createElement('article');
      const heading = document.createElement('h3');
      const chosenAnswer = document.createElement('p');
      const correctAnswer = document.createElement('p');
      const chosenLabel = document.createElement('strong');
      const correctLabel = document.createElement('strong');

      article.className = 'mistake-card';
      heading.textContent = `${index + 1}. ${mistake.question}`;
      chosenAnswer.className = 'chosen-answer';
      correctAnswer.className = 'correct-answer';
      chosenLabel.textContent = 'Uw antwoord: ';
      correctLabel.textContent = 'Juiste antwoord: ';

      chosenAnswer.append(chosenLabel, document.createTextNode(mistake.selectedAnswer));
      correctAnswer.append(correctLabel, document.createTextNode(mistake.correctAnswer));
      article.append(heading, chosenAnswer, correctAnswer);
      mistakesList.appendChild(article);
    });
  }

  window.scrollTo({ top: 0, behavior: 'auto' });
  reportSummary.focus();
}

function restartQuiz() {
  participantName = '';
  selectedQuestions = [];
  currentQuestionIndex = 0;
  score = 0;
  mistakes = [];
  nameForm.reset();
  nameInput.removeAttribute('aria-invalid');
  nameError.hidden = true;

  const previousPerfectScoreMessage = reportScreen.querySelector('.perfect-score');
  if (previousPerfectScoreMessage) {
    previousPerfectScoreMessage.remove();
  }

  showOnly(startScreen);
  window.scrollTo({ top: 0, behavior: 'auto' });
  nameInput.focus();
}

nameForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const enteredName = nameInput.value.trim();

  if (!enteredName) {
    nameInput.setAttribute('aria-invalid', 'true');
    nameError.hidden = false;
    nameInput.focus();
    return;
  }

  participantName = enteredName;
  nameInput.removeAttribute('aria-invalid');
  nameError.hidden = true;
  startQuiz();
});

nameInput.addEventListener('input', () => {
  if (nameInput.value.trim()) {
    nameInput.removeAttribute('aria-invalid');
    nameError.hidden = true;
  }
});

nextButton.addEventListener('click', () => {
  currentQuestionIndex += 1;

  if (currentQuestionIndex < QUESTIONS_PER_GAME) {
    showQuestion();
  } else {
    showReport();
  }
});

restartButton.addEventListener('click', restartQuiz);

if (!Array.isArray(window.DIABETES_QUIZ_QUESTIONS) || window.DIABETES_QUIZ_QUESTIONS.length < QUESTIONS_PER_GAME) {
  nameForm.hidden = true;
  const loadError = document.createElement('p');
  loadError.className = 'noscript-message';
  loadError.textContent = 'De vragen konden niet worden geladen. Probeer de pagina opnieuw te openen.';
  startScreen.appendChild(loadError);
}
