var obj;
var datos;
function peticionAJAX_GET(url) 
{
	obj= crearObjAjax();
	if(obj) 
	{ 
		// Si se ha creado el objeto, se completa la petición ...
		// Se establece la función (callback) a la que llamar cuando cambie el estado:
		obj.onreadystatechange= procesarCambio; // función callback: procesarCambio
		obj.open("GET",url, true); // Se crea petición GET a url, asíncrona ("true")
		obj.send(); // Se envía la petición
	}
}

function procesarCambio()
{
	if(obj.readyState == 4)
	{ 
		// valor 4: respuesta recibida y lista para ser procesada
		if(obj.status == 200)
		{ 
			// El valor 200 significa "OK"
			// Aquí se procesa lo que se haya devuelto:
			console.log("se ha terminado la carga de datos -> devolviendo");//devolvemos mensaje por log
			datos =JSON.parse(obj.responseText);//creamos el objeto datos con los datos parseados
			alert(obj.responseText);
		}
		else 
		{
			console.warn("no se ha podido completar la peticion ajax-html de index");//devolvemos mensaje por log
			//zoom_activo();//activamos el slider sin opcion que significa que ha ido mal
		}
	}
}

//arranque para el index
function arranque_personalizado()
{
	peticionAJAX_GET("/practica2/rest/get/comentario.php?u=10");//conexion para los comentarios
	peticionAJAX_GET("/practica2/rest/get/viaje.php?u=6");//conexion para las entradas
	foormatear_entradas(datos);//mostramos la informacion en la pagina 
	
	foormatear_comentarios(datos);//mostramos la informacion en la pagina 
}

//mostrar datos en section
function foormatear_entradas(a)
{

}

//mostrar datos en comentarios
function foormatear_comentarios(b)
{

}