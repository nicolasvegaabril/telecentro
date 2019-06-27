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
	porEdad(oper){
	return this.edad - oper.edad;
	}
	porNombre(oper){
	return this.nombre.localeCompare(oper.nombre);
	}
}

class llamada{
	constructor(numero,operador,descripcion,motivo,duracion,celular){
		this.numero = numero
		this.operador = operador;
		this.descripcion = descripcion;
		this.motivo = motivo;
		this.duracion = duracion;
		this.celular = celular;
	}
	toString() {
		return this.numero + " " + this.operador + " " + this.descripcion + " " + this.motivo + " " + this.duracion + " " + this.celular;
	}
	porNumero(llam){
		return this.numero - llam.numero;
	}
	porNombreNumero(llam){
		let n = this.operador.localeCompare(llam.operador);
		if (n === 0){
			this.porNumero(llam);
		}else{return n}
	}
}

class telecentro{
	constructor(){
		this.lista=[];
	}
	agregarOp(nuevo){
		this.lista.push(nuevo);
		this.ordenacion1();
	}
	agregarLi(nuevo){
		this.lista.push(nuevo);
		this.ordenacion2();
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
 	ordenarPorEdad(){
		return this.lista.sort(function(primero,segundo){return primero.porEdad(segundo);});
	}
	ordenarPorNombre(){
		return this.lista.sort(function(primero,segundo){return primero.porNombre(segundo);});
	}
	ordenarPorNumero(){
		return this.lista.sort(function(primero,segundo){return primero.porNumero(segundo)})
	}
	ordenarPorNombreNumero(){
		return this.lista.sort(function(primero,segundo){return primero.porNombreNumero(segundo)})
	}
 	ordenacion1(){
 		if (document.getElementById("idRadioNombre").checked){
 			this.ordenarPorNombre();
 		}
 		else{
 			this.ordenarPorEdad();
 		}
 	}
 	ordenacion2(){
 		if (document.getElementById("idRadioNumero").checked){
 			this.ordenarPorNumero();
 		}
 		else{
 			this.ordenarPorNombreNumero();
 		}
 	}
}

/* FUNCIONES */

window.addEventListener('load', inicio);

function inicio(){
document.getElementById("idRadioNombre").addEventListener("click", actualizarPostOp);
document.getElementById("idRadioEdad").addEventListener("click", actualizarPostOp);
document.getElementById("idRadioNumero").addEventListener("click", actualizarPostLlam);
document.getElementById("idRadioNomNum").addEventListener("click", actualizarPostLlam);
numero = 0;
}

function agregarLLamada(){
	const descValida = document.getElementById("idDescripcion").checkValidity();
	const motivoValido = document.getElementById("idMotivo").checkValidity();
	const duracionValida = document.getElementById("idDuracion").checkValidity();
	const celularValido = document.getElementById("idCelular").checkValidity();
	let esValido = descValida && motivoValido && duracionValida && celularValido;
	if (esValido){
		numero = numero + 1;
		let operador = document.getElementById("idOperador").value;
		let descripcion = document.getElementById("idDescripcion").value;
		let motivo = document.getElementById("idMotivo").value;
		let duracion = document.getElementById("idDuracion").value;
		let celular = document.getElementById("idCelular").value; //los datos los toma bien
		listadoDeLlamadas.agregarLi(new llamada(numero,operador,descripcion,motivo,duracion,celular));
		actualizarLlam();
		document.getElementById("formularioLlamadas").reset();
	}	
}

function agregarOperador(){
	const nombreValido = document.getElementById("idNombre").checkValidity();
	const edadValido = document.getElementById("idEdad").checkValidity();
	const mailValido = document.getElementById("idMail").checkValidity();
	let esValido = nombreValido && edadValido && mailValido;
	let nombre = document.getElementById("idNombre").value;
	if (esValido && noEntro){
		let edad = document.getElementById("idEdad").value;
		let mail = document.getElementById("idMail").value;
		listadoDeOperadores.agregarOp(new operador(nombre,edad,mail));
		actualizarOp();
		document.getElementById("formularioOperadores").reset();
		noEntro = false; //Si es el primer nombre ingresado no se compara
	}else{ 
		if (listadoDeOperadores.existeContactoNombre(nombre) && esValido){
		alert("El nombre ingresado es repetido");
		actualizarOp();
		document.getElementById("formularioOperadores").reset();
		}else{
			if (esValido){
				let edad = document.getElementById("idEdad").value;
				let mail = document.getElementById("idMail").value;
				listadoDeOperadores.agregarOp(new operador(nombre,edad,mail));
				actualizarOp();
				document.getElementById("formularioOperadores").reset();}
			}
		}
}

function actualizarPostOp(){   //Ordena operadores por nombre o edad luego de creada al lista, al presional el radio correspondiente
	listadoDeOperadores.ordenacion1();
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

function actualizarPostLlam(){
	listadoDeLlamadas.ordenacion2();
	actualizarLlam();
}

function actualizarLlam(){
	let tabla = document.getElementById("tablaLlamadas");
	tabla.innerHTML = "";
	let dato = listadoDeLlamadas.mostrarTodos();
	for (elemento of dato){
		let newRow = tabla.insertRow();
		let newCell0 = newRow.insertCell(0);
		let newText0 = document.createTextNode(elemento.numero);
		newCell0.appendChild(newText0);
		let newCell1 = newRow.insertCell(1);
		let newText1 = document.createTextNode(elemento.operador);
		newCell1.appendChild(newText1);
		let newCell2 = newRow.insertCell(2);
		let newText2 = document.createTextNode(elemento.descripcion);
		newCell2.appendChild(newText2);
		let newCell3 = newRow.insertCell(3);
		let img = document.createElement("img");
		img.alt = elemento.motivo;
		img.className = "imagenTabla";
		switch (elemento.motivo){
			case "1":
				img.src = "img/1.png";
			break;
			case "2":
				img.src = "img/2.png";
			break;
			case "3":
				img.src = "img/3.png";
			break;
			case "4":
				img.src = "img/4.png";
			break;
			case "5":
				img.src = "img/5.png";
			break;
			case "6":
				img.src = "img/6.png";
			break;
		}
		newCell3.appendChild(img);
		let newCell4 = newRow.insertCell(4);
		let newText4 = document.createTextNode(elemento.duracion);
		newCell4.appendChild(newText4);
		let newCell5 = newRow.insertCell(5);
		let newText5 = document.createTextNode(elemento.celular);
		newCell5.appendChild(newText5);
	}
}



let listadoDeLlamadas = new telecentro()
let listadoDeOperadores = new telecentro();
var noEntro = true;




//poner las funciones de dentro de las clases especificas de cada uno
//hacerse una array para mosrar los motivos que no atencdio en la parte 3
//hacer toda la parte 3 dentro de un metodo SOLO. Dentro de la clase "telecentro" (listado)
//