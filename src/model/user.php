<?php
require_once 'persistent.php';
require_once 'company.php';
require_once 'configuration.php';
require_once '../utils/emailHelper.php';

class User extends Persistent
{

    public $id;

    public $fullName;

    public $email;

    public $password;

    public $idCompany;

    public $company;

    public $deleted;

    public $seeAllArticles;

    function __construct($mixed)
    {
        if (is_object($mixed)) {
            $this->id = isset($mixed->id) ? $mixed->id : null;
            $this->fullName = isset($mixed->fullName) ? $mixed->fullName : null;
            $this->email = isset($mixed->email) ? $mixed->email : null;
            $this->password = isset($mixed->password) ? $mixed->password : null;
            $this->idCompany = isset($mixed->idCompany) ? $mixed->idCompany : null;
            $this->deleted = (bool) (isset($mixed->deleted) && $mixed->deleted == 1 ? true : false);
            $this->seeAllArticles = (bool) (isset($mixed->seeAllArticles) && $mixed->seeAllArticles == 1 ? true : false);
        } else if (is_array($mixed)) {
            $this->id = isset($mixed['id']) ? $mixed['id'] : null;
            $this->fullName = isset($mixed['fullName']) ? $mixed['fullName'] : null;
            $this->email = isset($mixed['email']) ? $mixed['email'] : null;
            $this->password = isset($mixed['password']) ? $mixed['password'] : null;
            $this->idCompany = isset($mixed['idCompany']) ? $mixed['idCompany'] : null;
            $this->deleted = (bool) (isset($mixed['deleted']) && $mixed['deleted'] == 1 ? true : false);
            $this->seeAllArticles = (bool) (isset($mixed['seeAllArticles']) && $mixed['seeAllArticles'] == 1 ? true : false);
        }

        if($this->idCompany > 0){
            $this->company = Company::findById($this->idCompany);
        }
    }

    public function getPassword()
    {
        return $this->password;
    }

    public function isNew()
    {
        return is_null($this->id);
    }

    public static function create($fullName, $email, $idCompany, $seeAllArticles)
    {
        $user = new self(array(
            "fullName" => $fullName,
            "email" => $email,
            "idCompany" => $idCompany,
            "password" => User::randomPassword(),
            "deleted" => false,
            "seeAllArticles" => $seeAllArticles
        ));
        $user->save();
        return $user;
    }

    public function updatePassowrd($oldPassword, $newPassword)
    {
        if ($this->password != $oldPassword) {
            return "La password vieja es incorrecta";
        }
        $this->password = $newPassword;
        $this->save();
        return "La password se actualizó correctamente";
    }

    private static function randomPassword()
    {
        $alphabet = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890';
        $pass = array(); // remember to declare $pass as an array
        $alphaLength = strlen($alphabet) - 1; // put the length -1 in cache
        for ($i = 0; $i < 8; $i ++) {
            $n = rand(0, $alphaLength);
            $pass[] = $alphabet[$n];
        }
        return implode($pass); // turn the array into a string
    }

    public function resetPassword(){
        $this->password = User::randomPassword();
        $this->save();
        $siteName = User::siteName();
        EmailHelper::send ( $this->email, "Hola $this->fullName", 
            "Se actualizó tu password en $siteName, 
                la nueva password es: $this->password" );
        EmailHelper::send ( Configuration::emailReciever(), "Hola $this->fullName", 
            "Se actualizó la password en $siteName, 
                la nueva password es: $this->password" );
        
    }
    
    public function save()
    { 
        $seeAll = 'false';
        if ($this->seeAllArticles == 1 || $this->seeAllArticles == true) {
            $seeAll = 'true';
        }
           
        if ($this->isNew()) {
            $this->id = Persistent::insertQuery("INSERT INTO " . User::tableName() . " (id, fullName, email, password, idCompany, seeAllArticles, deleted) 
					      VALUES (NULL, '$this->fullName', '$this->email', '$this->password', $this->idCompany, $seeAll, false);");
                
            if($this->idPriceList >0){
                EmailHelper::send($this->email, "Usuario habilitado en Cercana", " Se habilit&oacute; tu usuario para operar en ".User::siteName().". <br> Ingres&aacute; y carg&aacute; tus pedidos! (pass: $this->password )" );
            }
            EmailHelper::send (Configuration::emailReciever(), "Nuevo usuario  en $siteName", " Se cargó un usuario para operar en ".User::siteName().". <br> Pass: $this->password ");
      } else {
            if(User::findById($this->id)->idPriceList == 0 && $this->idPriceList >0){
                $siteName = User::siteName();
                EmailHelper::send($this->email, "Usuario habilitado en $siteName", " Se habilit&oacute; tu usuario para operar en ".User::siteName().". <br> Ingres&aacute; y carg&aacute; tus pedidos! (pass: $this->password )" );
                EmailHelper::send (Configuration::emailReciever(), "Nuevo usuario habilitado en $siteName", " Se habilit&oacute; tu usuario para operar en ".User::siteName().". <br> Pass: $this->password ");
            }
            $del = 'false';
            if ($this->deleted == 1 || $this->deleted == true) {
                $del = 'true';
            }
            Persistent::executeQuery("update " . User::tableName() . "
						     set fullName = '$this->fullName', 
								 email = '$this->email', 
                              password = '$this->password', 
                        seeAllArticles = $seeAll,
						       deleted = $del
						      where id = $this->id");
        }
    }

    public static function findById($id)
    {
        $result = Persistent::query("select * from " . User::tableName() . " where id = $id");
        foreach ($result as $row) {
            $user = new User($row);
            $user->company = Company::findById($user->idCompany);
            return $user;
        }
        return null;
    }

    public static function findByEmail($email)
    {
        $result = Persistent::query("select * from " . User::tableName() . " where email = '$email' and deleted = false and idCompany > 0");
        foreach ($result as $row) {
            return new User($row);
        }
        return null;
    }

    public static function findAll($idCompany, $viewDeleted)
    {
        $result = Persistent::query("select * from " . User::tableName() . " where " . ($viewDeleted == 'true' ? " deleted = true" : " deleted = false"));
        $users = array();
        foreach ($result as $row) {
            $user = new User($row);
            array_push($users, $user);
        }
        return $users;
    }

    public static function delete($userId)
    {
        Persistent::executeQuery("update " . User::tableName() . "
						     set deleted = true
						      where id= $userId");
    }

    public static function reenable($userId)
    {
        Persistent::executeQuery("update " . User::tableName() . "
						     set deleted = false
						      where id= $userId");
    }

    private static function tableName()
    {
        return 'A_User';
    }

    public function checkLogin()
    {
        $result = Persistent::query("select * from " . User::tableName() . " where 
                email = '$this->email'
                and password = '$this->password'
                and deleted = false");
        foreach ($result as $row) {
            return new User($row);
        }
        return null;
    }

    public function isBackoffice()
    {
        return $this->idCompany <= 0;
    }

    public static function registrateUser($user)
    {
        if ($user->isNew()) {
            if (User::findByEmail($user->email) != null) {
                return "Ya existe una cuenta con este email. Si olvidó su contraseña solicite el reenvío de la misma";
            }
            $user = User::create($user->fullName, $user->email, 4, true);
            $siteName = User::siteName();
            EmailHelper::send($user->email, "Bienvenido a $siteName", " Proximamente se habilitar&aacute; tu usuario para poder realizar pedidos, mientras tanto pod&eacute;s ingresar
                        con esta password: $user->password");
        } else {
            $user->save();
        }
        return "OK";
    }

    public static function siteName()
    {
        return 'Ale Ventas';
    }    
}
