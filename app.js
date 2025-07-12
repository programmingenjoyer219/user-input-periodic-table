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
