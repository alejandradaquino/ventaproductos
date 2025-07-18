<?php
$method = $_SERVER ['REQUEST_METHOD'];
require_once '../model/priceList.php';
require_once '../utils/companyLoginHelper.php';

header('Content-Type: application/json');

switch ($method) {
	case 'GET' :
	    if (CompanyLoginHelper::isValidBackofficeSession()== 'true') {
    		if ($_GET ['mode'] == 'all') {
    			echo json_encode ( PriceList::findAll () );
    		} else {
    			echo json_encode ( PriceList::findById ( $_GET ['id'] ) );
    		}
	    } else {
	        http_response_code(403);
	        echo '{"status": "La sesion es inváida"}';
	    }
		break;
	case 'POST' :
	    if (CompanyLoginHelper::isValidBackofficeSession()== 'true') {
    	    $json = json_decode ( file_get_contents ( 'php://input' ) );
    		$priceList = new PriceList ( $json );
    		$priceList->save ();
    		echo '{"status": "OK"}';
	    } else {
	        http_response_code(403);
	        echo '{"status": "La sesion es inváida"}';
	    }
		break;
}
?>