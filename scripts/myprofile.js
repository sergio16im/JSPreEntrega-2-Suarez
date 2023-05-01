function paginaPerfil(){
    let html=document.querySelector("#perfilInformacion")
    html.innerHTML=`<div class="card" style="width:100%;">
    <!--Seccion de perfil de la cancha-->
      <img src=".${usuarios[0].rutaImagen}" class="card-img-top" alt="logo_cancha">
      <div class="card-body">
        <h5 class="card-title text-center">${usuarios[0].name}</h5>
        
      </div>
      <ul class="list-group list-group-flush">
        <li class="list-group-item text-center">${usuarios[0].rol}</li>
        <li class="list-group-item text-center">${usuarios[0].email}</li>
        <li class="list-group-item text-center">$${usuarios[0].money}</li>
      </ul>
      <div class="card-body">
      <a class="card-link" id="botonRecarga"><h6 class="text-center">Hacer Recarga</h6></a>
        
      </div>
    </div>`
  }
  paginaPerfil()
  const recarga=document.querySelector("#botonRecarga");
  recarga.addEventListener("click",()=>{
    recargaDinero()
    async function recargaDinero(){
      const opcionesRecarga=[10000,20000,50000]
      Swal.fire({
        title:"Recarga de dinero",
        text:"Recarga tu cuenta para alquilar canchas",
      input:'select',
      inputPlaceholder:"Selecciona una opcion",
      inputOptions:opcionesRecarga,
  
      })
  
  
    }
 
  });
  
  