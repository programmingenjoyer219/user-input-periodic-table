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

  displayWord(periodicTableElements);
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

function displayWord(periodicTableElements) {
  var div = document.createElement('div');
  div.classList.add('display-word');

  for (let element of periodicTableElements) {
    let elementDiv = prepareElementDiv(element);
    div.appendChild(elementDiv);
  }

  resultSection.appendChild(div);
}

function prepareElementDiv(element) {
  var div = document.createElement('div');
  div.classList.add('element');
  prepareElementSpan('' + element.number, 'element-number', div);
  prepareElementSpan(element.symbol, 'element-symbol', div);
  prepareElementSpan(element.name, 'element-name', div);
  return div;
}

function prepareElementSpan(text, class_, elementDiv) {
  var span = document.createElement('span');
  var text = document.createTextNode(text);
  span.appendChild(text);
  span.classList.add(class_);
  elementDiv.appendChild(span);
}
