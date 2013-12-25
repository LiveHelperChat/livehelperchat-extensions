// Saves options to localStorage.
function save_options() {
	var select = document.getElementById("lhcinstallpath");
	localStorage["lhc_url"] = select.value;
	
	var select = document.getElementById("lhcusername");
	localStorage["lhc_usr"] = select.value;
	
  var select = document.getElementById("lhcpassword");
  localStorage["lhc_pwd"] = select.value;

  // Update status to let user know options were saved.
  var status = document.getElementById("status");
  status.innerHTML = "Options Saved.";
  setTimeout(function() {
    status.innerHTML = "";
  }, 750);
  var bkg = chrome.extension.getBackgroundPage();
  bkg.location = 'background.html';
}

// Restores select box state to saved value from localStorage.
function restore_options() {
  var favorite = localStorage["lhc_url"];
  if (!favorite) {
    return;
  };
  var select = document.getElementById("lhcinstallpath");
  select.value = favorite;
  
  var lhc_usr = localStorage["lhc_usr"];
  if (lhc_usr) {
	  document.getElementById("lhcusername").value = lhc_usr;
  };
  
  var lhc_pwd = localStorage["lhc_pwd"];
  if (lhc_pwd) {
	  document.getElementById("lhcpassword").value = lhc_pwd;
  };
  
}

function getLHCPath(){
	var favorite = localStorage["lhc_url"];
	if (favorite) {
		return favorite;
	};
	
	return false;
}

function getLHCLoginData(){
	var username = localStorage["lhc_usr"];
	var password = localStorage["lhc_pwd"];
	if (username && password) {
		return {'usr':username,'pwd':password};
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

function processContentBackground(){
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

/**
 * Initial background process content
 * */
function processContent(){
	var urlPath = getLHCPath();
	
	var status = document.getElementById("contentChat");
	var loginData = getLHCLoginData();
	
	if (urlPath != false) {	
								
		if (loginData != false) {					
			var content = '<form id="lhcLoginForm" action="'+urlPath+'/index.php/site_admin/xml/checklogin/" method="post">'+
			'<input type="password" name="password" value="'+loginData['pwd']+'" />'+
			'<input type="text" name="username" value="'+loginData['usr']+'" /></form>';
				
			var iframe = document.createElement("iframe");
			status.appendChild(iframe);
			
			if (iframe.contentWindow) {
		        iframe = iframe.contentWindow;
			} else {
		        if (iframe.contentDocument && iframe.contentDocument.document) {
		                iframe = iframe.contentDocument.document;
		        } else {
		                iframe = iframe.contentDocument;
		        }
	        };
	        
			iframe.document.body.innerHTML = content;
			iframe.document.getElementById("lhcLoginForm").submit();			
		};
		
		setTimeout(function(){
			chrome.runtime.getBackgroundPage(function(backgroundPage) {			
				backgroundPage.location = 'background_process.html';			
			});
		},5000);		
		
		chrome.browserAction.setBadgeText({text: 'P'});
		
	} else {
		var status = document.getElementById("contentChat");
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
