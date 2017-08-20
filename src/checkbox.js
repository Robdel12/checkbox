/**
 * Checkbox.js aims to create a functional (and accessibile) checkbox
 * from almost any HTMLElement.
 *
 * @param { HTMLElement } checkboxEl
 * @param { Object } options
 */
class Checkbox {
  constructor(checkboxEl, options = {}) {
    this.checkbox = checkboxEl;
    this.label = options.label;

    if (!this.checkbox) {
      throw new Error(`You must pass a checkbox element`);
    }

    if (!this.label) {
      this.label = this.searchForLabel();

      if (this.label === false) {
        throw new Error(`You must pass a label element for ${this.checkbox.id}`);
      }
    }

    // Assign a random ID to the label so we can use aria-labelledby
    if (!this.label.id) {
      let randomID = Math.random().toString(36).substr(2, 10);

      this.label.setAttribute('id', randomID);
    }

    this.init(options);
  }

  /**
   * Try to find the associated label in the DOM if no label is passed
   * in the constructor. If the label is found it will return that
   * element. If nothing is found it will return false.
   *
   * @returns { HTMLElement || Boolean}
   */
  searchForLabel() {
    // check the checkbox is nested inside of a label
    if (this.checkbox.parentNode.tagName.toUpperCase() === 'LABEL') {
      this.isNested = true;
      return this.checkbox.parentNode;
    } else if(this.checkbox.id) {
      // try to find a label by matching the for attr
      return document.querySelector(`[for=${this.checkbox.id}`) || false;
    }

    return false;
  }

  /**
   * Setup the custom checkbox with event listeners and its initial state.
   *
   * @param { Object } options - object of passed options from the constructor
   */
  init(options) {
    this.checkbox.onclick = this.toggleCheckbox.bind(this);
    this.label.onclick = this.labelClick.bind(this);
    this.isChecked = options.isChecked || false;
    this.checkbox.onkeypress = this.checkboxKeyPress.bind(this);
    this.checkbox.classList.toggle('is-checked', this.isChecked);
    this.initA11y();
  }

  /**
   * Set up the proper accessibility roles for the custom checkbox.
   *
   */
  initA11y() {
    this.checkbox.setAttribute('tabindex', 0);
    this.checkbox.setAttribute('role', 'checkbox');
    this.checkbox.setAttribute('aria-labelledby', this.label.id);
    this.checkbox.setAttribute('aria-checked', this.isChecked);
  }

  /**
   * Handle keyboard events on the checkbox.
   *
   * @param { DOM Event } event
   */
  checkboxKeyPress(event) {
    let isEnterOrSpace = event.keyCode === 32 || event.keyCode === 13;

    if(isEnterOrSpace) {
      event.preventDefault();
      this.toggleCheckbox();
    }
  }

  /**
   * Handle clicking of the label.
   *
   * When clicking the label it should focus the checkbox and toggle
   * the state.
   *
   * @param { DOM Event } event
   */
  labelClick(event) {
    // If the click isn't on the label, don't do anything.
    if (event.target !== this.label) {
      return;
    }

    this.toggleCheckbox();
    this.checkbox.focus();
  }

  /**
   * Toggle the current state of the checkbox.
   *
   * @private
   */
  toggleCheckbox() {
    this.checkbox.classList.toggle('is-checked', !this.isChecked);
    this.checkbox.setAttribute('aria-checked', !this.isChecked);
    this.isChecked = !this.isChecked;
  }
}

// lol
window.Checkbox = Checkbox;
export default Checkbox;
