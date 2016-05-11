/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function recognize_image(){
    document.getElementById('transcription').innerText = "(Recognizing...)";

    OCRAD(document.getElementById("c"), {
    //OCRAD(document.getElementById("laimagen"), {
            numeric: true,
    }, function(text){
            document.getElementById('transcription').className = "done";
            document.getElementById('transcription').innerText = text;
    });
}
function getImageCanvas(){
    var canvas = document.getElementById("c");
    var ctx = canvas.getContext("2d");
    var img = document.getElementById("c");
    ctx.drawImage(img, 10, 10);
}
                    
var c = document.getElementById('c'),
    o = c.getContext('2d');

function reset_canvas(){
        o.fillStyle = 'white';
        o.fillRect(0, 0, c.width, c.height);
        o.fillStyle = 'black';	
}

// here's a really simple little drawing app so people can try their luck at
// the lottery that is offline handwriting recognition
var drag = false, lastX, lastY;
c.onmousedown = function(e){ drag = true; lastX = 0; lastY = 0; e.preventDefault(); c.onmousemove(e); }
c.onmouseup   = function(e){ drag = false; e.preventDefault(); runOCR(); }
c.onmousemove = function(e){
    e.preventDefault();
    var rect = c.getBoundingClientRect();
    var r = 5;

    function dot(x, y){
            o.beginPath();
            o.moveTo(x + r, y);
            o.arc(x, y, r, 0, Math.PI * 2);
            o.fill();
    }
    if(drag){
        var x = e.clientX - rect.left, 
                y = e.clientY - rect.top;

        if(lastX && lastY){
            var dx = x - lastX, dy = y - lastY;
            var d = Math.sqrt(dx * dx + dy * dy);
            for(var i = 1; i < d; i += 2){
                    dot(lastX + dx / d * i, lastY + dy / d * i);
            }
        }
        dot(x, y);

        lastX = x;
        lastY = y;
    }
}

document.body.ondragover = function(){ document.body.className = 'dragging'; return false }
document.body.ondragend = function(){ document.body.className = ''; return false }
document.body.onclick = function(){document.body.className = '';}
document.body.ondrop = function(e){
        e.preventDefault();
        document.body.className = '';
        picked_file(e.dataTransfer.files[0]);
        return false;
}

var lastWorker;
var worker = new Worker('worker.js');
function runOCR(image_data, raw_feed){
        document.getElementById("output").className = 'processing';
        worker.onmessage = function(e){

                document.getElementById("output").className = '';

                if('innerText' in document.getElementById("text")){
                        document.getElementById("text").innerText = e.data;
                }else{
                        document.getElementById("text").textContent = e.data;	
                }
                document.getElementById('timing').innerHTML = 'recognition took ' + ((Date.now() - start)/1000).toFixed(2) + 's';
        }
        var start = Date.now();
        if(!raw_feed){
            image_data = o.getImageData(0, 0, c.width, c.height);	
        }

        worker.postMessage(image_data);
        lastWorker = worker;
}

