import * as layout from '../layouts';
import Key from '../assets/sounds/Key.mp3';

class Keyboard {
  constructor() {
    this.layout = layout.ENG;
    this.currentLanguage = 'ENG';
    this.caps = false;
    this.shift = false;
    this.sound = new Audio(Key);
    this.sound.volume = 0.3;
  }

  play() {
    this.sound.play();
  }

  stop() {
    this.sound.currentTime = 0;
  }
}

export default Keyboard;
