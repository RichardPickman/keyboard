import './sass/style.scss';
import createElements from './components';
import {
  changeKeys,
  changeColor,
  changeLanguage,
  textAreaHandler,
  getLanguageFromStorage,
} from './components/helpers';
import * as layout from './layouts/index';
import Keyboard from './classes/keyboard'

window.onload = function App() {
  createElements();
  const state = new Keyboard();
  const { currentLanguage } = state;
  getLanguageFromStorage(state);
  const shortcuts = [];
  let language = currentLanguage;

  const changeLayout = (event) => {
    if (event === 'CapsLock' && state.caps === false) {
      state.layout = layout[`${language}_CAPS`];

      changeKeys(state.layout);

      state.caps = true;
    } else if (event === 'CapsLock' && state.caps === true) {
      state.layout = layout[`${language}`];

      changeKeys(state.layout);

      state.caps = false;
    }

    if (event === 'ShiftLeft' || event === 'ShiftRight') {
      state.layout = layout[`${language}_SHIFT`];

      changeKeys(state.layout);

      state.shift = true;
    }

    textAreaHandler(event, state);
  };

  document.addEventListener('keydown', (event) => {
    event.preventDefault();
    if (!layout.CODES.includes(event.code)) return;

    changeLayout(event.code);
    if (event.code === 'ControlLeft') shortcuts.push('ControlLeft');
    if (event.code === 'AltLeft') shortcuts.push('AltLeft');

    setTimeout(() => {
      if (shortcuts.includes('ControlLeft') && shortcuts.includes('AltLeft')) {
        language = changeLanguage(state, layout);
      }

      shortcuts.length = 0;
    }, 300);
  });

  document.addEventListener('keyup', (event) => {
    if (!layout.CODES.includes(event.code)) return;
    const keyboard = document.querySelectorAll('.key');
    const index = Array.from(keyboard).findIndex((button) => button.id === event.code);
    keyboard[index].classList.remove('setColor');

    if (event.code === 'ShiftLeft' || event.code === 'ShiftRight') {
      state.layout = layout[`${language}`];
      changeKeys(state.layout);
      state.shift = false;
    }
  });

  document.querySelectorAll('.key').forEach((key) => {
    key.addEventListener('click', (e) => {
      const button = e.target.closest('button');
      changeColor(button);
      setTimeout(() => button.classList.remove('setColor'), 100);

      textAreaHandler(button.id, state);
    });
  });
};
