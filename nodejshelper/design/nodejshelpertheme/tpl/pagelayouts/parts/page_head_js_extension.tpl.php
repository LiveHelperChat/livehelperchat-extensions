<?php 
	$nodeJsHelperSettings = array (
		'prefix' => 'http://',
		'host' => 'localhost',
		'port' => '31129',
	);
if ( (isset($Result['is_sync_required']) && $Result['is_sync_required'] === true) || erLhcoreClassSystem::instance()->SiteAccess == 'site_admin' ) : ?>
<script>
var nodejshelperHostConnect = '<?php echo $nodeJsHelperSettings['host']?>:<?php echo $nodeJsHelperSettings['port']?>';
</script>
<script src="<?php echo $nodeJsHelperSettings['prefix'],$nodeJsHelperSettings['host']?>:<?php echo $nodeJsHelperSettings['port']?>/socket.io/socket.io.js"></script>
<script type="text/javascript" language="javascript" src="<?php echo erLhcoreClassDesign::designJS('js/customjs.js');?>"></script>
<?php endif; ?>