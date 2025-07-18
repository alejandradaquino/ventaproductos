<?php
require_once 'persistent.php';
require_once 'article.php';
require_once 'price.php';
class PriceList extends Persistent {
	public $id;
	public $code;
	public $name;

	function __construct($mixed) {
		if (is_object ( $mixed )) {
			$this->id = isset ( $mixed->id ) ? $mixed->id : null;
			$this->name = isset ( $mixed->name ) ? $mixed->name : null;
			$this->code = isset ( $mixed->code ) ? $mixed->code : null;
		} else if (is_array ( $mixed )) {
			$this->id = isset ( $mixed ['id'] ) ? $mixed ['id'] : null;
			$this->name = isset ( $mixed ['name'] ) ? $mixed ['name'] : null;
			$this->code = isset ( $mixed ['code'] ) ? $mixed ['code'] : null;
		}
	}

	public function save() {
		if (is_null ( $this->id )) {
			$this->id = Persistent::insertQuery ( "INSERT INTO " . PriceList::tableName () . " (id, name, code) 
						   VALUES (NULL, '$this->name', '$this->code');" );
		} else {
			Persistent::executeQuery ( "update  " . PriceList::tableName () . "
						     set name = '$this->name', 
								 code = '$this->code'
						   where id= $this->id" );
		}
	}

	public static function findById($id) {
		$result = Persistent::query ( "select * from " . PriceList::tableName () . " where id = $id" );
		foreach ( $result as $row ) {
			return new PriceList ( $row );
		}
		return null;
	}

	public static function findAll() {
		$result = Persistent::query ( "select * from " . PriceList::tableName () );
		$priceLists = array ();
		foreach ( $result as $row ) {
			array_push ( $priceLists, new PriceList ( $row ) );
		}
		return $priceLists;
	}

	private static function tableName() {
		return 'A_PriceList';
	}
}

?>