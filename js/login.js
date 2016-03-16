var obj; // variable global que guarda el objeto XMLHttpRequest

function entrar(formulario)
{
	usu = formulario.userlogin.value;
	pass = formulario.password.value;
	peticionAJAX_GET("/practica2/rest/get/login.php",usu,pass);
	return false;
}

function crearObjAjax()
{
	var xmlhttp;
	if(window.XMLHttpRequest) 
	{ 
		// Objeto nativo
		xmlhttp= new XMLHttpRequest(); // Se obtiene el nuevo objeto
		console.log("Detectado tipo de protocolo: estandar");
	} 
	else if(window.ActiveXObject) 
	{ 
		// IE(Windows): objectoActiveX
		xmlhttp= new ActiveXObject("Microsoft.XMLHTTP");
		console.log("Detectado tipo de protocolo: windows");
	}
	return xmlhttp;
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


function peticionAJAX_POST(url) 
{
	obj = crearObjAjax();
	if (obj) 
	{ 	
		// Si se ha creado el objeto, se completa la petición ...
		// Argumentos:
		console.log("se empieza a procesar la peticion");
		if(url == "/practica2/rest/post/login/")
		{
			console.log("la peticion es de caracter login");
			var login = document.getElementById("userlogin").value;
			var pass = document.getElementById("password").value;
		}
		var args = "login=" + login + "&pwd=" + pass;
		args += "&v=" + (new Date()).getTime(); // Truco: evita utilizar la cache
		// Se establece la función (callback) a la que llamar cuando cambie el estado:
		obj.onreadystatechange = procesarCambio(url); // función callback: procesarCambio
		obj.open("POST", url, true); // Se crea petición POST a url, asíncrona("true")
		// Es necesario especificar la cabecera "Content-type" para peticiones POST
		obj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		obj.send(args); // Se envía la petición
		console.log("se termina de procesar la informacion");
		return false;
	}
}

function procesarCambio(url)
{
	if(obj.readyState == 4)
	{ 
		// valor 4: respuesta recibida y lista para ser procesada
		if(obj.status == 200)
		{ 
			// El valor 200 significa "OK"
			// Aquí se procesa lo que se haya devuelto:
			console.log("se ha terminado la carga de datos");
			document.getElementById("devuelto").innerHTML = obj.responseText;
		}
		else 
		{
			console.warn("no se ha podido completar la peticion html");
			alert("Hubo un problema con los datos devueltos"); // ERROR
		}
	}
}