
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

//var doll,d;
//var sound;
var world,engine;
var gun,arrows=[];
var cars=[];
var carAnimation=[];
var carSpriteSheets,carSpriteData;
var score=0;

function preload(){
//doll=loadAnimation("doll1.png" , "doll2.png");
//sound=loadSound("Squid_Game_Sound.mp3");
carSpriteData=loadJSON("car_1/car4.json");
carSpriteSheets=loadImage("car_1/car4.png");
}


function setup() {
  createCanvas(windowWidth,windowHeight);
   
  engine = Engine.create();
  world = engine.world;

  //d=createSprite(200,200,50,50);
  //d.addAnimation("doll_turning",doll)

// sound.play();

var carFrames = carSpriteData.frames
  for(var i=0;i<carFrames.length;i++)
  {
    var pos = carFrames[i].position
    var img = carSpriteSheets.get(pos.x,pos.y,pos.w,pos.h)
    carAnimation.push(img)
  }

gun = new Gun( 340,350,120,120);
rectMode(CENTER);
}


function draw() 
{
  background("pink");
  Engine.update(engine);
 
gun.display();
showCars();
for (var i = 0; i < arrows.length; i++) {
  if (arrows[i] !== undefined) {
    arrows[i].display();
    collisionWithCar(i);
  }
}

fill("black");
  textAlign("center");
  textSize(40);
  text("Red Light , Green Light", width / 2, 100);

  fill("#FFFF");
  textAlign("center")
  textSize(40);
text("Score :"+score,1000,150)

  //drawSprites();
}

function keyPressed() {
  if (keyCode === 32) {
    var posX = gun.body.position.x;
    var posY = gun.body.position.y;
    var angle = gun.body.angle;
    //console.log(angle);

    var arrow = new Arrow(posX, posY, 100, 10, angle);
     
    Matter.Body.setAngle(arrow.body, angle);
    arrows.push(arrow);
  }
}

function keyReleased() {
  if (keyCode === 32) {
    if (arrows.length) {
      var angle = gun.body.angle;
      arrows[arrows.length - 1].shoot(angle);
    }
  }
}

function collisionWithCar(index) {
  for (var i = 0; i < cars.length; i++) {
    if (arrows[index] !== undefined && arrows[i] !== undefined) {
      var collision = Matter.SAT.collides(arrows[index].body, cars[i].body);

      if (collision.collided) {
        cars[i].remove(i);
        score +=5;
        Matter.World.remove(world, arrows[index].body);
        delete arrows[index];
      }
    }
  }
}

function showCars() {
  if (cars.length > 0) {
    if (
      cars[cars.length - 1] === undefined ||
      cars[cars.length - 1].body.position.x < width - 300
    ) {
      var positions = [-40, -60, -70, -20];
      var position = random(positions);
      var car = new Car(width, height - 100, 170, 170, position,carAnimation);

      cars.push(car);
    }

    for (var i = 0; i < cars.length; i++) {
      if (cars[i]) {
        Matter.Body.setVelocity(cars[i].body, {
          x: -0.9,
          y: 0
        });

        cars[i].display();
        cars[i].animate();
        var collision = Matter.SAT.collides(/*d*/cars[i].body);

        if (collision.collided  && !cars[i].isBroken) {
          
          gameOver();
        }
      } else {
        cars[i];
      }
    }
  } else {
    var car = new Car(width, height - 60, 170, 170, -60,carAnimation);
    cars.push(car);
  }
}

function gameOver(){
  swal(
    {
      title :"GAME OVER !!",
      text : "Thanks For Playing",
      imageSize : "150x150",
      confirmButtonText : "Play Again"
    },
    function (isConfirm)
    {
      if(isConfirm)
      {
        location.reload()
      }
    }
  )
  
  
  }
  





