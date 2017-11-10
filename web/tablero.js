var canvas = document.getElementById("myCanvas");
var context = canvas.getContext("2d");

let save = document.getElementById("save");
let clear = document.getElementById("clear");

save.addEventListener("click", saveImage, false);
clear.addEventListener("click", clearCanvas, false);
canvas.addEventListener("mousemove", defineImage, false);

function getCurrentPos(evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}


function defineImage(evt) {
    var currentPos = getCurrentPos(evt);
    if (evt.buttons !== 1)
        return;
    for (i = 0; i < document.inputForm.color.length; i++) {
        if (document.inputForm.color[i].checked) {
            var color = document.inputForm.color[i];
            break;
        }
    }
    //Armamos la estructura del JSON a usar    
    var json = JSON.stringify({
        "color": color.value,        
        "size" : 5, 
        "coords": {
            "x": currentPos.x,
            "y": currentPos.y
        }
    });
    drawImageText(json);
    sendText(json);
}

function drawImageText(image) {
    var json = JSON.parse(image);
    context.beginPath(); // begin
    context.lineWidth = json.size;
    context.lineCap = 'round';
    context.strokeStyle = json.color;
    context.moveTo(json.coords.x,json.coords.y); 
    context.lineTo(json.coords.x,json.coords.y); 
    context.stroke(); 
}



function saveImage(evt) {
    var MIME_TYPE = "image/png";

    var imgURL = canvas.toDataURL(MIME_TYPE);

    var dlLink = document.createElement('a');
    dlLink.download = 'canvas';
    dlLink.href = imgURL;
    dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');

    document.body.appendChild(dlLink);
    dlLink.click();
    document.body.removeChild(dlLink);
}

function clearCanvas(evt) {
    var json = JSON.stringify({
        "color": '#FFFFFF',
        "size" : 5000, 
        "coords": {
            "x": 20,
            "y": 20
        }
    });
    drawImageText(json);
    sendText(json);
}


