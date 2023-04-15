import { chromeDocs, state } from './enums';

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
  }
});