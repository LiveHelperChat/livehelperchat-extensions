Explains
extension/singlesignon/doc/readme.txt

1. All extension settings are extension/singlesignon/setting/settings.ini.php

2. It logins user if it exists if not creates it and logins it.

3. As for chat export during close
This data will be send to your provided url in 
/*
 * @example post data to provided url
 * Array
 * (
 * [chat_data] => {"chat":{"id":"7","nick":"George","status":2,"status_sub":"0","time":"1418914743","user_id":"4","hash":"665f613b2aca4b518c1741453ea7c112a8bc6d62","ip":"207.253.63.143","referrer":"\/\/www.baselinetelematics.com\/","dep_id":"1","email":"","user_status":"2","support_informed":"1","country_code":"ca","country_name":"Canada","phone":"","user_typing":"1418915051","user_typing_txt":"","operator_typing":"0","has_unread_messages":"0","last_user_msg_time":1419612692,"last_msg_id":"55","mail_send":"0","lat":"46.85","lon":"-71.1833","city":"Beauport, Quebec","additional_data":"","session_referrer":"","wait_time":"84","chat_duration":"224","priority":"0","online_user_id":"2","transfer_if_na":"0","transfer_timeout_ts":"0","transfer_timeout_ac":"0","wait_timeout":"0","wait_timeout_send":"0","timeout_message":"","user_tz_identifier":"America\/New_York","na_cb_executed":"0","nc_cb_executed":"1","fbst":"0","operator_typing_id":"0","chat_initiator":"0","chat_variables":"","remarks":"","operation":"","operation_admin":"","screenshot_id":"0","unread_messages_informed":"0","reinform_timeout":"0","tslasign":"0","updateIgnoreColumns":[]},"msg":{"50":{"id":"50","time":"1418914743","chat_id":"7","user_id":"0","name_support":"","msg":"Let's go!"},"51":{"id":"51","time":"1418914828","chat_id":"7","user_id":"0","name_support":"","msg":"Anybody there?"},"52":{"id":"52","time":"1418914833","chat_id":"7","user_id":"4","name_support":"Jean-Francois Berube","msg":"yellow"},"53":{"id":"53","time":"1418915051","chat_id":"7","user_id":"0","name_support":"","msg":"Poor customer service... I quit!"},"54":{"id":"54","time":"1418915077","chat_id":"7","user_id":"4","name_support":"Jean-Francois Berube","msg":"This is a canned message"},"55":{"id":"55","time":"1418915079","chat_id":"7","user_id":"4","name_support":"Jean-Francois Berube","msg":"lool"},"78":{"id":"78","time":"1419612692","chat_id":"7","user_id":"-1","name_support":"","msg":"remdex (remdex@gmail.com) has closed the chat!"}}}
 * [user_data] => {"id":"5","username":"remdex","password":"7866b37c73b8bb8b922e3798dbb29c02fda74a57","email":"remdex@gmail.com","name":"Remigijus","filepath":"","filename":"","surname":"Kiminas","job_title":"Developer","skype":"","xmpp_username":"","disabled":"0","hide_online":"0","all_departments":"1","invisible_mode":"0","time_zone":""}
 * )
 */
 
 4. To login old way use, it uses old way login without SSO
 https://exmaple.com/index.php/site_admin/user/loginadmin