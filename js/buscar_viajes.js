var es_des=0;//numero de estrellas desde
var es_has=0;//numero de estrellas hasta
var pagina=0;//guardamos en que pagina estamos
var campos="";//guardamos los campos recogidos
var resultado="";//almacenamos el resultado de la busqueda
var tipo_busqueda=1;//tipo de busqueda por defecto es global

function run_p()
{
	console.log("ejecutando arranque personalizado para buscador, vamos a revisar si estamos en la pagina correcta");
	var loc = document.location.href;
	if(loc.indexOf('?') > 0)
	{
		console.log('existen argumentos');
		var cadena_argumentos = loc.split('?')[1];
		var argumentos = cadena_argumentos.split('&');
		if(argumentos[0])
		{
			if(argumentos[0].indexOf('id=') >= 0)
			{
				id_viaje = argumentos[0].split('id=')[1];
				console.log("id encontrado "+id_viaje);
				viaje_valido=true;
			}
			else
			{
				console.log('no existe el id en el primer argumento');			
			}
		}
	}
	else
	{
		console.log('no existen argumentos');
	}
}

function buscar()
{
	titulo=document.getElementById("titulo").value;
	autor=document.getElementById("autor").value;
	desde=document.getElementById("fecha_desde").value;
	hasta=document.getElementById("fecha_hasta").value;
	descrip=document.getElementById("descripcion").value;
	if(tipo_busqueda == 1)//busqueda inteligente
	{
		campos="?";
		if(titulo != "")
		{
			campos=campos+"n="+titulo;
		}

		if(autor != "")
		{
			if(campos == "?")
			{
				campos=campos+"l="+autor;
			}
			else
			{
				campos=campos+"&l="+autor;	
			}
		}

		if(descrip != "")
		{
			if(campos == "?")
			{
				campos=campos+"d="+descrip;
			}
			else
			{
				campos=campos+"&d="+descrip;	
			}
		}

		if(es_valida_la_fecha(desde) && desde != "")
		{
			if(campos == "?")
			{
				campos=campos+"fi="+desde;
			}
			else
			{
				campos=campos+"&fi="+desde;	
			}
		}

		if(es_valida_la_fecha(hasta) && hasta != "")
		{
			if(campos == "?")
			{
				campos=campos+"ff="+hasta;
			}
			else
			{
				campos=campos+"&ff="+hasta;	
			}	
		}

		if(es_des != 0)
		{
			if(campos == "?")
			{
				campos=campos+"vi="+es_des;
			}
			else
			{
				campos=campos+"&&vi="+es_des;	
			}
		}

		if(es_has != 0)
		{
			if(campos == "?")
			{
				campos=campos+"vf="+es_has;
			}
			else
			{
				campos=campos+"&&vf="+es_has;	
			}
		}
		peticionAJAX_GET();
	}
	else
	{
		campos="?n="+titulo+"&d="+descrip+"";
		if(es_valida_la_fecha(desde))
		{
			campos=campos+"&fi="+desde;
		}
		if(es_valida_la_fecha(hasta))
		{
			campos=campos+"&ff="+hasta;	
		}
	}
	return false;
}

function desde(numero)
{
		valor4="";
		nodo2=document.getElementById("es_1");
		while(nodo2.hasChildNodes())//con esto eliminamos todas las estrellas
		{
			nodo2.removeChild(nodo2.firstChild);	
		}
		for(h=1;h <= 5;h++)
		{
			if(h <= numero)
			{
				valor4=valor4+"<span class='icon-star' style='color:red;' onclick='desde("+h+");'></span>";	
			}
			else
			{
				valor4=valor4+"<span class='icon-star' onclick='desde("+h+");'></span>";
			}
		}
		nodo2.innerHTML=valor4;
		es_des=numero;
}

function hasta(numero)
{
		valor4="";
		nodo2=document.getElementById("es_2");
		while(nodo2.hasChildNodes())//con esto eliminamos todas las estrellas
		{
			nodo2.removeChild(nodo2.firstChild);	
		}
		for(h=1;h <= 5;h++)
		{
			if(h <= numero)
			{
				valor4=valor4+"<span class='icon-star' style='color:red;' onclick='hasta("+h+");'></span>";	
			}
			else
			{
				valor4=valor4+"<span class='icon-star' onclick='hasta("+h+");'></span>";
			}
		}
		nodo2.innerHTML=valor4;
		es_has=numero;
}

//se ocupa de seleccionar el tipo de busqueda entre nombre o nombre y descripcion
function tipo(numero)
{
	if(numero == 1)//este tipo de busqueda solo busca en los nombres
	{
		tipo_busqueda=numero;
	}
	else if(numero == 2)//este tipo de busqueda busca en nombres y descripcion
	{
		tipo_busqueda=numero;
	}
}
//peticion para ajax de la busqueda
function peticionAJAX_GET()
{
	obj= crearObjAjax();
	if(obj) 
	{
		// Si se ha creado el objeto, se completa la petición ...
		// Se establece la función (callback) a la que llamar cuando cambie el estado:
		obj.onreadystatechange= procesarCambio; // función callback: procesarCambio para viaje
		obj.open("GET","/practica2/rest/viaje/"+campos, true); // Se crea petición GET a url, asincrona ("true")
		obj.send(); // Se envia la petición
	}
}
//procesamos los cambios de busqueda
function procesarCambio()
{
	if(obj.readyState == 4)
	{ 
		// valor 4: respuesta recibida y lista para ser procesada
		if(obj.status == 200)
		{ 
			// El valor 200 significa "OK"
			// Aqui se procesa lo que se haya devuelto:
			console.log("se ha terminado la carga de datos de la busqueda -> devolviendo");//devolvemos mensaje por log
			resultado=JSON.parse(obj.responseText);//creamos el objeto datos con los datos parseados
			alert(obj.responseText);
		}
		else 
		{
			console.warn("no se ha podido completar la peticion ajax-html de la busqueda");//devolvemos mensaje por log
		}
	}
}
//comprobamos que una fecha es valida
function es_valida_la_fecha(fecha_a_comprobar)
{
	return true;
	/*reg=/^(\d{2})[-\/](\d{2})[-\/](\d{4})$/;
	if(fecha_a_comprobar.match(reg).length > 0)
	{
		return true;
	}
	return false;*/
}
