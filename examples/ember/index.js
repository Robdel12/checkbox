import Checkbox from 'checkboxjs';
import Component from '@ember/component';

export default Component.extend({
  isChecked: false,
  label: null,

  didInsertElement() {
    this._super(...arguments);

    let checkbox = new Checkbox(this.$()[0], {
      isChecked: this.get('isChecked'),
      label: this.get('label')
    });

    this.set('checkbox', checkbox);
  },

  didReceiveAttrs() {
    this._super(...arguments);

    if(this.get('checkbox').isChecked !== this.get('isChecked')) {
      this.get('checkbox').toggleCheckbox();
    }
  }
});
