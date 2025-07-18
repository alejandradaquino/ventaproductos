<?php
$method = $_SERVER['REQUEST_METHOD'];

require_once '../model/company.php';
require_once '../utils/companyLoginHelper.php';

header('Content-Type: application/json');
switch ($method) {
    case 'GET':
        if (CompanyLoginHelper::isValidBackofficeSession()== 'true') {
            if ($_GET['mode'] == 'all') {
                echo json_encode(Company::findAll());
            } else {
                echo json_encode(Company::findById($_GET['id']));
            }
        }else if (CompanyLoginHelper::isValidSession() == 'true'&&
            $_GET['id'] == apache_request_headers()['http-id-company']) {
            echo json_encode(Company::findById($_GET['id']));
        } else {
            http_response_code(403);
            http_response_code();
            echo '{"status": "La sesion es inváida", "code": 403}';
        }
        break;
    case 'POST':
        if (CompanyLoginHelper::isValidBackofficeSession()== 'true') {
            $json = json_decode(file_get_contents('php://input'));
            $company = new Company($json);
            $company->save ();
            echo '{"status": "OK"}';
        } else {
            http_response_code(403);
            http_response_code();
            echo '{"status": "La sesion es inváida", "code": 403}';
        }
        break;
}
?>
