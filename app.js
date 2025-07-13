import { getPeriodicTableElements } from './lib/periodicTable.js';

const wordInputForm = document.querySelector('#word-input');
const resultSection = document.querySelector('#result');

wordInputForm.addEventListener('submit', function handleSubmit(event) {
  event.preventDefault();
  clearResultSectionContent();
  const formData = new FormData(this);
  const userInput = formData.get('word').toLowerCase();
  const [isInputValid, validationErrorMessage] = validateUserInput(userInput);

  if (!isInputValid) {
    displayErrorMessage(validationErrorMessage);
    return;
  }

  const periodicTableElements = getPeriodicTableElements(userInput);

  if (periodicTableElements.length == 0) {
    displayErrorMessage(
      `The word '${userInput}' cannot be represented using periodic table elements. Please try some other word.`
    );
    return;
  }

  var wordElement = prepareWordElement(periodicTableElements);
  resultSection.appendChild(wordElement);
  this.reset();
});

function validateUserInput(userInput) {
  const regex = /^[a-z]{3,}$/;
  if (regex.test(userInput)) {
    return [true, null];
  }
  return [
    false,
    'Invalid input provided. Input should be atleast 3 characters long and only contain english alphabets.',
  ];
}

function displayErrorMessage(errorMessage) {
  const p = document.createElement('p');
  const pText = document.createTextNode(errorMessage);
  p.appendChild(pText);
  resultSection.appendChild(p);
}

function clearResultSectionContent() {
  Array.from(resultSection.children).forEach((element) => element.remove());
}

function prepareWordElement(periodicTableElements) {
  var div = document.createElement('div');
  div.classList.add('display-word');

  for (let element of periodicTableElements) {
    let elementDiv = prepareElementDiv(element);
    div.appendChild(elementDiv);
  }

  return div;
}

function prepareElementDiv(element) {
  var div = document.createElement('div');
  div.classList.add('element');

  var spans = prepareSpans();

  for (let span of spans) {
    div.appendChild(span);
  }

  return div;
  // --------
  function prepareSpans() {
    var spans = [];

    for (let property of ['number', 'symbol', 'name']) {
      let text = element[property];
      let class_ = 'element-' + property;
      spans.push(prepareElementSpan(text, class_));
    }

    return spans;
  }
}

function prepareElementSpan(text, class_) {
  var span = document.createElement('span');
  var text = document.createTextNode(text);
  span.appendChild(text);
  span.classList.add(class_);
  return span;
}
