function comprobar_storage()
{
	if(typeof(Storage)!=="undefined")
	{
		console.log("session storage compatible");
		return true;
	}
	else
	{
		console.warn("session storage no compatible");
		alert("su navegador no es compatible con esta funcion\npor favor actualice su navegador");
		return false;

	}
}

function arranque()
{
	comp=comprobar_storage();
	if(comp)
	{
		//comprobamos si esta logueado o no
		if(sessionStorage.getItem("login_session"))
		{
			//si esta logueado
			borrar_lista("Registro,Login");
		}
		else
		{
			//no esta logueado
			borrar_lista("Crear Viaje,Cerrar Sesion,Perfil");
		}
		
	}
	else
	{
		//Aqui meteremos un mensaje por defecto que salga si el navegador no es compatible
	}
}

function borrar_lista(a_borrar)
{
	lista=document.getElementById("menu_lista").getElementsByTagName("li");
	lista2=document.getElementById("menu_lista");
	borrar=a_borrar.split(",");
	for (var i=0; i<lista2.childNodes.length; i++)
	{
		if(lista2.childNodes[i].innerHTML != undefined)
		{
			for(var e=0; e<borrar.length; e++)
			{
				nombre = lista2.childNodes[i].getElementsByTagName("a")[0].innerHTML.replace(/<\/?[^>]+(>|$)/g, "");
				if(nombre == borrar[e])
				{
					while ( lista2.childNodes[i].length >= 1 )
					{
						lista2.childNodes[i].removeChild(lista2.childNodes[i].firstChild );
					}
					lista2.removeChild(lista2.childNodes[i]);
					borrar_lista(a_borrar);
					break;
				}
			}
		}
	}
}

function cerrar()
{
	sessionStorage.removeItem("login_session");
	redireccion();
}

function redireccion() { document.location.href="index.html";}