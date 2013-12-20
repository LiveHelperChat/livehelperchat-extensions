// Saves options to localStorage.
function save_options() {
  var select = document.getElementById("lhcinstallpath");
  localStorage["lhc_url"] = select.value;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
  var bkg = chrome.extension.getBackgroundPage();
  bkg.location.reload()
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var favorite = localStorage["lhc_url"];
  if (!favorite) {
    return;
  };
  var select = document.getElementById("lhcinstallpath");
  select.value = favorite;
}

function getLHCPath(){
  var favorite = localStorage["lhc_url"];
  if (favorite) {
    return favorite;
  };
  
  return false;
}

function attatchEvents(){
	restore_options();
	document.querySelector('#save').addEventListener('click', save_options);
}

function handleMessage(e) {
    	var action = e.data.split(':')[0];
    	if (action == 'lhc_chrome') {
    		chrome.browserAction.setBadgeText({text: e.data.split(':')[1]});
    	}
}

function processContent(){
	var urlPath = getLHCPath();
	var status = document.getElementById("contentChat");
	
	if (urlPath != false) {		 
		 status.innerHTML = '<iframe src="'+urlPath+'/index.php/site_admin/chat/chattabschrome/" width="700" height="500" frameborder="0" name="FRAME">&lt;p&gt;Your browser does not support iframes.&lt;/p&gt;</iframe>';

		if ( window.addEventListener ){
			window.addEventListener("message", handleMessage, false);
		};
		chrome.browserAction.setBadgeText({text: 'P'});
	} else {
		status.innerHTML = 'Please enter installation path in options';
		chrome.browserAction.setBadgeText({text: 'F'});
	}
}
function processPopupContent(){
	var urlPath = getLHCPath();
	var status = document.getElementById("contentChat");
	
	if (urlPath != false) {		 
		status.innerHTML = '<iframe src="'+urlPath+'/index.php/site_admin/chat/chattabschrome/(mode)/popup" width="700" height="500" frameborder="0" name="FRAME">&lt;p&gt;Your browser does not support iframes.&lt;/p&gt;</iframe>';
		chrome.browserAction.setBadgeText({text: 'P'});
		var bkg = chrome.extension.getBackgroundPage();
		bkg.location.reload();
	} else {
		status.innerHTML = 'Please enter installation path in options';
		chrome.browserAction.setBadgeText({text: 'F'});
	}
}
