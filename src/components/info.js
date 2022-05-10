const createInfo = () => {
  const root = document.querySelector('main');

  const text = document.createElement('p');
  text.setAttribute('class', 'info');
  text.textContent = 'Для переключения языка используйте комбинацию ctrl + alt';

  root.append(text);
};

export default createInfo;
