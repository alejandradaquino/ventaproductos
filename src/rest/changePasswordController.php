<?php
$method = $_SERVER['REQUEST_METHOD'];
require_once '../model/company.php';
require_once '../model/user.php';
require_once '../utils/companyLoginHelper.php';

header('Content-Type: application/json');
switch ($method) {  
    case 'GET':
        if (CompanyLoginHelper::isValidSession() == 'true') {
            $user = User::findById($_GET['userId']);
            $user->resetPassword();
            echo '{"status": "OK"}';
        }
        break;
    
    case 'POST':
        if (CompanyLoginHelper::isValidSession() == 'true') {
            $passwordObject = json_decode(file_get_contents('php://input'));
            $user = User::findById($passwordObject->userId);
            $user->updatePassowrd($passwordObject->oldPassword, $passwordObject->newPassword);
            echo '{"status": "OK"}';
        }
        break;
}
?>