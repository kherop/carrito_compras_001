// Variables
const carrito = document.querySelector('#carrito');
const cursos = document.querySelector('#lista-cursos');
const listaCursos = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

// Listeners
cargarEventListeners();

function cargarEventListeners() {
    // Dispara cuando se presiona "Agregar al carrito"
    cursos.addEventListener('click', agregarCurso);

    // Dispara cuando se quiere eliminar un curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Dispara cuando se quiere vaciar el carrito entero
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    // Al cargar el documento muestra los cursos del locat storage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}

// Functions
// Función para añadir un curso al carrito
function agregarCurso(e) {
    // Cancela la función predeterminada
    e.preventDefault();

    // Delegation para evaluar si el elemento seleccionado tiene la clase 'agregar-carrito'
    if (e.target.classList.contains('agregar-carrito')) {
        // Selecciona la tarjeta que contiene el curso completo
        const curso = e.target.parentElement.parentElement;
        // Recupera los datos del curso con la función leer datos
        const infoCurso = leerDatosCurso(curso);
        // Añadimos el curso al carrito
        insertarCarrito(infoCurso);
        // Guardamos los cursos en el local storage
        guardarCursoLS(infoCurso);
    }
}

// Función para leer los datos del curso
function leerDatosCurso(curso) {
    // Crea un objeto para almacenar los datos del curso
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
    }
    return infoCurso;
}

// Funcion para insertar el curso en el carrito
function insertarCarrito(infoCurso) {
  const row = document.createElement("tr");
  row.innerHTML = `
        <td>
            <img src="${infoCurso.imagen}" width=100>
        </td>
        <td>
            ${infoCurso.titulo}
        </td>
        <td>
            ${infoCurso.precio}
        </td>
        <td>
            <a href="#" class="borrar-curso" data-id="${infoCurso.id}">X</a>
        </td>
    `;
  listaCursos.appendChild(row);
}

// Funcion para eliminar un curso del carrito en el DOM
function eliminarCurso(e) {
  // Cancela la función predeterminada
  e.preventDefault();
  // Delegation para comprobar que el elemento tiene la clase 'borrar-curso' y eliminarlo
  if (e.target.classList.contains("borrar-curso")) {
    e.target.parentElement.parentElement.remove();

    // Captura el elemento del curso que queremos borrar
    let curso = e.target.parentElement.parentElement;
    // Rescata el id del curso que queremos borrar
    let cursoId = curso.querySelector('a').getAttribute('data-id');
    // Llama a la funcion para eliminar el curso por el id
    eliminarCursoLS(cursoId);
  }
}

// Funcion para vaciar carrito entero
function vaciarCarrito(e) {
    // Forma lenta
    // listaCursos.innerHTML = '';
    // Forma rápida y recomendada
    while (listaCursos.firstChild) {
        listaCursos.removeChild(listaCursos.firstChild);
    }
    // Llamada a la función vaciar local storage
    vaciarLS();
    return false;
}

// Funcion para almacenar cursos en el local storage
function guardarCursoLS(infoCurso) {
    // Variable para guardar lo que venga del local storage
    let cursos;
    // Obtiene la información de local storage
    cursos = obtenerCursosLS();
    // Añade el nuevo curso al arreglo que ha sacado del local storage
    cursos.push(infoCurso);
    // Graba en local storage la nueva información
    localStorage.setItem('cursos', JSON.stringify(cursos));
}

// Funcion para ver que hay almacenado en el local storage
function obtenerCursosLS(){
    // Crea la variable para almacenar lo que hay en local storage
    let cursosLS;

    // Evalua si hay o no información en el local storage
    if (localStorage.getItem('cursos') === null) {
        // Si no hay nada se crea un array vacio
        cursosLS = [];
    } else {
        // Si tiene contenido lo convertimos a un array
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLS;
}

// Función para mostrar en el carrito los cursos almacenados en el local storage
function leerLocalStorage() {
    // Crea una variable para guardar los cursos que vienen del local storage
    let cursosLS;
    // Guarda los cursos que vienen del local storage
    cursosLS = obtenerCursosLS();
    // Pinta los cursos en el carrito con la información del local storage
    cursosLS.forEach(function (curso) {
        insertarCarrito(curso);
    })
}

// Función para eliminar un curso del local storage por el id
function eliminarCursoLS(cursoId) {
    // Variable para guardar los datos del local storage
    let cursosLS;
    // Asigna el valor de lo que hay en el local storage
    cursosLS = obtenerCursosLS();
    // Recoge el array buscando el id del curso que queremos eliminar
    cursosLS.forEach(function(curso, index) {
        if (curso.id === cursoId) {
            cursosLS.splice(index, 1);
        }
    });
    // Reescribe la información en el local storage sin el curso que hemos borrado
    localStorage.setItem('cursos', JSON.stringify(cursosLS));
}

// Función para vaciar local storage de una golpe
function vaciarLS() {
    localStorage.clear();
}





















