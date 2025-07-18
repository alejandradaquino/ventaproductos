<?php
require_once ('persistent.php');
require_once 'detail.php';
require_once 'order.php';
require_once 'user.php';
require_once 'company.php';
require_once 'configuration.php';
require_once '../utils/emailHelper.php';

class Order extends Persistent
{

    public $id;

    public $companyId;

    public $companyName;

    public $orderNumber;

    public $address;

    public $costCenter;

    public $observations;

    public $requesterUserId;

    public $requesterName;

    public $date;

    public $details;

    public function __construct($mixed)
    {
        $this->details = array();
        if (is_object($mixed)) {
            $this->id = isset($mixed->id) ? $mixed->id : null;
            $this->companyId = isset($mixed->companyId) ? $mixed->companyId : 0;
            $this->orderNumber = isset($mixed->orderNumber) ? $mixed->orderNumber : "";
            $this->address = isset($mixed->address) ? $mixed->address : "";
            $this->costCenter = isset($mixed->costCenter) ? $mixed->costCenter : "";
            $this->observations = isset($mixed->observations) ? $mixed->observations : "";
            $this->requesterUserId = isset($mixed->requesterUserId) ? $mixed->requesterUserId : 0;
            $this->date = isset($mixed->dateTime) ? $mixed->dateTime : "";
            $this->companyName = isset($mixed->companyName) ? $mixed->companyName : "";
            
            foreach ($mixed->details as $detail) {
                array_push($this->details, new Detail($detail));
            }
        } else if (is_array($mixed)) {
            $this->id = isset($mixed['id']) ? $mixed['id'] : null;
            $this->companyId = isset($mixed['companyId']) ? $mixed['companyId'] : 0;
            $this->orderNumber = isset($mixed['orderNumber']) ? $mixed['orderNumber'] : "";
            $this->address = isset($mixed['address']) ? $mixed['address'] : "";
            $this->costCenter = isset($mixed['costCenter']) ? $mixed['costCenter'] : "";
            $this->observations = isset($mixed['observations']) ? $mixed['observations'] : "";
            $this->requesterUserId = isset($mixed['requesterUserId']) ? $mixed['requesterUserId'] : 0;
            $this->date = isset($mixed['dateTime']) ? $mixed['dateTime'] : "";
            $this->companyName = isset($mixed['companyName']) ? $mixed['companyName'] : "";
            foreach ($mixed['details'] as $detail) {
                array_push($this->details, new Detail($detail));
            }
        }
        
        if (isset($this->id) && sizeof($this->details) == 0) {
            $persistentDetails = Detail::findByOrder($this->id);
            foreach ($persistentDetails as $persistentDetail) {
                array_push($this->details, $persistentDetail);
            }
            $this->requesterName = User::findById($this->requesterUserId)->fullName;
            $this->companyName = Company::findById($this->companyId)->name;
        }
    }

    public function save()
    {
        if (is_null($this->id)) {
            $this->id = Persistent::insertQuery("INSERT INTO " . Order::tableName() . "(id, companyId, orderNumber, address, costCenter, observations, requesterUserId) 
						   VALUES (NULL,$this->companyId, '$this->orderNumber', '$this->address',  '$this->costCenter', '$this->observations' , $this->requesterUserId );");
        } else {
            Persistent::executeQuery("update " . Order::tableName() . "
						     set   companyId = $this->companyId,
                                 orderNumber = '$this->orderNumber', 
								  costCenter = '$this->costCenter',  
								     address = '$this->address', 
						        observations = '$this->observations', 
						     requesterUserId =  $this->requesterUserId
						            where id =  $this->id");
        }
    }

    public static function findById($id)
    {
        $result = Persistent::query("select * from " . Order::tableName() . " where id = $id");
        foreach ($result as $row) {
            return new Order($row);
        }
        return null;
    }

    public static function findAll()
    {
        $result = Persistent::query("select * from " . Order::tableName(). " order by dateTime desc limit 30");
        $orders = array();
        foreach ($result as $row) {
            $order = new Order($row);
            array_push($orders, $order);
        }
        return $orders;
    }

    public static function findByCompanyAndRequester($companyId, $userId)
    {
        $result = Persistent::query("select * from " . Order::tableName() . " where companyId = $companyId  and requesterUserId = $userId order by dateTime desc LIMIT 30");
        $orders = array();
        foreach ($result as $row) {
            $order = new Order($row);
            array_push($orders, $order);
        }
        return $orders;
    }

    public static function saveOrder($json)
    {
        $order = new Order($json);
        $order->save();
        foreach ($json->details as $detailJson) {
            $detail = new Detail($detailJson);
            $detail->setOrderId($order->id);
            $detail->save();
        }
        $order->sendEmail();
    }

    public function total(){
        $total=0;
        foreach ($this->details as $detail) {
            $total = $total + $detail->total();
        }
        return $total;
    }
    
    private function sendEmail()
    {
        $user = User::findById($this->requesterUserId);
        $company = Company::findById($this->companyId);
        
        $orderHtml = "<b>Compan&iacute;a:</b> $company->name <br/> <br/>";
        $orderHtml .= "<b>Usuario solicitante:</b> $user->fullName <br/> <br/>";
        if($this->companyId != 3){
            $orderHtml .= "<b>N&uacute;mero: </b>$this->orderNumber <br/> <br/>";
            $orderHtml .= "<b>Centro de costos: </b>$this->costCenter <br/> <br/>";
        }
        $orderHtml .= "<b>Direcci&oacute;n: </b>$this->address <br/> <br/>";
        $orderHtml .= "<b>Observaciones: </b>$this->observations <br/><br/> <br/>";
        $orderHtml .= "<b>Detalles</b><br/><br/>";
        $orderHtml .= "<table style='width:100%;margin-bottom:15px;'><tr style='background-color:#eee;height:30px'>";
        $orderHtml .= "<th style='color:#666;text-align: left'>Art&iacute;culo</th>";
        $orderHtml .= "<th style='color:#666;text-align: right;'>Cantidad</th>";
        $orderHtml .= "<th style='color:#666;text-align: right;'>Precio</th>";
        $orderHtml .= "<th style='color:#666;text-align: right;'>Subtotal</th></tr>";
        foreach ($this->details as $detail) {
            $orderHtml .= "<tr>" . $detail->html() . "</tr>";
        }
        $orderHtml .= "<tr><td colspan='3'>Total</td><td style='text-align:right'>$ ".number_format($this->total(), 2, '.', '')."</td></tr>";
        $orderHtml .= "</table>";
        
        $userHtml = "Hola $user->fullName,<br/>Recibimos su pedido:<br/><br/> $orderHtml";
        $userHtml .= "Nos comunicaremos a la brevedad.<br/>";
        $userHtml .= "Cercana, proveedor de empresas";

        EmailHelper::send(Configuration::emailReciever(), "[Ventas Cercana] Nuevo pedido", $orderHtml);
        EmailHelper::send($user->email, "Pedido recibido", $userHtml);
    }

    private static function tableName()
    {
        return 'A_Orders';
    }
}

?>