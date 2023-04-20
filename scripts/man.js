const nombre = document.querySelector("#nombre"),
  autor = document.querySelector("#direccion"),
  isbn = document.querySelector("#NIT"),
  categoria = document.querySelector("#calificacion"),
  precio = document.querySelector("#precio"),
  img = document.querySelector("#img"),
  search = document.querySelector("#search"),
  tbody = document.querySelector("#table-body"),
  formInventario = document.querySelector("#formInventario");
const radios = document.querySelectorAll('input[type="radio"]');

//Libros ya guardados en inventario
const inventario = [
  {
    nombre:"La pecosa",
    direccion:"Calle falsa 123",
    NIT:"1232313",
    calificacion:23,
    precio:1200,
    img: "./assets/images/cancha_1.jpg",
  },
  {
    nombre:"La pecosa",
    direccion:"Calle falsa 123",
    NIT:"1232313",
    calificacion:23,
    precio:1200,
    img: "./assets/images/cancha_2.jpg",
  },
];

//Seteo variable libros, si LS vacio entonces libros = inventario
//#####
let canchas = JSON.parse(localStorage.getItem("inventario")) || inventario;


//Constructor del objeto Libro
function Cancha(nombre,direccion,NIT,calificacion, precio, img) {
  this.nombre = nombre;
  this.direccion = direccion;
  this.NIT = NIT;
  this.calificacion = calificacion;
  
  precio == "" ? (this.precio = 1) : (this.precio = precio);
  
  img == "" ? (this.img = `https://via.placeholder.com/150`) : (this.img = img);
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
    /*  if (param == "precio") {
      return el.precio <= parseFloat(filtro);
    } else {
      return el[`${param}`].includes(filtro.toLowerCase());
    } */
    return param == "precio"
      ? el.precio <= parseFloat(filtro)
      : el[`${param}`].includes(filtro.toLowerCase());
  });
}

//Manipular el DOM
function crearHtml(arr) {
  tbody.innerHTML = "";

  let html = "";
  for (const item of arr) {
    const { nombre,direccion,NIT, calificacion, precio, img } = item;
    html = `<tr>
  <td>${nombre}</td>
  <td>${direccion}</td>
  <td>${NIT}</td>
  <td>${calificacion}</td>
  <td>${precio}</td>
  <td><img src="${img}" style="width: 8rem;"/></td>
  <td><button class="btn btn-danger" id="${NIT}">Borrar</button></td>
  </tr>`;
    tbody.innerHTML += html;
  }
  /* <!-- <td><img src="./img/${item.img}"/></td> --> */
  /* Agregar eventos a los botones */
  const arrayBotones = document.querySelectorAll("td .btn");
  arrayBotones.forEach((btn) => {
    btn.addEventListener("click", () => {
      canchas = canchas.filter((el) => el.NIT != btn.id);
      guardarLS(canchas);
      crearHtml(canchas);
    });
  });
}

/* Fin de funciones */

/* Ejecución de funciones */
crearHtml(canchas);

//Listeners
formInventario.addEventListener("submit", (e) => {
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
});

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