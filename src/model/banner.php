<?php
require_once 'persistent.php';

class Banner extends Persistent
{

    public $id;

    public $imagePath;
    public $url;
    public $order;

    function __construct($mixed)
    {
        if (is_object($mixed)) {
            $this->id = isset($mixed->id) ? $mixed->id : null;
            $this->imagePath = isset($mixed->imagePath) ? $mixed->imagePath : null;
            $this->url = isset($mixed->url) ? $mixed->url : '';
            $this->order = isset($mixed->order) ? $mixed->order : 0;
        } else if (is_array($mixed)) {
            $this->id = isset($mixed['id']) ? $mixed['id'] : null;
            $this->imagePath = isset($mixed['imagePath']) ? $mixed['imagePath'] : null;
            $this->url = isset($mixed['url']) ? $mixed['url'] : '';
            $this->order = isset($mixed['order']) ? $mixed['order'] : 0;
        }
    }

    public function save()
    {
        if ($this->isNew()) {
            $this->id = Persistent::insertQuery("INSERT INTO " . Banner::tableName() . " (id, imagePath, url, `order`)
		      VALUES (NULL, '$this->imagePath', '$this->url', $this->order);");
        } else {
            Persistent::executeQuery("update " . Banner::tableName() . "
                             set imagePath = '$this->imagePath',
                              url = '$this->url',
                              `order` = $this->order
						      where id= $this->id");
        }
    }

    public function setImagePath($imagePath){   
        $this->imagePath = $imagePath;
        $this->save();
    }

    public static function findById($id)
    {
        $result = Persistent::query("select * from " . Banner::tableName() . " where id = $id");
        foreach ($result as $row) {
            return new Banner($row);
        }
        return null;
    }

    public static function saveBanner($json)
    {
        $article = new Banner($json);
        $article->save();
    }
    public static function findAll()
    {
        $result = Persistent::query("select * from " . Banner::tableName());
        $banners = array();
        foreach ($result as $row) {
            $banner = new Banner($row);
            array_push($banners, $banner);
        }
        return $banners;
    }

    public static function findActiveBanners(){
        $result = Persistent::query("select * from " . Banner::tableName() 
                        . " order by `order`;");
        $banners = array();
        foreach ($result as $row) {
            $banner = new Banner($row);
            array_push($banners, $banner);
        }
        return $banners;
    
    }

    public static function deleteById($id)
    {
        $banner = Banner::findById($id);
        unlink("../".$banner->imagePath);
        $result = Persistent::query("delete from  " . Banner::tableName() . " where id = $id");
    }

    public function isNew()
    {
        return is_null($this->id);
    }

    private static function tableName()
    {
        return 'Banner';
    }
}

?>