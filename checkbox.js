class Checkbox {
  constructor(checkboxEl, labelEl) {
    this.checkbox = checkboxEl;
    this.label = labelEl;

    if (!this.checkbox) {
      throw new Error(`You must pass a checkbox element`);
    }

    if (!this.label) {
      this.label = this.searchForLabel();

      if (this.label === false) {
        throw new Error(`You must pass a label element for ${this.checkbox.id}`);
      }
    }

    this.init();
  }

  searchForLabel() {
    if (this.checkbox.parentNode.tagName === 'LABEL') {
      return this.checkbox.parentNode;
    } else if(this.checkbox.id) {
      // try to find a label by matching the for attr
      return document.querySelector(`[for=${this.checkbox.id}`) || false;
    }

    return false;
  }

  init() {
    this.checkbox.onclick = this.toggleCheckbox.bind(this);
    this.label.onclick = this.labelClick.bind(this);
    this.checkbox.onkeypress = this.checkboxKeyPress.bind(this);
    this.initA11y();
  }

  initA11y() {
    this.checkbox.setAttribute('tabindex', 0);
    this.checkbox.setAttribute('role', 'checkbox');
    this.checkbox.setAttribute('aria-labelledby', this.label.id);
    this.checkbox.setAttribute('aria-checked', 'false');
  }

  get isChecked() {
    return this.checkbox.classList.contains('is-checked');
  }

  checkboxKeyPress(event) {
    let isEnterOrSpace = event.keyCode === 32 || event.keyCode === 13;

    if(isEnterOrSpace) {
      this.toggleCheckbox();
    }
  }

  labelClick(event) {
    // If the click isn't on the label, don't do anything.
    if (event.target !== this.label) {
      return false;
    }

    this.toggleCheckbox(event);
    this.checkbox.focus();
  }

  toggleCheckbox(event) {
    this.checkbox.classList.toggle('is-checked', !this.isChecked);
    this.checkbox.setAttribute('aria-checked', this.isChecked);
  }
}
