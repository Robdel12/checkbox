# Checkbox.js [![CircleCI](https://circleci.com/gh/Robdel12/checkbox.svg?style=svg&circle-token=641acbeadd66ab804551bfc7f31b053e760f1b1b)](https://circleci.com/gh/Robdel12/checkbox)

Checkbox.js aims to create a functional checkbox out of pretty much
any HTML markup. This allows you to style the checkbox any way you
would like. It gives you full control of the markup.


## Getting started

Given our HTML:

``` html
<label for="checkbox">Subscribe?</label>
<span id="checkbox"></span>
```

We can create a new checkbox out of a span by passing the element to
checkbox.js:

``` javascript
new Checkbox(document.getElementById('checkbox'));
```

This will create a checkbox out of that HTMLElement that you
passed. Checkbox.js will try to find a `label` element in the DOM to
associate with the checkbox. If it can't find a `label` it will throw
an error. All checkboxes must have a label.

What your checkbox should look like after using checkbox.js:

``` html
<label for="checkbox" id="jsze4iuu8c">Subscribe?</label>
<span id="checkbox" tabindex="0" role="checkbox" aria-labelledby="jsze4iuu8c" aria-checked="false"></span>
```

#### Passing a label directly

If you would like you can pass a reference to the label directly to
checkbox.js:

``` html
<label id="label">Subscribe?</label>
<span id="checkbox"></span>
```

``` javascript
new Checkbox(document.getElementById('checkbox'), {
  label: document.getElementById('label')
});
```

#### Setting the initial state

You can also initialize the checkbox to be checked by default by
passing a `isChecked` key in the `options` object.

``` html
<label id="label">Subscribe?</label>
<span id="checkbox"></span>
```

``` javascript
new Checkbox(document.getElementById('checkbox'), {
  label: document.getElementById('label'),
  isChecked: true
});
```

#### Programmatically change state

If you store a reference to the checkbox when you instantiate it, you
can call methods on that instance like `toggleCheckbox`. This allows
you to toggle the checkbox from actions other than a click or keyboard
event.

``` html
<label for="checkbox">Subscribe?</label>
<span id="checkbox"></span>
```

``` javascript
// init an unchecked checkbox
let checkbox = new Checkbox(document.getElementById('checkbox'));

checkbox.toggleCheckbox(); // toggles to checked
```
