const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var scoreX=0
var scoreY=0;
var shot
var target1,target2,target3,target4
var missileSprite
var score=0;
var gameState=0;
function preload(){
  bg=loadImage("images/bg.jpeg");
}



function setup() {
  createCanvas(1200,600);
  engine = Engine.create();
  world = engine.world;

  dart=new Dart(600,300,80);
  missile=new Missile(1000,200,100,70);

  sling=new constraint({x:1000,y:200},missile.body);
 
  

  missileSprite=createSprite(missile.body.position.x-40,missile.body.position.y+40,15,3);
  missileSprite.shapeColor="green"


}

function draw() {
  background(bg);  
  Engine.update(engine);
  dart.display();
  fill("White");
  textSize(25);
  text ("score:"+score,1000,100);
  missile.display();
  if (shot){
    shot.display();
    posx= Math.round(shot.pointB.x);
   posy=Math.round(shot.pointB.y)
   textSize(20);
   fill('red');
   text(posx + ":" + posy, 20,20)
  }

  
  drawSprites();

  missileSprite.x=missile.body.position.x-40
  missileSprite.y=missile.body.position.y+40

 
}

function mouseDragged(){
  if(gameState===0){
   Matter.Body.setPosition(missile.body,{x:mouseX,y:mouseY})
  }
}

function mouseReleased(){
  if(gameState===0){
    sling.fly()
    shot=new Shot(missile.body,{x:random(600,680),y:random(200,280)});
   // console.log(Math.round(missile.body.position.x))
    //console.log(Math.round(missile.body.position.y));
   //  scoreX=Math.round(missile.body.position.x)
    //scoreY=Math.round(missile.body.position.y);
   
    //shot.fly();
   // Matter.Body.setPosition(missile.body,{x:scoreX,y:scoreY});
   // Matter.Body.setStatic(missile.body,true)
   posx= shot.pointB.x
   posy=shot.pointB.y
   textSize(20);
   fill('red');
   text(posx + ":" + posy, 200,20)
   if ((posx>510 && posx<690)&&(posy>210&&posy<390)){
    console.log("target3")
    score=score+25
  }else

  if ((posx>540 && posx<660)&&(posy>240&&posy<360)){
    console.log("target2")
    score=score+50;

  }else
  if ((posx>570 && posx<630)&&(posy>270&&posy<330)){
    console.log("target1")
    score=score+100;
  }
  
   
  gameState=1;
}
    
};
//function mousePressed(){
 // console.log(mouseX)
 // console.log(mouseY)
 
//}

function keyPressed(){
  
  if (keyCode===32){
    Matter.Body.setPosition(missile.body,{x:1000,y:200})
    sling.bodyB=null
    shot.fly()
    sling.attach(missile.body);
    gameState=0;
  }
}
