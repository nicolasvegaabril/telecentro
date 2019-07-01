//Nicolas Vega 242166 / Daniel Toledo 245055 M1E

window.addEventListener('load', inicio);

let listadoDeLlamadas = new telecentro()
let listadoDeOperadores = new telecentro();
var noEntro = true;
var yaDibuja = false;

function inicio(){
document.getElementById("idRadioNombre").addEventListener("click", actualizarPostOp);
document.getElementById("idRadioEdad").addEventListener("click", actualizarPostOp);
document.getElementById("idRadioNumero").addEventListener("click", actualizarPostLlam);
document.getElementById("idRadioNomNum").addEventListener("click", actualizarPostLlam);
document.getElementById("idBoton2").addEventListener("click", historial);
document.getElementById("idBoton3").addEventListener("click", porLargo);
document.getElementById("idBoton4").addEventListener("click", contiene);
document.getElementById("idBoton5").addEventListener("click", drawChart);
numero = 0;
}

function contiene(){
let texto = document.getElementById("idPalabra").value;
listadoDeLlamadas.contienePalabras(texto);
}

function porLargo(){
let x = document.getElementById("idListaDuracion");
let dur = parseInt(document.getElementById("idDuracionLlamadas").value);
listadoDeLlamadas.porDuracion(dur,x);
}

function historial(){
	if (listadoDeLlamadas.mostrarTodos().length != 0){
		let operador = document.getElementById("idOperador2").value
		listadoDeLlamadas.motivos(operador);
		let x = document.getElementById("idMasLarga");
		let y = document.getElementById("idPromedio");
		x.innerHTML = "";
		y.innerHTML = "";
		nodo1 = document.createTextNode(listadoDeLlamadas.masLarga(operador));
		nodo2 = document.createTextNode(listadoDeLlamadas.promedio(operador));
		x.appendChild(nodo1);
		y.appendChild(nodo2);
	}else{alert("No hay llamadas registradas para ese operador")}
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
		actualizarLlam(listadoDeLlamadas.mostrarTodos(),document.getElementById("tablaLlamadas"));
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

function actualizarPostOp(){ //Ordena operadores por nombre o edad luego de creada al lista, al presional el radio correspondiente
	listadoDeOperadores.ordenacion1();
	actualizarOp();
}

function actualizarOp(){ //Actualiza la lista de operadores
	let lista = document.getElementById("listaOp");
	let selection = document.getElementById("idOperador");
	let selection2 = document.getElementById("idOperador2");
	lista.innerHTML = "";
	selection.innerHTML = "";
	selection2.innerHTML = "";
	let dato = listadoDeOperadores.mostrarTodos();
	for (elemento of dato){
		let x = document.createElement("LI");
		let y = document.createElement("OPTION");
		let z = document.createElement("OPTION");
		let nodo = document.createTextNode(elemento);
		let nodo2 = document.createTextNode(elemento.nombre);
		let nodo3 = document.createTextNode(elemento.nombre);
		y.setAttribute("value",elemento.nombre);
		z.setAttribute("value",elemento.nombre);
		x.appendChild(nodo);
		y.appendChild(nodo2)
		z.appendChild(nodo3)
		lista.appendChild(x);
		selection.appendChild(y);
		selection2.appendChild(z);
	}
}

function actualizarPostLlam(){
	listadoDeLlamadas.ordenacion2();
	actualizarLlam(listadoDeLlamadas.mostrarTodos(),document.getElementById("tablaLlamadas"));
}

function actualizarLlam(agregar,tabla){
	tabla.innerHTML = "";
	for (elemento of agregar){
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
	}
	if (yaDibuja){
		drawChart();
	}
}

function mostrarIcono(numero){
	let src = "";
	switch (numero){
			case "1":
				src = "img/1.png";
			break;
			case "2":
				src = "img/2.png";
			break;
			case "3":
				src = "img/3.png";
			break;
			case "4":
				src = "img/4.png";
			break;
			case "5":
				src = "img/5.png";
			break;
			case "6":
				src = "img/6.png";
			break;
		} return src
}

function drawChart() {
	yaDibuja = true;
	let operadores = [];
	for (let elem of listadoDeLlamadas.mostrarTodos()){
			operadores.push(elem.operador);
	}
	let operadoresUnicos = [];
	for (let elemento of operadores){
		if (operadoresUnicos.indexOf(elemento)<0){
			operadoresUnicos.push(elemento)
		}
	}
	var data = new google.visualization.DataTable();
	data.addColumn('string', 'Operador');
	data.addColumn('number', 'Llamadas');
	for (let element of operadoresUnicos){
		let contador = 0;
		for (let x of operadores){
			if (element == x){
				contador ++;
			}
		}
		data.addRows([
			[element, contador],
		]);
	}
	
	var options = {'title':'Distribucion de llamadas',
					is3D: true,
	               'width':400,
	               'height':300};
	var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
	chart.draw(data, options);
}