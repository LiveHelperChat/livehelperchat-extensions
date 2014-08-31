<?php 

class erLhcoreClassExtensionSevabot {

	public function __construct() {
		
	}
	 
	public function run() {		
		
		$dispatcher = erLhcoreClassChatEventDispatcher::getInstance();
		
		// Attatch event listeners
		$dispatcher->listen('chat.chat_started',array($this,'sevabot'));
	}
		
	/**
	 * Arguments
	 * array('chat' => & $chat)
	 * */
	public function sevabot($params) {

		$settings = include 'extension/sevabot/settings/settings.ini.php';
		
		// Format message content
		$chat = $params['chat'];
		
		$messages = array_reverse(erLhcoreClassModelmsg::getList(array('limit' => 5,'sort' => 'id DESC','filter' => array('chat_id' => $chat->id))));
		$messagesContent = '';
		
		foreach ($messages as $msg) {
			if ($msg->user_id == -1) {
				$messagesContent .= date(erLhcoreClassModule::$dateDateHourFormat,$msg->time).' '. erTranslationClassLhTranslation::getInstance()->getTranslation('chat/syncadmin','System assistant').': '.htmlspecialchars($msg->msg)."\n";
			} else {
				$messagesContent .= date(erLhcoreClassModule::$dateDateHourFormat,$msg->time).' '. ($msg->user_id == 0 ? htmlspecialchars($chat->nick) : htmlspecialchars($msg->name_support)).': '.htmlspecialchars($msg->msg)."\n";
			}
		}
		
		$cfgSite = erConfigClassLhConfig::getInstance();
		$secretHash = $cfgSite->getSetting( 'site', 'secrethash' );
		
		$chatDataItems = $settings['chat'];
		
		if (isset($settings['chat_dep'][$chat->dep_id]) && !empty($settings['chat_dep'][$chat->dep_id])){
			$chatDataItems = array_merge($chatDataItems,$settings['chat_dep'][$chat->dep_id]);			
		}
		
		// Global notifications
		foreach ($chatDataItems as $chatData) {
								
			$veryfyEmail = 	sha1(sha1($chatData['email'].$secretHash).$secretHash);
			$msgParsed = str_replace(array('{messages}','{url_accept}','{chat_id}','{user_name}'), array($messagesContent, erLhcoreClassXMP::getBaseHost() . $_SERVER['HTTP_HOST'] . erLhcoreClassDesign::baseurl('chat/accept').'/'.erLhcoreClassModelChatAccept::generateAcceptLink($chat).'/'.$veryfyEmail.'/'.$chatData['email'], $chat->id, $chat->user_name), $settings['msg']);
			
			$md5 = md5($chatData['chat_id'] . $msgParsed . $settings['sevabot_secret']);
			
			$ch = curl_init();
			curl_setopt($ch, CURLOPT_URL, $settings['url']);
			curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
			curl_setopt($ch, CURLOPT_TIMEOUT, 5);
			curl_setopt($ch, CURLOPT_POST, true);
			curl_setopt($ch, CURLOPT_POSTFIELDS,array('md5' => $md5, 'msg'=> $msgParsed, 'chat' => $chatData['chat_id']));
			curl_setopt($ch, CURLOPT_CONNECTTIMEOUT , 5);
			curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
			curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
			@curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true); // Some hostings produces wargning...
			$content = curl_exec($ch);
						
			if ($content != 'OK') {				
				erLhcoreClassLog::write(print_r($content,true));				
			}
		}
				
	}

}


