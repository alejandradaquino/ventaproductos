<?php
    require_once '../model/configuration.php';
	class EmailHelper{
		public static function send($emailTo, $emailSubject, $emailBody){
			
			// To send HTML mail, the Content-type header must be set
			$headers  = 'MIME-Version: 1.0' . "\r\n";
			$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
			
			// Additional headers
			$headers .= "To: <$emailTo>" . "\r\n";
			$headers .= 'From: Cercana <'.Configuration::emailReciever().'>' . "\r\n";
			
			// Mail it
			mail($emailTo, $emailSubject, $emailBody, $headers);
		}
	}

?>