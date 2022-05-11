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
  } else if (currentLetter === 'Enter') {
    handleText('append', '\n');
  } else if (currentLetter === 'Backspace') {
    handleText('remove');
  } else if (currentLetter === 'Tab') {
    handleText('append', '    ');
  } else if (currentLetter === 'ArrowLeft') {
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
  const { currentLanguage, caps } = keyboardState;
  let language;

  if (currentLanguage === 'ENG') {
    language = 'RUS';
    const handleCaps = caps ? dict.RUS_CAPS : dict.RUS;

    mutateData(handleCaps, 'RUS', keyboardState);
    appendStorage(language);
    changeKeys(handleCaps);
  }
  if (currentLanguage === 'RUS') {
    language = 'ENG';
    const handleCaps = caps ? dict.ENG_CAPS : dict.ENG;

    mutateData(handleCaps, 'ENG', keyboardState);
    appendStorage(language);
    changeKeys(handleCaps);
  }

  return language;
};

export const getLanguageFromStorage = (keyboardState) => {
  const newEntity = keyboardState;

  if (localStorage.getItem('lang') === 'RUS') {
    mutateData(layout.RUS, 'RUS', keyboardState);
    newEntity.language = 'RUS';

    changeKeys(keyboardState.layout);
  }

  if (localStorage.getItem('lang') === 'ENG') {
    mutateData(layout.ENG, 'ENG', keyboardState);
    newEntity.language = 'ENG';

    changeKeys(keyboardState.layout);
  }
};
