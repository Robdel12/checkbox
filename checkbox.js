class Checkbox {
  constructor(checkboxEl, labelEl) {
    this.checkbox = checkboxEl;
    this.label = labelEl;

    this.init();
  }

  init() {
    this.checkbox.onclick = this.toggleCheckbox.bind(this);
    this.label.onclick = this.labelClick.bind(this);
    this.checkbox.onkeypress = this.checkboxKeyPress.bind(this);
  }

  checkboxKeyPress(event) {
    let isEnterOrSpace = event.keyCode === 32 || event.keyCode === 13;

    if(isEnterOrSpace) {
      this.toggleCheckbox();
    }
  }

  labelClick() {
    this.toggleCheckbox();
    this.checkbox.focus();
  }

  toggleCheckbox() {
    let isCurrentlyChecked = this.checkbox.classList.contains('is-checked');
    let ariaChecked = this.checkbox.getAttribute('aria-checked') === 'true';

    this.checkbox.classList.toggle('is-checked', !isCurrentlyChecked);
    this.checkbox.setAttribute('aria-checked', !ariaChecked);
  }
}
