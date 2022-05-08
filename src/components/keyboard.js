import * as layout from '../layouts/index'

const gridNames = [
    'Space', 'Backspace', 'Shift', 'Enter', 'Del', 'Caps', 'Tab', 'Ctrl'
]

export const createKeyboard = (keys = layout.ENG) => {
    const root = document.getElementById('root');
    
    const keyboard = document.createElement('div');
    keyboard.setAttribute('class', 'keyboard')
    
    keys.forEach((item, index) => {
        const key = document.createElement('button');
        key.setAttribute('class', 'key');
        key.textContent = item;
    
        if (gridNames.includes(item)) {
            key.setAttribute('id', `${item + index}`)
        }
    
        keyboard.append(key);
    })

    root.append(keyboard)
}
