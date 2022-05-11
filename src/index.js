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
import Keyboard from './classes/keyboard';

window.onload = function App() {
  createElements();
  const state = new Keyboard();
  getLanguageFromStorage(state);
  const { currentLanguage } = state;
  const shortcuts = [];
  let language = currentLanguage;

  const changeLayout = (event) => {
    if (event === 'CapsLock') {
      if (state.caps) {
        state.layout = layout[`${language}`];
        state.caps = false;
      } else {
        state.layout = layout[`${language}_CAPS`];
        state.caps = true;
      }
      changeKeys(state.layout);
    }

    if (event === 'ShiftLeft' || event === 'ShiftRight') {
      if (state.shift) {
        state.layout = layout[`${language}`];
        state.shift = false;
      } else {
        state.layout = layout[`${language}_SHIFT`];
        state.shift = true;
      }

      changeKeys(state.layout);
    }

    textAreaHandler(event, state);
  };

  document.addEventListener('keydown', (event) => {
    const { repeat } = event;
    event.preventDefault();
    if (!layout.CODES.includes(event.code)) return;
    state.stop();
    if (!repeat) state.play();
    changeLayout(event.code);

    if (event.code === 'ControlLeft') shortcuts.push('ControlLeft');
    if (event.code === 'AltLeft') shortcuts.push('AltLeft');

    setTimeout(() => {
      if (shortcuts.includes('ControlLeft') && shortcuts.includes('AltLeft')) {
        language = changeLanguage(state, layout);
      }

      shortcuts.length = 0;
    }, 200);
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
      state.stop();
      state.play();
      const button = e.target.closest('button');
      changeLayout(button.id);
      changeColor(button);
      setTimeout(() => button.classList.remove('setColor'), 100);
    });
  });
};
