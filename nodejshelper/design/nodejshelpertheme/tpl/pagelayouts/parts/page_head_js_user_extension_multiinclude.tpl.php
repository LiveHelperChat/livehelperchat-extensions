<?php include_once(erLhcoreClassDesign::designtpl('pagelayouts/parts/nodejshelper_config.tpl.php'));?>
<?php if ( (isset($Result['is_sync_required']) && $Result['is_sync_required'] === true) || erLhcoreClassSystem::instance()->SiteAccess == 'site_admin' ) : ?>
<script>
var nodejshelperHostConnect = '<?php echo $nodeJsHelperSettings['host']?>:<?php echo $nodeJsHelperSettings['port']?>';
var nodejshelperConfig = {secure:<?php echo $nodeJsHelperSettings['secure'] == true ? 'true' : 'false' ?>,'typer':'','sync':<?php echo (isset($Result['chat']) && $Result['chat']->status == erLhcoreClassModelChat::STATUS_PENDING_CHAT) ? 'true' : 'false'?>,'synctimeout':5};
<?php if (erLhcoreClassSystem::instance()->SiteAccess == 'site_admin' && erLhcoreClassUser::instance()->isLogged()) : 
$currentUser = erLhcoreClassUser::instance();
$userData = $currentUser->getUserData(true); ?>
nodejshelperConfig.typer = '<?php echo htmlspecialchars($userData->name_support,ENT_QUOTES);?> <?php echo erTranslationClassLhTranslation::getInstance()->getTranslation('chat/chat','is typing now...')?>';
<?php endif;?>
</script>
<script src="<?php echo $nodeJsHelperSettings['prefix'],$nodeJsHelperSettings['host']?>:<?php echo $nodeJsHelperSettings['port']?>/socket.io/socket.io.js"></script>
<script type="text/javascript" language="javascript" src="<?php echo erLhcoreClassDesign::designJS('js/customjs.js');?>"></script>
<?php endif; ?>