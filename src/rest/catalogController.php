<?php
$method = $_SERVER['REQUEST_METHOD'];
require_once '../model/article.php';
require_once '../model/category.php';
require_once '../model/user.php';
require_once '../utils/companyLoginHelper.php';

$token = apache_request_headers()['http-token'];
$userId = Session::userIdBySession($token);
if($userId != null){
    $user = User::findById($userId);
}

header('Content-Type: application/json');

switch ($method) {
    case 'GET':
        if ($_GET['mode'] == 'categories') {
            echo json_encode(Category::findAll());
        } else if ($_GET['mode'] == 'random'){
            echo json_encode(Article::findRandomArticles( $user ));
        } else if ($_GET['mode'] == 'search' && isset($_GET['value'])){
            echo json_encode(Article::findBy($_GET['value'], $user ));
        } else if ($_GET['mode'] == 'findById' && isset($_GET['id'])) {
            echo json_encode(Article::findById($_GET['id']));
        } else if ($_GET['mode'] == 'filter' && isset($_GET['subcategoryId'])) {
            $subcategoryId = $_GET['subcategoryId'];
            echo json_encode(Article::findAllOfSubcategory($subcategoryId,  $user));
        } else if ($_GET['mode'] == 'filter' && isset($_GET['categoryId'])) {
            $categoryId = $_GET['categoryId'];
            echo json_encode(Article::findAllOfCategory($categoryId, $user));
        } else {
            if(isset(apache_request_headers()['http-id-company'])){
                $idCompany = apache_request_headers()['http-id-company'];
                echo json_encode(Article::findAllFor($idCompany));
            }else{
                echo json_encode(Article::findAll());

            }
        }

}
?>
