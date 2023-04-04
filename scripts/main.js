

//variables globales

const opcionCanchas=[]

//Objetos
let v_cancha={   
    
}
//Canchas
const cancha_1={
    nombre:"La Pecosa",
    precio: 10,
    horarios:[10,11,12,16,17,18,19,20,21,22,23],
    disponibilidad:[1,1,1,1,1,1,1,1,1,1,1],
    tipo_horario:["Mañana","Tarde","Noche"],
    tipo_cancha:["cemento","sintética"],
    hDispo:[]
    
}
const cancha_2={
    nombre:"La Bombonera",
    precio: 15,
    horarios:[16,17,18,19,20,21,22,23],
    disponibilidad:[1,1,1,1,1,1,1,1],
    tipo_horario:["Tarde","Noche"],
    tipo_cancha:["sintética"],
    hDispo:[],
    
}
const cancha_3={
    nombre:"Canchas Futbolmania",
    precio: 20,
    horarios:[10,11,12,18,19,20,21,22,23],
    disponibilidad:[1,1,1,1,1,1,1,1,1],
    tipo_horario:["Mañana","Noche"],
    tipo_cancha:["sintética"],
    hDispo:[],
    
}
const canchas=[cancha_1,cancha_2,cancha_3]

//Usuarios  

const myUser ={
        nombre:"Camilo",
        saldo:50,
        contraseña:1234,
        reservas:[]
        
}

//Funciones anonimas
const listaNombres=canchas.map(cancha =>cancha.nombre )

function horariosDisponibilidad(){ 
    canchas.forEach(element =>{
        element.hDispo=[]
        element.horarios.forEach(el => {
            let x=el*element.disponibilidad[element.horarios.indexOf(el)]
                if (x!=0){
                  element.hDispo.push(x)  
                }
        });
    });
}

//Funciones

function menuSecundario(){
let opcion=parseInt(prompt("Ingresa el número de la opción que quieras elegir:\n 1.Iniciciar sesion\n 2.Salir")) 
switch(opcion){
    case 1:
        inicioSesion();
        break;
    
    case 2:
        alert("¡Gracias por usar nuestro servicio!")
        break;
    default:
        alert("Opcion invalida. Vuelva a intentarlo")
        menuSecundario();

}

}

function inicioSesion(){
    let advertencia=""
    let pista=""
    for(let i=2;i>=0;i--){
        let userIn=prompt("Por favor ingrese su usuario:"+"\n"+pista+"\n Ingrese X para cancelar")
        let passwordIn= parseInt(prompt("Por favor ingrese su contraseña:"+ "\n"+advertencia)) 
        if(userIn===myUser.nombre && passwordIn==myUser.contraseña){
            alert("Bienvenido "+ myUser.nombre)
            menuPrincipal();
            break;
        }
        else if(userIn=="x" || userIn=="X"){
            menuSecundario()
            break;
        }
        else{
            
            alert('Usuario o contraseña incorrectos.');
            advertencia="Le quedan "+ (i) + " intentos"
        }
        if((i)==1){
            pista="Usuario:Camilo Contraseña:1234"
        }
        if((i)==0){
            alert("Lo sentimos. Ha superado el limite de intentos permitidos \nSe cerrará el programa")
            break;
        }

    }
}
function menuPrincipal(){
    let opcion=parseInt(prompt("Ingresa el número de la opción que quieras elegir:\n 1. Alquilar Cancha\n 2. Ver Saldo \n 3. Ver reservaciones\n 4. Cerrar sesion"))
    switch(opcion){
        case 1:
            alquilarCancha();
            break;
        case 2:
            verSaldo();
            break;
            case 3:
            verReservas()
            break;
        case 4:
            alert("Acaba de cerrar sesion")
            menuSecundario();
            break;
        default:
            alert("Opcion invalida. Vuelva a intentarlo")
            menuPrincipal();
    
    }
}
function verSaldo(){
alert("Su saldo es: $"+myUser.saldo )
let opcion=prompt("Ingrese el número de la opcion que quieras elegir \n 1. Hacer una recarga \n 2. Volver atrás" )
    switch(opcion){
    case "1":
        hacerRecarga();
        break;
    
    case "2":
        menuPrincipal();
        break;
    default:
        alert("Opcion invalida. Vuelva a intentarlo")
        verSaldo();
    }
}
function hacerRecarga(){
    let valor=prompt("Ingrese cuanto dinero desea recargar: \n Ingrese X para cancelar")
    if(!isNaN(valor) && valor != null && valor != ""&& valor>0 ){
        
        myUser.saldo+=parseInt(valor)
        alert("Recarga realizadacon éxito \n Su nuevo saldo es de: $"+myUser.saldo)
        menuPrincipal()
    }
    
    else if(valor=="x"||valor=="X"){
        alert("Recarga cancelada")
        menuPrincipal();
    }
    else{
        alert("Valor ingresado incorrecto")
        hacerRecarga();
    }
}

 function verReservas(){
        if(myUser.reservas.length==0){
        alert("Usted no cuenta con ninguna reserva") 
    }
    else{
        alert("Usted cuenta con: "+myUser.reservas.length+" reservaciones")
    }
    menuPrincipal()
        
 }

function alquilarCancha(){
    
   let opcion=prompt("Ingresa el número de la  cancha que deseas alquilar (1"+"-"+listaNombres.length+ "):\n"+listaNombres.join("\n")+ "\n Ingresa X para salir")
        if(!isNaN(opcion) && opcion != null && opcion != ""){
            v_cancha=canchas[opcion-1]
            horariosCanchas()
            
        }
        else if(opcion=="x"||opcion=="X"){
            menuPrincipal();
        }
        else{
            alert("Valor ingresado incorrecto")
            alquilarCancha();
        }

    
}
function horariosCanchas(){
    let hora=prompt("Ingresa la hora que deseas alquilar:\n"+v_cancha.hDispo.join("  ")+ "\n Ingresa X para salir")
    if(!isNaN(hora) && hora != null && hora != "" && v_cancha.hDispo.includes(parseInt(hora)) ){
        validarPrecio(hora)
        
    }
    else if(hora=="x"||hora=="X"){
        menuPrincipal();
    }
    else{
        alert("Valor ingresado incorrecto")
        horariosCanchas();
    }
}


function validarPrecio(a){
if (a>=21){
    precio=v_cancha.precio*3
}
else if(a>=18){
    precio=v_cancha.precio*2
}
else{
    precio=v_cancha.precio
}
let opcion=prompt("¿Desea reservar la cancha "+v_cancha.nombre+" a las "+a+" Horas? (si/no)\n Tendrá un costo de $"+precio)
    switch(opcion)
    {
        case"si":
        pagoCancha(precio,a)
        break;
        case "no":
            menuPrincipal();
        break;
        default:  
        alert("Valor ingresado incorrecto");
        validarPrecio(a);  
    }
}
function pagoCancha(costo,hora){
    if (myUser.saldo<costo){
        alert("Transaccion sin éxito. \n Su saldo es insuficiente\nPor favor haga una recarga")
        verSaldo()
    }
    else{
        
        myUser.saldo-=parseInt(costo)
        alert("Reserva exitosa. \n Horario: "+hora+" Horas"+"\n Lugar: "+v_cancha.nombre+"\n Nuevo saldo:$ "+myUser.saldo)
        let reservacion={horario:hora,lugar:v_cancha.nombre}
        myUser.reservas.push(reservacion)
        reserva(hora)
        ;
    }
}
function reserva(hora){
    canchas.forEach(element => {
        if (element.nombre==v_cancha.nombre){
            element.disponibilidad[element.horarios.indexOf(parseInt(hora))]=0
            
        }
    });
    horariosDisponibilidad()
    v_cancha={}    
    menuPrincipal()
    
}



//Desplique del algoritmo
horariosDisponibilidad()
menuSecundario()


