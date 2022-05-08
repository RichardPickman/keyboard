export const createTextArea = () => {
    const root = document.getElementById('root');

    const text = document.createElement('div');
    text.setAttribute('class', 'text container');
    
    const textarea = document.createElement('textarea');
    textarea.setAttribute('id', 'textarea');
    textarea.cols = 40;
    textarea.rows = 6;
    textarea.placeholder = 'Type your text....';


    const label = document.createElement('label');
    label.for = textarea;
    label.textContent = 'Tell your story';

    text.append(label, textarea)

    root.append(text)
}
