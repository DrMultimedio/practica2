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