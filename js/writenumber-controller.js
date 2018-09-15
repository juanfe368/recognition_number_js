var app = angular.module('writenumber', ['signature']);

app.controller('writecontroller', function ($scope, $location, $anchorScroll) {

    $scope.chargerFx = function () {
        try {
            console.log('var fx:', fx);
            $scope.canvas = fx.canvas();
            return $scope.canvas;
        } catch (e) {
            alert(e);
            return;
        }
    }

    $scope.data = {
        canvasDraw: document.getElementById("signature").firstChild,
        contextCanvas: document.getElementById("signature").firstChild.getContext('2d')
    }

    $scope.boundingBox = {
        width: 400,
        height: 200
    };

    $scope.misc = {
        intentosRespuestas: 0,
        cantidadPreguntas: 0,
        respuestasAcertadas: 0,
        numIntentos: 0,
        chargerOcrad: false,
        pathOcr: '../ocrad.js-master/ocrad.js',
        intentosRespuestas: 0,
        cantidadPreguntas: 10,
        respuestasAcertadas: 0,
        respuetsasIncorrectas: 0
    }

    $scope.startGame = function () {
        $scope.misc.intentosRespuestas = 0;
        $scope.misc.cantidadPreguntas = 10;
        $scope.misc.respuestasAcertadas = 0;
        $scope.misc.respuetsasIncorrectas = 0;
        $scope.misc.numIntentos = 2;

        $scope.include($scope.misc.pathOcr);
        $scope.carga();
        $scope.generateDraw();
        document.getElementById("butStart").disabled = true;
        document.getElementById("butStartSmall").disabled = true;
    }

    $scope.include = function (file_path) {
        var j = document.createElement("script");
        j.type = "text/javascript";
        j.src = file_path;
        $scope.misc.chargerOcrad = true;
        document.getElementById("butProcess").disabled = false;
        document.getElementById("butProcessSmall").disabled = false;
        document.body.appendChild(j);
    }

    $scope.carga = function () {

        var contador_s = 60;
        var contador_m = 0;
        var s = document.getElementById("segundos");
        var m = document.getElementById("minutos");

        cronometro = setInterval(
            function () {
                if (contador_s == 0) {
                    contador_s = 0;
                    contador_m++;
                    $scope.endGame();
                }

                s.innerHTML = contador_s + " Segundos";
                contador_s--;
            }, 1000);
    }

    $scope.endGame = function () {
        document.getElementById("butStart").disabled = false;
        document.getElementById("butStartSmall").disabled = false;
        document.getElementById("butProcess").disabled = true;
        document.getElementById("butProcessSmall").disabled = true;
        $scope.hiddenRespuests();
        $scope.showResults();
        clearInterval(cronometro);
    }

    $scope.hiddenRespuests = function () {
        document.getElementById("divRespuestInCorrect").style.display = 'none';
        document.getElementById("divRespuestCorrect").style.display = 'none';
    }

    $scope.showResults = function () {
        $('#myModalResults').modal('show');
        var textoResult = document.getElementById("paragraphResults");
        textoResult.innerHTML = "Respuestas correctas: " + $scope.misc.respuestasAcertadas + ".<br> Repuestas incorrectas: " + $scope.misc.respuetsasIncorrectas + ".<br>" + "Excelente trabajo sigue así y mejora tu puntaje";
    }

    $scope.loadOperacion = function () {
        $scope.misc.numIntentos = 2;
        var valorAleatorio1 = Math.round(Math.random() * 10);
        var valorAleatorio2 = Math.round(Math.random() * 10);

        if (valorAleatorio2 > valorAleatorio1) {
            valorAleatorio1 = valorAleatorio2 + 1;
        }

        document.getElementById("inputField1").value = valorAleatorio1;

        var valor1 = document.getElementById("inputField1").value;
    }

    $scope.generateDraw = function () {
        $scope.misc.numIntentos = 2;
        var valorAleatorio = Math.round(Math.random() * 10);
        document.getElementById("inputField1").value = valorAleatorio;
        var valor1 = document.getElementById("inputField1").value;
    }

    $scope.getRespuest = function (operation, valor1, valor2) {
        var respuest = 0;
        if (operation == "+") {
            respuest = parseInt(valor1) + parseInt(valor2);
        } else if (operation == "-") {
            respuest = parseInt(valor1) - parseInt(valor2);
        }
        return respuest;
    }

    $scope.getOperationRandom = function () {
        var arrayOperations = ["+", "-"];
        var valorAleatorio = Math.round(Math.random() * 1);
        return arrayOperations[valorAleatorio];
    }

    $scope.recognizeImage = function () {

        document.getElementById('transcription').value = "(Reconociendo...)";

        OCRAD($scope.data.canvasDraw, {
            numeric: true,
        }, function (text) {
            console.log('text:', text);
            document.getElementById('transcription').value = text;
            $scope.getCalificacion(document.getElementById('transcription').value);
            $scope.resetCanvas();
        });
    }

    $scope.getCalificacion = function (numRespuesUser) {
        var valorRespuestCorrect = document.getElementById("inputField1").value;
        if (valorRespuestCorrect == numRespuesUser.trim()) {
            document.getElementById("divAlert").style.display = 'none';
            document.getElementById("divRespuestInCorrect").style.display = 'none';
            document.getElementById("divRespuestCorrect").style.display = 'initial';
            $scope.misc.respuestasAcertadas++;
        } else if (valorRespuestCorrect != numRespuesUser.trim() && $scope.misc.numIntentos != 0) {
            document.getElementById("divAlert").style.display = 'initial';
            document.getElementById("divRespuestInCorrect").style.display = 'none';
            document.getElementById("divRespuestCorrect").style.display = 'none';
            $scope.misc.numIntentos--;
            return;
        } else {
            document.getElementById("divAlert").style.display = 'none';
            document.getElementById("divRespuestCorrect").style.display = 'none';
            document.getElementById("divRespuestInCorrect").style.display = 'initial';
            document.getElementById("divRespuestInCorrect").innerHTML = " La Respuesta correcta era: " + valorRespuestCorrect;
            $scope.misc.respuetsasIncorrectas++;
        }

        /*$scope.misc.cantidadPreguntas--;
        if ($scope.misc.cantidadPreguntas == 0) {
            $scope.endGame();
        }*/

        $scope.loadOperacion();
    }

    $scope.runOcr = function (image_data, raw_feed) {
        var start = Date.now();
        if (!raw_feed) {
            image_data = $scope.data.contextCanvas.getImageData(0, 0, $scope.data.canvasDraw.width, $scope.data.canvasDraw.height);
            console.log('image_data:', image_data);

        }
    }

    $scope.getImageCanvas = function () {
        $scope.canvas = document.getElementById("newcanvas");
        $scope.ctx = canvas.getContext("2d");
        $scope.img = document.getElementById("newcanvas");
        $scope.ctx.drawImage(img, 10, 10);
    }

    $scope.filter1 = function (image) {
        var canv = cargarFX();
        canv.id = "canvasRespuest";
        canv.name = "canvasRespuest";
        var texture = canv.texture(image);

        canv.draw(texture).edgeWork(10).update();
        image.parentNode.insertBefore(canv, image);
        image.parentNode.removeChild(image);
    }

    $scope.resetCanvas = function () {
        $scope.data.contextCanvas.fillStyle = 'white';
        $scope.data.contextCanvas.fillRect(0, 0, $scope.data.canvasDraw.width, $scope.data.canvasDraw.height);
        $scope.data.contextCanvas.fillStyle = 'black';
    }

    $scope.playAction = function () {
        $("html, body").animate({ scrollTop: $('#sectionGames').offset().top });
        /*var heightDivOperation = document.getElementById("divRespuest").scrollHeight;
        var heightPage = document.body.scrollHeight;
        var totalPosition = heightPage - 2920;
    
        window.scroll({
            top: totalPosition,
            left: 0,
            behavior: 'smooth'
        });*/
    }

    $scope.playActionMovil = function () {
        var heightDivOperation = document.getElementById("divRespuest").scrollHeight;
        var heightPage = document.body.scrollHeight;
        var totalPosition = heightPage - 4930;
    
        window.scroll({
            top: totalPosition,
            left: 0,
            behavior: 'smooth'
        });
    }

    $scope.resetCanvas();


});