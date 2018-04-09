/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 var numIntentos = 0;

function recognize_image() {
    //document.getElementById('transcription').innerText = "(Recognizing...)";
    document.getElementById('transcription').value = "(Reconociendo...)";

    OCRAD(document.getElementById("c"), {
        //OCRAD(document.getElementById("laimagen"), {
        //OCRAD(document.getElementById("canvasRespuest"), {
        numeric: true,
    }, function(text) {
        //            document.getElementById('transcription').className = "done";
        //document.getElementById('transcription').innerText = text;
        document.getElementById('transcription').value = text;
        this.getCalificacion(document.getElementById('transcription').value);
        reset_canvas();
    });
}

function getImageCanvas() {
    var canvas = document.getElementById("c");
    var ctx = canvas.getContext("2d");
    var img = document.getElementById("c");
    ctx.drawImage(img, 10, 10);
}

var c = document.getElementById('c'),
    o = c.getContext('2d');

function reset_canvas() {
    o.fillStyle = 'white';
    o.fillRect(0, 0, c.width, c.height);
    o.fillStyle = 'black';
}

// here's a really simple little drawing app so people can try their luck at
// the lottery that is offline handwriting recognition
var drag = false,
    lastX, lastY;
c.onmousedown = function(e) {
    drag = true;
    lastX = 0;
    lastY = 0;
    e.preventDefault();
    c.onmousemove(e);
}
c.onmouseup = function(e) {
    drag = false;
    e.preventDefault();
    runOCR();
}
c.onmousemove = function(e) {
    e.preventDefault();
    var rect = c.getBoundingClientRect();
    var r = 5;

    function dot(x, y) {
        o.beginPath();
        o.moveTo(x + r, y);
        o.arc(x, y, r, 0, Math.PI * 2);
        o.fill();
    }
    if (drag) {
        var x = e.clientX - rect.left,
            y = e.clientY - rect.top;

        if (lastX && lastY) {
            var dx = x - lastX,
                dy = y - lastY;
            var d = Math.sqrt(dx * dx + dy * dy);
            for (var i = 1; i < d; i += 2) {
                dot(lastX + dx / d * i, lastY + dy / d * i);
            }
        }
        dot(x, y);

        lastX = x;
        lastY = y;
    }
}

document.body.ondragover = function() { document.body.className = 'dragging'; return false }
document.body.ondragend = function() { document.body.className = ''; return false }
document.body.onclick = function() { document.body.className = ''; }
document.body.ondrop = function(e) {
    e.preventDefault();
    document.body.className = '';
    picked_file(e.dataTransfer.files[0]);
    return false;
}

var lastWorker;
//var worker = new Worker('worker.js');

function runOCR(image_data, raw_feed) {
    document.getElementById("output").className = 'processing';
    /*worker.onmessage = function(e) {

        document.getElementById("output").className = '';

        if ('innerText' in document.getElementById("text")) {
            document.getElementById("text").innerText = e.data;
        } else {
            document.getElementById("text").textContent = e.data;
        }
        document.getElementById('timing').innerHTML = 'recognition took ' + ((Date.now() - start) / 1000).toFixed(2) + 's';
    }*/
    var start = Date.now();
    if (!raw_feed) {
        image_data = o.getImageData(0, 0, c.width, c.height);
    }

    //worker.postMessage(image_data);
    //lastWorker = worker;
}

function clearFrame() {
    var divTranscription = document.getElementById("transcription");
    //var divImg = document.getElementById("laimagen");
    divTranscription.innerHTML = "";
    reset_canvas();
    //divImg.src = "";
}

function cargarFX() {
    try {
        var canvas = fx.canvas();
        return canvas;
    } catch (e) {
        alert(e);
        return;
    }
}

function filter1(image) {
    var canv = cargarFX();
    canv.id = "canvasRespuest";
    canv.name = "canvasRespuest";
    // convert the image to a texture
    var texture = canv.texture(image);
    // apply the ink filter

    canv.draw(texture).edgeWork(10).update();
    //canv.draw(texture).noise(0.5).update();
    //canv.draw(texture).dotScreen(320, 239.5, 1.1, 3).update();
    image.parentNode.insertBefore(canv, image);
    image.parentNode.removeChild(image);
}

function loadOperacion() {
    numIntentos = 2;
    var valorAleatorio1 = Math.round(Math.random() * 10);
    var valorAleatorio2 = Math.round(Math.random() * 10);

    if (valorAleatorio2 > valorAleatorio1) {
        valorAleatorio1 = valorAleatorio2 + 1;
    }

    document.getElementById("inputField1").value = valorAleatorio1;
    document.getElementById("inputField2").value = valorAleatorio2;
    document.getElementById("operaField").value = getOperationRandom();

    var valor1 = document.getElementById("inputField1").value;
    var valor2 = document.getElementById("inputField2").value;
    var operation = document.getElementById("operaField").value;

    document.getElementById("inputFieldRespuest").value = getRespuest(operation, valor1, valor2);
}

function getCalificacion(numRespuesUser) {
    var valorRespuestCorrect = document.getElementById("inputFieldRespuest").value;
    if (valorRespuestCorrect == numRespuesUser.trim()) {
        document.getElementById("divAlert").style.display = 'none';
        document.getElementById("divRespuestInCorrect").style.display = 'none';
        document.getElementById("divRespuestCorrect").style.display = 'initial';
        respuestasAcertadas++;
    } else if (valorRespuestCorrect != numRespuesUser.trim() && numIntentos != 0) {
        document.getElementById("divAlert").style.display = 'initial';
        document.getElementById("divRespuestInCorrect").style.display = 'none';
        document.getElementById("divRespuestCorrect").style.display = 'none';
        numIntentos--;
        return;
    } else {
        document.getElementById("divAlert").style.display = 'none';
        document.getElementById("divRespuestCorrect").style.display = 'none';
        document.getElementById("divRespuestInCorrect").style.display = 'initial';
        document.getElementById("divRespuestInCorrect").innerHTML = " La Respuesta correcta era: " + valorRespuestCorrect;
        respuetsasIncorrectas++;
    }

    cantidadPreguntas--;
    if (cantidadPreguntas == 0) {
        endGame();
    }

    loadOperacion();
}

function hiddenRespuests() {
    document.getElementById("divRespuestInCorrect").style.display = 'none';
    document.getElementById("divRespuestCorrect").style.display = 'none';
}

function getOperationRandom() {
    var arrayOperations = ["+", "-"];
    var valorAleatorio = Math.round(Math.random() * 1);
    return arrayOperations[valorAleatorio];
}

function getRespuest(operation, valor1, valor2) {
    var respuest = 0;
    if (operation == "+") {
        respuest = parseInt(valor1) + parseInt(valor2);
    } else if (operation == "-") {
        respuest = parseInt(valor1) - parseInt(valor2);
    }
    return respuest;
}

var cronometro;

function carga() {

    var contador_s = 0;
    var contador_m = 0;
    var s = document.getElementById("segundos");
    var m = document.getElementById("minutos");

    cronometro = setInterval(
        function() {
            if (contador_s == 60) {
                contador_s = 0;
                contador_m++;
                endGame();
                /*m.innerHTML = contador_m;

                if(contador_m==60)
                {
                    contador_m=0;
                }*/
            }

            s.innerHTML = contador_s + " Segundos";
            contador_s++;
        }, 1000);

}

function startGame() {
    intentosRespuestas = 0;
    cantidadPreguntas = 10;
    respuestasAcertadas = 0;
    respuetsasIncorrectas = 0;
    numIntentos = 2;

    carga();
    loadOperacion();
    hiddenRespuests();
    document.getElementById("butStart").disabled = true;
}

var intentosRespuestas = 0;
var cantidadPreguntas = 10;

var respuestasAcertadas = 0;
var respuetsasIncorrectas = 0;

function endGame() {
    document.getElementById("butStart").disabled = false;
    hiddenRespuests();
    showResults();
    clearInterval(cronometro);
}

function showResults() {
    $('#myModalResults').modal('show');
    var textoResult = document.getElementById("paragraphResults");
    textoResult.innerHTML = "Respuestas correctas: " + respuestasAcertadas + ".<br> Repuestas incorrectas: " + respuetsasIncorrectas + ".<br>" + "Excelente trabajo sigue así y mejora tu puntaje";
}

function playAction() {
    var heightDivOperation = document.getElementById("divJuego").scrollHeight;
    var heightPage = document.body.scrollHeight;
    var totalPosition = heightPage - 720;

    window.scroll({
        top: totalPosition,
        left: 0,
        behavior: 'smooth'
    });
}
