//Variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articulosCarrito = [];


cargarEventListeners();
//aqui registraremos todos los eventlistener
function cargarEventListeners(){
    //Cuando agregas un curso presionando 'agregar al carrito'
    listaCursos.addEventListener('click', agregarCurso);


    //Elimina cursos del carrito
    carrito.addEventListener('click' , eliminarCurso);

    //Miestra cursos del LS
    document.addEventListener('DOMContentLoaded' , () =>{
        articulosCarrito = JSON.parse (localStorage.getItem('carrito')) || [];

        carritoHTML();
    })

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', ()=>{
        articulosCarrito = []; //reseteamos array


        limpiarHTML()//limpiamos todo el HTML
    });
}


//funciones
function agregarCurso(e){
//al no tenr enlace con esto prevenimos la accion por default     
    e.preventDefault();
//verificomos si el elemento contiene agregar carrito 
    if(e.target.classList.contains('agregar-carrito')){
        const cursosSeleccionado = e.target.parentElement.parentElement;
        leerDatosCurso(cursosSeleccionado);
    }
}

//elimina curso del carrito
function eliminarCurso(e){
    if(e.target.classList.contains('borrar-curso')){
        const cursoId = e.target.getAttribute('data-id');

        //Elimina del arreglo de articulosCarritos por el data-id
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

        carritoHTML();//Iterar sobre el carrito y el HTML
    }
}

//Lee el contenido del HTML al que le dimos click y extrae la informacion del curso
function leerDatosCurso(curso){


//Crear un objeto con el contenido del curso actual
const infoCurso = {
    imagen: curso.querySelector('img').src,
    titulo: curso.querySelector('h4').textContent,
    precio: curso.querySelector('.precio span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1
}

//revisa si un elemento ya existe en el carrito
const existe = articulosCarrito.some( curso => curso.id === infoCurso.id);
if(existe){
    //actualizamos la cantidad
    const cursos = articulosCarrito.map(curso =>{
        if(curso.id === infoCurso.id){
            curso.cantidad++;
            return curso; //retorna el objeto actulizado
        }else{
            return curso; // retorna los objetos que no son duplicados
        }
    });
    articulosCarrito = [...cursos];
}else{
    //agregar elementos al arreglo carrito de compra
        articulosCarrito = [...articulosCarrito, infoCurso];
}


carritoHTML();

}

//Muesta el carrito en el HTML
function carritoHTML(){

    //Limpiar HTML
    limpiarHTML();


    //reccorre el carrito y muestra html


    articulosCarrito.forEach( curso =>{
        const {imagen , titulo, precio , cantidad , id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `

        <td>
            <img src="${imagen}" width="100">
        </td>

        <td>
             ${titulo}
        </td>

        <td>
             ${precio}
        </td>

        <td>
             ${cantidad}
        </td>
        
        <td>
             <a href="#" class="borrar-curso" data-id="${id}"> X </a>
        </td>
        
        `;

        //agrega el html del carrito tbody
        contenedorCarrito.appendChild(row);
        
    });

     //incluimos LS al carrito
     sincronizarStorage();
}

function sincronizarStorage(){
    localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

//Elimina los cursos del tbody
function limpiarHTML(){
     
    while(contenedorCarrito.firstChild){
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}



