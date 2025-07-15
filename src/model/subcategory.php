<?php
require_once ('persistent.php');

class Subcategory extends Persistent
{

    public $id;

    public $name;

    public $categoryId;

    public function __construct($mixed)
    {
        if (is_object($mixed)) {
            $this->id = isset($mixed->id) ? $mixed->id : null;
            $this->name = isset($mixed->name) ? $mixed->name : "";
            $this->categoryId = isset($mixed->categoryId) ? $mixed->categoryId : 0;
        } else if (is_array($mixed)) {
            $this->id = isset($mixed['id']) ? $mixed['id'] : null;
            $this->name = isset($mixed['name']) ? $mixed['name'] : "";
            $this->categoryId = isset($mixed['categoryId']) ? $mixed['categoryId'] : 0;
        }
    }

    public function save()
    {
        if (is_null($this->id)) {
            $this->id = Persistent::insertQuery("INSERT INTO " . Subcategory::tableName() . "(id, name, categoryId) 
						   VALUES (NULL, '$this->name', $this->categoryId);");
        } else {
            Persistent::executeQuery("update " . Subcategory::tableName() . "
						     set name = '$this->name', 
					  	   categoryId = '$this->categoryId'
						     where id =  $this->id");
        }
    }
    
    public static function findById($id)
    {
        $result = Persistent::query("select * from " . Subcategory::tableName() . " where id = $id");
        foreach ($result as $row) {
            return new Subcategory($row);
        }
        return null;
    }
    
    public static function deleteById($id)
    {
        $result = Persistent::query("delete from  " . Subcategory::tableName() . " where id = $id");
    }

    public static function findByCategory($categoryId){
        $result = Persistent::query("select * from " . Subcategory::tableName() . " where categoryId = $categoryId");
        $subcategories = array(); 
        foreach ($result as $row) {
            array_push($subcategories, new Subcategory($row));
        }
        return $subcategories;
    
    }

    public static function deleteByCategory($categoryId){
        $result = Persistent::query("delete from " . Subcategory::tableName() . " where categoryId = $categoryId");
    }


    private static function tableName()
    {
        return 'Subcategory';
    }
}

?>