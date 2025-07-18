<?php
require_once ('persistent.php');
require_once 'subcategory.php';
require_once 'company.php';

class Category extends Persistent
{

    public $id;

    public $name;

    public $subcategories;

    public function __construct($mixed)
    {
        if (is_object($mixed)) {
            $this->id = isset($mixed->id) ? $mixed->id : null;
            $this->name = isset($mixed->name) ? $mixed->name : "";
            if(isset($mixed->subcategories)){
                $this->subcategories = array(); 
                foreach ($mixed->subcategories as $subcategory) {
                    array_push($this->subcategories,  new Subcategory($subcategory));
                }
            }
        } else if (is_array($mixed)) {
            $this->id = isset($mixed['id']) ? $mixed['id'] : null;
            $this->name = isset($mixed['name']) ? $mixed['name'] : "";
            if(isset($mixed['subcategories'])){
                $this->subcategories = array(); 
                foreach ($mixed['subcategories'] as $subcategory) {
                    array_push($this->subcategories,  new Subcategory($subcategory));
                }
            }}
        if (isset($this->id) && !isset($this->subcategories)) {
            $this->subcategories = array();
            $persistentSubcategories = Subcategory::findByCategory($this->id);
            foreach ($persistentSubcategories as $subcategory) {
                array_push($this->subcategories, $subcategory);
            }
        }
    }

    public function save()
    {
        if (is_null($this->id)) {
            $this->id = Persistent::insertQuery("INSERT INTO " . Category::tableName() . "(id, name) 
						   VALUES (NULL, '$this->name');");
        } else {
            Persistent::executeQuery("update " . Category::tableName() . "
						     set name = '$this->name'
						     where id =  $this->id");
        }
        Subcategory::deleteByCategory($this->id);
        foreach ($this->subcategories as $subcategory) {
            $subcategory->categoryId = $this->id;
            $subcategory->id = null;
            $subcategory->save();
        }
    }
    
    public static function findById($id)
    {
        $result = Persistent::query("select * from " . Category::tableName() . " where id = $id");
        foreach ($result as $row) {
            return new Category($row);
        }
        return null;
    }
    
    public static function deleteById($id)
    {
        Subcategory::deleteByCategory($id);
        $result = Persistent::query("delete from  " . Category::tableName() . " where id = $id");
    }

    public static function findAll()
    {
        $result = Persistent::query("select * from " . Category::tableName());
        $categories = array(); 
        foreach ($result as $row) {
            $category = new Category($row);
            array_push($categories, $category);
        }
        return $categories;
    }

    public static function saveCategory($json)
    {
        $category = new Category($json);
        $category->save();
    }

    private static function tableName()
    {
        return 'A_Category';
    }
}

?>