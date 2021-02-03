var PLAY = 1;
var END = 0;
var gameState = PLAY;

var player, player_running;
var ground,bgImage;

var obstaclesGroup, obstacle1, obstacle3, obstacle4, obstacle5, obstacle;
var invisibleGround;
var score;


function preload(){
  player_running = loadAnimation("Images/player1.png","Images/player2.png","Images/player3.png")
  
  bgImage = loadImage("Images/background.png");
  
 
  
  obstacle1 = loadImage("Images/obsctacle1.png");
  obstacle3 = loadImage("Images/obstacle3.png");
  obstacle4 = loadImage("Images/obstacle4.png");
  obstacle5 = loadImage("Images/obstacle5.png");
  obstacle = loadImage("Images/obstacle.png");
  
}

function setup() {
  createCanvas(450,256);
  
  
  
  ground = createSprite(300,127,512,256);
  ground.addImage("ground",bgImage);
  ground.x = ground.width /2;
  

  player = createSprite(50,210,20,50);
  player.addAnimation("running", player_running);
  player.scale = 0.1;
  

  invisibleGround = createSprite(200,210,400,20);
  invisibleGround.visible=false;
  //create Obstacle and Cloud Groups
  obstaclesGroup = createGroup();

  score = 0;
}

function draw() {
  background(180);
  
  
  //displaying score
  
  
  
  if(gameState === PLAY){
    //move the ground
    ground.velocityX = -4;
  if (ground.x < 190){
    ground.x = ground.width/2;
  }
    //scoring
    textSize(20);
    fill("blue");
    text("Score: "+ score, 500,50);
    score = score + Math.round(frameCount/60);
    
   
    //jump when the space key is pressed
    if(keyDown("space")&& player.y >= 100) {
        player.velocityY = -10;
    }
    
    //add gravity
    player.velocityY = player.velocityY + 0.8
  
  
    //spawn obstacles on the ground
    spawnObstacles();
    
    if(obstaclesGroup.isTouching(player)){
        gameState = END;
    }
  }
   else if (gameState === END) {
      ground.velocityX = 0;
     
     obstaclesGroup.setVelocityXEach(0);
    
   }
  
 
  //stop player from falling down
  player.collide(invisibleGround);
  
  
  
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;
   
    //generate random obstacles
    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      default: break;
    }
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 }
}



