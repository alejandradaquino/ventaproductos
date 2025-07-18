<?php
require_once ('persistent.php');
require_once 'priceList.php';
require_once 'price.php';
require_once 'company.php';

class Article extends Persistent
{

    public $id;

    public $name;

    public $code;

    public $defaultPrice;

    public $imgPath;

    public $prices;

    public $specifications;

    public $categoryId;

    public $subcategoryId;

    public $wallapopLink;

    public function __construct($mixed)
    {
        if (is_object($mixed)) {
            $this->id = isset($mixed->id) ? $mixed->id : null;
            $this->name = isset($mixed->name) ? $mixed->name : "";
            $this->code = isset($mixed->code) ? $mixed->code : "";
            $this->defaultPrice = isset($mixed->defaultPrice) ? $mixed->defaultPrice : "";
            $this->imgPath = isset($mixed->imgPath) ? $mixed->imgPath : "";
            $this->specifications = isset($mixed->specifications) ? $mixed->specifications : "";
            $this->wallapopLink = isset($mixed->wallapopLink) ? $mixed->wallapopLink : "";
            $this->categoryId = isset($mixed->categoryId) ? $mixed->categoryId : "";
            $this->subcategoryId = isset($mixed->subcategoryId) ? $mixed->subcategoryId : "";
        } else if (is_array($mixed)) {
            $this->id = isset($mixed['id']) ? $mixed['id'] : null;
            $this->name = isset($mixed['name']) ? $mixed['name'] : "";
            $this->code = isset($mixed['code']) ? $mixed['code'] : "";
            $this->defaultPrice = isset($mixed['defaultPrice']) ? $mixed['defaultPrice'] : "";
            $this->imgPath = isset($mixed['imgPath']) ? $mixed['imgPath'] : "";
            $this->specifications = isset($mixed['specifications']) ? $mixed['specifications'] : "";
            $this->wallapopLink = isset($mixed['wallapopLink']) ? $mixed['wallapopLink'] : "";
            $this->categoryId = isset($mixed['categoryId']) ? $mixed['categoryId'] : "";
            $this->subcategoryId = isset($mixed['subcategoryId']) ? $mixed['subcategoryId'] : "";
        }
        if (isset($this->id)) {
            $this->prices = array();
            $persistentPrices = Price::findByArticle($this->id);
            foreach ($persistentPrices as $persistentPrice) {
                unset($persistentPrice->id);
                unset($persistentPrice->idArticle);
                array_push($this->prices, $persistentPrice);
            }
        }
    }

    public function save()
    {
        if (is_null($this->id)) {
            $this->id = Persistent::insertQuery("INSERT INTO " . Article::tableName() . 
            "(id, name, specifications, code, defaultPrice, imgPath, wallapopLink, categoryId, subcategoryId) 
            VALUES (NULL, '$this->name', 
                            '$this->specifications',
                            '$this->code',
                             $this->defaultPrice ,
                            '$this->imgPath', 
                            '$this->wallapopLink',
                            '$this->categoryId', 
                            '$this->subcategoryId');");
        } else {
            Persistent::executeQuery("update " . Article::tableName() . "
						     set name = '$this->name', 
                                 code = '$this->code', 
                       specifications = '$this->specifications',
                         wallapopLink = '$this->wallapopLink',
						 defaultPrice = '$this->defaultPrice', 
							  imgPath = '$this->imgPath',
                           categoryId = '$this->categoryId',
                        subcategoryId = '$this->subcategoryId'
						     where id =  $this->id");
        }
    }
    
    public static function updatePrices($percentage, $idPriceList){
        Persistent::executeQuery("update " . Price::tableName() . " set value = round( value * $percentage, 2) where idPriceList=$idPriceList");
    }

    public static function updateDefaultPrices($percentage){
        Persistent::executeQuery("update " . Article::tableName() . " set defaultPrice = round( defaultPrice * $percentage, 2)");
    }

    public static function findById($id)
    {
        $result = Persistent::query("select * from " . Article::tableName() . " where id = $id");
        foreach ($result as $row) {
            return new Article($row);
        }
        return null;
    }
    
    public static function findAllOfSubcategory($subcategoryId, $user)
    {
        $result = Persistent::query("select * from " . Article::tableName() . " where subcategoryId= '$subcategoryId'");
        if($user!=null && !$user->seeAllArticles && Article::companyRestrictsArticles($user)){
            $result = Persistent::query(
                "select a.* from " . Article::tableName() . " a
                    join ". Price::tableName() ." p on a.id = p.idArticle 
                    and p.idPriceList = 
                        (select idPriceList from " . Company::tableName() ." c 
                        where c.id = $user->idCompany)
                        where a.subcategoryId= '$subcategoryId'"); 
        }
        $articles = array();
        foreach ($result as $row) {
            $article = new Article($row);
            array_push($articles, $article);
        }
        return $articles;
    }
    
    public static function findAllOfCategory($categoryId, $user)
    {
        $result = Persistent::query("select * from " . Article::tableName() . " where categoryId= '$categoryId'");
        if($user!=null && !$user->seeAllArticles && Article::companyRestrictsArticles($user)){
            $result = Persistent::query(
                "select a.* from " . Article::tableName() . " a
                    join ". Price::tableName() ." p on a.id = p.idArticle 
                    and p.idPriceList = 
                        (select idPriceList from " . Company::tableName() ." c 
                        where c.id = $user->idCompany)
                        where a.categoryId= '$categoryId'"); 
        }
        $articles = array();
        foreach ($result as $row) {
            $article = new Article($row);
            array_push($articles, $article);
        }
        return $articles;
    }  

    private static function companyRestrictsArticles($user) {
        return $user->idCompany == 2 || $user->idCompany == 5;
    }

    public static function findRandomArticles($user)
    {     
        $result = Persistent::query("select * from " . Article::tableName() . " where imgPath != '' ORDER BY RAND() LIMIT 32");
        if($user!=null && !$user->seeAllArticles && Article::companyRestrictsArticles($user)){
            $result = Persistent::query(
                "select a.* from " . Article::tableName() . " a
                    join ". Price::tableName() ." p on a.id = p.idArticle 
                    and p.idPriceList = 
                        (select idPriceList from " . Company::tableName() ." c 
                        where c.id = $user->idCompany)
                        and a.imgPath != '' ORDER BY RAND() LIMIT 32");
        }
        $articles = array();
        foreach ($result as $row) {
            $article = new Article($row);
            array_push($articles, $article);
        }
        return $articles;
    }

    public static function findBy($value, $user ){
        $result = Persistent::query("select * from " . Article::tableName() . "
         where upper(name) like upper('%$value%') 
            or upper(code) like upper('%$value%') 
            or upper(wallapopLink) like upper('%$value%')
            or upper(specifications) like upper('%$value%')");
        
        if($user!=null && !$user->seeAllArticles && Article::companyRestrictsArticles($user)){
            $result = Persistent::query(
                "select a.* from " . Article::tableName() . " a
                    join ". Price::tableName() ." p on a.id = p.idArticle 
                    and p.idPriceList = 
                        (select idPriceList from " . Company::tableName() ." c 
                    where c.id = $user->idCompany)
                    and( 
                        upper(a.name) like upper('%$value%') 
                        or upper(a.code) like upper('%$value%') 
                        or upper(a.specifications) like upper('%$value%')
                    )"); 
        }  
        $articles = array();
        foreach ($result as $row) {
            $article = new Article($row);
            array_push($articles, $article);
        }
        return $articles;
        
    }

    public static function deleteById($id)
    {
        $result = Persistent::query("delete from  " . Article::tableName() . " where id = $id");
    }

    public static function findAll()
    {
        $result = Persistent::query("select * from " . Article::tableName());
        $articles = array(); 
        foreach ($result as $row) {
            $article = new Article($row);
            array_push($articles, $article);
        }
        return $articles;
    }

    public static function findAllFor($companyId){
         $result = Persistent::query(
            "select a.* from " . Article::tableName() . " a
                join ". Price::tableName() ." p on a.id = p.idArticle 
                and p.idPriceList = 
                    (select idPriceList from " . Company::tableName() ." c 
                    where c.id = $companyId)"); 
         $articles = array(); 
         foreach ($result as $row) {
             $article = new Article($row);
             array_push($articles, $article);
         }
         return $articles;
    }

    public static function saveArticle($json)
    {
        $article = new Article($json);
        $article->save();
        foreach ($json->prices as $priceJson) {
            if ($priceJson->value > 0) {
                $price = Price::create($article->id, $priceJson->idPriceList, $priceJson->value);
            }
        }
    }

    private static function tableName()
    {
        return 'A_Article';
    }

    public function setImagePath($imgPath)
    {
        $this->imgPath = $imgPath;
        $this->save();
    }
}

?>