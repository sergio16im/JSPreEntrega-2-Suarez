

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
let filtrosAplicados=[]
 const usuarios=[{id:"UsserA01",name:"Camilo Vargas", rol:"Admin",password:"1234",email:"admin1@gmail.com",money:50000,reservations:[],rutaImagen:"./assets/images/goku.jpg"}]

//Canchas ya guardados en inventario
 const inventario = [
  {id:"X01",
      nombre:"Cancha sintética La 20",direccion:"Cra. 20 #29-10",tipoCancha:"Sintética",horarios:[9,10,11,18,19,20,21,22],  disponibilidad:[1,1,1,1,1,1,1,1],    tipoHorarios:["Matutino","Nocturno"],  hDispo:[],  calificacion: 7,    precio:25000,
      rutaImagen:"./assets/images/cancha_1.jpg"},
      {id:"X02",    nombre:"El nuevo Maracana",    direccion:"Cl. 18 #21-16",    tipoCancha:"Cemento",
        horarios:[18,19,20,21,22],    disponibilidad:[1,1,1,1,1],    tipoHorarios:["Nocturno"], hDispo:[],   calificacion: 4,
        precio:30000, rutaImagen:"./assets/images/cancha_2.jpg"},
        {
          id:"X03",    nombre:"Digigol",    direccion:"Cl. 14 #15-56",    tipoCancha:"Sintética",    horarios:[8,9,10,11],    disponibilidad:[1,1,1,1],    tipoHorarios:["Matutino"],hDispo:[],    calificacion: 6,
          precio:35000,    rutaImagen:"./assets/images/cancha_3.jpg"},
          {
            id:"X04",    nombre:"Gool de Oro",    direccion:"Cl. 35 #24-69",    tipoCancha:"Sintética",
            horarios:[9,10,11,18,19,20,21,22],    disponibilidad:[1,1,1,1,1,1,1,1],    tipoHorarios:["Matutino","Nocturno"], hDispo:[],   calificacion: 4,
            precio:20000,    rutaImagen:"./assets/images/cancha_4.jpg"
        },
        {
          id:"X05",    nombre:"Mundo Fútbol Club",    direccion:"Cl. 22 #21-16",    tipoCancha:"Sintética",    horarios:[9,10,11,14,15,16,17,18,19,20,21,22],    disponibilidad:[1,1,1,1,1,1,1,1,1,1,1,1],    tipoHorarios:["Matutino","Tardes","Nocturno"], hDispo:[],   calificacion: 8,    precio:40000,    rutaImagen:"./assets/images/cancha_5.jpg"
      }
  ];
const arrFiltros=[{    id:"Zero",    nombre:"Tipo de cancha",    valores:["Sintética","Cemento"]},{    id:"One",    nombre:"Horarios",    valores:["Matutino","Tardes","Nocturno"]},{    id:"Two",    nombre:"Precios",    valores:["25000","30000","40000"]},{    id:"Three",    nombre:"Calificación", valores:["5 estrellas","7 estrellas","9 estrellas"]}]

//Seteo variable canchas, si LS vacio entonces canchas = inventario
//#####

let canchas =  inventario;



//Constructor del objeto Usuario

function Usuario(id,name,password,money,reservations){
  this.id=id;
  this.name=name;
  this.rol=rol;
  this.password=password;
  this.email=email;
  this.money=money;
  this.reservations=reservations;
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

//Función de filtros
function seleccionFiltros(arr){

  arr.forEach(el=> {
    arrFiltros.forEach(element => {
  
      let as=element.valores.includes(el)
      if (as==true){
      let nameFiltro=element.nombre
        TipoFiltro(nameFiltro,el)
      }
      
    });
  });

  crearHtml(canchas)
}
function TipoFiltro(caseF,valorNombre){
  switch(caseF){
    case "Tipo de cancha":
      
      filtro1(valorNombre)
      break;
      case "Horarios":
        filtro2(valorNombre)
        break;
      case "Precios":
        filtro3(valorNombre)
        break;
      case "Calificación":
      filtro4(valorNombre)
      break;
  }

}
//Funciones de filtado//
function filtro1(para){
  canchas=canchas.filter(p=>p.tipoCancha==para)
  
}
function filtro2(para){
  canchas=canchas.filter(p=>p.tipoHorarios.includes(para))
}
function filtro3(para){
  canchas=canchas.filter(p=>p.precio<parseInt(para))
  
}
function filtro4(para){
  let cali=parseInt(para.slice(0,1))
  console.log(cali)
  canchas=canchas.filter(p=>p.calificacion>=cali)
}

//Manipular el DOM
function crearHtml(arr) {
  sCanchas.innerHTML = "";

  let html = "";
  for (const item of arr) {
    const {id,nombre,direccion,NIT,tipoHorarios, calificacion, precio,tipoCancha, rutaImagen } = item;
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
      <p class="card-text">Horarios:<strong>${tipoHorarios}</strong><div>Precio:<strong>$${precio}</strong></div></p>
      
      <a  class="btn btn-success" Id="${id}">Alquilar Cancha</a>
    </div>
  </div>`;
  
    sCanchas.innerHTML += html;
  }
  
  /* Agregar eventos a los botones */
  const arrayBotones = document.querySelectorAll("a.btn,a.btn-success");
  arrayBotones.forEach((btn) => {
    btn.addEventListener("click", () => {
      crearNodal(btn.id)
      
      
    });
  });
  const arrayBoton = document.querySelectorAll('button[type="button"]');
  arrayBoton.forEach((btn) => {
    btn.addEventListener("click", () => {
      crearNodal(btn.id)
      
      
    });
  });
}
async function crearNodal(idBoton){
  let opcion=canchas.filter(p=>p.id==idBoton)
  if(opcion[0].precio>usuarios[0].money){
    let adver=true
  }
  opcion[0].hDispo=[]
  opcion[0].horarios.forEach(el => {
    let x=el*opcion[0].disponibilidad[opcion[0].horarios.indexOf(el)]
    if (x!=0){
      opcion[0].hDispo.push(x)
    }
    
  });
  //Seccion de creacion de Nodales
  const { value: indexHora } = await Swal.fire({
    title: `${opcion[0].nombre}`,
    text:``,
    input: 'select',
    inputOptions: opcion[0].hDispo,
    inputPlaceholder: 'Selecciona un horario',
    showCancelButton: true,
    confirmButtonText: 'Continuar',
    
  })
  
  if (indexHora) {
    Swal.fire({
      title:'Reserva de cancha',
      html:`<br>Cancha: ${opcion[0].nombre}</br><br>Tipo: ${opcion[0].tipoCancha}</br><br>Horario: ${opcion[0].hDispo[indexHora]} horas</br><br>Precio: $${opcion[0].precio} </br>`,
      showCancelButton: true,
      confirmButtonText: 'Reservar',
      cancelButtonText: 'Cancelar',
      icon:'warning',
      allowOutsideClick:false
    }).then((result) => {
      

      if (result.isConfirmed) {
        cambioDisponibilidad(opcion,indexHora)
        
      } else if (result.isDenied) {
        
      }})
      
  }
  
  
}
function cambioDisponibilidad(arr,Ihora){
if(arr[0].precio>usuarios[0].money){
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'No tienes saldo suficiente. Ve a tu perfil para hacer una recarga',
    footer: '<a href="./pages/myprofile.html">Ir a mi perfil</a>'
  })
}
else{

  
          inventario.forEach(element => {
            if (element.id==arr[0].id){
                element.disponibilidad[Ihora]=0
                
            }
        });
    }
}


function crearFiltros(){
  let html = "";
  for(const item of arrFiltros){
    const{id,nombre,valores}=item;
    html=`<div class="accordion-item">
    <h2 class="accordion-header" id="heading${id}">
    <button class="accordion-button collapsed " type="button" data-bs-toggle="collapse" data-bs-target="#collapse${id}" aria-expanded="false" aria-controls="collapse${id}">
        ${nombre}
    </button>
    </h2>
    <div id="collapse${id}" class="accordion-collapse collapse" aria-labelledby="heading${id}" data-bs-parent="#accordionExample">
    <div class="accordion-body">
                
<ul class="list-group" id="Filtro${id}">
</ul>
</div>`
sFiltros.innerHTML+=html
      let mom=document.getElementById(`Filtro${id}`)
      for(const valor of valores){
        let mhijo=document.createElement("div");
        mhijo.innerHTML=`<li class="list-group-item">
        <input class="form-check-input" type="checkbox" value="${valor}" >
        <label class="form-check-label" >
        ${valor}
        </label>
        </li>`
        mom.appendChild(mhijo);
      }


  }
  
  
    const checks=document.querySelectorAll('input[type="checkbox"]');
  for (const check of checks) {
  check.addEventListener("change", () => {
      
      if (check.checked) {
        filtrosAplicados.push(check.value)
        
        seleccionFiltros(filtrosAplicados)
                
      }
      else{
        filtrosAplicados=filtrosAplicados.filter(s=>s!=check.value)
        console.log(filtrosAplicados)
         canchas=inventario
        seleccionFiltros(filtrosAplicados)
      }
    });
  }
  
 
  
}


/* Fin de funciones */

/* Ejecución de funciones */
crearHtml(canchas);
crearFiltros()

// Crear filtros//

//Listeners
/*
await Swal.fire({
    title:`Reserva de cancha: ${opcion[0].nombre}`,
    text:'Selecciona un horario',
    icon:'question',
    input:"select",
    inputOptions:opcion[0].hDispo,
    showDenyButton: true,   
    confirmButtonText: 'Continuar',
    denyButtonText: "Volver atrás",
    }
  ).then((result) => {
    
    if (result.isConfirmed) {
      Swal.fire('Saved!', '', 'success')
    } else if (result.isDenied) {
      Swal.fire('Changes are not saved', '', 'info')
    }})



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