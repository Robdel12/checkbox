class Checkbox {
  constructor(checkboxEl, labelEl) {
    this.checkbox = checkboxEl;
    this.label = labelEl;

    this.init();
  }

  init() {
    let accessibleNode = this.checkbox.accessibleNode;

    this.checkbox.onclick = this.toggleCheckbox.bind(this);
    this.label.onclick = this.labelClick.bind(this);
    this.checkbox.onkeypress = this.checkboxKeyPress.bind(this);

    //apply accessibile attributes
    accessibleNode.role = 'checkbox';
    accessibleNode.checked = false;
    accessibleNode.labeledBy = new AccessibleNodeList([this.label.accessibleNode]);
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
    let isCurrentlyChecked = this.checkbox.accessibleNode.checked === 'true';

    this.checkbox.classList.toggle('is-checked', !isCurrentlyChecked);
    this.checkbox.accessibleNode.checked = !isCurrentlyChecked;
  }
}
