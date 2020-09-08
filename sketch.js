//Create variables here
var dog, happyDog, dogSprite, fridge, thefridge;
var dogName = prompt("Name your virtual dog");
var database;
var foodS, hour;
var hungriness = 0;
var fedTime, lastFed;
var feed;
var addFood;

function preload(){
  //load images here
   dog = loadImage("Dog.png");
   happyDog = loadImage("happydog.png");
   fridge = loadImage("fridge.jpg");
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

  food.display();

  fedTime = database.ref("feedTime");
  fedTime.on("value",function(data){
    lastFed = data.val();
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

  textSize(36);
  text(dogName,500,650);

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
  dogSprite.addImage(happyDog);
  foodS -= 1;

  database.ref("/").update({
    food: foodS,
    feedTime: hour()
  }) 
}

function increaseFood(){
  dogSprite.addImage(dog);

  if(foodS < 40){

  foodS += 1;

  database.ref("/").update({
    food: foodS
  }) 
  }
}

