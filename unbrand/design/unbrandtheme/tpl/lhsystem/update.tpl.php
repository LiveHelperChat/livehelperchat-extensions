<h1><?php echo erTranslationClassLhTranslation::getInstance()->getTranslation('system/timezone','Live Support update');?></h1>

<?php if (isset($updated) && $updated == 'done') : $msg = erTranslationClassLhTranslation::getInstance()->getTranslation('system/smtp','Settings updated'); ?>
	<?php include(erLhcoreClassDesign::designtpl('lhkernel/alert_success.tpl.php'));?>
<?php endif; ?>

<div class="row">
	<div class="columns small-6">
		<h3><?php echo erTranslationClassLhTranslation::getInstance()->getTranslation('system/update','Your version')?> - <?php echo erLhcoreClassUpdate::LHC_RELEASE/100;?></h3>
		<h4><?php echo erTranslationClassLhTranslation::getInstance()->getTranslation('system/update','Last database update')?> - update_<?php echo erLhcoreClassUpdate::DB_VERSION?>.sql</h4>		
	</div>
	<div class="columns small-6">
		<div id="database-status"></div>
	</div>
</div>