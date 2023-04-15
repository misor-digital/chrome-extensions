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

const collator = new Intl.Collator();
tabs.sort((a, b) => collator.compare(a.title, b.title));

const template = document.getElementById('li_template');
const elements = new Set();
for (const tab of tabs) {
  const title    = tab.title.split('-')[0].trim();
  const pathname = new URL(tab.url).pathname.slice('/docs'.length);

  const element = template.content.firstElementChild.cloneNode(true);
  
  element.querySelector('.title').textContent    = title;
  element.querySelector('.pathname').textContent = pathname;
  element.querySelector('a').addEventListener('click', async () => {
    // need to focus window as well as the active tab
    await chrome.tabs.update(tab.id, { active: true });
    await chrome.windows.update(tab.windowId, { focused: true });
  });

  elements.add(element);
}

document.querySelector('ul').append(...elements);

const button = document.querySelector('button');
button.addEventListener('click', async () => {
  const tabIds = tabs.map(({ id }) => id);
  const group = await chrome.tabs.group({ tabIds });
  await chrome.tabGroups.update(group, { title: 'DOCS' });
});