import * as layout from '../layouts/index';

export function changeKeys(dict) {
  const keys = dict;
  const keyboard = document.querySelectorAll('.key');

  keyboard.forEach((item, index) => {
    const element = item;
    element.dataset.key = keys[index];
  });
}

export const changeColor = (item) => item.classList.add('setColor');

const handleText = (action, symbol) => {
  const textarea = document.querySelector('#textarea');

  switch (action) {
    case 'append': {
      if (textarea.textContent.length === 0) {
        textarea.textContent = symbol;
      } else {
        const content = textarea.textContent;

        textarea.textContent = content + symbol;
      }
      break;
    }
    case 'remove': {
      if (textarea.textContent === null) {
        textarea.textContent = '';
      } else {
        const textAreaText = [...textarea.textContent];

        textAreaText.pop();

        textarea.textContent = textAreaText.join('');
      }

      break;
    }
    case 'del': {
      if (textarea.textContent === null) {
        textarea.textContent = '';
      } else {
        const textAreaText = [...textarea.textContent];

        textAreaText.pop();

        textarea.textContent = textAreaText.join('');
      }
      break;
    }
    default:
  }
};

export const textAreaHandler = (symbol, keyboardState) => {
  const keyboard = document.querySelectorAll('.key');
  const indexLetter = layout.CODES.findIndex((code) => code === symbol);
  const currentLetter = keyboardState.layout[indexLetter];

  if (indexLetter > -1) changeColor(keyboard[indexLetter]);

  if (currentLetter === 'Space') {
    handleText('append', ' ');
  } else if (currentLetter === 'Backspace') {
    handleText('remove');
  } else if (currentLetter === 'Tab') {
    handleText('append', '    ');
  } else if (!layout.uniqueSymbols.includes(currentLetter)) {
    handleText('append', currentLetter);
  }
};

const appendStorage = (lang) => localStorage.setItem('lang', lang);

const mutateData = (dict, currentLanguage, keyboardState) => {
  const newKeyboardEntity = keyboardState;
  newKeyboardEntity.layout = dict;
  newKeyboardEntity.currentLanguage = currentLanguage;
};

export const changeLanguage = (keyboardState, dict) => {
  const { currentLanguage } = keyboardState;
  let language;

  if (currentLanguage === 'ENG') {
    language = 'RUS';

    mutateData(dict.RUS, 'RUS', keyboardState);
    appendStorage(language);
  }
  if (currentLanguage === 'RUS') {
    language = 'ENG';

    mutateData(dict.ENG, 'ENG', keyboardState);
    appendStorage(language);
  }

  changeKeys(dict[language]);

  return language;
};

export const getLanguageFromStorage = (keyboardState) => {
  if (localStorage.getItem('lang') === 'RUS') {
    mutateData(layout.RUS, 'RUS', keyboardState);

    changeKeys(keyboardState.layout);
  }

  if (localStorage.getItem('lang') === 'ENG') {
    mutateData(layout.ENG, 'ENG', keyboardState);

    changeKeys(keyboardState.layout);
  }
};
