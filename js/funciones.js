/*    CLASES      */

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

class llamadas{
	constructor(operador,descripcion,motivo,duracion,celular){
		this.operador = operador;
		this.descripcion = descripcion;
		this.motivo = motivo;
		this.duracion = duracion;
		this.celular = celular;
	}
	toString() {
		return this.operador + " " + this.descripcion + " " + this.motivo + " " + this.duracion + " " + this.celular;
	}
}


class listado{
	constructor(){
		this.lista=[];
	}
	agregar(nuevo){
		this.lista.push(nuevo);
		this.ordenacion();
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
 	ordenacion(){
 		if (document.getElementById("idRadioNombre").checked){
 			this.lista.sort(listado.comparacionNombre);
 		}
 		else{
 			this.lista.sort(listado.comparacionEdad);
 		}
 	}
 	static comparacionNombre(primero, segundo){
 		let retorno = 0
 		if (primero.nombre.toUpperCase() < segundo.nombre.toUpperCase()){
 			retorno= -1
 		}
 		if (primero.nombre.toUpperCase() > segundo.nombre.toUpperCase()){
 			retorno= 1
 		}
 		return retorno;
 	}
 	static comparacionEdad(primero, segundo){
 		let retorno = 0
 		if (primero.edad < segundo.edad){
 			retorno= -1
 		}
 		if (primero.edad > segundo.edad){
 			retorno= 1
 		}
 		return retorno;
 	}
}

/* FUNCIONES */

/*function agregarLLamada(){
	const descValida = document.getElementById("idDescripcion").checkValidity();
	const motivoValido = document.getElementById("idMotivo").checkValidity();
	const duracionValida = document.getElementById("idDuracion").checkValidity();
	const celularValido = document.getElementById("idCelular").checkValidity();
	let esValido = descValida && motivoValido && duracionValida && celularValido;
	//if (esValido){
		let operador = document.getElementById("idOperador").value;
		let descripcion = document.getElementById("idDescripcion").value;
		let motivo = document.getElementById("idMotivo").value;
		let duracion = document.getElementById("idDuracion").value;
		let celular = document.getElementById("idCelular").value;
		listadoDeLlamadas.agregar(new llamadas(operador,descripcion,motivo,duracion,celular));
		//actualizarLlam();
		//document.getElementById("formularioLlamadas").reset();
	//}
}*/

function agregarOperador(){
	const nombreValido = document.getElementById("idNombre").checkValidity();
	const edadValido = document.getElementById("idEdad").checkValidity();
	const mailValido = document.getElementById("idMail").checkValidity();
	let esValido = nombreValido && edadValido && mailValido;
	let nombre = document.getElementById("idNombre").value;
	if (esValido && noEntro){
		let edad = document.getElementById("idEdad").value;
		let mail = document.getElementById("idMail").value;
		listadoDeOperadores.agregar(new operador(nombre,edad,mail));
		actualizarOp();
		document.getElementById("formularioOperadores").reset();
		noEntro = false; //Si es el primer nombre ingresado no se compara
	}else{ 
		if (listadoDeOperadores.existeContactoNombre(nombre) && esValido){
		alert("El nombre ingresado es repetido");
		actualizarOp();
		document.getElementById("formularioOperadores").reset();}
		else{
			if (esValido){
				let edad = document.getElementById("idEdad").value;
				let mail = document.getElementById("idMail").value;
				listadoDeOperadores.agregar(new operador(nombre,edad,mail));
				actualizarOp();
				document.getElementById("formularioOperadores").reset();}
			}
		}
}

function actualizarPostOp(){   //Ordena operadores por nombre o edad luego de creada al lista, al presional el radio correspondiente
	listadoDeOperadores.ordenacion();
	actualizarOp();
}

function actualizarOp(){ //Actualiza la lista de operadores
	let lista = document.getElementById("listaOp");
	let selection = document.getElementById("idOperador");
	lista.innerHTML = "";
	selection.innerHTML = "";
	let dato = listadoDeOperadores.mostrarTodos();
	for (elemento of dato){
		let x = document.createElement("LI");
		let y = document.createElement("OPTION");
		let nodo = document.createTextNode(elemento);
		let nodo2 = document.createTextNode(elemento.nombre);
		y.setAttribute("value",elemento.nombre);
		x.appendChild(nodo);
		y.appendChild(nodo2)
		lista.appendChild(x);
		selection.appendChild(y);
	}
}

/*function actualizarLlam(){
	let tabla = document.getElementById("tablaLlamadas");
	tabla.innerHTML = "";
	let dato = listadoDeLlamadas.mostrarTodos();
	for (elemento of dato){
		let x = document.createElement("TR");
		for (elem of elemento){
			let y = document.createElement("TD");
			let nodo = document.createTextNode(elem)
			y.appendChild(nodo);
			x.appendChild(y);
	}
	}
}*/
/*let listadoDeLlamadas = new listado()*/
let listadoDeOperadores = new listado();
var noEntro = true;