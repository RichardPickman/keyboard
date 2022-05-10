import * as layout from '../layouts/index';

const createKeyboard = (lang = layout.ENG) => {
  const root = document.querySelector('#root');
  const keyboard = document.createElement('div');
  keyboard.setAttribute('class', 'keyboard');

  lang.forEach((item, index) => {
    const key = document.createElement('button');
    key.setAttribute('class', 'key');
    key.dataset.key = item;
    key.setAttribute('id', `${layout.CODES[index]}`);

    keyboard.append(key);
  });

  root.append(keyboard);
};

export default createKeyboard;
