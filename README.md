# Checkbox.js

Checkbox.js aims to create a functional checkbox out of pretty much
any HTML markup.


## Getting started

Using checkbox.js is simple:

``` javascript
let checkbox = new Checkbox(HTMLElement);
```

This will create a checkbox out of that HTMLElement that you
passed. Checkbox.js will try to find a `label` element in the DOM to
associate with the checkbox. If it can't find a `label` it will throw
an error. All checkboxes must have a label.
