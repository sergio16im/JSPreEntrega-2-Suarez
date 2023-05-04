


  const sCanchas = document.querySelector("#seccionCanchas")
  const sFiltros=document.querySelector("#seccionFiltros")




//Informacion de usuario
const usuarios=[{id:"UsserA01",name:"Camilo Vargas",rol:"Admin",password:"1234",email:"admin1@gmail.com",money:50000,reservations:[],rutaImagen:"./assets/images/goku.jpg"}]

const arrFiltros=[{    id:"Zero",    nombre:"Tipo de cancha",    valores:["Sintética","Cemento"]},{    id:"One",    nombre:"Horarios",    valores:["Matutino","Tardes","Nocturno"]},{    id:"Two",    nombre:"Precios",    valores:["25000","30000","40000"]},{    id:"Three",    nombre:"Calificación", valores:["5 estrellas","7 estrellas","9 estrellas"]}]

//Seteo variable canchas y usuario, si LS vacio entonces canchas = inventario
//#####

function inicioZero(){
  let x=localStorage.getItem("valorx")
  
  if(x==null){
    localStorage.setItem("nombreUsuario",usuarios[0].name)
    localStorage.setItem("correoUsuario",usuarios[0].email)
    localStorage.setItem("rutaImagen",usuarios[0].rutaImagen)
    localStorage.setItem("dinero",usuarios[0].money)
    localStorage.setItem("rolUsuario",usuarios[0].rol)
    localStorage.setItem("reservas",JSON.stringify( usuarios[0].reservations))
    localStorage.setItem("valorx",true)
  }
}  



async function fetchCanchas(){
  const res=await fetch("../datos/data.json")
  const data=await res.json()
   
    let y=localStorage.getItem("valory")
    if(y==null){
      
      localStorage.setItem("canchas",JSON.stringify(data))
      localStorage.setItem("valory",true)
      setTimeout(() => {
        location.reload()
      }, "1000");
      
    }
   

}

let filtrosAplicados=[]
let canchas=JSON.parse(localStorage.getItem("canchas"))
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
  let dinero=localStorage.getItem("dinero")
if(arr[0].precio>dinero){
  Swal.fire({
    icon: 'error',
    title: 'Oops...',
    text: 'No tienes saldo suficiente. Ve a tu perfil para hacer una recarga',
    footer: '<a href="./pages/myprofile.html">Ir a mi perfil</a>'
  })
}
else{
  Swal.fire({
    title:"Reserva exitosa",
    text:"El comprobante fue enviado a tu correo electrónico",
    icon:"success"
  })
      dinero-=arr[0].precio
      localStorage.setItem("dinero",dinero)
      //Cambios en el local storage
      let reservaTempo=JSON.parse(localStorage.getItem("reservas"))
      let descripcionReserva={id:`C${arr[0].id}H${arr[0].hDispo[Ihora]}`,cancha:arr[0].nombre,horario:arr[0].hDispo[Ihora],precio:arr[0].precio}
      console.log(Ihora)
      reservaTempo.push(descripcionReserva)
      localStorage.setItem("reservas",JSON.stringify( reservaTempo))
      let baseCanchas=JSON.parse(localStorage.getItem("canchas"))

          baseCanchas.forEach(element => {
            if (element.id==arr[0].id){
              let horaR=arr[0].hDispo[Ihora]
              
              let i =parseInt(element.horarios.findIndex(el =>el==horaR))
              element.disponibilidad[i]=0
            }
            
        });
        localStorage.setItem("canchas",JSON.stringify(baseCanchas))
    }
    setTimeout(() => {
      location.reload()
    }, "3000");
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
  
  // Crear filtros//
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
         canchas=JSON.parse(localStorage.getItem("canchas"))
        seleccionFiltros(filtrosAplicados)
      }
    });
  }
  
 
  
}


/* Fin de funciones */

/* Ejecución de funciones */

inicioZero()
crearFiltros()
fetchCanchas()
crearHtml(canchas)





