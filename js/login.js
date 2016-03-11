varobj; // variable global que guarda el objeto XMLHttpRequest

function entrar(formulario)
{
	usu = formulario.userlogin.value;
	pass = formulario.password.value;
	peticionAJAX_GET("/practica2/rest/get/login.php",usu,pass);
	return false;
}

function crearObjAjax()
{
	varxmlhttp;
	if(window.XMLHttpRequest) 
	{ 
		// Objeto nativo
		xmlhttp= new XMLHttpRequest(); // Se obtiene el nuevo objeto
	} 
	elseif(window.ActiveXObject) 
	{ 
		// IE(Windows): objectoActiveX
		xmlhttp= new ActiveXObject("Microsoft.XMLHTTP");
	}
	returnxmlhttp;
}



function peticionAJAX_GET(url,u,p) 
{
	obj= crearObjAjax();
	if(obj) 
	{ 
		// Si se ha creado el objeto, se completa la petición ...
		var login= u; // Se preparan los
		var pass= p; // argumentos ...
		url+= "?l=" + login+ "&p=" + pass; // se añaden los argumentos a la url
		url+= "&v=" + (new Date()).getTime(); // Truco: evita utilizar la cache
		// Se establece la función (callback) a la que llamar cuando cambie el estado:
		obj.onreadystatechange= procesarCambio; // función callback: procesarCambio
		obj.open("GET", url, true); // Se crea petición GET a url, asíncrona ("true")
		obj.send(); // Se envía la petición
	}
}
