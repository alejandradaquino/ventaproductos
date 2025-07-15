<?php
$method = $_SERVER['REQUEST_METHOD'];
require_once '../model/order.php';
require_once '../utils/companyLoginHelper.php';

switch ($method) {
    case 'GET':
        if ($_GET['mode'] == 'all') {
            if (CompanyLoginHelper::isValidBackofficeSession()== 'true') {
                echo json_encode(Order::findAll());
            } else {
                http_response_code(403);
                echo '{"status": "La sesion es inváida"}';
            }
        } else if ($_GET['mode'] == 'company') {

            $token = apache_request_headers()['http-token'];

            $userId = Session::userIdBySession($token);

            if (CompanyLoginHelper::isValidSession() == 'true') {
                echo json_encode(Order::findByCompanyAndRequester($_GET['companyId'], $userId));
            } else {
                http_response_code(403);
                echo '{"status": "La sesion es inváida"}';
            }
        }
        break;
    case 'POST':
        if (CompanyLoginHelper::isValidSession() == 'true') {
            $json = json_decode(file_get_contents('php://input'));
            Order::saveOrder($json);
            echo '{"status": "OK"}';
        } else {
            http_response_code(403);
            echo '{"status": "La sesion es inváida"}';
        }
        break;
}
?>
