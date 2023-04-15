const sites = {
  webstore   : 'https://developer.chrome.com/docs/webstore/*',
  extensions : 'https://developer.chrome.com/docs/extensions/*',
}

const tabs = await chrome.tabs.query({
  url: [
    sites.webstore,
    sites.extensions
  ],
});