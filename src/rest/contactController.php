<?php
$method = $_SERVER['REQUEST_METHOD'];
require_once '../model/configuration.php';
require_once '../utils/emailHelper.php';

header('Content-Type: application/json');
switch ($method) {
    case 'GET':
        echo json_encode(Configuration::find());
        break;
    case 'POST':
        $json = json_decode(file_get_contents('php://input'));
        
        
        $html = "Ha recibido un mensaje:<br/> <br/>";
        $html = "<b>Compan&iacute;a:</b> $json->companyname <br/> <br/>";
        $html .= "<b>Usuario solicitante:</b> $json->username <br/> <br/>";
        $html .= "<b>Mensaje:</b> <br/> $json->message <br/> <br/>";
        
        EmailHelper::send(Configuration::emailReciever(), "[Ventas Cercana] Nuevo Mensaje", $html);
}
?>