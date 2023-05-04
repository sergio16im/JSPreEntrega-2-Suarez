
const Sreservas=document.querySelector("#perfilReservas")
const opcionesRecarga=[10000,20000,50000]
function paginaPerfil(arr){
    let html=document.querySelector("#perfilInformacion")
    html.innerHTML=`<div class="card" style="width:100%;">
    <!--Seccion de perfil de la cancha-->
      <img src=".${arr[0].rutaImagen}" class="card-img-top" alt="foto_perfil">
      <div class="card-body">
        <h5 class="card-title text-center">${arr[0].name}</h5>
        
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item text-center">${arr[0].rol}</li>
        <li class="list-group-item text-center">${arr[0].email}</li>
        <li class="list-group-item text-center">$${localStorage.getItem("dinero")}</li>
      </ul>
      <div class="card-body">
      <a class="card-link" id="botonRecarga"><h6 class="text-center">Hacer Recarga</h6></a>
        
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
          <h6 class="card-subtitle mb-2 text-muted">Cancha: ${cancha}</h6>
          <p class="card-text">Horario: ${horario} horas</p>
          <p class="card-text">Precio:$ ${horario}</p>
          <a  id="btn${id}"class="btn btn-danger">Cancelar reservacion</a>
          
        </div>
      </div>`
        Sreservas.innerHTML+=html
      }
    }
    
  }

  function inicioZero(){
    let x=localStorage.getItem("valorx")
    
    if(x==null){
      localStorage.setItem("dinero",usuarios[0].money)
      localStorage.setItem("reservas",JSON.stringify( usuarios[0].reservations))
      localStorage.setItem("valorx",true)
    }
  }  
  
  inicioZero()
  paginaPerfil(usuarios)
  crearRerservas()
  
  

  const recarga=document.querySelector("#botonRecarga");
  recarga.addEventListener("click",()=>{
    recargaDinero()
    
    
 
  });
  
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
      }, "5000");
      
      
    }
    

  }
  
  