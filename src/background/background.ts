import browser from "webextension-polyfill";

browser.runtime.onInstalled.addListener(function() {
  browser.contextMenus.create({
    id: "callApi",
    title: "CallApi",
    contexts: ["selection"]
  });
});

browser.contextMenus.onClicked.addListener(async function(info, tab) {
  if (tab === undefined) return;

  if (info.menuItemId === "callApi") {
    const text = info.selectionText;
    browser.tabs.sendMessage(
      tab.id as number,
      {
        type: "callApi",
        data: {
          text: text,
        }
      });
  };
});
