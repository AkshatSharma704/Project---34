//Create variables here
var dog, happyDog, database, foodS, foodStock;
var database,position;
var dogSprite;

function preload()
{
  //load images here
  dog = loadImage("images/Dog.png");
  happyDog = loadImage("images/happydog.png");
}

function setup() {
  createCanvas(500, 500);

  database = firebase.database();

  foodStock = database.ref("Food");
  foodStock.on("value", readStock);
  
  dogSprite = createSprite(250,300,150,150);
  dogSprite.addImage(dog);
  dogSprite.scale = 0.15;
}


function draw() {  
  background(46,139,87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dogSprite.addImage(happyDog);
  }

  drawSprites();
  //add styles here
  textSize(15);
  fill("white");
  stroke("black");
  text("Note: Press 'Up Arrow' to feed the dog",130,10,300,20);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x - 1;
  }
  database.ref('/').update({
    Food:x
  })
}