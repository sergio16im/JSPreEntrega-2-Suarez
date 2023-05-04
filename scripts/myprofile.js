
const Sreservas=document.querySelector("#perfilReservas")
const opcionesRecarga=[10000,20000,50000]

//Manipulacion del DOM//
function paginaPerfil(arr){
    let html=document.querySelector("#perfilInformacion")
    html.innerHTML=`<div class="card" style="width:100%;">
    <!--Seccion de perfil de la cancha-->
      <img src=".${localStorage.getItem("rutaImagen")}" class="card-img-top" alt="foto_perfil">
      <div class="card-body">
        <h5 class="card-title text-center">${localStorage.getItem("nombreUsuario")}</h5>
        
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item text-center">${localStorage.getItem("rolUsuario")}</li>
        <li class="list-group-item text-center">${localStorage.getItem("correoUsuario")}</li>
        <li class="list-group-item text-center">$${localStorage.getItem("dinero")}</li>
      </ul>
      <div class="card-body">
      <a class="card-link" id="botonRecarga"><h6 class="text-center">Hacer Recarga</h6></a>
      <a class="card-link link-danger" id="botonInfoCambio"><h6 class="text-center">Cambiar información  básica</h6></a>
      </div>
    </div>`

  }
  function crearRerservas(){
    
    Sreservas.innerHTML=""
    let html=""
    let arr=JSON.parse(localStorage.getItem("reservas"))
    if(arr.length==0){
      Sreservas.innerHTML=`<div class="alert alert-secondary" role="alert">
     No cuentas con reservas en estos momentos
    </div>`
    }
    else{
      for(const item of arr){
        const{id,cancha,horario,precio}=item
        html=`<div class="card col-12" >
        <div class="card-body">
          <h5 class="card-title">Reserva ${id}</h5>
          <h6 class="card-subtitle mb-2 text-muted">Lugar: ${cancha}</h6>
          <p class="card-text">Horario: ${horario} horas</p>
          <p class="card-text">Precio:$ ${precio}</p>
          <a  id="btn${id}"class="btn btn-danger">Cancelar reservacion</a>
          
        </div>
      </div>`
        Sreservas.innerHTML+=html
      }
    }
    
  }

  
  
  //Funciones asincronicas 
  async function recargaDinero(){
    
    const { value: indexRecarga } = await Swal.fire({
      title:"Recarga de dinero",
      text:"Recarga tu cuenta para alquilar canchas",
      input:'select',
      showCancelButton: true,
      confirmButtonText: 'Recargar',
      cancelButtonText: `Cancelar`,
      icon:"warning",

    inputPlaceholder:"Selecciona una opcion",
    inputOptions:opcionesRecarga,

    })

    if(indexRecarga){
      Swal.fire({
        icon:"success",
        title:"Recarga realizada exitosamente",
        text:`Se han agregado $${opcionesRecarga[indexRecarga]} a tu cuenta`
      })
      let dinero=parseInt(localStorage.getItem("dinero"))
       dinero+=opcionesRecarga[indexRecarga]
      localStorage.setItem("dinero",dinero)
      setTimeout(() => {
        location.reload()
      }, "2000");
      
      
    }
    

  }
async function cambioInformacion(){
  const { value: formValues } = await Swal.fire({
    title: 'Cambio de información básica',
    html:
    `   <div class="input-group mb-3">
          <span class="input-group-text">Nombre</span>
          <input type="text" class="form-control" Value="${localStorage.getItem("nombreUsuario")}"  aria-label="nombre" aria-describedby="basic-addon1" id="swal-input1">
        </div>
        <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Email</span>
        <input type="email" class="form-control" placeholder="Email" Value="${localStorage.getItem("correoUsuario")}" aria-label="email" aria-describedby="basic-addon1" id="swal-input2">
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">URL Foto de perfil</span>
        <input type="url" class="form-control" Value="${localStorage.getItem("rutaImagen")}" aria-label="urlFoto" aria-describedby="basic-addon1" id="swal-input3">
      </div>
           
     `,
    focusConfirm: false,
    preConfirm: () => {
      return [
        document.getElementById('swal-input1').value,
        document.getElementById('swal-input2').value,
        document.getElementById('swal-input3').value
      ]
      
    },
    showCancelButton: true,
    confirmButtonText:"Cambiar información",
    cancelButtonText:"Cancelar",
    allowOutsideClick:false
  })
  
  if (formValues) {
    localStorage.setItem("nombreUsuario",formValues[0])
    localStorage.setItem("correoUsuario",formValues[1])
    localStorage.setItem("rutaImagen",formValues[2])
    Swal.fire({title:"Cambios guardados",icon:"success"})
    setTimeout(() => {
      location.reload()
    }, "1000");
  }
}
  //Ejecucionde funciones
  paginaPerfil(usuarios)
  crearRerservas()
  
  
// Creacion de listeners
  const recarga=document.querySelector("#botonRecarga");
  recarga.addEventListener("click",()=>{
    recargaDinero()
    
    
 
  });
  const cambioInfo=document.querySelector('#botonInfoCambio')
  cambioInfo.addEventListener("click",()=>{cambioInformacion()})