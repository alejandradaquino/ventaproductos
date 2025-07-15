<?php
require_once 'persistent.php';

class Session extends Persistent
{

    public $id;

    public $idUser;

    public $token;

    function __construct($mixed)
    {
        if (is_object($mixed)) {
            $this->id = isset($mixed->id) ? $mixed->id : null;
            $this->idUser = isset($mixed->idUser) ? $mixed->idUser : null;
            $this->token = isset($mixed->token) ? $mixed->token : null;
        } else if (is_array($mixed)) {
            $this->id = isset($mixed['id']) ? $mixed['id'] : null;
            $this->idUser = isset($mixed['idUser']) ? $mixed['idUser'] : null;
            $this->token = isset($mixed['token']) ? $mixed['token'] : null;
        }
    }

    public function save()
    {
        if ($this->isNew()) {
            $this->id = Persistent::insertQuery("INSERT INTO " . Session::tableName() . " (id, idUser, token)
		      VALUES (NULL, $this->idUser, '$this->token');");
        } else {
            Persistent::executeQuery("update " . Session::tableName() . "
						     set token = '$this->token',
								 idUser = $this->idUser
						      where id= $this->id");
        }
    }

    public function isNew()
    {
        return is_null($this->id);
    }

    private static function randomToken()
    {
        $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        $pass = array(); // remember to declare $pass as an array
        $alphaLength = strlen($alphabet) - 1; // put the length -1 in cache
        for ($i = 0; $i < 60; $i ++) {
            $n = rand(0, $alphaLength);
            $pass[] = $alphabet[$n];
        }
        return implode($pass); // turn the array into a string
    }

    private static function tableName()
    {
        return 'Session';
    }

    public static function newSession($idUser)
    {
        $session = new Session(array () );
        $session->idUser = $idUser;
        $session->token = Session::randomToken();
        $session->save();
        return $session->token;
    }

    public static function userIdBySession($token)
    {
        Persistent::executeQuery("delete from " . Session::tableName() . "
								   where DATE_ADD(dateTime, INTERVAL 1 DAY) < now()");
        $result = Persistent::query("select * from " . Session::tableName() . "
						           where token = '$token'");
        foreach ($result as $row) {
            $session = new Session($row);
            return $session->idUser;
        }
        return null;
    }
}

?>