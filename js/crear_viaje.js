var valora=0;

function arranque_per(){
	if(!sessionStorage.getItem("login_session"))
	{
		document.location.href="login.html";
	}
	document.getElementById("crearviaje_cont_img").style.display = "none";//parece una tonteria, pero no se puede comprobar 
	//estilo css desde javascript, asi que reescribo la propiedad
}

function subirfotopushed(){
	if(document.getElementById("crearviaje_cont_img").style.display == "none"){
		document.getElementById("crearviaje_cont_img").style.display = "initial";
	}
	else{
		document.getElementById("crearviaje_cont_img").style.display = "none";
	}

}

function previsualizar() {
  var preview = document.querySelector('#fotoviaje1');
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

	var i = 1;

function subir_foto(){
	if(document.getElementById("crearviaje_cont_img").style.display == "none"){
		document.getElementById("crearviaje_cont_img").style.display = "initial";
	}
	else{
	var div = document.getElementById('crearviaje_cont_img');
	clone = div.cloneNode(true);
	clone.id = i;
	i++;
	document.getElementById('crearviaje_cont_img').appendChild(clone);	
}

}
function borrar_foto(j){
	if(j.parentNode.id = crearviaje_cont_img){ // si es el original, lo oculto
 		j.parentNode.removeChild(j);
 }
 	else{
 		document.getElementById("crearviaje_cont_img").style.display = "none";

 	}
}

function envio()
{
	peticionAJAX_POST();
	return false;
}

function valorac(numero)
{
		valor4="";
		nodo2=document.getElementById("valoraciones");
		while(nodo2.hasChildNodes())//con esto eliminamos todas las estrellas
		{
			nodo2.removeChild(nodo2.firstChild);	
		}
		for(h=1;h <= 5;h++)
		{
			if(h <= numero)
			{
				valor4=valor4+"<span class='icon-star' style='color:red;' onclick='valorac("+h+");'></span>";	
			}
			else
			{
				valor4=valor4+"<span class='icon-star' onclick='valorac("+h+");'></span>";
			}
		}
		nodo2.innerHTML=valor4;
		valora=numero;
}

function peticionAJAX_POST(){//peticion ajax para crear un usuario
	url = "rest/viaje/";
	obj3 = crearObjAjax();
	if(obj3)
	{
		var fd = new FormData();//formdata agrupa los datos segun clave/valor y los interpreta en el php como las variables de siempre [clave]
		var ti = document.getElementById("titulo").value;
		var fh = document.getElementById("fecha_hasta").value;
		var fde = document.getElementById("fecha_desde").value;
		var des = document.getElementById("descripcion").value;
		//var foto =  document.querySelector('input[type=file]').files[0];
		if(sessionStorage.getItem("login_session"))
		{
				fd.append("clave",JSON.parse(sessionStorage.getItem("login_session")).CLAVE);
				fd.append("login",JSON.parse(sessionStorage.getItem("login_session")).LOGIN);		
		}
		fd.append("nombre",ti);//asi agregamos el valor y el nombre de la variable
		fd.append("descripcion",des);
		fd.append("fi",fh);
		fd.append("ff",fde);
		fd.append("v",valora);
		obj3.onreadystatechange = procesarCambio3;
		obj3.open("POST", url, true);
		//obj3.setRequestHeader("Content-type", "application/x-www-form-urlencoded"); no nos hace falta con formdata
		obj3.send(fd);//enviamos el formdata
	}
}

function procesarCambio3(){ //finalmente, registramos el usuario


	if(obj3.readyState == 4){
		// valor 4: respuesta recibida y lista para ser procesada
		if(obj3.status == 200)
		{
			ver=JSON.parse(obj3.responseText);
			alert(obj3.responseText);
			if(ver.RESULTADO == "ok")
			{
				//en este punto subiriamos las fotos
			}
			
		}

	}

}