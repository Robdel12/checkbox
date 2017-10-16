import React, { Component } from 'react';
import Checkbox from 'checkboxjs';

class ReactCheckbox extends Component {
  componentDidMount() {
    this.checkbox = new Checkbox(this.refs.checkbox, {
      isChecked: this.props.isChecked,
      label: this.props.label
    });
  }

  // if the `isChecked` prop changes, toggle the checkbox.
  // this ensures checkboxjs manages the state.
  componentWillReceiveProps({isChecked}) {
    if(isChecked !== this.checkbox.isChecked) {
      this.checkbox.toggleCheckbox();
    }
  }

  render() {
    return (
      <span ref="checkbox" className={this.props.className} id={this.props.id}></span>
    );
  }
}

export default ReactCheckbox;
