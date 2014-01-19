<?php 
	$nodeJsHelperSettings = array (
		'prefix' => 'http://',
		'host' => 'localhost',
		'port' => '31129',
	);
?>
<script>
var nodejshelperHostConnect = '<?php echo $nodeJsHelperSettings['host']?>:<?php echo $nodeJsHelperSettings['port']?>';
</script>
<script src="<?php echo $nodeJsHelperSettings['prefix'],$nodeJsHelperSettings['host']?>:<?php echo $nodeJsHelperSettings['port']?>/socket.io/socket.io.js"></script>
<script type="text/javascript" language="javascript" src="<?php echo erLhcoreClassDesign::designJS('js/customjs.js');?>"></script>