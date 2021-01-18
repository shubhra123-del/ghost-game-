var backGround, backgroundimg;
var  climber , climberimg , climbers ;
var gamestate ;
var PLAY = 0 ;
var END = 1  ;
var invisibleclimeber ;
var door , doorimg , doors ;
var ghost , movingghost ;
var invisibleclimeber , invisibleclimbers ;
var gameoverimg , gameover ;
var spookysound ;


function preload() {
  backgroundimg = loadImage("tower.png");
  movingghost = loadImage ("ghost-standing.png");
  doorimg = loadImage ("door.png");
  climberimg = loadImage ("climber.png");
  gameoverimg = loadImage ("gameOver.png");
  spookysound = loadSound ("spooky.wav");
}


function setup() {
  createCanvas(600, 600);

  backGround = createSprite(300, 30, 10, 10);
  backGround.addImage(backgroundimg);
 

  ghost = createSprite(300, 300, 50, 50)
  ghost.addImage (movingghost);
  ghost.scale = 0.3 ;
  
  doors = new Group ();
  climbers = new Group ();
  invisibleclimbers = new Group ();
  gamestate = PLAY ;
  
  gameover = createSprite (300,300)
  gameover.addImage(gameoverimg) ; 
  gameover.visible = false ;
}


function draw() {
  background(0)
   
  if (gamestate === PLAY ){
  backGround.velocityY = 2;
  
  if (backGround.y > 500) {
    backGround.y = height/ 2;
  }
  if (keyDown("right_Arrow")){
    ghost.x = ghost.x+ 2 ;
  }
  if (keyDown("left_Arrow")){
    ghost.x = ghost.x - 2 ;
  }
  
  if (keyDown ("space")){
    ghost.velocityY = -2 ;
  }
    ghost.velocityY = ghost.velocityY + 0.8
    
    obstacles();
  
    if (ghost.isTouching(climbers)){
      ghost.velocityY=0 ;
    }
  
   if (ghost.isTouching(invisibleclimbers)|| ghost.y  > 600 ){
    doors.setVelocityXEach(0)
     climbers.setVelocityXEach(0)   
     doors.destroyEach()
     backGround.destroy();
    climbers.destroyEach();
    invisibleclimbers.destroyEach();
     gamestate = END ;
  }
     }
    if (gamestate === END ){
      ghost.destroy();
      gameover.visible = true ; 
      spookysound.loop ();
    }
 
  drawSprites();
}
 function obstacles  (){
   if (frameCount %  150 === 0  ){
     door = createSprite (300,-10);
   door.addImage (doorimg);
   door.velocityY = 3 ;
   door.scale = 1 ;
   door.x = Math.round(random(100 , 400))  
   doors.add(door);
     
    ghost.depth = ghost.depth + 1  ;
    doors.depth = ghost.depth ;

     
  climber = createSprite (300,-10)  
  climber.velocityY = 3 ;
  climber.addImage (climberimg)  ;
  climber.x = door.x + 5 ;
  climber.y = door.y + 50 ;
  climber.scale = 0.8 ;  
  climbers.add(climber); 
     
  invisibleclimeber = createSprite (0,0)
  invisibleclimeber.velocityY = 3 ;
  invisibleclimeber.x = door.x + 5 ;
  invisibleclimeber.y = door.y + 70 ;
  invisibleclimeber.width = climber.width ;
  invisibleclimeber.height = 2 ;
  invisibleclimeber.visible= false ;
  invisibleclimbers.add(invisibleclimeber) ;  
  //invisibleclimeber.debug = true ;
   } 
   }
  