<?php
abstract class Persistent {
     private static $dbname = "wp_mkyed";
    private static $servername = "localhost";
    private static $username = "adaquino_adaquino";
    private static $password = "c[s+WaUm76XQ14";
		
	

	static function executeQuery($query) {
		try {
			$conn = Persistent::getConnection ();
			$conn->exec ( $query );
		} catch ( PDOException $e ) {
			echo "Connection failed executing query ($query): " . $e->getMessage ();
		}
	}

	static function insertQuery($query) {
		try {
			$conn = Persistent::getConnection ();
			$conn->exec ( $query );
			return $conn->lastInsertId ();
		} catch ( PDOException $e ) {
			echo "Connection failed executing query ($query): " . $e->getMessage ();
		}
	}

	static function getConnection() {
		$conn = new PDO ( "mysql:host=" . Persistent::$servername . ";dbname=" . Persistent::$dbname, Persistent::$username, Persistent::$password ,
		array(
			PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES utf8"
		));
		$conn->setAttribute ( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
	//	mysqli_set_charset( $conn, 'utf8');
		return $conn;
	}

	static function query($query) {
		try {
			$conn = Persistent::getConnection ();
			$result = $conn->query ( $query );
			return $result;
		} catch ( PDOException $e ) {
			echo "Connection failed executing query ($query): " . $e->getMessage ();
		}
	}

	abstract function save();
}

?>