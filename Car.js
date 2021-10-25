class Car {
    constructor(x, y, width, height, carPos,carAnimation) {
    
      this.Animation =carAnimation
      this.speed = 0.05
      this.body = Bodies.rectangle(x, y, width, height);
      this.width = width;
      this.height = height;
      this.carPosition = carPos;
      this.image = loadImage("Car.png");
    // this.isbroken=false;
      World.add(world, this.body);
    }
  
  animate()
  {
    this.speed +=0.05
  }
  
    remove(index) {
      this.width=300;
      this.height=300;
      this.speed=0.05;
      setTimeout(() => {
        Matter.World.remove(world, cars[index].body);
        delete cars[index];
      }, 2000);
    }
  
    display() {
      var angle = this.body.angle;
      var pos = this.body.position;
      var index = floor(this.speed % this.Animation.length)
      push();
      translate(pos.x, pos.y);
      rotate(angle);
      imageMode(CENTER);
      image(this.Animation[index], 0, this.carPosition, this.width, this.height);
      pop();
    }
  }
  



