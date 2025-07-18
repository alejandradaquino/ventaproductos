<?php
require_once '../model/user.php';
require_once '../model/session.php';

if(!function_exists('apache_request_headers')) {
    function apache_request_headers() {
        $headers = array();
        foreach($_SERVER as $key => $value) {
            if(substr($key, 0, 5) == 'HTTP_') {
                $headers[str_replace(' ', '-', ucwords(str_replace('_', ' ', strtolower(substr($key, 5)))))] = $value;
            }
        }
        return $headers;
    }
}

class CompanyLoginHelper
{

    public static function isValidBackofficeSession()
    {
        $token = $_SERVER['HTTP_HTTP_TOKEN'];
        $idCompany = $_SERVER['HTTP_HTTP_ID_COMPANY'];
        $userId = Session::userIdBySession($token);
        if ($userId == null) {
            return 'false';
        }
        $user = User::findById($userId);
        if ($user->idCompany == $idCompany && $user->isBackoffice()) {
            return 'true';
        }
        return 'false';
    }

    public static function isValidSession()
    {
        $token = $_SERVER['HTTP_HTTP_TOKEN'];
        $idCompany = $_SERVER['HTTP_HTTP_ID_COMPANY'];
        $userId = Session::userIdBySession($token);
        if ($userId == null) {
            return 'false';
        }
        $user = User::findById($userId);
        if ($user->idCompany == $idCompany) {
            return 'true';
        }
        return 'false';
    }
}

?>
