import './sass/style.scss';
import { createKeyboard } from './components/keyboard';
import { createTextArea } from './components/textarea';
import * as layout from './layouts/index';

const keys = {
    shift: false,
    caps: false,

}

window.onload = function () {
    const root = document.createElement('main')
    root.setAttribute('id', 'root')
    document.body.append(root)
    createTextArea()
    createKeyboard()
    const keyboard = document.querySelectorAll('.key');
    // CHANGE LAYOUTS 
    document.addEventListener('keydown', function(event) {
        
        if (event.code == 'CapsLock' && keys.caps === false) {
            keyboard.forEach((element, index) => {
                element.textContent = layout.ENG_CAPS[index]
            })
            keys.caps = true
        } else {
            keyboard.forEach((element, index) => {
                element.textContent = layout.ENG[index]
            })
            keys.caps = false
        }

        if (event.code == 'ShiftLeft' || event.code == 'ShiftRight') {
            keys.shift = true;
            keyboard.forEach((element, index) => {
                element.textContent = layout.ENG_SHIFT[index]
            })
        }

        if (layout.ENG_SYMBOLS.includes(event.key) && textarea.textContent === null) {
            const textarea = document.querySelector('#textarea')
            textarea.textContent = event.key;
        } else if (layout.ENG_SYMBOLS.includes(event.key)) {
            let textAreaText = textarea.textContent + event.key
    
            textarea.textContent = textAreaText
        }
    });
    
    document.addEventListener('keyup', function(event) {
        
        if (event.code == 'ShiftLeft') {
            keyboard.forEach((element, index) => {
                element.textContent = layout.ENG[index]
            })
        }
    });

    keyboard.forEach(button => {
        button.addEventListener('click', (e) => {
            const textarea = document.querySelector('#textarea')
            if (layout.ENG_SYMBOLS.includes(e.target.textContent) && textarea.textContent === null) {
                textarea.textContent = e.target.textContent;
            } else if (layout.ENG_SYMBOLS.includes(e.target.textContent)) {
                let textAreaText = textarea.textContent + e.target.textContent
        
                textarea.textContent = textAreaText
            }

            if (e.target.textContent == 'Caps' && keys.caps === false) {
                keyboard.forEach((element, index) => {
                    element.textContent = layout.ENG_CAPS[index];
                })

                keys.caps = true;
            } else if (e.target.textContent == 'Caps' && keys.caps === true) {
                keyboard.forEach((element, index) => {
                    element.textContent = layout.ENG[index];
                })

                keys.caps = false;
            }
        })
    })

    const backspace = document.querySelector('#Backspace13')

    backspace.addEventListener('click', () => {
        const textarea = document.querySelector('#textarea')
        if (textarea.textContent === null) {
            textarea.textContent = '';
        } else {
            const textAreaText = [...textarea.textContent];

            textAreaText.pop()

            textarea.textContent = textAreaText.join('');
        }
    })
    
}
