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
	existeNombre(nombrePasado){
		let esta = false;
		for ( let elemento of this.mostrarTodos()){
			if (elemento.nombre === nombrePasado){
				esta = true;
			}
		}
		return esta;
	}
}

let listadoDeOperadores = new listado();

function inicio(){
	document.getElementById("idBotonAgregar").addEventListener("click",agregarOperador);
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

function agregarOperador(){
	const nombreValido = document.getElementById("idNombre").checkValidity();
	const edadValido = document.getElementById("idEdad").checkValidity();
	const mailValido = document.getElementById("idMail").checkValidity();
	const esValido = nombreValido && edadValido && mailValido;
	let nombre = document.getElementById("idNombre").value;
	alert("llega aca");
	const yaExiste = listadoDeOperadores.existeNombre(nombre);
	alert(yaExiste);
	if (yaExiste == false){
		if (esValido){
		alert("entra");		
			let edad = document.getElementById("idEdad").value;
			let mail = document.getElementById("idMail").value;
			listadoDeOperadores.agregar(new operador(nombre,edad,mail));
			actualizar();
			document.getElementById("formularioOperadores").reset();
		}
	}else { alert("Nombre repetido");}
}


