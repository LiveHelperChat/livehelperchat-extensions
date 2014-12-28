<?php

class erLhcoreClassSingleSignOn {	
	public static function loginBySSO($params) {		
		$settings = include ('extension/singlesignon/settings/settings.ini.php');
		
		// Try to find operator by our logins
		if (isset($params[$settings['attr_map']['username']][0]))
		{
		    $username = $params[$settings['attr_map']['username']][0];
		  		    
		    if (erLhcoreClassModelUser::userExists($username)){		        
		        $user = array_shift(erLhcoreClassModelUser::getUserList(array('limit' => 1,'filter' => array('username'))));
		        erLhcoreClassUser::instance()->setLoggedUser($user->id);
		    } else {
		        $user = new erLhcoreClassModelUser();
		        foreach ($settings['attr_map'] as $attr => $ssoAttr)
		        {
		            $user->$attr = $params[$settings['attr_map'][$attr]][0];
		        }
		        
		        foreach ($settings['default_attributes'] as $attr => $value) {
		            $user->$attr = $value;
		        }
		        
		        $user->password = sha1(erLhcoreClassModelForgotPassword::randomPassword().rand(0, 1000).microtime());
		        
		        $user->saveThis();
		         
		        // Set that users sees all pending chats
		        erLhcoreClassModelUserSetting::setSetting('show_all_pending',1,$user->id);
 
		        // Set default departments
		        erLhcoreClassUserDep::addUserDepartaments($settings['default_departments'],$user->id,$user);
		         
		        // Cleanup if previously existed
		        erLhcoreClassModelGroupUser::removeUserFromGroups($user->id);
		        
		        // Assign user to default group
		        foreach ($settings['default_user_groups'] as $group_id) {
		            $groupUser = new erLhcoreClassModelGroupUser();
		            $groupUser->group_id = $group_id;
		            $groupUser->user_id = $user->id;
		            $groupUser->saveThis();
		        }		        
		        
		        erLhcoreClassUser::instance()->setLoggedUser($user->id);		        		        
		    }

		    return true;

		} else {
		    throw new Exception('Username field not found');
		}	
	}    
}


?>