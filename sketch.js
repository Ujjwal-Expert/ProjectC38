var runner;
var ground;
var score = 0;
var restartImg;

var Obstacles= [];
var obstacleSpeed =5;

var gameState = 'play';

function preload(){
  restartImg = loadImage('restart.png');
}

function setup() {
  createCanvas(800,400);
  runner = createSprite(100, 230,20, 50);
  runner.velocityY = 0;

  ground  = createSprite(400,350,800,20);

  restart = createSprite(400,230,30,30);
  restart.addImage(restartImg);
  restart.scale = 0.2;
  restart.visible = false;
}



function draw() {
  background(255);
  
  runner.velocityY += 0.8;
  runner.collide(ground);

  if(gameState === 'play'){

    if(frameCount%8===0){
      score+=1;
    }

    if(keyWentDown('space')&& runner.y>300){
      runner.velocityY = -12;
    }

    spawnObstacles();
  }

  if(gameState === 'end'){
    push();
    textSize(30);
    text('Game Over',325,200);
    pop();
    restart.visible = true;

    if(mousePressedOver(restart)){
      gameState = 'play';
      score=0;
      restart.visible = false;
    }
  }

  if(score%50===0){
    obstacleSpeed += 0.2;
  }


  text('Score:'+score,700,50);
  drawSprites();
}

function spawnObstacles(){
  var spawnSpeed = Math.round(random(10,20));
  
  if(frameCount%50===spawnSpeed){
    var obstacle = createSprite(850,310,20,20);
    obstacle.velocityX = -obstacleSpeed;

    Obstacles.push(obstacle);
    
    
  }
  if(runner.isTouching(Obstacles)){
    gameState = 'end';
    for(var i=0; i< Obstacles.length; i++){
      Obstacles[i].destroy();
    }
  }
}