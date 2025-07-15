<?php
$method = $_SERVER ['REQUEST_METHOD'];
require_once '../model/category.php';
require_once '../utils/companyLoginHelper.php';

switch ($method) {
	case 'GET' :
	    if (CompanyLoginHelper::isValidBackofficeSession()== 'true') {
    		if ($_GET ['mode'] == 'all') {
    			echo json_encode ( Category::findAll () );
    		} if ($_GET['mode'] == 'delete') {
                Category::deleteById($_GET['id']);
                echo '{"status": "OK"}';
            } else {
    			echo json_encode ( Category::findById ( $_GET ['id'] ) );
    		}
	    } else {
	        http_response_code(403);
	        echo '{"status": "La sesion es inváida"}';
	    }
		break;
	case 'POST' :
	    if (CompanyLoginHelper::isValidBackofficeSession()== 'true') {
    	    $json = json_decode ( file_get_contents ( 'php://input' ) );
    		$category = new Category ( $json );
    		$category->save ();
    		echo '{"status": "OK"}';
	    } else {
	        http_response_code(403);
	        echo '{"status": "La sesion es inváida"}';
	    }
		break;
}
?>