//http://api.openweathermap.org
FilmArray = ["Thor", "Iron Man", "Iron Man 2", "The Incredible Hulk", "Captain America: The First Avenger", "The Avengers"];
let mapColor = []
var checkbox
let apiKey = "f06b59c5";
let film = [];
let start = 0;
var poster
let detailsPage = false
function preload() {
  font1 = loadFont('libraries/hot-rod.regular.ttf')
  font2 = loadFont('libraries/helmet.regular.ttf')
  font3 = loadFont('libraries/jet-pilot.regular.ttf')
  //For each position of the array, load a JSON object
  for (let i=0; i<FilmArray.length; i++){
    let url = "https://www.omdbapi.com/?t="+FilmArray[i]+"&apikey="+apiKey;
    film[i] = loadJSON(url); //weather will not contain all cities' weather data
  }
}
function reset(){
  background(51)
  loop()
  noLoop()
  detailsPage = false
}
function setup() {
  var canvas = createCanvas(1200, 720);
  canvas.parent("Canvas")
  textSize(18);
  background(51);
  checkbox = createCheckbox('', false);
  checkbox.changed(myCheckedEvent);
  checkbox.parent("Checkbox")
  button = createButton('Back')
  button.mousePressed(reset)
  button.parent("BackButton")
  noLoop();
}

function myCheckedEvent(){
  for (let i=0; i<film.length; i++){
    let position = i * 400
    noStroke();
    if (detailsPage == false && this.checked()){
    console.log('Yes');
      if (position<1200){
        fill(mapColor[i])
        text("Director: " + film[i].Director, position+110, height/4-60)
      } else {
        fill(mapColor[i])
        text("Director: " + film[i].Director, position-1200+110, height/4+290)
      }
    } else if (detailsPage == false) {
        console.log('No')
        noStroke()
        fill(51)
        rect(position+110, height/4-80, 250, 50)
        rect(position-1200+110, height/4+270, 200, 50)
        noFill()
    }
  }
}
function draw() {
  //To display, loop through all array elements
  for (let i=0; i<film.length; i++){
    //The conditionals will make sure that for every city, the color assigned
    //will be only one, according to the current temperature
    let currency = film[i].BoxOffice
    var value = Number(currency.replace(/[^0-9\.-]+/g,""));
    if(value < 150000000){
      mapColor[i] = color(225,160,122)
    } else if(value > 150000000 && value < 200000000){
      mapColor[i] = color(255,127,80)
    } else if (value > 300000000 && value < 600000000) {
      mapColor[i] = color(255,69,0)
    } else{
      mapColor[i] = color(255, 0, 0)
    }

    //Here we create a visual grid
    let pos = i * 400 ;
    scale =  value/1000000;//Pos is used to set the rect/text positions
    if (pos < 1200){
      noStroke()
      fill(mapColor[i])
      rect(pos,10, 100,scale, 20);
      text(film[i].Title, pos+110, 30);
      text("Box Office: " + film[i].BoxOffice, pos+110, 60);
      text("Studio: " + film[i].Production, pos+110, 90);
      fill(0)
      text("Details", pos+25, 80)
    } else{
      noStroke();
      fill(mapColor[i]);
      rect(pos-1200,360, 100,scale, 20);
      text(film[i].Title, pos-1200+110, height/4+200);
      text("Box Office: " + film[i].BoxOffice, pos-1200+110, height/4+230);
      text("Studio: " + film[i].Production, pos-1200+110, height/4 + 260);
      fill(0)
      text("Details", pos+25-1200, height/4 +250)
    }
  }
}
function mouseClicked(){
  for (let i=0; i<film.length; i++){
    let x = i*400
    let currency = film[i].BoxOffice
    var value = Number(currency.replace(/[^0-9\.-]+/g,""));
    scale =  value/1000000;
    if (mouseX>x && mouseX<x+100 && mouseY>10 && mouseY<scale-10 && x<1200){
      console.log("Yeah")
      background(51)
      textFont(font3)
      textAlign(RIGHT);
      textSize(100)
      fill(mapColor[i])
      text(film[i].Title, 1190, 700);
      textSize(16)
      fill(mapColor[i])
      textFont('Helvetica')
      textAlign(LEFT)
      text("Year: " + film[i].Year, 450, 100);
      text("$" + scale + "m", 5, scale+40);
      text("Actors: " + film[i].Actors , 450, 160, 300, 200);
      text("Rating: " + film[i].imdbRating, 450, 130);
      text("Studio: " + film[i].Production , 450, 250);
      text("Runtime: " + film[i].Runtime , 450, 280);
      text("Writers: " + film[i].Writer , 450, 300, 700, 200);
      loadImage(film[i].Poster, function(img){
        image(img, 130, 10);
      });
      detailsPage = true;
      console.log(detailsPage);
      noStroke();
      rect(10, 10, 100, scale, 20);
    }else if (mouseX>x-1200 && mouseX<x+100-1200 && mouseY>360&& mouseY<scale+360){
      console.log("Yeah1")
      background(51);
      textAlign(RIGHT);
      textFont(font3)
      textSize(100)
      fill(mapColor[i])
      text(film[i].Title, 1190, 700);
      textSize(16)
      textFont('Helvetica')
      textAlign(LEFT)
      text("Year: " + film[i].Year, 450, 100);
      text("$" + scale + "m", 5, scale+40);
      text("Actors: " + film[i].Actors , 450, 160, 300, 200);
      text("Rating: " + film[i].imdbRating, 450, 130);
      text("Studio: " + film[i].Production , 450, 250);
      text("Runtime: " + film[i].Runtime , 450, 280);
      text("Writers: " + film[i].Writer , 450, 300, 700, 200);
      loadImage(film[i].Poster, function(img){
        image(img, 130, 10);
      });
      detailsPage = true;
      noStroke()
      rect(10, 10, 100, scale, 20);
    }else{
      console.log("Nay")
    }
  }
}
