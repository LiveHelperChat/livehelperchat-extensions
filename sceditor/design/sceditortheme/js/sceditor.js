lhinst.closeActiveChatDialog = function(chat_id, tabs, hidetab)
{
    $.ajax({
        type: "POST",
        url: this.wwwDir + this.closechatadmin + chat_id,
        async: false
    });

    if ($('#CSChatMessage-'+chat_id).length != 0){
        $('#CSChatMessage-'+chat_id).data("sceditor").destroy();
       //$('#CSChatMessage-'+chat_id).unbind('keyup', 'enter', function(){});
    };

    if (hidetab == true) {

        var index = tabs.find(' > section.active').index();
        tabs.find(' > section.active').remove();
        tabs.find(' > section:eq(' + (index - 1) + ')').addClass("active");

        $(document).foundation('section', 'resize');

        if (this.closeWindowOnChatCloseDelete == true)
        {
            window.close();
        }

    };

    this.removeSynchroChat(chat_id);
    this.syncadmininterfacestatic();
};


lhinst.removeDialogTab = function(chat_id, tabs, hidetab)
{
    if ($('#CSChatMessage-'+chat_id).length != 0){
        $('#CSChatMessage-'+chat_id).data("sceditor").destroy();
       //$('#CSChatMessage-'+chat_id).unbind('keyup', 'enter', function(){});
    }

    if (hidetab == true) {

        $.ajax({
            type: "GET",
            url: this.wwwDir + 'chat/adminleftchat/' + chat_id,
            async: true
        });

        var index = tabs.find(' > section.active').index();
        tabs.find(' > section.active').remove();
        tabs.find(' > section:eq(' + (index - 1) + ')').addClass("active");


        $(document).foundation('section', 'resize');

        if (this.closeWindowOnChatCloseDelete == true)
        {
            window.close();
        };
    };

    this.removeSynchroChat(chat_id);
    this.syncadmininterfacestatic();
};

lhinst.deleteChat = function(chat_id, tabs, hidetab)
{
    if ($('#CSChatMessage-'+chat_id).length != 0){
        $('#CSChatMessage-'+chat_id).data("sceditor").destroy();
       //$('#CSChatMessage-'+chat_id).unbind('keyup', 'enter', function(){});
    }

    $.postJSON(this.wwwDir + this.deletechatadmin + chat_id ,{}, function(data){
       if (data.error == 'true')
       {
           alert(data.result);
       }
    });

     if (hidetab == true) {

        // Remove active tab
        var index = tabs.find(' > section.active').index();
        tabs.find(' > section.active').remove();
        tabs.find(' > section:eq(' + (index - 1) + ')').addClass("active");

        $(document).foundation('section', 'resize');


        if (this.closeWindowOnChatCloseDelete == true)
        {
            window.close();
        }
    };

    this.syncadmininterfacestatic();
    this.removeSynchroChat(chat_id);
};