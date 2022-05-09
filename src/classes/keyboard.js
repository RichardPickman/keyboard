import * as layout from '../layouts'

class Keyboard {
    constructor() {
      this.layout = layout.ENG;
      this.currentLanguage = 'ENG';
      this.caps = false;
      this.shift = false;
    }
}

export default Keyboard;
