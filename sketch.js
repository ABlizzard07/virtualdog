//Create variables here
var dog, happyDog, dogSprite
var dogName = prompt("Name your virtual dog");
var database;
var foodS;
var hungriness = 0;

function preload(){
  //load images here
   dog = loadImage("Dog.png");
   happyDog = loadImage("happydog.png");
}

function setup() {
  createCanvas(700, 700);
  database = firebase.database();
  dogSprite = createSprite(350,450,50,50);
  dogSprite.addImage(dog);
  dogSprite.scale = 0.35;
  
  foodStock = database.ref("food");
  //.ref is used to creating a reference
  foodStock.on("value",readStock);
  //.on is creating a listener
  
}


function draw() {  
  background(46,137,88)
  drawSprites();
  //add styles here
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dogSprite.addImage(happyDog);
    hungriness = 0;
  }
  else{
    hungriness += 1;
  }
  if(keyWentUp(UP_ARROW)){
    dogSprite.addImage(dog);
  }

  fill("white");
  textSize(30);
  text("Food: "+foodS,250,50);
  text("Use up arrow to feed "+ dogName + "!",150,125);

    if(hungriness >= 400 && hungriness < 800){
      text(dogName + " is hungry",250,640);
    }
    else if(hungriness >= 800 && hungriness < 1200){
      text(dogName + " is starving",250,640);
    }
    else if(hungriness >= 1200 && hungriness < 1600){
      text(dogName + " is dying",250,640);
    }
    else if(hungriness >= 1600){
      textSize(50);
      text("Game Over",200,450);
      dogSprite.visible = false;
    }

}

function readStock(data){
  foodS = data.val();
  //.val extracts data from the database
}

function writeStock(meme){
  if(meme <= 0){
      meme += 5;
  }
  else{
      meme -= 1;
  }
  database.ref("/").update({
    food: meme
  })
}


