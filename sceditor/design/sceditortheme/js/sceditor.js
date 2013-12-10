// default sceditor
$.sceditor.defaultOptions.height = 67;
$.sceditor.defaultOptions.style = '/extension/sceditor/design/sceditortheme/css/sceditor.default.css';
$.sceditor.defaultOptions.emoticonsRoot = '/extension/sceditor/design/sceditortheme/images/smileys/';
$.sceditor.defaultOptions.emoticons = { //Refer : http://messenger.yahoo.com/features/emoticons/, must sync with lhbbcode.php, exclude: >, <, ",/,\,^
			dropdown: {
				":)" : "1.gif",
				":(" : "2.gif",
				";)" : "3.gif",
				":D" : "4.gif",
				";;)" : "5.gif",
				":-/" : "7.gif",
				":x" : "8.gif",
				':-$' : "32.gif",
				":P" : "10.gif",
				":-*" : "11.gif",
				"=((" : "12.gif",
				":-O" : "13.gif",
				":v" : "15.gif",
				"B-)" : "16.gif",
				":-S" : "17.gif",
				"v:)" : "19.gif",
				":[[" : "20.gif",
				":]]" : "21.gif",
				":|" : "22.gif",
				"(:|" : "37.gif",
				"=D" : "41.gif",
				":-w" : "45.gif",
				"/:)" : "23.gif",
				"@-)" : "43.gif",
				":-h" : "103.gif",
				"=))" : "24.gif",
				":-b" : "100.gif",
				":-c" : "101.gif",
			},
			hidden: {
				"B)" : "26.gif",
				"#:-S" : "18.gif",
				">:D<" : "6.gif",
				"X(" : "14.gif",
				"O:-)" : "25.gif",
				":!!" : "110.gif",
				":-v" : "111.gif",
				":-q" : "112.gif",
				":-d" : "113.gif",
				":-e" : "cheer.gif",
				"@_@" : "studying.gif",
				"~X(" : "102.gif",
				
			}
        };

// override jh function send message
lhinst.initTypingMonitoringUser = function(chat_id){
    var www_dir = this.wwwDir;
    var inst = this;
    
    $('#CSChatMessage').data('sceditor').bind('keyup', function (evt){
        if (evt.which === 13) {
            var msg = $('#CSChatMessage').data('sceditor').getWysiwygEditorValue();
            clearTimeout(inst.typing_timeout);
            inst.is_typing == false;
            $('#CSChatMessage').val(msg);
            inst.addmsguser();
            $('#CSChatMessage').data('sceditor').val('');
            evt.preventDefault();
        }
        else {
            var msg = $('#CSChatMessage').data('sceditor').getBody().text();
            if (inst.is_typing == false) {
                inst.is_typing = true;
                clearTimeout(inst.typing_timeout);
                inst.userTypingStart = new Date();
                $.postJSON(www_dir + 'chat/usertyping/' + chat_id+'/'+inst.hash+'/true',{msg:msg}, function(data){
                   inst.typing_timeout = setTimeout(function(){inst.typingStoppedUser(chat_id);},3000);
                }).fail(function(){
                	inst.typing_timeout = setTimeout(function(){inst.typingStoppedUser(chat_id);},3000);
                });
            } else {
                 clearTimeout(inst.typing_timeout);
                 if (inst.currentMessageText != msg ) {
                    var end = new Date();
                    var time = end - lhinst.userTypingStart; 
                    if ( time > 3000) {
                        inst.currentMessageText = msg;
                        inst.userTypingStart = end;
                        $.postJSON(www_dir + 'chat/usertyping/' + chat_id+'/'+inst.hash+'/true',{msg:msg}, function(data){
                            inst.typing_timeout = setTimeout(function(){inst.typingStoppedUser(chat_id);},3000);
                        });
                    }
                }
            }
        }
    });
};

lhinst.sceditor_SendOperatorMsg = function(chat_id) {
    var msg = $('#CSChatMessage-'+chat_id).data('sceditor').getWysiwygEditorValue();
    clearTimeout(lhinst.typing_timeout);
    lhinst.is_typing = false;
    $('#CSChatMessage-'+chat_id).val(msg);
    lhinst.addmsgadmin(chat_id);
    $('#CSChatMessage-'+chat_id).data('sceditor').val('');
};

lhinst.initTypingMonitoringAdmin = function(chat_id) {

    var www_dir = this.wwwDir;
    var inst = this;

    $('#CSChatMessage-'+chat_id).data('sceditor').bind('keyup', function (evt){
        if (evt.which == 13) {
            lhinst.sceditor_SendOperatorMsg(chat_id);
            evt.preventDefault();
        }   
        else {     
            var msg = $('#CSChatMessage-'+chat_id).data('sceditor').getBody().text();
            if (inst.is_typing == false) {
                inst.is_typing = true;
                clearTimeout(inst.typing_timeout);
                $.getJSON(www_dir + 'chat/operatortyping/' + chat_id+'/true',{ }, function(data){
                   inst.typing_timeout = setTimeout(function(){inst.typingStoppedOperator(chat_id);},3000);
                }).fail(function(){
                	inst.typing_timeout = setTimeout(function(){inst.typingStoppedOperator(chat_id);},3000);
                });
            } else {
                 clearTimeout(inst.typing_timeout);
                 inst.typing_timeout = setTimeout(function(){inst.typingStoppedOperator(chat_id);},3000);
            }
        }
    });
};

this.typingStoppedOperator = function(chat_id) {
    var inst = this;
    if (inst.is_typing == true){
        $.getJSON(this.wwwDir + 'chat/operatortyping/' + chat_id+'/false',{ }, function(data){
            inst.is_typing = false;
        }).fail(function(){
        	inst.is_typing = false;
        });
    }
};

// inherit lh function close tab to destroy sceditor
lhinst.scEditor_closeActiveChatDialog =  lhinst.closeActiveChatDialog;
lhinst.scEditor_removeDialogTab = lhinst.removeDialogTab;
lhinst.scEditor_deleteChat = lhinst.deleteChat;
lhinst.scEditor_reopenchat = lhinst.reopenchat;

lhinst.destroySCEditor = function (chat_id) {
    var txt = $('#CSChatMessage-'+chat_id);
    if (!txt || txt.length==0) return;
    var editor = txt.data('sceditor');
    if (!editor) return;
    editor.destroy();
};

lhinst.closeActiveChatDialog = function(chat_id, tabs, hidetab) {
    lhinst.destroySCEditor(chat_id);
    lhinst.scEditor_closeActiveChatDialog(chat_id, tabs, hidetab);
};

lhinst.removeDialogTab = function(chat_id, tabs, hidetab) {
    lhinst.destroySCEditor(chat_id);
    lhinst.scEditor_removeDialogTab(chat_id, tabs, hidetab);
};

lhinst.deleteChat = function(chat_id, tabs, hidetab) {
    lhinst.destroySCEditor(chat_id);
    lhinst.scEditor_deleteChat(chat_id, tabs, hidetab);
};

lhinst.reopenchat = function(inst) {
    $('#CSChatMessage-'+inst.attr('data-id')).data('sceditor').readOnly(false).focus();
    
    lhinst.scEditor_reopenchat(inst);
};