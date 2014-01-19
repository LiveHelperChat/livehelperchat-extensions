(function($){
	var support = "MozWebSocket" in window ? 'MozWebSocket' : ("WebSocket" in window ? 'WebSocket' : null);
	
	if (support !== null) {		
		var nodejshelper = {

				operatorForced : false,	
					
				socket : null, 
				
				init : function(){
					this.socket = io.connect(nodejshelperHostConnect);
					
					this.socket.on('connect', this.onConnected);
					this.socket.on('newmessage', this.onMessage);
					this.socket.on('syncforce', this.syncForce);
					this.socket.on('usertyping', this.usertyping);
					this.socket.on('operatortyping', this.operatortyping);
					this.socket.on('userleftchat', this.userleftchat);
					this.socket.on('userjoined', this.userleftchat);
								
					// Disable standard sync method
					// We will use node JS notifications
					clearTimeout(lhinst.userTimeout);
				},
				
				syncForce : function(chat_id) {
					if (lhinst.chat_id == chat_id) {
						nodejshelper.operatorForced = true;
						lhinst.syncusercall();
					} else {
						lhinst.syncadmincall();
					}
				},
				
				onMessage : function(messageData) {	
					if (lhinst.chat_id) {
						lhinst.updateUserSyncInterface(lhinst,messageData.data);			
						clearTimeout(lhinst.userTimeout);	
					} else {
						lhinst.syncadmincall();
					}
				},
				
				onConnected : function() {			
					if (lhinst.chat_id > 0) {
						nodejshelper.socket.emit('join',lhinst.chat_id);
					};
					console.log('connected');
				},
				
				usertyping : function(data) {
					if (data.status == false) {
						$('#user-is-typing-'+data.chat_id).fadeOut();
					} else {
						lhinst.syncadmincall();
					}
				},
					
				operatortyping : function(data) {
					if (lhinst.chat_id == data.chat_id) {
						if (data.status == false) {
							$('#id-operator-typing').fadeOut();
						} else {
							lhinst.syncusercall();
						}
					}
				},
				
				addmsgadmin : function(chat_id) {
					nodejshelper.socket.emit('syncforce',chat_id);
				},
				
				userleftchat : function(chat_id) {
					lhinst.syncadmincall();
				},
				
				// Disable user timeout message
				syncusercall : function(inst,data) {
					clearTimeout(inst.userTimeout);	
					if (nodejshelper.operatorForced == false){
						nodejshelper.socket.emit('newmessage',{chat_id:inst.chat_id,data:data});
					};
					nodejshelper.operatorForced = false;
				},
						
				addSynchroChat : function(chat_id,message_id) {
					nodejshelper.socket.emit('join',chat_id);
				},
				
				removeSynchroChat : function(chat_id) {
					nodejshelper.socket.emit('leave',chat_id);
				},	
				
				syncadmincall : function(inst,data) {
					clearTimeout(inst.userTimeout);	
				},
				
				initTypingMonitoringUser : function(chat_id,status) {
					nodejshelper.socket.emit('usertyping',{chat_id:chat_id,status:status});
				},				
				
				initTypingMonitoringAdmin : function(chat_id,status) {
					nodejshelper.socket.emit('operatortyping',{chat_id:chat_id,status:status});
				},				
				
				userleftchatNotification : function(chat_id) {
					nodejshelper.socket.emit('userleftchat',chat_id);
				}				
				
		};

		nodejshelper.init();

		LHCCallbacks.syncadmincall = nodejshelper.syncadmincall;
		LHCCallbacks.syncusercall = nodejshelper.syncusercall;
		LHCCallbacks.addmsgadmin = nodejshelper.addmsgadmin;
		LHCCallbacks.addSynchroChat = nodejshelper.addSynchroChat;
		LHCCallbacks.removeSynchroChat = nodejshelper.removeSynchroChat;
		LHCCallbacks.initTypingMonitoringUser = nodejshelper.initTypingMonitoringUser;
		LHCCallbacks.initTypingMonitoringAdmin = nodejshelper.initTypingMonitoringAdmin;
		LHCCallbacks.userleftchatNotification = nodejshelper.userleftchatNotification;
	} else {		
		setTimeout(function(){
			$('#CSChatMessage').attr('placeholder','Your browser does not support WebSockets, please upgrade.');
			$('#CSChatMessage').val('Your browser does not support WebSockets, please upgrade.');
			$('#CSChatMessage').attr('title','Your browser does not support WebSockets, please upgrade.');
			$('#CSChatMessage').attr('readonly','readonly');			
		},2000);
	};

})(jQuery);