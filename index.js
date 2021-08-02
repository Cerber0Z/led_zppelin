function mostrar() {
    document.getElementById("menu").style.width = "400px";
    document.getElementById("contenido").style.marginLeft = "400px";
    document.getElementById("abrir").style.display = "none";
    document.getElementById("cerrar").style.display = "inline";
}

function ocultar() {
    document.getElementById("menu").style.width = "0";
    document.getElementById("contenido").style.marginLeft = "0";
    document.getElementById("abrir").style.display = "inline";
    document.getElementById("cerrar").style.display = "none";
}

const canciones = [
    "achilles-last-stand-remaster.mp3",
    "babe-im-gonna-leave-you-remaster.mp3",
    "immigrant-song-remaster.mp3",
    "kashmir-remaster.mp3",
    "led-zeppelin-ramble-on-official-audio.mp3",
    "led-zeppelin-stairway-to-heaven-official-audio.mp3",
    "over-the-hills-and-far-away-remaster.mp3",
    "since-ive-been-loving-you-remaster.mp3",
    "when-the-levee-breaks-remaster.mp3",
    "whole-lotta-love-remaster.mp3"
]


var indiceActual = new Array(1)
    //Funcion para crear mediante javascript el listado de canciones
function crearPlayList() {
    const listado = document.createElement('ol')
    listado.setAttribute("id", 'listadoMusica')
    for (let i = 0; i < canciones.length; i++) {
        const item = document.createElement('li')
        item.appendChild(document.createTextNode(canciones[i]))
        item.setAttribute("id", canciones.indexOf(canciones[i]))
        listado.appendChild(item)
    }
    return listado
}
document.getElementById('playList').appendChild(crearPlayList())


//Funcion para cambiar el icono del reprodutor
function classIconPlay() {
    var element = document.getElementById("iconPlay")
    element.classList.remove("fa-play-circle");
    element.classList.add("fa-pause-circle");
}
//Funcion para control del volumen
const volumen = document.getElementById("volumen")
volumen.oninput = (e) => {
        const vol = e.target.value
        player.volume = vol
    }
    //Funcion para actualizar la barra de progreso del reprodutor
const updateProgress = () => {
        if (player.currentTime > 0) {
            const barra = document.getElementById('progress')
            barra.value = (player.currentTime / player.duration) * 100
        }
        if (player.ended) {
            nextMusic(); //Reproducir la siguiente pista
        }
    }
    //Funcion para reproducir la proxima cancion
function nextMusic() {
    const source = document.getElementById('source');
    var musicaActual = Number(indiceActual[0]);
    if (canciones.length == (musicaActual + 1)) {
        var siguiente = 0
    } else {
        var siguiente = musicaActual + 1
    }
    removeActive()
    var item = document.getElementById(siguiente)
    item.classList.add("active");
    loadMusic(canciones[siguiente]);
    player.play()
    indiceActual[0] = siguiente
    reproduccionActual(canciones[siguiente])
    classIconPlay()
}
//Funcion para reproducir la cancion anterior
function prevMusic() {
    const source = document.getElementById('source');
    var musicaActual = Number(indiceActual[0]);
    if (musicaActual == 0) {
        var anterior = canciones.length - 1
    } else {
        var anterior = musicaActual - 1
    }
    removeActive()
    var item = document.getElementById(anterior)
    item.classList.add("active");
    loadMusic(canciones[anterior]);
    player.play()
    indiceActual[0] = anterior
    reproduccionActual(canciones[anterior])
    classIconPlay()
}
//Funcion para remover todas las clases css activas
function removeActive() {
    var elems = document.querySelectorAll(".active");
    [].forEach.call(elems, function(el) {
        el.classList.remove("active");
    });
    return elems
}
//Funcion para mostrar el nombre del arhivo actual en reproduccion
function reproduccionActual(texto) {

    document.getElementById('currentPlay').innerText = texto
}
//Funcion para cargar las canciones en el reproductor
function loadMusic(ruta) {
    var source = document.getElementById('source')
    var folder = "audio"; //Carpeta donde tenemos almancenada la musica
    source.src = folder + "/" + ruta
    var index = indiceActual[0] = canciones.indexOf(ruta)
    removeActive()
    var item = document.getElementById(index)
    item.classList.add("active");
    reproduccionActual(ruta)
    player.load()
}
//Funcion para pausar o darle play 
function togglePlay() {
    if (player.paused) {
        toggleIcon();
        return player.play();
    } else {
        toggleIcon();
        return player.pause();
    }
}
//Funcion para cambiar el icono play o pause
function toggleIcon() {
    var element = document.getElementById("iconPlay");
    element.classList.toggle("fa-pause-circle");
    element.classList.toggle("fa-play-circle");
}
//Funcion para que al dar click sobre la barra de progeso se permita adelantar
progress.addEventListener('click', adelantar);

function adelantar(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * player.duration;
    player.currentTime = scrubTime;
    console.log(e);
}

loadMusic(canciones[Math.floor(Math.random() * canciones.length)])