<?php 

return array( 
		'sso_location' => '../../simplesamlphp/lib/_autoload.php',
		'post_host' => 'http://exmaple.com/chatclosehandler.php',
        'attr_map' => array(   
            'email'     => 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn',
            'username'  => 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/upn',
            'name'      => 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname',
            'surname'   => 'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/surname'         
        ), 
        'default_attributes' => array(
            'all_departments' => 1
        ),
        'default_departments' => array(
            0
        ),
        'default_user_groups' => array(
            1
        )
); 
            
?>