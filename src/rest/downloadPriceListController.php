<?php
$method = $_SERVER['REQUEST_METHOD'];
require_once '../utils/csvGenerator.php';
require_once ('../model/persistent.php');
require_once '../model/priceList.php';
require_once '../model/price.php';
require_once '../model/company.php';
require_once '../model/article.php';


header('Content-Type: application/json');
switch ($method) {
    case 'GET':
    
        $priceList =$_GET['idPriceList'];
        if($priceList!='undefined'){
            $priceListNameResult = Persistent::query(
                "select code from PriceList where id = $priceList"); 
            $plname = "prices";
            foreach ($priceListNameResult as $row) {
                $plname=$row[0];
            }
            $result = Persistent::query(
                "select a.code, a.name,
                    p.value 
                    from Article a 
                    join Price p on a.id = p.idArticle 
                    where p.idPriceList = $priceList"); 
            
            $csvArray = array();
            array_push($csvArray, array('Código', 'Nombre', 'Precio'));        
           
      
            foreach ($result as $line) { 
                array_push($csvArray,array($line['code'],$line['name'],number_format($line['value'], 2, '.', '')));
            }
    
            CSVGenerator::generateFromArray(
                $csvArray, 
                "$plname.csv",
                ','
            );
            
        
        }else{

            $plname = "Precio al público";

            $result = Persistent::query(
                "select a.code, a.name, a.defaultPrice
                    from Article a 
                   "); 
            
            $csvArray = array();
            array_push($csvArray, array('Código', 'Nombre', 'Precio'));        
           
      
            foreach ($result as $line) { 
                array_push($csvArray,array($line['code'],$line['name'],number_format($line['defaultPrice'], 2, '.', '')));
            }
    
            CSVGenerator::generateFromArray(
                $csvArray, 
                "$plname.csv",
                ','
            );
            
        
        }
        
}
?>