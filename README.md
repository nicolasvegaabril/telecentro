   Un Telecentro de una importante empresa de electrodomésticos recibe llamadas de usuarios sobre diversos
motivos. Cada llamada es atendida por un operador y se registra en el sistema. Se solicita diseñar una única página
web que permita gestionar los operadores, llamadas y hacer consultas.
Se debe poder:

■ Manejar operadores:
   
    ● Registrar operador. Se ingresará el nombre (max. 20 caracteres), edad (entre 18 y 65) y mail.
    Todos los datos son requeridos. El nombre debe ser único.
    
    ● Visualización de operadores. Se mostrará una lista no numerada con los operadores registrados.
    De cada uno, poner su nombre, edad y mail. A través de un radio button, se indicará si se quiere
    visualizar en forma ordenada ascendente por nombre o por edad. Se asume por defecto el orden
    por nombre.

■ Manejar llamadas
    
    ● Registrar llamada. Se selecciona de un combo al operador que atiende, se ingresa un texto con la
    descripción de la llamada, se indica el código del motivo principal de la llamada (entero entre 1 y
    6), la duración en minutos de la llamada (entre 1 y 60) y el celular de contacto del cliente. Validar
    además que el celular comience con 091 al 099 y tenga 9 dígitos. Todos los datos son requeridos.
    Automáticamente se numera cada llamada, comenzando en el número 1.
    
    ● Muestra de llamadas. Se presentan en una tabla todas las llamadas registradas, mostrando en sus
    columnas: número de la llamada, nombre del operador, descripción de la llamada, ícono
    correspondiente al código del motivo principal de la llamada (se deberá contar con un ícono para
    cada uno de los 6 motivos), duración y celular del cliente. Los íconos serán a elección del grupo.
    Cada ícono debe tener visible el número del motivo que representa y su diseño y colores son a
    gusto. La tabla se muestra ordenada por número de llamada o por nombre de operador/número de
    llamada, según indique el usuario al seleccionar un radio botón.

■ Consultas:
    
    ● Consulta por operador
       
       ○ Se muestra un combo con los operadores. Se elige uno y se debe mostrar su historia en
        párrafos:
        - Motivos que no atendió nunca (Ej. “Motivos: 1,5”, se muestran
        exclusivamente los íconos respectivos),
        - Datos de número y duración de su llamada más larga (Ej: “Llamada más
        larga: Número: 23, Duración: 18 minutos”; si hubiera varias mostrar cualquiera
        de ellas) y
        - Tiempo promedio de todas sus llamadas (Ej. “Tiempo promedio: 8 minutos”).

    ● Consulta por llamadas

        ○ Operadores con más llamadas de una duración dada: se ingresa un valor y deben mostrarse
        en una lista no numerada los operadores que tengan la máxima cantidad de llamadas
        considerando sólo esa duración. Si hay varios, mostrar todos los que corresponda.
        
        ○ Consulta de palabras: se ingresa una o varias palabras, separadas por espacio y al
        presionar el botón de consulta, debe mostrarse en una tabla las llamadas que contienen
        exactamente todas o la mayoría de las palabras dadas en su descripción (ej. si se busca
        “temprana” y la descripción contiene “tempranamente” no es coincidencia).
        
        ○ Distribución de llamadas: al presionar un botón, mostrar la distribución de porcentaje de
        llamadas atendidas por cada operador en una gráfica de torta.
        Nota: en todos los casos, la información en pantalla siempre debe estar actualizada.
