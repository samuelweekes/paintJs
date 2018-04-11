const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const saveButton = document.getElementById('saveButton');
//Variable for checking if we are painting or not
let paint;
// Arrays for tracking mouse movement
let clickX = new Array();
let clickY = new Array();
let clickDrag = new Array();
//Colors
const colors = ['skyblue', 'yellow', 'tomato', 'black'];
const colorBlue = "skyblue";
const colorYellow = "yellow";
const colorRed = "tomato";
const colorBlack = "black";

saveButton.addEventListener('click', (e) => {
  var image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
  window.location.href=image;
});



canvas.addEventListener('mousedown', (e) => {
  let mouseX = e.pageX - canvas.offsetLeft;
  let mouseY = e.pageY - canvas.offsetTop;
  paint = true;
  addClick(mouseX, mouseY);
  redraw();
});

canvas.addEventListener('mousemove', (e) => {
  let mouseX = e.pageX - canvas.offsetLeft;
  let mouseY = e.pageY - canvas.offsetTop;
  if(paint) {
    addClick(mouseX,mouseY, true);
    redraw();
  }
});

canvas.addEventListener('mouseup', () => {
  paint = false;
});

canvas.addEventListener('mouseleave', () => {
  paint = false;
});

function addClick(x,y,dragging) {
  clickX.push(x);
  clickY.push(y);
  clickDrag.push(dragging);
}


function redraw() {
  ctx.clearRect(0,0,canvas.width, canvas.height);
  ctx.strokeStyle = randomColor();
  ctx.lineJoin = 'round';
  ctx.lineWidth = 2;

  for(let i=0; i<clickX.length;i++) {
    ctx.beginPath();
    if(clickDrag[i] && i) {
      ctx.moveTo(clickX[i-1], clickY[i-1]);
    } else{
      ctx.moveTo(clickX[i]-1, clickY[i]);
    }
    ctx.lineTo(clickX[i], clickY[i]);
    console.log(clickX[i], clickY[i]);
    ctx.closePath();
    ctx.stroke();
  }
}

function randomColor() {
  return colors[Math.floor(Math.random() * Math.floor(4) + 1)];
}
