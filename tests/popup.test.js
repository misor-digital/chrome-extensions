const chrome = require('jest-chrome');

// const popup = require('../src/popup/popup');

const tabUrls = [
  'https://developer.chrome.com/docs/extensions/mv3/getstarted/extensions-101/',
  'https://developer.chrome.com/docs/webstore/cws-enterprise/',
  'https://developer.chrome.com/docs/extensions/mv3/getstarted/development-basics/#load-unpacked',
  'https://developer.chrome.com/docs/extensions/mv3/getstarted/tut-tabs-manager/',
  'https://developer.chrome.com/docs/extensions/mv3/user_interface/',
  'https://developer.chrome.com/docs/extensions/reference/permissions/',
  'https://developer.chrome.com/docs/extensions/reference/scripting/',
  'https://developer.chrome.com/docs/extensions/mv3/permission_warnings/',
  'https://developer.chrome.com/docs/extensions/mv3/manifest/'
  ];

chrome.windows.create({
  url: tabUrls
});

// popup(chrome);

test('chrome tabs created', () => {
  const tabsCount       = tabUrls.length;
  const chromeTabsCount = chrome.windows.tabs.length;
  
  expect(chromeTabsCount).toBe(tabsCount);
});