<?php
require_once ('persistent.php');
require_once 'order.php';

class Detail extends Persistent
{

    public $id;

    public $idArticle;

    public $name;

    public $code;

    public $imgPath;

    public $price;

    public $quantity;

    public $orderId;

    public function __construct($mixed)
    {
        if (is_object($mixed)) {
            $this->id = isset($mixed->id) ? $mixed->id : null;
            $this->idArticle = isset($mixed->idArticle) ? $mixed->idArticle : "";
            $this->name = isset($mixed->name) ? $mixed->name : "";
            $this->code = isset($mixed->code) ? $mixed->code : "";
            $this->imgPath = isset($mixed->imgPath) ? $mixed->imgPath : "";
            $this->price = isset($mixed->price) ? $mixed->price : 0;
            $this->quantity = isset($mixed->quantity) ? $mixed->quantity : 0;
            $this->orderId = isset($mixed->orderId) ? $mixed->orderId : 0;
        } else if (is_array($mixed)) {
            $this->id = isset($mixed['id']) ? $mixed['id'] : null;
            $this->idArticle = isset($mixed['idArticle']) ? $mixed['idArticle'] : "";
            $this->name = isset($mixed['name']) ? $mixed['name'] : "";
            $this->code = isset($mixed['code']) ? $mixed['code'] : "";
            $this->imgPath = isset($mixed['imgPath']) ? $mixed['imgPath'] : "";
            $this->price = isset($mixed['price']) ? $mixed['price'] : 0;
            $this->quantity = isset($mixed['quantity']) ? $mixed['quantity'] : 0;
            $this->orderId = isset($mixed['orderId']) ? $mixed['orderId'] : 0;
        }
    }

    public function save()
    {
        if (is_null($this->id)) {
            $this->id = Persistent::insertQuery("INSERT INTO " . Detail::tableName() . "(id, idArticle, name, code, imgPath, price, quantity, orderId) 
						   VALUES (NULL, $this->idArticle, '$this->name', '$this->code' , '$this->imgPath' , $this->price, $this->quantity, $this->orderId);");
        } else {
            Persistent::executeQuery("update " . Detail::tableName() . "
						     set idArticle = $this->idArticle, 
								      name = '$this->name', 
						              code = '$this->code', 
						           imgPath = '$this->imgPath', 
							         price = $this->price,
					              quantity = $this->quantity,
					               orderId = $this->orderId
					              where id =  $this->id");
        }
    }

    public static function findById($id)
    {
        $result = Persistent::query("select * from " . Detail::tableName() . " where id = $id");
        foreach ($result as $row) {
            return new Detail($row);
        }
        return null;
    }

    public static function findAll()
    {
        $result = Persistent::query("select * from " . Detail::tableName());
        $details = array();
        foreach ($result as $row) {
            $detail = new Detail($row);
            array_push($details, $detail);
        }
        return $details;
    }

    public static function findByOrder($orderId)
    {
        $result = Persistent::query("select * from " . Detail::tableName() . " where orderId = $orderId");
        $details = array();
        foreach ($result as $row) {
            $detail = new Detail($row);
            array_push($details, $detail);
        }
        return $details;
    }

    public function setOrderId($orderId)
    {
        $this->orderId = $orderId;
    }

    public function html()
    {
        $body .= "<td>($this->code) - $this->name  </td>";
        $body .= "<td style='text-align:right'>$this->quantity   </td>";
        $body .= "<td style='text-align:right'>$ $this->price   </td>";
        $body .= "<td style='text-align:right'>$ ".number_format($this->total(), 2, '.', '')."</td>";
        return $body;
    }

    public function total()
    {
        return $this->quantity * $this->price;
    }

    private static function tableName()
    {
        return 'A_Detail';
    }
}

?>