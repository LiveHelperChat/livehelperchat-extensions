(function($){	
		var nodejshelper = {

				operatorForced : false,	
					
				socket : null, 
				
				intervalSyncTimeout : null,
				chatActivated : false,
				
				init : function(){
					this.socket = io.connect(nodejshelperHostConnect,{secure:nodejshelperConfig.secure});
					
					this.socket.on('connect', this.onConnected);
					this.socket.on('newmessage', this.onMessage);
					this.socket.on('syncforce', this.syncForce);
					this.socket.on('usertyping', this.usertyping);
					this.socket.on('operatortyping', this.operatortyping);
					this.socket.on('userleftchat', this.userleftchat);
					this.socket.on('userjoined', this.userjoined);
					this.socket.on('addfileupload', this.syncForce);
					this.socket.on('addfileuserupload', this.syncForce);
					this.socket.on('userpostedmessage', this.userpostedmessage);
					this.socket.on('userstartedpostmessage', this.userstartedpostmessage);
					
					// Disable standard sync method
					// We will use node JS notifications
					clearTimeout(lhinst.userTimeout);
					
					// Required to workflow to work correctly
					this.setupForceTimeout();
					
				},
				
				setupForceTimeout : function() {	
					clearTimeout(this.intervalSyncTimeout);
					if (nodejshelperConfig.sync == true && this.chatActivated == false) {
						this.intervalSyncTimeout = setTimeout(function(){
							nodejshelper.operatorForced = true;
							lhinst.syncusercall();
						}, nodejshelperConfig.synctimeout*1000);
					}
				},
				
				syncForce : function(chat_id) {
					if (lhinst.chat_id == chat_id) {
						nodejshelper.operatorForced = true;
						lhinst.syncusercall();
						nodejshelper.chatActivated = true;
					} else {
						lhinst.syncadmincall();
					}
				},
				
				onMessage : function(messageData) {	
					if (lhinst.chat_id) {
						
						if (typeof messageData.data.data !== 'undefined') {	
							if ($('#messagesBlock').find('.usr-tit').size() > 0 && $('#messagesBlock').find('.usr-tit').last().attr('data-sender') == messageData.data.data.sender){
								messageData.data.result = messageData.data.data.ur;							
							} else {
								messageData.data.result = messageData.data.data.or;
							}
							
							messageData.data.uw = 'false';
							messageData.data.blocked = 'false';
							messageData.data.status = 'true';
							messageData.data.ott = '';
							messageData.data.op = '';
							messageData.data.error = 'false';
							messageData.data.message_id = messageData.data.data.id;
																				
							lhinst.updateUserSyncInterface(lhinst,messageData.data);
						};	
						clearTimeout(lhinst.userTimeout);	
					} else {
						lhinst.syncadmincall();
					}
				},
				
				onConnected : function() {
				
					if (lhinst.chat_id > 0) {
						nodejshelper.socket.emit('join',lhinst.chat_id);
					};
				},
				
				usertyping : function(data) {
					if (data.status == false) {
						$('#user-is-typing-'+data.chat_id).fadeOut();
					} else {
						$('#user-is-typing-'+data.chat_id).fadeIn().text(data.msg);
					}
				},
					
				operatortyping : function(data) {
					if (lhinst.chat_id == data.chat_id) {
						if (data.status == false) {
							setTimeout(function(){
								$('#id-operator-typing').fadeOut();
							},1000);							
						} else {
							$('#id-operator-typing').fadeIn().text(data.msg);
						}
					}
				},
				
				syncforceaction : function(chat_id) {
					nodejshelper.socket.emit('syncforce',chat_id);
				},
				
				userleftchat : function(chat_id) {					
					lhinst.syncadmincall();
				},
				
				userjoined : function(chat_id) {	
					setTimeout(function(){
						lhinst.syncadmincall();
					},4000);
				},
				
				addmsguser : function(inst) {
					nodejshelper.socket.emit('userpostedmessage',{chat_id:inst.chat_id});
				},

				addmsguserbefore : function(inst) {
					nodejshelper.socket.emit('userstartedpostmessage',{chat_id:inst.chat_id});
				},
				
				userpostedmessage : function() {					
					lhinst.syncadmincall();
				},
				
				userstartedpostmessage : function() {
					setTimeout( function() {
						lhinst.syncadmincall();
					},5000);// Give 5 seconds for user message to be stored in database
				},
				
				// Disable user timeout message
				syncusercall : function(inst,data) {
					clearTimeout(inst.userTimeout);						
					nodejshelper.setupForceTimeout();
					if (nodejshelper.operatorForced == false){
						nodejshelper.socket.emit('newmessage',{chat_id:inst.chat_id,data:data});
					};
					nodejshelper.operatorForced = false;
				},
					
				addmsguserchatbox : function(inst,data) {
					nodejshelper.operatorForced = true;
					nodejshelper.socket.emit('newmessage',{chat_id:inst.chat_id,data:data});
					return false;
				},
				
				addSynchroChat : function(chat_id,message_id) {					
					if (nodejshelper.socket) {
						nodejshelper.socket.emit('join',chat_id);
					} else {
						setTimeout(function(){
							nodejshelper.socket.emit('join',chat_id);
						},1000);
					}
				},
				
				removeSynchroChat : function(chat_id) {
					nodejshelper.socket.emit('leave',chat_id);
				},	
				
				syncadmincall : function(inst,data) {
					clearTimeout(inst.userTimeout);	
				},
				
				userleftchatNotification : function(chat_id) {
					if (nodejshelper.socket) {
						nodejshelper.socket.emit('userleftchat',chat_id);
					}
				},
				
				addFileUserUpload : function(chat_id) {
					nodejshelper.socket.emit('syncforce',chat_id);
					lhinst.syncusercall();
				},
				
				addFileUpload : function(chat_id) {
					nodejshelper.socket.emit('syncforce',chat_id);
					lhinst.syncadmincall();
				},
				
				addRemoteCommand : function(chat_id) {
					nodejshelper.socket.emit('syncforce',chat_id);					
				},
								
				typingStoppedUserInform : function(data) {					
					nodejshelper.socket.emit('usertyping',data);
				},
				
				initTypingMonitoringUserInform : function(data) {
					nodejshelper.socket.emit('usertyping',data);
				},
				
				initTypingMonitoringAdminInform : function(data) {
					data.msg = nodejshelperConfig.typer;
					nodejshelper.socket.emit('operatortyping',data);
				},
				
				typingStoppedOperatorInform : function(data) {
					nodejshelper.socket.emit('operatortyping',data);
				}			
				
				
		};

		// Give half second for standard script to finish their job
		setTimeout(function(){
			nodejshelper.init();
		},500);
		
		LHCCallbacks.syncadmincall = nodejshelper.syncadmincall;
		LHCCallbacks.syncusercall = nodejshelper.syncusercall;
		LHCCallbacks.addmsgadmin = nodejshelper.syncforceaction;
		LHCCallbacks.addmsguserchatbox = nodejshelper.addmsguserchatbox;
		LHCCallbacks.addSynchroChat = nodejshelper.addSynchroChat;
		LHCCallbacks.removeSynchroChat = nodejshelper.removeSynchroChat;
		LHCCallbacks.initTypingMonitoringAdmin = nodejshelper.initTypingMonitoringAdmin;
		LHCCallbacks.userleftchatNotification = nodejshelper.userleftchatNotification;
		LHCCallbacks.addFileUserUpload = nodejshelper.addFileUserUpload;
		LHCCallbacks.addFileUpload = nodejshelper.addFileUpload;		
		LHCCallbacks.typingStoppedUserInform = nodejshelper.typingStoppedUserInform;
		LHCCallbacks.initTypingMonitoringUserInform = nodejshelper.initTypingMonitoringUserInform;
		LHCCallbacks.initTypingMonitoringAdminInform = nodejshelper.initTypingMonitoringAdminInform;
		LHCCallbacks.typingStoppedOperatorInform = nodejshelper.typingStoppedOperatorInform;
		LHCCallbacks.operatorAcceptedTransfer = nodejshelper.syncforceaction;
		LHCCallbacks.uservoted = nodejshelper.syncforceaction;
		LHCCallbacks.addRemoteCommand = nodejshelper.addRemoteCommand;
		LHCCallbacks.addmsguser = nodejshelper.addmsguser;
		LHCCallbacks.addmsguserbefore = nodejshelper.addmsguserbefore;
		
		// Additional options
		lhinst.appendSyncArgument = '/(render)/true';

})(jQuery);