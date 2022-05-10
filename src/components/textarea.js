const createTextArea = () => {
  const root = document.getElementById('root');

  const text = document.createElement('div');
  text.setAttribute('class', 'text container');

  const textarea = document.createElement('textarea');
  textarea.setAttribute('id', 'textarea');
  textarea.setAttribute('autofocus', '');
  textarea.cols = 40;
  textarea.rows = 6;
  textarea.placeholder = 'Type your text....';

  text.append(textarea);
  root.append(text);
};

export default createTextArea;
