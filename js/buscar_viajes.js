var es_des=0;
var es_has=0;
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
	titulo=document.getElementById(titulo).value;
	autor=document.getElementById(autor).value;
	desde=document.getElementById(fecha_desde).value;
	hasta=document.getElementById(fecha_hasta).value;
	descrip=document.getElementById(descripcion).value;
	alert(titulo+autor+desde+hasta+descrip);
	return false;
}

function desde(numero)
{
		valor4="";
		nodo2=document.getElementById("es_1");
		while(nodo2.hasChildNodes())//con esto eliminamos todos los comentarios que hayan antes
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
}

function hasta(numero)
{
		valor4="";
		nodo2=document.getElementById("es_2");
		while(nodo2.hasChildNodes())//con esto eliminamos todos los comentarios que hayan antes
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
}