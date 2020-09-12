class Food{
   constructor(x,y,width,height){
    
    this.image = loadImage("Milk.png");
    this.lastFed;
    this.title = createElement("h2")
   }
   getFoodStock(){
       var foodstockref = database.ref("food");
       foodstockref.on("value",function(data){
       foodS = data.val();   
       })
   }
  
   display(){
       var x = 80;
       var y = 50;

       if(foodS != 0){
         for(var i = 0; i < foodS; i++){
           if(i % 10 == 0){
               x = 80;
               y = y + 100;
           }
           imageMode(CENTER);
           image(this.image,x,y,100,100);
           x = x + 30;
         }
       }
   }

   bedroom(){
    background(bedroomImg,1050,500);
   }
   garden(){
    background(gardenImg,1050,800);
   }
   bathroom(){
    background(bathroomImg,1050,500);
   }
   living(){
     background(livingImg,1050,500);
     this.title.html("The dog will become hungry later, feed it then!");
     this.title.position(450,700);
   }

}