//Create two variables that will store the new objects from the class Circlelet
circleArray = []; // defines array
let arraySize = 300; // defines number of objects in array
function setup() { // sets up canvas, sliders and for loop for the array
   var canvas = createCanvas(innerWidth, innerHeight); // creates canvas 500px by 500px
   canvas.parent('myContainer');
   background(255); // fills background
   for (let i=0; i<arraySize; i++){
      circleArray[i] = new Circle(width/2, height/2, random(-0.025, 0.025), random(-0.025, 0.025), random(10));
     }
   }
   function draw() {
     for (let i=0; i<circleArray.length; i++){
       circleArray[i].moveFunction();
       circleArray[i].displayCircle();
      }
    }//Definition of the classCircle
    class Circle{
      constructor(x, y, speedX, speedY, size){
         this.angle = 0
         this.x = x;
         this.y = y;
         this.speedX = speedX
         this.speedY = speedY
         this.size = size
         this.r = random(225);
         this.g = random(225);
         this.b = random(225); } //Class function that takes care of motion and collision
         moveFunction(){
           if (this.speedX > 0){
             this.x = this.x + cos(this.angle)
           } else if (this.speedX < 0) {
             this.x = this.x - cos(this.angle)
            }
            this.y = this.y + sin(this.angle)
            this.angle += this.speedX/2
            this.angle += this.speedY/2
            push();
            this.angle += this.speedX;
            this.angle += this.speedY;
            pop();
            if (this.x > width || this.x<0){
              this.speedX *= -1;
            }
            if (this.y > (height) || this.y<0){
              this.speedY *= -1;
            }
          }

             //Function defined within class that displays each ellipse and fills each shape
        displayCircle(){ // defines function
          this.fillcol = color(this.r, this.g, this.b); // takes RGB values from earlier in the class and takes an alpha value from the slider
          fill(this.fillcol) // fills shape
          noStroke() // removes shape borders
          ellipse(this.x, this.y, this.size, this.size); // draws shape
        }
      }
