<?php 

return array(
	// These users receives all notifications
	'chat' => array (
				/*array ( // You can provide more than one recipient
					'chat_id' => '681ee798fdc73f5b384f06db875fd599', // Sevabot chat ID
					'email' => 'remdex@gmail.com'					 // LHC user e-mail
				)*/
	), 
		
	// These users receives notifications by department id
	'chat_dep' => array (
				/* 4 => array ( // Department ID
						array (
							'chat_id' => '681ee798fdc73f5b384f06db875fd599', // Sevabot chat ID
							'email' => 'remdex@gmail.com'					 // LHC user e-mail
						)
				) */
		),	
			
	// Message template
	'msg' => 
"New chat request [{chat_id}]
{messages}
Click to accept a chat
{url_accept}", 
		
	// Sevabot secret word
	'sevabot_secret' => '',
		
	// Where sevabot is installed, E.g http://127.0.0.1:5000/msg/
	'url' => 'http://127.0.0.1:5000/msg/'
		
);

?>