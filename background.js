const state = {
  ON  : 'ON',
  OFF : 'OFF',
};

const chromeDocs = {
extensions : 'https://developer.chrome.com/docs/extensions',
webstore   : 'https://developer.chrome.com/docs/webstore',
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.action.setBadgeText({
    text: state.OFF,
  });
});

chrome.action.onClicked.addListener(async (tab) => {
  if (tab.url.startsWith(chromeDocs.extensions) || tab.url.startsWith(chromeDocs.webstore)) {
    // Retrieve the action badge to check if the extension is ON or OFF
    const prevState = await chrome.action.getBadgeText({ tabId: tab.id });

    // Next tate will always be the opposite
    const nextState =
      prevState === state.ON ?
        state.OFF :
        state.ON;

    // Set the action badge to the next state
    await chrome.action.setBadgeText({
      tabId : tabId,
      text  : nextState
    });

    if (nextState === state.ON) {
      // Insert the CSS file when the user turns the extension on
      await chrome.scripting.insertCSS({
        files  : [ 'focus-mode.css' ],
        target : { tabId : tab.id }
      });
    } else if (nextState === state.OFF) {
      // Remove the CSS when user turns the extension off
      await chrome.scripting.removeCSS({
        files  : [ 'focus-mode.css' ],
        target : { tabId : tab.id }
      });
    }
  }
});