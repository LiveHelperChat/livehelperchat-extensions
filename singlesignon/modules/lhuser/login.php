<?php

$currentUser = erLhcoreClassUser::instance();

$instance = erLhcoreClassSystem::instance();

if ($instance->SiteAccess != 'site_admin') {

	if ($currentUser->isLogged() && !empty($Params['user_parameters_unordered']['r'])) {		
		header('Location: ' .erLhcoreClassDesign::baseurldirect('site_admin').'/'.base64_decode(rawurldecode($Params['user_parameters_unordered']['r'])));		
		exit;
	}

	$redirect = rawurldecode($Params['user_parameters_unordered']['r']);
	$redirectFull = $redirect != '' ? '/(r)/'.rawurlencode($redirect) : '';

    header('Location: ' .erLhcoreClassDesign::baseurldirect('site_admin/user/login').$redirectFull );
    exit;
} 
  
if (!$currentUser->isLogged()){
      
    $settings = include ('extension/singlesignon/settings/settings.ini.php');    
    include($settings['sso_location']);
    
    try {
        $as = new SimpleSAML_Auth_Simple('default-sp');
        $as->requireAuth();     
        erLhcoreClassSingleSignOn::loginBySSO($as->getAttributes());    
        
        if (!empty($Params['user_parameters_unordered']['r'])) {
            header('Location: ' .erLhcoreClassDesign::baseurldirect('site_admin').'/'.base64_decode(rawurldecode($Params['user_parameters_unordered']['r'])));
            exit;
        }
        
        header('Location: ' .erLhcoreClassDesign::baseurldirect('site_admin'));
        exit;
        
    } catch (Exception $e) {
        
        $tpl = erLhcoreClassTemplate::getInstance( 'lhkernel/validation_error.tpl.php');
        $tpl->set('errors',array($e->getMessage()));
        
        $Result['content'] = $tpl->fetch();
        $Result['pagelayout'] = 'login';      
        return $Result;
    }   
    
} else {
    if (!empty($Params['user_parameters_unordered']['r'])) {
        header('Location: ' .erLhcoreClassDesign::baseurldirect('site_admin').'/'.base64_decode(rawurldecode($Params['user_parameters_unordered']['r'])));
        exit;
    }
    
    header('Location: ' .erLhcoreClassDesign::baseurldirect('site_admin'));
    exit;
}
