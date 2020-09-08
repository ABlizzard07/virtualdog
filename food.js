class Food{
   constructor(x,y,width,height){
    
    this.image = loadImage("Milk.png");
    this.lastFed;
   }
   getFoodStock(){
       var foodstockref = database.ref("food");
       foodstockref.on("value",function(data){
       foodS = data.val();   
       })

   }
   updateFoodStock(){

   }
   deductFood(){
      
       
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

}