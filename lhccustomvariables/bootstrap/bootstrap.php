<?php

class erLhcoreClassExtensionLhccustomvariables
{

    public function __construct()
    {

    }

    public function run()
    {
        $dispatcher = erLhcoreClassChatEventDispatcher::getInstance();

        // Custom variable for the chat
        $dispatcher->listen('chat.dynamic_array', array(
            $this,
            'dynamicArray'
        ));

        // Custom variable for the msg object
        $dispatcher->listen('chat.dynamic_array_msg', array(
            $this,
            'dynamicArrayMsg'
        ));

    }

    public function dynamicArrayMsg($params)
    {
        // $params['msg'] present msg objects
        $params['dynamic_array']['number_of_words'] = count(explode(' ', $params['msg']->msg)); // {args.msg.msg_dynamic_array.number_of_words}
    }

    // Listener in the same class
    public function dynamicArray($params)
    {
        // $params['chat'] present chat objects
        $params['dynamic_array']['player_class'] = 'dummy'; // {args.chat.chat_dynamic_array.player_class}
    }


}


