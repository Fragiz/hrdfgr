let cvs = document.querySelector("#flappybird");
let ctx = cvs.getContext("2d");

let bird = document.createElement("img");
bird.src = "images/bird.png";
let bg = document.createElement("img");
bg.src = "images/bg.png";
let pipeUp = document.createElement("img");
pipeUp.src = "images/pipeUp.png";
let pipeBottom = document.createElement("img");
pipeBottom.src = "images/pipeBottom.png";
let fg = document.createElement("img");
fg.src = "images/fg.png";



let xPos = 50;
let yPos = 250;

let xPosfg = 0;
let yPosfg = 400;

let x = 200;
let y = 0;

gap = 110;

let grav = 0.01;
let change = 1;

let score = 0;

let pipes_x = [cvs.width, cvs.width + 150];
let pipes_y = [0, -100];
function draw() {
  ctx.drawImage(bg, 0, 0);
  for (i = 0; i < pipes_x.length; i++) {
    ctx.drawImage(pipeUp, pipes_x[i], pipes_y[i]);
    ctx.drawImage(pipeBottom, pipes_x[i], pipes_y[i] + pipeUp.height + gap);
    pipes_x[i] = pipes_x[i] - 1;
    //генерация труб
    if (pipes_x[i] == 50) {
      pipes_x.push(pipes_x[pipes_x.length - 1] + 250);
      pipes_y.push(Math.floor(Math.random() * pipeUp.height) - pipeUp.height);
    }
    //Столкновения с трубами и полом
    if (xPos + bird.width >= pipes_x[i] && xPos <= pipes_x[i] + pipeUp.width
    && (yPos <= pipes_y[i] + pipeUp.height || yPos + bird.height >= pipes_y[i]
    + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
      pipes_x = [cvs.width];
      pipes_y = [0];
      score = 0;
      xPos = 50;
      yPos = 250;
      change = 1;
    }
    //зачисление очков
    if(xPos == pipes_x[i] + pipeUp.width)
      score += 1;
      
  }
  ctx.drawImage(bird, xPos, yPos);
  ctx.drawImage(fg, xPosfg, yPosfg);
  ctx.fillStule = "#000"
  ctx.font  = "24px Arial";
  ctx.fillText("Cчёт:" + score, 10, 30);
  
  requestAnimationFrame(draw);

  

  yPos -= change;
  change -= grav;
}
draw();
  
cvs.addEventListener("click", function(){
  change = 1;
  
})