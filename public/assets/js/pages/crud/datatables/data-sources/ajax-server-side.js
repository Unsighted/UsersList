
"use strict";
var KTDatatablesDataSourceAjaxServer = function() {

	var initTable1 = function() {
		var table = $('#kt_datatable');

		// begin first table
		table.DataTable({
			   responsive: true,
			   searchDelay: 500,
			   processing: true,
			 //serverSide: true,
			ajax: {
				url: 'http://localhost/ganga-hoteles/usuarios',
				type: 'GET',
				dataSrc: 'data',
			},
			
			columns: [
				{data: 'nombre'},
				{data: 'apellido'},
				{data: 'email'},
				{data: null, responsivePriority: -1},
			],
			columnDefs: [
				{
					targets: -1,
					title: 'Actions',
					orderable: false,
					render: function(data, type, full, meta) {

						var a =  `
							<a href="#" id="editar" value="${data.id}" class="btn btn-sm btn-success btn-icon" title="Edit details">
								<i class="flaticon2-edit"></i>
							</a>
						
							<a href="#" id="del" value="${data.id}" class="btn btn-sm btn-danger btn-icon" title="Delete">
								<i class="la la-trash"></i>
							</a>
							
						
							<div id="editModal" class="modal fade">  
							<div class="modal-dialog">  
								 <form id="edit_form">  
									  <div class="modal-content">  
										   <div class="modal-header">  
												<button type="button" class="close" data-dismiss="modal">&times;</button>  
												<h4 class="modal-title">Edit user</h4>  
										   </div>  
										   <div class="modal-body"> 
										   	<input  type="hidden" id="id" value="${data.id}" class=""></input> 
												<label>Name</label>  
												<input type="text" name="nombre" id="nombre" class="form-control" />  
												<br />  
												<label>Surname</label>  
												<input type="text" name="apellido" id="apellido" class="form-control" />  
												<br />  
												<label>Email</label>  
												<input type="text" name="email" id="email" class="form-control" />   
										   </div>  
										   <div class="modal-footer">  
												<input type="submit" name="edit" id="edit" class="btn btn-success" value="Edit" />  
												<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>  
										   </div>  
									  </div>  
								 </form>  
							</div>  
					   </div>  

					   <div id="addModal" class="modal fade">  
							<div class="modal-dialog">  
								 <form id="add_form">  
									  <div class="modal-content">  
										   <div class="modal-header">  
												<button type="button" class="close" data-dismiss="modal">&times;</button>  
												<h4 class="modal-title">Add user</h4>  
										   </div>  
										   <div class="modal-body"> 
										   	
												<label>Name</label>  
												<input type="text" name="nombre" id="nombre" class="form-control" />  
												<br />  
												<label>Surname</label>  
												<input type="text" name="apellido" id="apellido" class="form-control" />  
												<br />  
												<label>Email</label>  
												<input type="text" name="email" id="email" class="form-control" />   
										   </div>  
										   <div class="modal-footer">  
												<input type="submit" name="add" id="add" class="btn btn-success" value="Add" />  
												<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>  
										   </div>  
									  </div>  
								 </form>  
							</div>  
					   </div>
							`;

						

						return a;
					},
				},
			],
		});
	};

	return {

		//main function to initiate the module
		init: function() {
			initTable1();
		},

	};

}();

jQuery(document).ready(function() {
	KTDatatablesDataSourceAjaxServer.init();
});


$(document).on('click', '#del', function(e){
	e.preventDefault();
	
	var del_id = $(this).attr('value');
	
	$.ajax({
		url: 'http://localhost/ganga-hoteles/usuarios/delete',
		type: 'POST',
		dataType: 'json',
		data: {
			id: del_id,
		},
		success: function(){
			$('#kt_datatable').DataTable().ajax.reload();
		}
	});
})

$(document).on('click', '#editar', function(e){
	e.preventDefault();

	var edit_id = $(this).attr('value');
	
	$.ajax({
		url: 'http://localhost/ganga-hoteles/usuarios/show',
		type: 'POST',
		dataType: 'json',
		data: {
			id: edit_id,
		},
		success: function(data){
			$('#editModal').modal('show');
			$('#id').val(data.data['0']['id']);
			$('#nombre').val(data.data['0']['nombre']);
			$('#apellido').val(data.data['0']['apellido']);  
			$('#email').val(data.data['0']['email']);
		}
	});
})


$(document).on('submit', '#edit_form', function(event){  
	event.preventDefault(); 

	var id = $('#id').val();
	var nombre = $('#nombre').val();  
	var apellido = $('#apellido').val();  
	var email = $('#email').val();  
	
	if(nombre != '' && apellido != '' && email != '')  
	{  
		 $.ajax({  
			  url: 'http://localhost/ganga-hoteles/usuarios/update',  
			  type: 'POST',
			  dataType: 'json',
			  data: {
			  id: id,
			  nombre: nombre,
			  apellido: apellido,
			  email: email,
			}, 
			  success:function()  
			  {  
				   
				   $('#edit_form')[0].reset();  
				   $('#editModal').modal('hide');  
				   $('#kt_datatable').DataTable().ajax.reload();
			  }  
		 })  
	}
})  

$('#btnadd').on('click', function(e){
	$('#addModal').modal('show'); 
	e.preventDefault();  
})

$(document).on('submit', '#add_form', function(event){
	event.preventDefault();  
	
	$.ajax({  
		url: 'http://localhost/ganga-hoteles/usuarios/create',  
		method:'POST',  
		data:new FormData(this),  
		contentType:false,  
		processData:false,  
		success:function(data)  
		{  
			   
			 $('#add_form')[0].reset();  
			 $('#addModal').modal('hide');  
			 $('#kt_datatable').DataTable().ajax.reload();
		}  
   })  
});
