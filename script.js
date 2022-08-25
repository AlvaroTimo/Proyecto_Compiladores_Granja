var granja = document.getElementById("granjita");
var lienzo = granja.getContext("2d");
var juegoTerminado = false;
var input = document.getElementById("entrada");
var boton = document.getElementById("botoncito");

var fondo = {
    url: "/imagenes/tile.png",
    load: false
}
var vaca = {
    url: "/imagenes/vaca.png",
    load: false
}
var cerdo = {
    url: "/imagenes/cerdo.png",
    load: false,
    x:0,
    y:0
}
var pollo = {
    url: "/imagenes/pollo.png",
    load: false
}
var lobo={
    url: "/imagenes/lobo.png",
    load: false,
    x:200,
    y:0
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

lobo.objeto = new Image();
lobo.objeto.src = lobo.url;
lobo.objeto.addEventListener("load", cargarLobo);



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

function cargarLobo(){
    lobo.load=true;
    dibujar();
}

function dibujar() {
    lienzo.drawImage(fondo.objeto, 0, 0);
    var cantidad = aleatorio(0, 5);
    lienzo.drawImage(cerdo.objeto, cerdo.x, cerdo.y);
    for (let i = 0; i <= cantidad; i++) {
        lienzo.drawImage(vaca.objeto, 10 * aleatorio(0, 42), 10 * aleatorio(0, 42));
        lienzo.drawImage(pollo.objeto, 10 * aleatorio(0, 42), 10 * aleatorio(0, 42));
    }
    lienzo.drawImage(lobo.objeto,lobo.x,lobo.y);
}

// document.addEventListener("keyup", mover);

function mover(direccion) {
    let sizeCanvas = 500;
    let sizeCuadrante = 25;
    let movJugador = sizeCuadrante * 2;
    let movLobo = sizeCuadrante;

    switch (direccion) {
        case "arriba":
            if (cerdo.y > -sizeCuadrante) {
                cerdo.y -= movJugador;
                lobo.y += movLobo;
                lobo.x += movLobo;
            } 
            break;
        case "abajo":
            if (cerdo.y < sizeCanvas - sizeCuadrante * 4) {
                cerdo.y += movJugador;
                lobo.y += movLobo;
                lobo.x += movLobo;
              }
              break;
        case "izquierda":
            if (cerdo.x > -sizeCuadrante) {
                cerdo.x = cerdo.x - movJugador;
                lobo.y += movLobo;
                lobo.x += movLobo;
            }
              break;
        case "derecha":
            if (cerdo.x < sizeCanvas - sizeCuadrante * 3) {
                cerdo.x = cerdo.x + movJugador;
                if (lobo.y < 200) {
                  lobo.y += movLobo;
                  lobo.x -= movLobo;
                } 
                else {
                  lobo.y += movLobo;
                  lobo.x += movLobo;
                }
                if (cerdo.y == 0 && cerdo.x == 150 && lobo.y == 75) {
                  lobo.y = 0;
                  lobo.x = 150;
                }
            } 
            break;
    }
    if (lobo.y >= 400) 
        lobo.x += movLobo;
    if (lobo.x >= 400) 
        lobo.y += movLobo;
    lobo.x = Math.min(Math.max(0, lobo.x), 400);
    lobo.y = Math.min(Math.max(0, lobo.y), 400);

    dibujar();

    if (cerdo.y == lobo.y && cerdo.x == lobo.x){
        if(cerdo.y < 400 && cerdo.x < 400){
            perdiste();
        }
    }
    else if (cerdo.y >= 400 && cerdo.x >= 400 &&
        400 - lobo.x <= sizeCuadrante && 400 - lobo.y <= sizeCuadrante
      ) {
        ganaste();
    }
    else if (lobo.x >= 400 && lobo.y >= 400) {
        perdiste()
    }
    
}

function ganaste(){
    dibujarLinea("#90EE90", 35, 30, 250, 470, lienzo, 70);
    dibujarLinea("#90EE90", 465, 30, 250, 470, lienzo, 70);
    reiniciar();
}

function perdiste(){
    dibujarLinea("red", 100, 100, 400, 400, lienzo, 75);
    dibujarLinea("red", 100, 400, 400, 100, lienzo, 75);
    reiniciar();
}

function reiniciar(){
    setTimeout(function(){
        lobo.x=200,
        lobo.y=0;
        cerdo.x=0;
        cerdo.y=0;
        dibujar();
    }, 1000);
}

function dibujarLinea(color,xinicial,yinicial,xfinal,yfinal,lienzo,grueso) {
    lienzo.beginPath();
    lienzo.strokeStyle = color;
    lienzo.lineWidth = grueso;
    lienzo.moveTo(xinicial, yinicial);
    lienzo.lineTo(xfinal, yfinal);
    lienzo.stroke();
    lienzo.closePath();
}

// input.addEventListener("keyup",evaluarEntrada);
boton.addEventListener("click",evaluarEntrada);

function evaluarEntrada(){
    compilar();
}

var tok;
var cont;
var entrada;

function compilar(){
    entrada=input.value;
    entrada=entrada.replace(/(\r\n|\n|\r)/gm, " ");
    entrada=entrada.trim();
    entrada=entrada.split(" ");
    cont=0;
    lobo.x=200,
    lobo.y=0;
    cerdo.x=0;
    cerdo.y=0;
    //reiniciar();
    tok=scanner();
    Prg();
}

//ver si entrada se convirtio efectivamente en un arreglo

function scanner(){
    let actual=entrada[cont];
    cont++;
    if(cont===entrada.lenght-1){
        console.log("fin");
        return "fin"
    }
    else if(actual==="begin"){
        return "begin"
    }
    else if(actual==="end"){
        console.log("end");
        return "end"
    }
    else if(actual==="("){
        return "("
    }
    else if(actual===")"){
        return ")"
    }
    else if(actual===";"){
        return ";"
    }
    else if(actual==="derecha"){
        return "derecha"
    }
    else if(actual==="izquierda"){
        return "izquierda"
    }
    else if(actual==="arriba"){
        return "arriba"
    }
    else if(actual==="abajo"){
        return "abajo"
    }
    else if(actual==="moverse"){
        return "moverse"
    }
    else{
        return "error"
    }   
}   

function parea(t){
    if(tok===t){
        tok=scanner();
    }
    else{
        error();
    }
}
function Prg(){
    //console.log(entrada);
    //parea("begin");
    Bloque();
    //parea("end");
}

function Bloque(){
    if(tok==="moverse"){
        Instruccion();
        Bloque();
    }
    else{
    }
}

function Instruccion(){
    let aux;
    parea("moverse");
    parea("(");
    aux=tok;
    Direccion();
    parea(")");
    parea(";"); 
    mover(aux);
}

function Direccion(){
    if(tok==="derecha"){
        parea("derecha")
    }
    else if(tok==="izquierda"){
        parea("izquierda")
    }
    else if(tok==="arriba"){
        parea("arriba")
    }
    else if(tok==="abajo"){
        parea("abajo")
    }
    else{
        error()
    }
}

function error(){
    console.error("Ha ocurrido un error");
}
/*
    Prg-> begin Bloque end
    Bloque-> Instruccion Bloque
    Instruccion -> moverse(Direccion);
    Direccion -> derecha
    Direccion -> izquierda
    Direccion -> arriba
    Direccion -> abajo
*/