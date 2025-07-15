<?php
$method = $_SERVER['REQUEST_METHOD'];
require_once '../model/company.php';
require_once '../model/user.php';
require_once '../utils/companyLoginHelper.php';

switch ($method) {
    case 'GET':
        if (CompanyLoginHelper::isValidBackofficeSession()== 'true') {
            if ($_GET['mode'] == 'all') {
                echo json_encode(User::findAll($_GET['idCompany'], $_GET['viewDeleted']));
            } else if ($_GET['mode'] == 'delete') {
                User::delete($_GET['id']);
                echo '{"status": "OK"}';
            } else if ($_GET['mode'] == 'reenable') {
                User::reenable($_GET['id']);
                echo '{"status": "OK"}';
            } else {
                echo json_encode(User::findById($_GET['id']));
            }
        } else {
            http_response_code(403);
            echo '{"status": "La sesion es inváida"}';
        }
        break;
    case 'POST':
        $json = json_decode(file_get_contents('php://input'));
        $user = new User($json);
        
        if (CompanyLoginHelper::isValidBackofficeSession()== 'true') {
            Company::saveUser($user);
            echo '{"status": "OK"}';
        } else{
            $message = User::registrateUser($user);
            echo '{"status": "'.$message.'"}';
        }
    
        break;
}
