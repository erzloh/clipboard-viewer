chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	console.log('got message');
	console.log('message', message);
	if (message.action === "getClipboard") {
	  navigator.clipboard.readText().then((text) => {
		sendResponse({ text });
	  }).catch(() => {
		sendResponse({ text: "Cannot access clipboard." });
	  });
	  return true;
	}
  });