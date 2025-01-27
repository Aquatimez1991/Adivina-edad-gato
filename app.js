let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;
let nivel = 1;


function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    // Validar que el número esté dentro del rango permitido
    if (numeroDeUsuario < 1 || numeroDeUsuario > numeroMaximo || isNaN(numeroDeUsuario)) {
        asignarTextoElemento('p', `El número debe estar entre 1 y ${numeroMaximo}. Por favor, intenta nuevamente.`);
        limpiarCaja();
        return; // Salir de la función si el número no es válido
    }

   // Si el número es válido, continuar con la lógica del juego
   if (numeroDeUsuario === numeroSecreto) {
    asignarTextoElemento('p', `¡Acertaste su edad en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}!`);
    document.getElementById('reiniciar').removeAttribute('disabled');
} else {
    asignarTextoElemento('p', `La edad del Gato es ${numeroDeUsuario > numeroSecreto ? 'menor' : 'mayor'}.`);
    intentos++;
    limpiarCaja();
}
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;

    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);

    // Si ya sorteamos todos los números posibles
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', `Ya usaste todos los números posibles del 1 al ${numeroMaximo}. Ingresa un nuevo rango para subir de nivel.`);
        document.getElementById('mas').removeAttribute('disabled'); // Habilitar botón "Más intentos"
        document.getElementById('inicio').setAttribute('disabled', 'true'); // deshabilitar botón "intentar"
    } 
        // Si el número generado está incluido en la lista
        else if (!listaNumerosSorteados.includes(numeroGenerado)) {
            listaNumerosSorteados.push(numeroGenerado);
            actualizarImagen(numeroGenerado); // Actualiza la imagen según el número
            return numeroGenerado;
        } else {
            return generarNumeroSecreto();
        }
    }

function agregarIntentos() {
    // Leer el nuevo rango de intentos del input
    let nuevoMaximo = parseInt(document.getElementById('valorUsuario').value);

    // Validar que el número sea válido y mayor al actual número máximo
    if (!isNaN(nuevoMaximo) && nuevoMaximo > numeroMaximo) {
        numeroMaximo = nuevoMaximo; // Actualizar el nuevo máximo
        listaNumerosSorteados = []; // Reiniciar la lista de números sorteados
        numeroSecreto = generarNumeroSecreto(); // Generar un nuevo número secreto
        
        // Incrementa el nivel
        nivel++; 
        asignarTextoElemento('h1', `Adivina la edad del Gato! - Nivel ${nivel}`);

        // Actualizar el mensaje en pantalla
        asignarTextoElemento('p', `Elige un número del 1 al ${numeroMaximo}. Según la imagen del minino`);
        document.querySelector('.texto__parrafo').style.textAlign = 'justify';

        // Habilitar botón "Más intentos"
        document.getElementById('inicio').removeAttribute('disabled'); 

        // Deshabilitar el botón "Más intentos"
        document.getElementById('mas').setAttribute('disabled', 'true');

        // Limpiar el input
        limpiarCaja();
    } else {
        // Mostrar un mensaje de error si el número no es válido
        asignarTextoElemento('p', 'Por favor, ingresa un número válido mayor al rango actual.');
    }
}

function actualizarImagen(numero) {
    // Selecciona el elemento de imagen con la clase '.container__imagen-animal'
    let imagen = document.querySelector('.container__imagen-animal');

    // Cambia la imagen y el texto alternativo basado en el valor de 'numero'
    if (numero >= 0 && numero <= 4) {
        imagen.src = './img/gatobebe.png'; // Asigna la imagen de un gatito bebé
        imagen.alt = 'Un lindo gatito bebé'; // Asigna el texto alternativo
    } else if (numero >= 5 && numero <= 8) {
        imagen.src = './img/gatoadulto.png'; // Asigna la imagen de un gato adulto
        imagen.alt = 'Un gato adulto'; // Asigna el texto alternativo
    } else if (numero >= 9) {
        imagen.src = './img/gatoviejo.png'; // Asigna la imagen de un gato viejo
        imagen.alt = 'Un gato viejo y sabio'; // Asigna el texto alternativo
    } 
}

function condicionesIniciales() {
    asignarTextoElemento('h1', `Adivina la edad del Gato! - Nivel ${nivel}`);
    document.querySelector('h1').style.textAlign = 'center';
    asignarTextoElemento('.texto__parrafo', `Elige un número del 1 al ${numeroMaximo}. Según la imagen del minino`);
    document.querySelector('.texto__parrafo').style.textAlign = 'justify';
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}


function reiniciarJuego() {
    //limpiar caja
    limpiarCaja();
    //Indicar mensaje de intervalo de números 
    //Generar el número aleatorio
    //Inicializar el número intentos
    condicionesIniciales();
    //Deshabilitar el botón de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled', 'true');

}

condicionesIniciales();