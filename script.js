var granja = document.getElementById("granjita");
var lienzo = granja.getContext("2d");

var fondo = {
    url: "tile.webp",
    load: false
}
var vaca = {
    url: "vaca.webp",
    load: false
}
var cerdo = {
    url: "cerdo.webp",
    load: false
}
var pollo = {
    url: "pollo.webp",
    load: false
}
var teclas = {
    UP: 38,
    DOWN: 40,
    LEFT: 37,
    RIGHT: 39
}

var x = 10;
var y = 10;

fondo.objeto = new Image();
fondo.objeto.src = fondo.url;
fondo.objeto.addEventListener("load", cargarFondo);

vaca.objeto = new Image();
vaca.objeto.src = vaca.url;
vaca.objeto.addEventListener("load", cargarVaca);

cerdo.objeto = new Image();
cerdo.objeto.src = cerdo.url;
cerdo.objeto.addEventListener("load", cargarCerdo);

pollo.objeto = new Image();
pollo.objeto.src = pollo.url;
pollo.objeto.addEventListener("load", cargarPollo);

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function cargarFondo() {
    fondo.load = true;
    dibujar();
}

function cargarVaca() {
    vaca.load = true;
    dibujar();
}

function cargarCerdo() {
    cerdo.load = true;
    dibujar();
}

function cargarPollo() {
    pollo.load = true;
    dibujar();
}

function dibujar() {
    lienzo.drawImage(fondo.objeto, 0, 0);
    var cantidad = aleatorio(0, 10);
    lienzo.drawImage(cerdo.objeto, x, y);
    for (let i = 0; i <= cantidad; i++) {
        lienzo.drawImage(vaca.objeto, 10 * aleatorio(0, 42), 10 * aleatorio(0, 42));
        lienzo.drawImage(pollo.objeto, 10 * aleatorio(0, 42), 10 * aleatorio(0, 42));
    }
}

function dibujar2() {
    lienzo.drawImage(fondo.objeto, 0, 0);
    var cantidad = aleatorio(0, 10);

    for (let i = 0; i <= cantidad; i++) {
        lienzo.drawImage(vaca.objeto, 10 * aleatorio(0, 42), 10 * aleatorio(0, 42));
        lienzo.drawImage(pollo.objeto, 10 * aleatorio(0, 42), 10 * aleatorio(0, 42));
    }
}

document.addEventListener("keydown", mover);

function mover(evento) {
    var movimiento = 20;
    switch (evento.keyCode) {
        case teclas.UP:
            dibujar2();
            lienzo.drawImage(cerdo.objeto, x, y - movimiento);
            y -= movimiento;
            break;
        case teclas.DOWN:
            dibujar2();
            lienzo.drawImage(cerdo.objeto, x, y + movimiento);
            y += movimiento;
            break;
        case teclas.LEFT:
            dibujar2();
            lienzo.drawImage(cerdo.objeto, x - movimiento, y);
            x -= movimiento;
            break;
        case teclas.RIGHT:
            dibujar2();
            lienzo.drawImage(cerdo.objeto, x + movimiento, y);
            x += movimiento;
            break;
    }
}