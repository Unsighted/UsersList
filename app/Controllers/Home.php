<?php namespace App\Controllers;

class Home extends BaseController
{
	public function index()
	{
		return view('estructura/inicio').
				view('usuarios/lista').
			     view('estructura/cierre');
	}

	//--------------------------------------------------------------------

}
