
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup,Ground,invisible;


var PLAY=1,END=0;
var score=0;

var GameState=PLAY;
var end;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500,500);
  
  FoodGroup=new Group();
  obstacleGroup=new Group();
  
  
  monkey=createSprite(70,370,50,50);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.1;
  
  
  ground=createSprite(250,405,1000,10);
  ground.x=ground.width/2;
  
  
  invisible=createSprite(250,407,1000,10);
  invisible.x=invisible.width/2;
}


function draw() {
  background("white");

  
  if (GameState=== PLAY){
    
    if(ground.x<0){
      ground.x=ground.width/2;
    }
    
    if(invisible.x<0){
      invisible.x=invisible.width/2;
    }    
    invisible.velocityX=-5;
  
  if(keyDown("space") && monkey.isTouching(ground)){
    monkey.velocityY=-20;
  }  
    Obstacle();
  Food();
    
    score = Math.round(frameCount/3);
    ground.velocityX=-(5+2*score/100);
    
    if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
    }
  if(monkey.isTouching(obstacleGroup)){
    GameState=END;
  }
  }
  else if(GameState === END){
    ground.velocityX=0;
    invisible.velocityX=0;
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
  }
  monkey.velocityY=monkey.velocityY+0.9;
  monkey.collide(invisible);
  
  stroke("black");
  textSize(20);
  fill("red");
  text("score:"+score ,400,50);
  
  
  
  drawSprites();
}
function Food(){
  if(frameCount%80 === 0){
var banana =createSprite(500,10,10,20);
  banana.addImage("banana",bananaImage)
  banana.velocityX=-(5+2*score/100);
  banana.y=Math.round(random(120,200));
  banana.scale=0.1;
  FoodGroup.add(banana);
  FoodGroup.setLifetimeEach(100);
  banana.setCollider("rectangle",0,0,400,400);
  }
  }
  
function Obstacle(){
  if(frameCount % 100 === 0){
  obstacle =createSprite(500,365,23,32);
  obstacle.addImage("obstacle",obstacleImage)
  obstacle.velocityX=-(5+2*score/100);
  obstacle.scale=0.2;
  obstacleGroup.add(obstacle);
  obstacleGroup.setLifetimeEach(100);
  obstacle.setCollider("circle",0,0,200);
  }
}