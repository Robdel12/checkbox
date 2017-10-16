import Checkbox from 'checkboxjs';
import Vue from 'vuejs';

Vue.component('checkbox', {
  props: ['isChecked', 'label'],
  template: '<span></span>',
  mounted: function () {
    this.checkbox = new Checkbox(this.$el, {
      isChecked: this.isChecked,
      label: this.label
    });
  },
  watch: {
    isChecked: function (value) {
      // update value
      this.checkbox.toggleCheckbox();
    }
  }
});
