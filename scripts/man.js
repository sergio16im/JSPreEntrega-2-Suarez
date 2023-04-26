const nombre = document.querySelector("#nombre"),
  id=document.querySelector("#id"),
  direccion = document.querySelector("#direccion"),
  tipoCancha=document.querySelector("#tipoCancha"),
  tipoHorarios=document.querySelector("#tipoHorario")
  NIT = document.querySelector("#NIT"),
  calificacion = document.querySelector("#calificacion"),
  precio = document.querySelector("#precio"),
  rutaImagen = document.querySelector("#img"),
  search = document.querySelector("#search"),
  sCanchas = document.querySelector("#seccionCanchas"),
  sFiltros=document.querySelector("#seccionFiltros")
  formInventario = document.querySelector("#formInventario");
const radios = document.querySelectorAll('input[type="radio"]');

//Canchas ya guardados en inventario
const inventario = [
{id:"X01",
    nombre:"Cancha sintética La 20",direccion:"Cra. 20 #29-10",tipoCancha:"Sintética",horarios:[],  disponibilidad:[],    tipoHorarios:["Matutino","Nocturno"],    calificacion: 7,    precio:25000,
    rutaImagen:"./assets/images/cancha_1.jpg"},
    {
      id:"X02",    nombre:"El nuevo Maracana",    direccion:"Cl. 18 #21-16",    tipoCancha:"Cemento",
      horarios:[],    disponibilidad:[],    tipoHorarios:["Nocturno"],    calificacion: 4,
      precio:30000, rutaImagen:"./assets/images/cancha_2.jpg"},
      {
        id:"X03",    nombre:"Digigol",    direccion:"Cl. 14 #15-56",    tipoCancha:"Sintética",    horarios:[],    disponibilidad:[],    tipoHorarios:["Matutino"],    calificacion: 6,
        precio:35000,    rutaImagen:"./assets/images/cancha_3.jpg"},
        {
          id:"X04",    nombre:"Gool de Oro",    direccion:"Cl. 35 #24-69",    tipoCancha:"Sintética",
          horarios:[],    disponibilidad:[],    tipoHorarios:["Matutino","Nocturno"],    calificacion: 4,
          precio:20000,    rutaImagen:"./assets/images/cancha_4.jpg"
      },
      {
        id:"X05",    nombre:"Mundo Fútbol Club",    direccion:"Cl. 22 #21-16",    tipoCancha:"Sintética",    horarios:[],    disponibilidad:[],    tipoHorarios:["Matutino","Nocturno"],    calificacion: 8,    precio:40000,    rutaImagen:"./assets/images/cancha_5.jpg"
    }
];
const arrFiltros=[{    id:"Zero",    nombre:"Tipo de cancha",    valores:["Síntetica","Cemento"]},{    id:"One",    nombre:"Horarios",    valores:["Matutino","Tardes","Nocturno"]},{    id:"Two",    nombre:"Precios",    valores:["25000","30000","40000"]},{    id:"Three",    nombre:"Calificación", valores:["5 estrellas","7 estrellas","9 estrellas"]}]

//Seteo variable canchas, si LS vacio entonces canchas = inventario
//#####
let canchas =  inventario;


//Constructor del objeto Cancha
function Cancha(id,nombre,direccion,tipoCancha,horarios,disponibilidad,tipoHorarios,calificacion,precio,rutaImagen) {
  this.id=id;
  this.nombre = nombre;
  this.direccion = direccion;
  this.tipoCancha=tipoCancha;
  this.horarios=horarios;
  this.disponibilidad=disponibilidad;
  this.NIT = NIT;
  this.tipoHorarios=tipoHorarios;

  this.calificacion = calificacion;
  
  precio == "" ? (this.precio = 1) : (this.precio = precio);
  
  rutaImagen == "" ? (this.img = `https://via.placeholder.com/150`) : (this.img = img);
}

/* Declaración de Funciones */
//Cargar al inventario
function cargarInventario(arr, cancha) {
  arr.push(cancha);
}
//Funciones de LS
function guardarLS(arr) {
  localStorage.setItem("inventario", JSON.stringify(arr));
}

//Función de búsqueda genérica
function filtrar(arr, filtro, param) {
  return arr.filter((el) => {
    
    return param == "precio"
      ? el.precio <= parseFloat(filtro)
      : el[`${param}`].includes(filtro.toLowerCase());
  });
}

//Manipular el DOM
function crearHtml(arr) {
  sCanchas.innerHTML = "";

  let html = "";
  for (const item of arr) {
    const {id,nombre,direccion,NIT, calificacion, precio,tipoCancha, rutaImagen } = item;
    html = `<div class="card jugador" style="width: 18rem;">
    <div class="d-inline text-center">
        <h3 class="d-inline">${nombre} </h3>
       
    </div>
    
    <img src="${rutaImagen}" class="card-img-top" alt="Foto_cancha">
    <div class="card-body">
      <h5 class="card-title">${direccion}</h5>
      <div class="d-inline">
        <img class="estrella img-rounded d-inline" src="./assets/icons/estrella.png" alt="Icono_de_estrella" style="width: 2rem;">
        <h3 class="d-inline text-center">${calificacion}</h3>
      </div>
      <h3 class="d-inline">${tipoCancha}</h3>
      <p class="card-text">Horarios:<strong>${calificacion}</strong><div>Precio:<strong>$${precio}</strong></div></p>
      <a  class="btn btn-success" Id="${id}">Alquilar Cancha</a>
    </div>
  </div>`;
    sCanchas.innerHTML += html;
  }
  
  /* Agregar eventos a los botones */
  const arrayBotones = document.querySelectorAll("a.btn,a.btn-success");
  arrayBotones.forEach((btn) => {
    btn.addEventListener("click", () => {
      alert("Aguas")
      console.log(arrayBotones)
      canchas = canchas.filter((el) => el.id != btn.id);
      
      crearHtml(canchas);
    });
  });
}
function crearFiltros(){
  let html = "";
  for(const item of arrFiltros){const{id,nombre,valores}=item
    html=`<div class="accordion-item">
    <h2 class="accordion-header" id="heading${id}">
    <button class="accordion-button collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#collapse${id}" aria-expanded="false" aria-controls="collapse${id}">
        ${nombre}
    </button>
    </h2>
    <div id="collapse${id}" class="accordion-collapse collapse" aria-labelledby="heading${id}" data-bs-parent="#accordionExample">
    <div class="accordion-body">
                
<ul class="list-group" id="filtro${id}">
</ul>
</div>
    
</div>`
sFiltros.innerHTML+=html
  }
  
}
/* Fin de funciones */

/* Ejecución de funciones */
crearHtml(canchas);
crearFiltros()

// Crear filtros//

//Listeners
/*formInventario.addEventListener("submit", (e) => {
  e.preventDefault();
  const nuevacancha = new Cancha(
    nombre.value,
    direccion.value,
    NIT.value,
    calificacion.value,
    precio.value,
    img.value
  );

  cargarInventario(canchas, nuevacancha);
  guardarLS(canchas);
  crearHtml(canchas);
  formInventario.reset()
});

//Listeners de búsqueda
search.addEventListener("input", () => {
  let nuevoFiltro = filtrar(canchas, search.value, "nombre");
  crearHtml(nuevoFiltro);
});*/

//radio buttons
for (const radio of radios) {
  radio.addEventListener("change", () => {
    
    if (radio.checked) {
      search.addEventListener("input", () => {
        let nuevoFiltro = filtrar(canchas, search.value, radio.value);
        crearHtml(nuevoFiltro);
      });
    }
  });
}