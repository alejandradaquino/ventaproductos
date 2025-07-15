<?php
$method = $_SERVER['REQUEST_METHOD'];
require_once '../model/banner.php';
require_once '../utils/companyLoginHelper.php';

switch ($method) {
    case 'GET':
        if ($_GET['mode'] == 'findactive') {
            echo json_encode(Banner::findActiveBanners());
        }else{
            if (CompanyLoginHelper::isValidBackofficeSession() == 'true') {
                if ($_GET['mode'] == 'findall') {
                    echo json_encode(Banner::findAll());
                }else if ($_GET['mode'] == 'delete') {
                    Banner::deleteById($_GET['id']);
                    echo '{"status": "OK"}';
                }    
            }else {
                http_response_code(403);
                echo '{"status": "La sesion es inváida"}';
            } 
        }
        break;
    case 'POST':
        if (CompanyLoginHelper::isValidBackofficeSession() == 'true') {
            $json = json_decode(file_get_contents('php://input'));
            Banner::saveBanner($json);
            echo '{"status": "OK"}';
        } else {
            http_response_code(403);
            echo '{"status": "La sesion es inváida"}';
        }
        break;        
}
?>