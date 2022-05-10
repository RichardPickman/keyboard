const createMain = () => {
  const main = document.createElement('main');
  main.setAttribute('id', 'root');
  main.setAttribute('class', 'container');
  document.body.append(main);
};

export default createMain;
