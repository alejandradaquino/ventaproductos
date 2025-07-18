<?php
$method = $_SERVER['REQUEST_METHOD'];
require_once '../model/company.php';
require_once '../model/user.php';
require_once '../model/session.php';
require_once '../utils/companyLoginHelper.php';
header('Content-Type: application/json');
switch ($method) {
    case 'GET':
    case 'POST':
        $json = json_decode(file_get_contents('php://input'));
        $user = new User($json);

        $user = $user->checkLogin();

        if ($user != null) {
            $token = Session::newSession($user->id);

            echo '{"token":"' . $token . '","user":' . json_encode($user) . '}';
        } else {
            http_response_code(403);
            echo '{"status": "Invalid user or password"}';
        }
        break;
    case 'OPTIONS':
        http_response_code(200);
        echo '{"status": "STATUS CODE OK"}';
}
?>