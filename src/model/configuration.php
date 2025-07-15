<?php
require_once 'persistent.php';

class Configuration extends Persistent
{

    public $id;
    public $email;
    public $telefono;

    public function __construct($mixed)
    {
        if (is_object($mixed)) {
            $this->id = isset($mixed->id) ? $mixed->id : null;
            $this->email = isset($mixed->email) ? $mixed->email : null;
            $this->telefono = isset($mixed->telefono) ? $mixed->telefono : null;
        } else if (is_array($mixed)) {
            $this->id = isset($mixed['id']) ? $mixed['id'] : null;
            $this->email = isset($mixed['email']) ? $mixed['email'] : null;
            $this->telefono = isset($mixed['telefono']) ? $mixed['telefono'] : null;
        }
    }

    public function save()
    {
        if (is_null($this->id)) {
            $this->id = Persistent::insertQuery("INSERT INTO " . Configuration::tableName() . " (id, email, telefono) 
					VALUES (NULL, '$this->email', '$this->telefono');");
        } else {
            Persistent::executeQuery("update " . Price::tableName() . " set 
						    email = '$this->email'
                         telefono = '$this->telefono'
						 where id =  $this->id");
        }
    }

    public static function find()
    {
        $result = Persistent::query("select * from " . Configuration::tableName());
        foreach ($result as $row) {
            return new Configuration($row);
        }
        $configuration = new Configuration();
        $configuration->email='alejandradaquino@gmail.com';
        $configuration->telefono='54 11 111 1111';
        $configuration->save();
        return $configuration;
    }


    private static function tableName()
    {
        return 'Configuration';
    }
    
    
    public static function emailReciever()
    {
        return Configuration::find()->email;
    }
}

?>