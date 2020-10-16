<?php namespace App\Models;
use CodeIgniter\Database\ConnectionInterface;
use CodeIgniter\Model;
 
class ClienteModel extends Model
{
    protected $table = 'users';
    protected $primarykey = 'id';
 
    protected $allowedFields = ['nombre','apellido','email'];

}

?>