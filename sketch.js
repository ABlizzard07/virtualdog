//Create variables here
var dog, happyDog, dogSprite, fridge, thefridge;
var database;
var foodS, hour;
var hungriness = 0;
var fedTime, lastFed, currentTime, fedMinute, lastMinute;
var feed;
var addFood;
var readState, changeState, gamestate;
var bedroomImg, gardenImg, bathroomImg, livingImg;

function preload(){
  //load images here
   dog = loadImage("Dog.png");
   happyDog = loadImage("Happy.png");
   fridge = loadImage("fridge.jpg");
   bedroomImg = loadImage("BedRoom.png");
   gardenImg = loadImage("Garden.png");
   bathroomImg = loadImage("WashRoom.png");
   livingImg = loadImage("LivingRoom.png");
}

function setup() {
  createCanvas(700, 700);
  database = firebase.database();

  dogSprite = createSprite(520,450,50,50);
  dogSprite.scale = 0.35;
  dogSprite.addImage(dog);

  thefridge = createSprite(215,300,50,50);
  thefridge.scale = 0.3;
  thefridge.addImage(fridge); 

  readState = database.ref("gameState");
  readState.on("value",function(data){
    gamestate = data.val();
  })

  foodStock = database.ref("food");
  //.ref is used to creating a reference
  foodStock.on("value",readStock);
  //.on is creating a listener


  food = new Food(300,50,50,50);

  feed = createButton("Feed the dog!");
  feed.position(200,300);
  feed.mousePressed(feedDog);
  addFood = createButton("Add food!");
  addFood.position(210,400);
  addFood.mousePressed(increaseFood);
  
}


function draw() {  
  background(46,137,88)
  drawSprites();
  //add styles here

  fill("white");
  textSize(30);
  text("Food: "+foodS,150,50);


  fedTime = database.ref("feedTime");
  fedTime.on("value",function(data){
    lastFed = data.val();
  })

  fedMinute = database.ref("feedMinute");
  fedMinute.on("value",function(data){
    lastMinute = data.val();
  }) 

  if(lastFed >= 12){
    text("Last Fed: "+ lastFed%12 + " PM",400,50);
  }
  else if(lastFed == 0){
    text("Last Fed: 12 AM",400,50);
  }
  else{
    text("Last Fed: "+ lastFed%12 + " AM",400,50);
  }

  if(foodS >= 40){
    text("Refrigerator full",120,600);
  }

  currentTime = minute();

  if(currentTime == (lastMinute + 1)){
    updateFunction(1);
    food.garden();
  }
  else if(currentTime == (lastMinute + 2)){
    updateFunction(2);
    food.bedroom();
  }
  else if(currentTime > (lastMinute + 2) && currentTime <= (lastMinute + 4)){
    updateFunction(3);
    food.bathroom();
  }
  else if(currentTime > (lastMinute + 4) || currentTime < lastMinute){
    updateFunction(4);
    food.display();
  }
  else{
    updateFunction(0);
    food.living();
  }

  if(gamestate != 4){
    feed.hide();
    addFood.hide();
    dogSprite.visible = false;
    thefridge.visible = false;
  }
  else{
    feed.show();
    addFood.show();
    dogSprite.visible = true;
    thefridge.visible = true;
  }
  console.log(minute)

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

function feedDog(){
//  dogSprite.addImage(happyDog);
  foodS -= 1;

  database.ref("/").update({
    food: foodS,
    feedTime: hour(),
    feedMinute: minute()
    }) 
}

function increaseFood(){
//  dogSprite.addImage(dog);

  if(foodS < 40){

  foodS += 1;

  database.ref("/").update({
    food: foodS
  }) 
  }
}

function updateFunction(state){
  database.ref("/").update({
    gameState: state
  })
}

