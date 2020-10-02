//Create variables here
var dog,happyDog,database,foodS,foodStock,dogImg,dogImg1,milkImg
var feed,addFood,feedDog,addTheFood
var lastFed,fedTime
var foodObj
var changeGameState
var readGameState
var bedroomImg,washroomImg,gardenImg
var sadDogImg
var cuurentTime
var gameState
function preload()
{
  //load images here
  dogImg=loadImage("images/dogImg.png")
  dogImg1=loadImage("images/dogImg1.png")
  bedroomImg=loadImage("images/Bed Room.png")
  washroomImg=loadImage("images/Wash Room.png")
  gardenImg=loadImage("images/Garden.png")
  sadDogImg=loadImage("images/deadDog.png")

}

function setup() {
  createCanvas(500, 500);
  dog=createSprite(200,200,10,10)
  dog.addImage("dog",dogImg)
  dog.addImage("dog1",dogImg1)
  dog.scale=0.3
  foodObj=new Food()
  database=firebase.database()
  console.log(database)
 

  feed=createButton("Feed the dog")
  feed.position(500,95)
  

  addFood=createButton("Add Food")
  addFood.position(600,95)
  

 
}


function draw() {  
 background(46,139,87)
 foodObj.display()
 foodStock=database.ref("Food")
 foodStock.on("value",getFoodStock)
 fedTime=database.ref("FeedTime")
 feed.mousePressed(feedDog)
 addFood.mousePressed(addTheFood)

  readGameState=database.ref('gameState')
  readGameState.on('value',function(data){
  gameState=data.val()
  })
 fedTime.on("value",function(data){
   lastFed=data.val()
 })
 
//changeGameState=database.ref('gameState')
//changeGameState.on('value',function(data){
//gameState=data.val()
//})

if(gameState!==undefined&&gameState!=="hungry"){
  feed.hide()
  addFood.hide()
  dog.remove()
  }
   currentTime=hour()
   if(currentTime===lastFed+1){
    foodObj.garden() 
    updateGameState("garden")
   }
   else if(currentTime>=lastFed+2&&currentTime<=lastFed+4){
    foodObj.washroom() 
    updateGameState("washroom")
   }
   else{
     updateGameState("hungry")
     foodObj.display()
   }
   
  

 fill(255,255,254)
 textSize(15)
 if(lastFed>=12){
   text("LastFed:"+lastFed%12+"PM",350,30)
 }else if(lastFed==0){
   text("last Fed:12 AM",350,30)
 }else{
   text("Last Fed:"+lastFed+"AM",350,30)
 }
  drawSprites();
  //

}
 function getFoodStock(data){
   foodS=data.val();
 }

 function updateFoodStock(x){
   database.ref('/').update({
     Food:x
   })
 }

 function deductFoodStock(x){
  database.ref('/').update({
    Food:x
  })
}

function feedDog(){
  dog.changeImage("dog1",dogImg1)
  
 // updateFoodStock(foodS-1)
 foodS=foodS-1
 console.log(foodS)
  database.ref("/").update({
    Food:foodS,
    fedTime:hour()
  })
}

function addTheFood(){
  foodS++
  database.ref("/").update({
    Food:foodS
  })
}

function updateGameState(state){
  database.ref("/").update({
    gameState:state
  })
}



