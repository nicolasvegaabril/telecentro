window.addEventListener("load",inicio);

class operador{
	constructor(nombre,edad,mail){
		this.nombre = nombre;
		this.edad = edad;
		this.mail = mail;
	}
	toString() {
		return this.nombre + " " + this.edad + " " + this.mail;
	}

}

class listado{
	constructor(){
		this.lista=[];
	}
	agregar(nuevo){
		this.lista.push(nuevo);
	}
	mostrarTodos(){
		return this.lista;
	}
	existeContactoNombre(nombre){
	  	let esta = false;

	  	for (let elem of this.mostrarTodos()){
	  		if (elem.nombre === nombre){
	  			esta = true;
	  		}
	  	}
	  	return esta;
 	}
}

let listadoDeOperadores = new listado();

var noEntro = true;

function inicio(){
	document.getElementById("idBotonAgregar").addEventListener("click",agregarOperador);
}

function agregarOperador(){
	const nombreValido = document.getElementById("idNombre").checkValidity();
	const edadValido = document.getElementById("idEdad").checkValidity();
	const mailValido = document.getElementById("idMail").checkValidity();
	const esValido = nombreValido && edadValido && mailValido;
	let nombre = document.getElementById("idNombre").value;
	if (esValido && noEntro){
		let edad = document.getElementById("idEdad").value;
		let mail = document.getElementById("idMail").value;
		listadoDeOperadores.agregar(new operador(nombre,edad,mail));
		actualizar();
		document.getElementById("formularioOperadores").reset();
		noEntro = false;
	}else{
		if (listadoDeOperadores.existeContactoNombre(nombre)){
		alert("Nombre repetido");
		actualizar();
		}else{
		let edad = document.getElementById("idEdad").value;
		let mail = document.getElementById("idMail").value;
		listadoDeOperadores.agregar(new operador(nombre,edad,mail));
		actualizar();
		document.getElementById("formularioOperadores").reset();}
		}
}

function actualizar(){
	let lista = document.getElementById("listaOp");
	lista.innerHTML = "";
	let dato = listadoDeOperadores.mostrarTodos();
	for (elemento of dato){
		let x = document.createElement("LI");
		let nodo = document.createTextNode(elemento);
		x.appendChild(nodo);
		lista.appendChild(x);
	}
}

