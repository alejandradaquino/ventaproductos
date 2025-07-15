<?php
require_once 'persistent.php';
class Price extends Persistent {
	public $id;
	public $idPriceList;
	public $idArticle;
	public $value;

	public function __construct($mixed) {
		if (is_object ( $mixed )) {
			$this->id = isset ( $mixed->id ) ? $mixed->id : null;
			$this->idPriceList = isset ( $mixed->idPriceList ) ? $mixed->idPriceList : null;
			$this->idArticle = isset ( $mixed->idArticle ) ? $mixed->idArticle : null;
			$this->value = isset ( $mixed->value ) ? $mixed->value : null;
		} else if (is_array ( $mixed )) {
			$this->id = isset ( $mixed ['id'] ) ? $mixed ['id'] : null;
			$this->idPriceList = isset ( $mixed ['idPriceList'] ) ? $mixed ['idPriceList'] : null;
			$this->idArticle = isset ( $mixed ['idArticle'] ) ? $mixed ['idArticle'] : null;
			$this->value = isset ( $mixed ['value'] ) ? $mixed ['value'] : null;
		}
	}

	public static function create($idArticle, $idPriceList, $value) {
		$price = Price::findBy ( $idArticle, $idPriceList );
		if (is_null ( $price )) {
			$price = new Price ( array () );
			$price->idPriceList = $idPriceList;
			$price->idArticle = $idArticle;
		}
		$price->value = $value;
		$price->save ();
		return $price;
	}

	public function save() {
		if (is_null ( $this->id )) {
			$this->id = Persistent::insertQuery ( "INSERT INTO " . Price::tableName () . " (id, idPriceList, idArticle, value) 
					VALUES (NULL, '$this->idPriceList', '$this->idArticle', '$this->value');" );
		} else {
			Persistent::executeQuery ( "update " . Price::tableName () . " set 
						  idPriceList = '$this->idPriceList', 
					        idArticle = '$this->idArticle', 
							    value = '$this->value'
							 where id =  $this->id" );
		}
	}

	public static function findBy($idArticle, $idPriceList) {
		$result = Persistent::query ( "select * from " . Price::tableName () . "
				where idPriceList = $idPriceList
				and idArticle = $idArticle" );
		foreach ( $result as $row ) {
			return new Price ( $row );
		}
		return null;
	}

	public static function findByArticle($idArticle) {
		$result = Persistent::query ( "select * from " . Price::tableName () . "
				where idArticle = $idArticle" );
		$prices = array ();
		foreach ( $result as $row ) {
			$price = new Price ( $row );
			array_push ( $prices, $price );
		}
		return $prices;
	}

	public static function findAll() {
		$result = Persistent::query ( "select * from " . Price::tableName () );
		$prices = array ();
		foreach ( $result as $row ) {
			$price = new Price ( $row );
			array_push ( $prices, $price );
		}
		return $prices;
	}

	public static function tableName() {
		return 'Price';
	}
}

?>