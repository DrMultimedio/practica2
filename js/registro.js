function comparaPassword(pass, pass2){
	if(pass != pass2){
		alert("son mazo diferentes");
		return false;
	}
	else
	{
		alert ("Son tope iguales");
		return true;
	}
}
function compruebaTam(file){

	alert(file.size);
}
function envio()
{
	alert("jose vciere");
	var pass=document.registro.password.value;
	var pass2=document.registro.password2.value;
	var file    = document.querySelector('input[type=file]').files[0];
	ok=true;
	if(!comparaPassword(pass,pass2))
	{
		document.getElementById("no").style.display = "initial";
	}
	compruebaTam(file);
	alert("sdsdada");
	return false;
}
function previsualizar() {
  var preview = document.querySelector('#fPerfil');
  var file    = document.querySelector('input[type=file]').files[0];
  var reader  = new FileReader();

  reader.onloadend = function () {
    preview.src = reader.result;
  }

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "";
  }
}

//-----------conexiones ajax registro
var obj;//esta variable global almacena la conexion ajax

//peticion que registra al usuario a= nombre, b=password, c=nombre, d=email, e=imagen 
function peticionAJAX_POST(a,b,c,d,e) 
{
	obj = crearObjAjax();
	if (obj) 
	{ 	
		// Si se ha creado el objeto, se completa la petición ...
		console.log("se empieza a procesar la peticion");
		console.log("la peticion es de caracter registro"); 
		args = "usu=" + a + "&pwd=" + b + "&nombre" + c + "&email" + d + "&foto" + e;
		obj.onreadystatechange = procesarCambio; // función callback: procesarCambio esto sirve para controlar los estados
		obj.open("POST", url, true); // Se crea petición POST a url, asíncrona("true")
		// Es necesario especificar la cabecera "Content-type" para peticiones POST
		obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		obj.send(args); // Se envía la petición
		console.log("se termina de procesar la informacion");
		//return false; //esto valdria si se hace la peticion directamente que no recargue el formulario
	}
}

//sirve para procesar los cambios
function procesarCambio()
{
	/**
	if(obj.readyState == 1)
	{
		document.getElementById("devuelto").innerHTML = "<progress value='25' max='100'></progress> ";
	}
	else if(obj.readyState == 2)
	{
		document.getElementById("devuelto").inne75TML = "<progress value='50' max='100'></progress> ";	
	}
	else if(obj.readyState == 3)
	{
		document.getElementById("devuelto").innerHTML = "<progress value='75' max='100'></progress> ";		
	}
	else if(obj.readyState == 4)
	{
		document.getElementById("devuelto").innerHTML = "<progress value='100' max='100'></progress> ";		
	}
	**/
	if(obj.readyState == 4)
	{ 
		// valor 4: respuesta recibida y lista para ser procesada
		if(obj.status == 200)
		{ 
			// El valor 200 significa "OK"
			// Aquí se procesa lo que se haya devuelto:
			console.log("se ha terminado la carga de datos -> devolviendo");//devolvemos mensaje por log
			confirmacion =JSON.parse(obj.responseText);//creamos el objeto confirmacion con los datos parseados
			zoom_activo(2,"Primera vez");//activamos el slider, 2 significa que muestre el mensaje de que ha funcionado correctamente
			setTimeout("redireccion_auto('login.html')",3*1000); //cuando pasan 3 segundos se redirecciona al index
		}
		else 
		{
			console.warn("no se ha podido completar la peticion ajax-html de registro");//devolvemos mensaje por log
			//zoom_activo();//activamos el slider sin opcion que significa que ha ido mal
		}
	}
}

//ACTIVA Y DESACTIVA LA PANTALLA SLIDER 
function zoom_activo(modo,fecha)
{
	ventana = document.getElementById('zoo');
	mensaje = document.getElementById('mensaje');
	if(!ventana.classList.contains('zoom_visible'))
	{
		subir();
		if(modo == 2)
		{
			mensaje.innerHTML = "<h2 style='color:green;'>Se ha registrado correctamente</h2><h4>Sera redireccionado automaticamente</h4><h6>Ultimo Acceso:"+fecha+"</h6>";
		}
		ventana.classList.add('zoom_visible');
		document.body.classList.add('bloqueo');
	}
	else
	{
		ventana.classList.remove('zoom_visible');
		document.body.classList.remove('bloqueo');
	}
}
//redireccionamos al login
function redireccion_auto(url)
{
	document.location.href=url;
}