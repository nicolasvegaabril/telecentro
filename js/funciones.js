window.addEventListener("load",inicio);

class operador {
	constructor(nombre,edad,mail){
		this.nombre = nombre;
		this.edad = edad;
		this.mail = mail;
	}
	mostrarOperador() {
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

var listadoDeOperadores = new listado();

function inicio(){
	document.getElementById("idBoton0").addEventListener("click",agregarOperador);
}

function agregarOperador(){
	let nombre = document.getElementById("idNombre").value;
	let edad = document.getElementById("idEdad").value;
	let mail = document.getElementById("idMail").value;
	listadoDeOperadores.agregar (new operador(nombre,edad,mail));
	actualizar();
}

function actualizar(){
	document.getElementById("formularioOperadores").reset()
	let lista = document.getElementById("lista");
	lista.innerHTML = "";
	let datos = listadoDeOperadores.mostrarTodos();
	for (elemento of datos){
		let x = document.createElement("li");
		let nodo = document.createElement(elemento);
		x.appendChild(nodo);
		lista.appendChild(x);
	}
}

