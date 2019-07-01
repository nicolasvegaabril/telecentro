//Nicolas Vega 242166 / Daniel Toledo 245055 M1E

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
	  		if (elem.nombre.toUpperCase() === nombre.toUpperCase()){
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
 	motivos(oper){
 		let atendidos = []; 
 		let todos = [1,2,3,4,5,6];
 		for (let elem of this.mostrarTodos()){
 			if (elem.operador == oper){
 				if (atendidos.indexOf(parseInt(elem.motivo))<0){
 					atendidos.push(parseInt(elem.motivo));
 				}
 			}
 		} 
 		let noAtendidos = todos.filter(k => !atendidos.includes(k));
 		if (noAtendidos.length>0){
	 		let x = document.getElementById("idIconos");
	 		x.innerHTML = "";
	 		let label = document.createElement("P");
	 		let nodo = document.createTextNode("Motivos no atendio: ");
	 		label.appendChild(nodo);
	 		x.appendChild(label);
	 		for (let motiv of noAtendidos){
	 			let img = document.createElement("img");
	 			img.alt = motiv;
				img.className = "imagenTabla";
				img.src = mostrarIcono(motiv.toString());
				x.appendChild(img);
	 		}
 		}else{
 			let x = document.getElementById("idIconos");
	 		x.innerHTML = "";
	 		let label = document.createElement("P");
	 		let nodo = document.createTextNode("El operador atendio todos los motivos");
	 		label.appendChild(nodo);
	 		x.appendChild(label);
	 	}
 	} 
 	masLarga(oper){
 		let mayor = 0;
 		let indice = 0;
 		for (let elem of this.mostrarTodos()){
 			if (elem.operador == oper){
 				if (parseInt(elem.duracion)>mayor){
 					mayor = parseInt(elem.duracion);
 					indice = parseInt(elem.numero);
 				}
 			}
 		}
 		let resultado =  "Llamada mas larga: Número: " + indice + ", Duración: " + mayor + " minutos";
 		return resultado
 	}
 	promedio(oper){
 		let suma = 0;
 		let cantidad = 0; 
 		for (let elem of this.mostrarTodos()){
 			if (elem.operador == oper){
 				suma += parseInt(elem.duracion);
 				cantidad++;
 			}
 		} 
 		return "Tiempo promedio de atencion: " + (suma/cantidad).toFixed(2) + " minutos";
 	}
 	porDuracion(dur,x){
 		let coincidencias = [];
 		x.innerHTML = "";
 		for (let elem of this.mostrarTodos()){
 			if ((elem.duracion == dur)&&(coincidencias.includes(elem.operador)==false)){
 				coincidencias.push(elem.operador);
 			} 
 		}
 		if (coincidencias.length > 0){
	 		for (let element of coincidencias){
	 			let nodo = document.createElement("LI");
	 			let texto = document.createTextNode(element);
	 			nodo.appendChild(texto);
	 			x.appendChild(nodo);
	 		}
	 	}else{ alert("No existen llamadas con esa duracion")}
 	}
 	contienePalabras(texto){
 		let tabla = document.getElementById("tablaLlamadas2");
 		tabla.innerHTML = "";
 		let palabras = texto.split(" ");
 		for (let elem of this.mostrarTodos()){
 			let coincidentes = [];
 			let desc = elem.descripcion.split(" ");	
 			for (let i=0;i<palabras.length;i++){
 				if (desc.indexOf(palabras[i])>=0){
 					coincidentes.push(palabras[i]);
 				}
 			}
 			if (coincidentes.length > (palabras.length/2)){
 				let elemento = elem;
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
					img.src = mostrarIcono(elemento.motivo);
					newCell3.appendChild(img);
					let newCell4 = newRow.insertCell(4);
					let newText4 = document.createTextNode(elemento.duracion);
					newCell4.appendChild(newText4);
					let newCell5 = newRow.insertCell(5);
					let newText5 = document.createTextNode(elemento.celular);
					newCell5.appendChild(newText5);	
 			}else{var loContiene = false}
 		}
 		if (!loContiene){
 			alert("No existen llamadas que coincidan con las palabras ingresadas")
 		}
 	}
}