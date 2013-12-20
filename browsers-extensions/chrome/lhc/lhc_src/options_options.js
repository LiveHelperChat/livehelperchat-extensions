document.addEventListener('DOMContentLoaded', function () {
	attatchEvents();
	var bkg = chrome.extension.getBackgroundPage();
	bkg.location.reload();
});