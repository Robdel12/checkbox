import { expect } from 'chai';
import {
  $,
  buildLabel,
  setupTesting,
  buildBasicCheckbox
} from './utils/utils';
import Checkbox from '../src/checkbox';

describe('Checkbox tests', function() {
  setupTesting();

  describe('Nested label', function() {
    beforeEach(function() {
      let fakeCheckbox = buildBasicCheckbox('myCheckbox');
      let label = buildLabel('myCheckbox', 'My label!');

      label.append(fakeCheckbox);
      this.nested = new Checkbox(fakeCheckbox);
    });

    it('is not checked by default', function() {
      expect(this.nested.checkbox.getAttribute('aria-checked')).to.equal('false');
      expect(this.nested.checkbox.classList.contains('is-checked')).to.equal(false);
      expect(this.nested.isChecked).to.equal(false);
    });

    describe('clicking the label', function() {
      beforeEach(function() {
        $('label').click();
      });

      it('checks the checkbox', function() {
        expect(this.nested.checkbox.getAttribute('aria-checked')).to.equal('true');
        expect(this.nested.checkbox.classList.contains('is-checked')).to.equal(true);
        expect(this.nested.isChecked).to.equal(true);
      });
    });

    describe('clicking the checkbox', function() {
      beforeEach(function() {
        $('#myCheckbox').click();
      });

      it('checks the checkbox', function() {
        expect(this.nested.checkbox.getAttribute('aria-checked')).to.equal('true');
        expect(this.nested.checkbox.classList.contains('is-checked')).to.equal(true);
        expect(this.nested.isChecked).to.equal(true);
      });
    });
  });

  describe('Basic checkbox', function() {
    beforeEach(function() {
      let fakeCheckbox = buildBasicCheckbox('myCheckbox');
      buildLabel('myCheckbox', 'My label!');

      // ids are global
      window.testingContainer.append(fakeCheckbox);
      this.cb = new Checkbox(fakeCheckbox);
    });

    it('is not checked by default', function() {
      expect(this.cb.checkbox.getAttribute('aria-checked')).to.equal('false');
      expect(this.cb.checkbox.classList.contains('is-checked')).to.equal(false);
      expect(this.cb.isChecked).to.equal(false);
    });

    it('has the proper role', function() {
      expect(this.cb.checkbox.getAttribute('role')).to.equal('checkbox');
    });

    it('associates the label properly', function() {
      let checkboxEl = this.cb.checkbox;
      let labelEl = this.cb.label;

      expect(checkboxEl.getAttribute('aria-labelledby')).to.equal(labelEl.id);
    });

    describe('clicking the label', function() {
      beforeEach(function() {
        $('label').click();
      });

      it('checks the checkbox', function() {
        expect(this.cb.checkbox.getAttribute('aria-checked')).to.equal('true');
        expect(this.cb.checkbox.classList.contains('is-checked')).to.equal(true);
        expect(this.cb.isChecked).to.equal(true);
      });
    });

    describe('clicking the checkbox', function() {
      beforeEach(function() {
        $('#myCheckbox').click();
      });

      it('checks the checkbox', function() {
        expect(this.cb.checkbox.getAttribute('aria-checked')).to.equal('true');
        expect(this.cb.checkbox.classList.contains('is-checked')).to.equal(true);
        expect(this.cb.isChecked).to.equal(true);
      });
    });
  });

  describe('Passing isChecked: true', function() {
    beforeEach(function() {
      let fakeCheckbox = buildBasicCheckbox('myCheckbox');
      buildLabel('myCheckbox', 'My label!');

      // ids are global
      window.testingContainer.append(fakeCheckbox);
      this.checked = new Checkbox(fakeCheckbox, {
        isChecked: true
      });
    });

    it('is checked initially', function() {
      expect(this.checked.checkbox.getAttribute('aria-checked')).to.equal('true');
      expect(this.checked.checkbox.classList.contains('is-checked')).to.equal(true);
      expect(this.checked.isChecked).to.equal(true);
    });
  });

  describe('Passing a label as an option', function() {
    beforeEach(function() {
      let fakeCheckbox = buildBasicCheckbox('myCheckbox');
      let label = buildLabel(null, 'My label!');

      // ids are global
      window.testingContainer.append(fakeCheckbox);
      this.passedLabel = new Checkbox(fakeCheckbox, {
        label
      });
    });

    it('associates the label properly', function() {
      let checkboxEl = this.passedLabel.checkbox;
      let labelEl = this.passedLabel.label;

      expect(checkboxEl.getAttribute('aria-labelledby')).to.equal(labelEl.id);
    });
  });
});
