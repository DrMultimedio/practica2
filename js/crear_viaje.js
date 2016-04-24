function arranque_per(){
	if(!sessionStorage.getItem("login_session")){
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
comprueba_tam(){
	
}