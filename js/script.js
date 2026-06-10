//---------------------------Funcion para enlaces de navegacion del header---------------------------
window.addEventListener("scroll", () => {
    let seccionActiva = "";

    document.querySelectorAll('section[id]').forEach(sec => {
        if(window.scrollY >= sec.offsetTop - 200) seccionActiva = sec.id;
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.remove('active');
        if(a.getAttribute('href') === '#' + seccionActiva || (seccionActiva === 
            'contenedor-titulos' && a.getAttribute('href') === '#')){
                a.classList.add('active');
            }
    })
})

//---------------------------Funcion para EmailJS---------------------------
const btn = document.getElementById('button');

document.getElementById('formCorreo').addEventListener('submit', function(event) {
    event.preventDefault();
    btn.value = 'Enviando...';

    const serviceID = 'default_service';
    const templateID = 'template_v5acvuv';
    emailjs.sendForm(serviceID, templateID, this)
    .then(() => {
      btn.value = 'Enviar';
      alert('Enviado!');
    }, (err) => {
      btn.value = 'Enviar';
      alert(JSON.stringify(err));
    });
})

//---------------------------Funciones para modo claro/oscuro---------------------------
//--Guardar configuracion--
window.addEventListener("DOMContentLoaded", () => {
    const modo = localStorage.getItem("modo");
    const icon = document.getElementById("modo-claro-oscuro");

    if(modo === "dark"){
        document.body.classList.add("dark");
        document.body.classList.remove("light");
        icon.src = "img/oscuro.png";
    }
    else{
        document.body.classList.add("light");
        document.body.classList.remove("dark");
        icon.src = "img/claro.png";
    }
});
//--Cambiar modo--
function cambiarModo(){
    const icon = document.getElementById("modo-claro-oscuro");

    if(document.body.classList.contains("dark")){
        document.body.classList.remove("dark");
        document.body.classList.add("light");
        localStorage.setItem("modo", "light");
        icon.src = "img/claro.png";
    }
    else{
        document.body.classList.remove("light");
        document.body.classList.add("dark");
        localStorage.setItem("modo", "dark");
        icon.src = "img/oscuro.png";
    }
}

//---------------------------Funciones para mostrar modal---------------------------
function verPlan(){
    let planSeleccionado = "";
    let precio = "";
    //--Validar lo que el usuario elige
    if(document.getElementById("rbnBasic").checked){
        planSeleccionado = "Plan BASIC";
        precio = "150.000/mes";
    }
    else if(document.getElementById("rbnPlatino").checked){
        planSeleccionado = "Plan PLATINO";
        precio = "250.000/mes";
    }
    else if(document.getElementById("rbnPremium").checked){
        planSeleccionado = "Plan PREMIUM";
        precio = "350.000/mes";
    }
    else{
        alert("Por favor seleccione un Plan.");
        return;
    }

    //--Validar horario obligatorio--
    const combo = document.getElementById("horarios");
    if(combo.value === ""){
        alert("Por favor seleccione un Horario.");
        return;
    }
    const horario = combo.options[combo.selectedIndex].text;

    //--Mostrar modal--
    const modalPlan = document.getElementById("modal-plan");
    modalPlan.style.display = "flex";

    modalPlan.querySelector("h2.titulo-plan").textContent = planSeleccionado;
    modalPlan.querySelector("p.parrafo-plan").textContent = precio;
    modalPlan.querySelector("p.horario-plan").textContent = horario;
    modalPlan.querySelector("span.cerrar-plan").onclick = function(){
        modalPlan.style.display = "none";
    }
    const botonCerrar = modalPlan.querySelector("button.boton-cerrar-plan");
    if(botonCerrar){
        botonCerrar.onclick = function(){
            modalPlan.style.display = "none";
        };
    }
}

//---------------------------Funciones para mostrar el plan y horario en textarea---------------------------
const radios = document.querySelectorAll('input[name="plan"]');
const combo = document.getElementById("horarios");
const mensaje = document.getElementById("mensaje");

let planSeleccionado = "";
let turnoSeleccionado = "";

//--Cuando se elige un plan--
radios.forEach(radio => {
  radio.addEventListener("change", function() {
    planSeleccionado = this.nextSibling.textContent.trim();
    actualizarMensaje();
  });
});

//--Cuando se elige un horario--
combo.addEventListener("change", function() {
  if (this.value !== "") {
    turnoSeleccionado = this.options[this.selectedIndex].text;
  } else {
    turnoSeleccionado = "";
  }
  actualizarMensaje();
});

//---------------------------Funcion para actualizar el contenido del textarea---------------------------
function actualizarMensaje() {
    let texto = "";

    if(planSeleccionado){
        texto += "-------------- " + planSeleccionado + " --------------\n";
    }
    if(turnoSeleccionado){
        texto += "-------------- " + turnoSeleccionado + " --------------\n";
    }
    mensaje.value = texto + "\n";
    mensaje.focus();
    mensaje.setSelectionRange(mensaje.value.length, mensaje.value.length);
}

