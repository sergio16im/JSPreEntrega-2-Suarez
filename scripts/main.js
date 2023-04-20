//Objetos
const cancha1={
    nombre:"Cancha sintética La 20",
    direccion:"Cra. 20 #29-10",
    tipoCancha:"Sintética",
    horarios:[],
    disponibilidad:[],
    tipoHorarios:["matutino","nocturno"],
    calificacion: 7,
    precio:25000,
    rutaImagen:"./assets/images/cancha_1.jpg"
}
const cancha2={
    nombre:"El nuevo Maracana",
    direccion:"Cl. 18 #21-16",
    tipoCancha:"Sintética",
    horarios:[],
    disponibilidad:[],
    tipoHorarios:["nocturno"],
    calificacion: 4,
    precio:30000,
    rutaImagen:"./assets/images/cancha_2.jpg"
}
const cancha3={
    nombre:"Digigol",
    direccion:"Cl. 14 #15-56",
    tipoCancha:"Sintética",
    horarios:[],
    disponibilidad:[],
    tipoHorarios:["matutino"],
    calificacion: 6,
    precio:35000,
    rutaImagen:"./assets/images/cancha_3.jpg"
}
const cancha4={
    nombre:"Gool de Oro",
    direccion:"Cl. 35 #24-69",
    tipoCancha:"Sintética",
    horarios:[],
    disponibilidad:[],
    tipoHorarios:["matutino","nocturno"],
    calificacion: 4,
    precio:20000,
    rutaImagen:"./assets/images/cancha_4.jpg"
}
const cancha5={
    nombre:"Mundo Fútbol Club",
    direccion:"Cl. 22 #21-16",
    tipoCancha:"Sintética",
    horarios:[],
    disponibilidad:[],
    tipoHorarios:["matutino","nocturno"],
    calificacion: 8,
    precio:40000,
    rutaImagen:"./assets/images/cancha_5.jpg"
}
const fTipoCancha={    id:"Zero",    nombre:"Tipo de cancha",    valores:["Síntetica","Cemento"]}
const fTipoHorario={    id:"One",    nombre:"Horarios",    valores:["Matutino","Tardes","Nocturno"]}
const fPrecio={    id:"Two",    nombre:"Precios",    valores:["25000","30000","40000"]}
const fCalificacion={    id:"Three",    nombre:"Calificación", valores:["5 estrellas","7 estrellas","9 estrellas"]}
//Array de objetos
const aguas=[cancha1,cancha2,cancha3,cancha4, cancha5]
const caliente=[fTipoCancha,fTipoHorario,fPrecio,fCalificacion]

//Funciones
function mostrarCanchas(){
    let padre=document.getElementById("seccionCanchas")
    for(const canchas of aguas){
        let contenedor = document.createElement("div");

        contenedor.innerHTML=`<div class="card cancha" style="width: 18rem;">
        <img src="${canchas.rutaImagen}" class="card-img-top" alt="foto_cancha">
        <div class="card-body">
          <h5 class="card-title">${canchas.nombre}</h5>
          <div class="d-inline">
            <img class="img-rounded d-inline" src="./assets/icons/estrella.png" alt="icono_de_estrella" style="width: 2rem;">
            <h3 class="d-inline text-center">${canchas.calificacion}</h3>
          </div>
          <h3 class="d-inline">${canchas.tipoCancha}</h3>
          <p class="card-text">Ubicada en la ${canchas.direccion}.</p>
          <a href="perfil_cancha.html" class="btn btn-success">Alquilar cancha</a>
        </div>`;
        padre.appendChild(contenedor);
    }
        

    


    

}


mostrarCanchas()

   
/*<li class="list-group-item">
        <input class="form-check-input" type="checkbox" value="" id="defaultCheck1">
      <label class="form-check-label" for="defaultCheck1">
        5 - 4 estrellas
      </label>
    </li>*/ 





