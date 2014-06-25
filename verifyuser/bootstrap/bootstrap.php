<?php 

class erLhcoreClassExtensionVerifyuser {

	public function __construct() {
		
	}
	
	public function run(){		
		
		$dispatcher = erLhcoreClassChatEventDispatcher::getInstance();
		
		// Attatch event listeners
		$dispatcher->listen('chat.validate_start_chat',array($this,'verifyUser'));							
	}
	
	/**
	 * Arguments
	 * array('errors' => & $Errors, 'input_form' => & $inputForm, 'start_data_fields' => & $start_data_fields, 'chat' => & $chat, 'additional_params' => & $additionalParams)
	 * */
	public function verifyUser($params) {
	
		/*
		 * That's how you can access additional argument in this case it's just "Bet ID"
		$dataArray = json_decode($params['chat']->additional_data,true);
		$betID = 0;		
		if (is_array($dataArray)){
			foreach ($dataArray as $paramAdditional){
				if ($paramAdditional['key'] == 'Bet ID'){
					$betID = $paramAdditional['value'];
				}
			}
		}
		
		if bet exists you can do there or whatever		
		*/
		
		/**
		 * That's how we can take filled e-mail
		 * $params['chat']->email
		 * 
		 * // Here is some api to execute query
		 * $db = ezcDbInstance::get();
		 * $stmt = $db->prepare('SELECT count(*) FROM some_other_table WHERE email = :email');
		 * $stmt->bindValue(':email',$params['chat']->email);
		 * $stmt->execute();
		 * $stmt->fetchColumn() == 0;
		 * */
		
		// Here is how to append error
		// $params['errors'][] = 'My custom error - '.$betID.' - '.$params['chat']->email;
	}

}


