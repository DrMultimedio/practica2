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
		// Si se ha creado el objeto, se completa la petici�n ...
		var login= u; // Se preparan los
		var pass= p; // argumentos ...
		url+= "?l=" + login+ "&p=" + pass; // se a�aden los argumentos a la url
		url+= "&v=" + (new Date()).getTime(); // Truco: evita utilizar la cache
		// Se establece la funci�n (callback) a la que llamar cuando cambie el estado:
		obj.onreadystatechange= procesarCambio; // funci�n callback: procesarCambio
		obj.open("GET", url, true); // Se crea petici�n GET a url, as�ncrona ("true")
		obj.send(); // Se env�a la petici�n
	}
}
