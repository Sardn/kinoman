// Абстракция.

// Имрорты.

import {createTemplate} from '../utils/render.js';

// Переменные.

const TIMEOUT_ANIMATION = 600;

// Создание класса.

export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error('Can not instantiate abstraction, only concrete one.');
    }
    this._element = null;
    this._callback = {};
  }

  getTemplate() {
    throw new Error('Abstraction method not implemented: getTemplate');
  }

  getElement() {
    if (!this._element) {
      this._element = createTemplate(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }

  shake(callback) {
    this.getElement().style.animation = `shake ${TIMEOUT_ANIMATION / 1000}s`;
    setTimeout(() => {
      this.getElement().style.animation = '';
      callback();
    }, TIMEOUT_ANIMATION);
  }
}