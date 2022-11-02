// Implementa la validación del formulario urilizando RxJS.
// Si el formulario es inválido, el botón Envíar se desactiva.
// Lo contrario si el formulario es válido.

const form = document.getElementById('form');
const nombre = document.getElementById('nombre');
const email = document.getElementById('email');
const asunto = document.getElementById('asunto');
const mensaje = document.getElementById('mensaje');
const enviar = document.getElementById('enviar');

const inputRegex = new RegExp(/^(?!\s*$).+/, );
//const telRegex = new RegExp(/[0-9]{4}-[0-9]{2}-[0-9]{2}/, 'g');
const emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{3,}))$/, 'g');

const { fromEvent, combineLatest } = rxjs;
const { map, startWith } = rxjs.operators;

const nombre$ = fromEvent(nombre, 'input').pipe(map(()=> inputRegex.test(nombre.value)), startWith(false));
const email$ = fromEvent(email, 'input').pipe(map(()=> emailRegex.test(email.value)), startWith(false));
const asunto$ = fromEvent(asunto, 'input').pipe(map(()=> inputRegex.test(asunto.value)), startWith(false));
const mensaje$ = fromEvent(mensaje, 'input').pipe(map(()=> inputRegex.test(mensaje.value)), startWith(false));

combineLatest([nombre$, email$, asunto$, mensaje$]).pipe(map(([nombreValido, emailValido, asuntoValido, mensajeValido])=>{
    return nombreValido && emailValido && asuntoValido && mensajeValido;
})).subscribe(formularioValido=> enviar.ariaDisabled = !formularioValido);

// Implementa El Submit (envio) del formulario utilizando JavaScript.

let estaEnviando = false;

function manejoBtnClick(e) {
    console.log(e.type); // Ver el Click y hacer nada. El submit sucede en el "form submit".
}
function manejoFormSubmit(e) {
    e.preventDefault(); // Evita el "form submit" nativo (page refresh).
    if (enviar.getAttribute("aria-disabled") === "true") {
        let inputs = [nombre, asunto, mensaje];
        for (let index = 0; index < inputs.length; index++) {
            if (!inputRegex.test(inputs[index].value)) {
                inputs[index].focus();
                break;
            }
            email.focus();
        }
        return;
    }
    if (estaEnviando) return;
    estaEnviando = true;
    alert("MENSAJE ENVIADO");
    estaEnviando = false;
}
enviar.addEventListener("click", manejoBtnClick);
form.addEventListener("submit", manejoFormSubmit);
//const Tooltip = document.querySelector(".js-tooltip");

//Mensajes de error en caso de valor invalido en los campos de contacto.
function InvalidMsg(textbox) {
    if (!inputRegex.test(textbox.value)) {
        textbox.setCustomValidity("Este campo no puede estar en blanco o vacío.");
    }
    else if(textbox.validity.typeMismatch){
        textbox.setCustomValidity("Ingrese una dirección de correo electrónico valida.");
    }
    else {
        textbox.setCustomValidity('');
    }
    return true;
}