<?php
$method = $_SERVER['REQUEST_METHOD'];
require_once '../model/article.php';
require_once '../utils/companyLoginHelper.php';

switch ($method) {
    case 'GET':
        if (CompanyLoginHelper::isValidBackofficeSession() == 'true') {
            if ($_GET['mode'] == 'delete') {
                Article::deleteById($_GET['id']);
                echo '{"status": "OK"}';
            } else if ($_GET['mode'] == 'prices') {
                Article::updatePrices($_GET['percentage'], $_GET['idPriceList']);
                echo '{"status": "OK"}';
                
            } else if ($_GET['mode'] == 'defaultprices') {
                Article::updateDefaultPrices($_GET['percentage']);
                echo '{"status": "OK"}';
                
            } else if ($_GET['mode'] != 'all' || ! isset($_GET['mode'])) {
                echo json_encode(Article::findById($_GET['id']));
            
            }else {
                echo json_encode(Article::findAll());
            }
        } else {
            http_response_code(403);
            echo '{"status": "La sesion es inváida"}';
        }
        break;
    case 'POST':
        if (CompanyLoginHelper::isValidBackofficeSession() == 'true') {
            $json = json_decode(file_get_contents('php://input'));
            Article::saveArticle($json);
            echo '{"status": "OK"}';
        } else {
            http_response_code(403);
            echo '{"status": "La sesion es inváida"}';
        }
        break;
}
?>