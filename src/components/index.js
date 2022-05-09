import createTextArea from './textarea';
import createMain from './main';
import createKeyboard from './keyboard';
import createInfo from './info';

const createElements = () => {
  createMain();
  createTextArea();
  createKeyboard();
  createInfo();
};

export default createElements;
