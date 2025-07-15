<?php
require_once 'user.php';
require_once '../utils/emailHelper.php';
require_once 'persistent.php';
class Company extends Persistent {
	public $id;
	public $name;
	public $idPriceList;
	public $addresses;
	private static $siteName = "lalala";

	function __construct($mixed) {
		if (is_object ( $mixed )) {
			$this->id = isset ( $mixed->id ) ? $mixed->id : null;
			$this->name = isset ( $mixed->name ) ? $mixed->name : null;
			$this->idPriceList = isset ( $mixed->idPriceList ) ? $mixed->idPriceList : null;
			$this->addresses = isset ( $mixed->addresses ) ? $mixed->addresses : null;
		} else if (is_array ( $mixed )) {
			$this->id = isset ( $mixed ['id'] ) ? $mixed ['id'] : null;
			$this->name = isset ( $mixed ['name'] ) ? $mixed ['name'] : null;
			$this->idPriceList = isset ( $mixed ['idPriceList'] ) ? $mixed ['idPriceList'] : null;
			$this->addresses = isset ( $mixed ['addresses'] ) ? $mixed ['addresses'] : null;
		}
	}

	public function save() {
		if (is_null ( $this->id )) {
			$this->id = Persistent::insertQuery ( "INSERT INTO " . Company::tableName () . " (id, name, idPriceList, addresses) 
			             					 VALUES (NULL, '$this->name', '$this->idPriceList', '$this->addresses');" );
		} else {
			Persistent::executeQuery ( "update " . Company::tableName () . "
											     set name = '$this->name', 
											  idPriceList = '$this->idPriceList',
                                                addresses  = '$this->addresses'
										where id= $this->id" );
		}
	}

	public static function findById($id) {
		$result = Persistent::query ( "select * from " . Company::tableName () . " where id = $id" );
		foreach ( $result as $row ) {
			return new Company ( $row );
		}
		return null;
	}

	public static function findAll() {
		$result = Persistent::query ( "select * from " . Company::tableName () );
		$companies = array ();
		foreach ( $result as $row ) {
			$company = new Company ( $row );
			array_push ( $companies, $company );
		}
		return $companies;
	}

	public static function saveUser($user) {
		if ($user->isNew ()) {
			$company = Company::findById ( $user->idCompany );
			$user = User::create ( $user->fullName, $user->email, $company->id , $user->seeAllArticles);
			$siteName = Company::siteName ();
			EmailHelper::send ( $user->email, "Bienvenido a $siteName", "Fuiste dado de alta en $siteName, te invitamos a realizar los pedidos por este medio, pod&eacute;s ingresar
						con esta passwore: $user->password" );
		} else {
		    $user->save ();
		}
	}

	public static function tableName() {
		return 'Company';
	}

	private static function siteName() {
		return 'Ventas Cercanas';
	}
}

?>