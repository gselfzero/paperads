import { init, type InitResult } from '@tma.js/sdk';

function onInit({ mainButton, backButton }: InitResult) {
	AdController.show().then((result: ShowPromiseResult) => {
    // user watch ad till the end
    // your code to reward user
}).catch((result: ShowPromiseResult) => {
    // user skipped video or get error during playing ad
    // do nothing or whatever you want
})
  let counter = 0;

  const setCounter = (value: number) => {
    counter = value;

    if (counter === 0) {
      backButton.hide();
    } else {
      backButton.show();
    }

    mainButton.setText(`Counter: ${counter}`);
  };

  backButton.on('click', () => setCounter(counter - 1));
  mainButton.on('click', () => setCounter(counter + 1));
  mainButton.setText('Click me').enable().show();
}

function onError(e: unknown) {
  const div = document.createElement('div');
  div.innerText = e instanceof Error ? e.message : JSON.stringify(e);

  document.body.appendChild(div);
}

// Initialize SDK with debug mode on.
init({ async: true, cssVars: true, acceptCustomStyles: true })
  .then(onInit)
  .catch(onError);