var ant,antIMG;

var ground,groundIMG;

var invisibleGround;

var fountainIMG,fountainGroup;

var sugarIMG,sugarGroup;

var score = 0;
var lifetime  = 0;

var PLAY = 0;
var END = 1;
var gameState = PLAY;

function preload(){
  antIMG = loadImage("images/ant.png");
  groundIMG = loadImage("images/ground.png");
  fountainIMG = loadImage("images/fountain.png");
  sugarIMG = loadImage("images/sugar.png");
}

function setup() {
  createCanvas(600,200);

  ant = createSprite(50,180,20,50);
  ant.addImage(antIMG);
  ant.scale = 0.2;
  ant.x = 40;

  ground = createSprite(200,180,400,20);
  ground.addImage(groundIMG);
  ground.x = ground.width /2;
  ground.velocityX = -4;

  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;

  fountainGroup = createGroup();
  sugarGroup = createGroup();
}

function draw() {
  background(180);

  fill("red");
  textSize(18);
  text("Score: "+ score, 500,20);
  text("Lifetime: "+ lifetime,380,20);

  if(gameState === PLAY){

    text("Press Space To Jump",10,20);

    lifetime = lifetime + Math.round(getFrameRate()/60);

    ground.velocityX = -(5 + 3*score/100);

    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    if(keyDown(32) && ant.y >= 158){
      ant.velocityY = -12;
   }
  
    ant.velocityY = ant.velocityY + 0.8;

    if(ant.isTouching(sugarGroup)){
      score = score + 5;
      sugarGroup.destroyEach();
    }
    
    Fountain();
    Sugar();

    if(ant.isTouching(fountainGroup)){
      gameState = END;
   }
  }

  else if(gameState === END){

    text("Press Backspace To Restart",10,20);

    ant.velocityY = 0;
    ground.velocityX = 0;
    fountainGroup.setVelocityXEach(0);
    sugarGroup.setVelocityXEach(0);

    if(keyDown(8)){
      reset();
    }
  }

  ant.collide(invisibleGround);
  drawSprites();
}

function reset(){
  gameState = PLAY;
  
  fountainGroup.destroyEach();
  sugarGroup.destroyEach();
  
  score = 0;
  lifetime = 0;
  
}

function Fountain() {
  if(World.frameCount % 90 === 0) {
    var fountain = createSprite(600,165,10,40);
    fountain.setCollider("rectangle",0,0,300,300);
    fountain.velocityX = - (6 + 3*score/100);
    fountain.addImage(fountainIMG);
    fountain.scale = 0.150;
    
    fountainGroup.add(fountain);
  }
}

function Sugar(){
  if(World.frameCount % 110 === 0){
    var sugar = createSprite(600,165,20,20);
    sugar.velocityX = - (6 + 3*score/100);
    sugar.addImage(sugarIMG);
    sugar.scale = 0.1;

    sugarGroup.add(sugar);
  }
}