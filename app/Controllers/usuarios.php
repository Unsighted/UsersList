<?php namespace App\Controllers;

use CodeIgniter\RESTful\ResourceController;

class Usuarios extends ResourceController
{
    protected $modelName = 'App\Models\ClienteModel';
    protected $format    = 'json';

     public function index()
     {
        return $this->genericResponse($this->model->findAll(),"", 200);
     }

     public function show($id = null)
     {
        
       $id = $this->request->getPost();
       $dataUser = $this->model->find($id);

        return $this->genericResponse($dataUser,"", 200);

     }
     

     public function create()
     {
       $saveData = $this->request->getPost();
        return $this->respond($this->model->insert($saveData));
     }


     public function update($id = null)
     {
        $id = $this->request->getPost('id');
        $updateData = $this->request->getPost();
        return $this->respond($this->model->update($id, $updateData));
     }
     
   
     public function delete($id = null)
     {
       
       $deleteData = $this->request->getPost();
        return $this->respond($this->model->delete($deleteData));
     }

     private function genericResponse($data, $msj, $code)
    {
 
        if ($code == 200) {
            return $this->respond(array(
                "data" => $data,
                "code" => $code
            )); //, 404, "No hay nada"
        } else {
            return $this->respond(array(
                "msj" => $msj,
                "code" => $code
            ));
        }

    }
 
}