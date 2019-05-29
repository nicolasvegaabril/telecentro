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
}

let listadoDeOperadores = new listado();

function inicio(){
	document.getElementById("idBotonAgregar").addEventListener("click",agregarOperador);
}

function agregarOperador(){
	const nombreValido = document.getElementById("idNombre").checkValidity();
	const edadValido = document.getElementById("idEdad").checkValidity();
	const mailValido = document.getElementById("idMail").checkValidity();
	const esValido = nombreValido && edadValido && mailValido;
	if (esValido){
		let nombre = document.getElementById("idNombre").value;
		let edad = document.getElementById("idEdad").value;
		let mail = document.getElementById("idMail").value;
		listadoDeOperadores.agregar(new operador(nombre,edad,mail));
		actualizar();
		document.getElementById("formularioOperadores").reset();

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

