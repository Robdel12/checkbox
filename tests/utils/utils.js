import jQuery from 'jquery';
export { default as $ } from 'jquery';

/**
 * Setup the testing container and clean it up after each assertion.
 *
 * @param { Boolean } cleanUpAfterTests - enable clearing out the test
 * containers children
 */
export function setupTesting() {
  let testingContainer = document.getElementById('testingContainer');

  if (!testingContainer) {
    testingContainer = document.createElement('div');
    testingContainer.id = "testingContainer";
    document.body.appendChild(testingContainer);
  }

  afterEach(function() {
    testingContainer.innerHTML = "";
  });
}

export function buildLabel(htmlFor, text) {
  let label = document.createElement('label');

  label.innerHTML = text;
  label.htmlFor = htmlFor;
  window.testingContainer.append(label);

  return label;
}


export function buildBasicCheckbox(id) {
  let fakeCheckbox = document.createElement('span');

  fakeCheckbox.id = 'myCheckbox';
  fakeCheckbox.style = `width: 20px;
       height: 20px;
       border: 1px solid #ddd;
       border-radius: 6px;
       display: inline-block;
       vertical-align: middle;`;

  return fakeCheckbox;
}
