/**
 * Checkbox.js aims to create a functional checkbox out of pretty much
 * any HTML markup. This allows you to style the checkbox any way you
 * would like. It gives you full control of the markup.
 *
 *
 * ## Getting started
 *
 * Given our HTML:
 *
 * ``` html
 * <label for="checkbox">Subscribe?</label>
 * <span id="checkbox"></span>
 * ```
 *
 * We can create a new checkbox out of a span by passing the element
 * to checkbox.js:
 *
 * ``` javascript
 * new Checkbox(document.getElementById('checkbox'));
 * ```
 *
 * This will create a checkbox out of that HTMLElement that you
 * passed. Checkbox.js will try to find a `label` element in the DOM
 * to associate with the checkbox. If it can't find a `label` it will
 * throw an error. All checkboxes must have a label.
 *
 * What your checkbox should look like after using checkbox.js:
 *
 * ``` html
 * <label for="checkbox" id="jsze4iuu8c">Subscribe?</label>
 * <span id="checkbox" tabindex="0" role="checkbox"
 *   aria-labelledby="jsze4iuu8c" aria-checked="false"></span>
 * ```
 *
 * Now you can style the checkbox to look how ever you want!
 *
 * @param { HTMLElement } checkboxEl
 * @param { Object } options
 */
class Checkbox {
  constructor(checkboxEl, options = {}) {
    /**
     * A reference to the checkbox HTMLElement in the DOM.
     *
     */
    this.checkbox = checkboxEl;

    /**
     * A reference to the label HTMLElement in the DOM.
     *
     */
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
   * Determine if the checkbox is nested inside of a label.
   *
   * @returns { Boolean }
   */
  get isNested() {
    return this.checkbox.parentNode.tagName.toUpperCase() === 'LABEL';
  }

  /**
   * Try to find the associated label in the DOM if no label is passed
   * in the constructor. If the label is found it will return that
   * element. If nothing is found it will return false.
   *
   * @returns { HTMLElement || Boolean}
   * @private
   */
  searchForLabel() {
    // check the checkbox is nested inside of a label
    if (this.isNested) {
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
   * @param { Object } options - object of passed options from the
   * constructor
   * @private
   */
  init(options) {

    /**
     * Is the checkbox checked or not.
     *
     */
    this.isChecked = options.isChecked || false;

    this.checkbox.onclick = this.toggleCheckbox.bind(this);
    this.label.onclick = this.labelClick.bind(this);
    this.checkbox.onkeypress = this.checkboxKeyPress.bind(this);
    this._toggleClass(this.checkbox.classList, 'is-checked', this.isChecked);
    // this.checkbox.classList.toggle('is-checked', this.isChecked);
    this.initA11y();
  }

  /**
   * Set up the proper accessibility roles for the custom checkbox.
   *
   * @private
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
   * @private
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
   * @private
   */
  labelClick(event) {
    // If the click isn't on the label, don't do anything.
    if (event.target !== this.label) {
      return;
    }

    this.toggleCheckbox();
    this.checkbox.focus();
  }

  // ie11 doesn't support classList.toggle..
  _toggleClass(classList, className, isTrue) {
    if (isTrue) {
      classList.add(className);
    } else {
      classList.remove(className);
    }
  }

  /**
   * Toggle the current state of the checkbox.
   *
   * @returns { Boolean } isChecked - the new state of the checkbox
   */
  toggleCheckbox() {
    // this.checkbox.classList.toggle('is-checked', !this.isChecked);
    this._toggleClass(this.checkbox.classList, 'is-checked', !this.isChecked);
    this.checkbox.setAttribute('aria-checked', !this.isChecked);
    this.isChecked = !this.isChecked;

    return this.isChecked;
  }
}

if (process.env.NODE_ENV === 'production' || process.env.DEBUG === true) {
  window.Checkbox = Checkbox;
}

export default Checkbox;
