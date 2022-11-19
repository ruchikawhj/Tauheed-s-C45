//Help me in line 80,81,82



//variable here
var pc, pcImg;
var fireballs, ballImg;
var enemy, enemyImg, boomImg;
var enemysGroup, funsGroup;
var score = 0;
var fun, funImg;
var lifeX, lifeXImg;
var he2, he1, he3, heImg
var hearts = 2
var dg;
var shoots;
var blast, blastImg;

var fireballsGroup;
function preload() {
  bg = loadImage("images/bg.jpg");
  pcImg = loadImage("images/ufo.png");
  ballImg = loadImage("images/fireball.png");
  enemyImg = loadImage("images/enemy.png");
  boomImg = loadImage("images/boom.png");
  funImg = loadImage("images/gift.png");
  lifeXImg = loadImage("images/life.png");
  heImg = loadImage("images/heart.png");
  blastImg = loadImage("images/boom.png")

  dg = loadSound("dialogs.mp3");
  shoots = loadSound("shoo.mp3")
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  dg.play()

  pc = createSprite(width / 2, 650, 20, 20);
  pc.addImage(pcImg);
  pc.scale = 0.5;

  fireballs = createSprite(2000, 200, 20, 20);
  fireballs.addImage(ballImg);
  fireballs.scale = 0.2

  he1 = createSprite(100, 100);
  he1.addImage(heImg);
  he1.scale = 0.3

  he2 = createSprite(100, 200);
  he2.addImage(heImg);
  he2.scale = 0.3

  he3 = createSprite(100, 300);
  he3.addImage(heImg);
  he3.scale = 0.3

  blast = createSprite(2000, 100,);
  blast.addImage(blastImg)
  blast.scale = 0.5

  enemysGroup = new Group();
  funsGroup = new Group();
  fireballsGroup = new Group();
  
  dg.play();
  dg.setVolume(0.5);
}


function draw() {
  background(bg);


  movement();
  shoot();
  spawnEnemy()
  spawnfun()

  textSize(30);
  text("Score: " + score, 1500, 100)


  for(var i=0;i<enemysGroup.length;i++){
    for(var j=0;j<fireballsGroup.length;j++){
    if(enemysGroup.get(i).isTouching(fireballsGroup.get(j))){
      score+=5;
      enemysGroup.get(i).changeImage("blast");
      enemysGroup.get(i).scale=0.5;
      enemysGroup.get(i).velocityY=0;
      enemysGroup.get(i).lifetime=20;
      fireballsGroup.get(j).destroy();
      
    }
  }
}

 

  
  for(var i=0;i<funsGroup.length;i++){
    for(var j=0;j<fireballsGroup.length;j++){
    if(funsGroup.get(i).isTouching(fireballsGroup.get(j))){
      score+=70;
      funsGroup.get(i).destroy();
      fireballsGroup.get(j).destroy();
      
    }
  }
}

  if (enemysGroup.collide(pc)) {
    he3.destroy();
    enemysGroup.destroyEach();
    hearts = hearts - 1
    console.log("game over")


      ;


  }

  if (hearts < 1) {
    he2.destroy()
  }

  if (hearts < 0) {
    he1.destroy();
    pc.destroy();
    enemysGroup.setVelocityYEach(0);
    swal({
      title: `Awesome! you have got a score of ` + score,
      text: "You Have ben robbed by enemy's",
      imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/p5-multiplayer-car-race-game/master/assets/cup.png",
      imageSize: "100x100",
      confirmButtonText:"Play Again"
    },function(isConfirm){
      if(isConfirm===true){
        window.location.reload();
      }
    })
  }


  pc.depth += fireballs.depth

  drawSprites();
}
function movement() {
  pc.x = World.mouseX;
  pc.y = World.mouseY;
}
function shoot() {
  if (mouseWentDown("leftButton")) {
    spawnfireballs();
    shoots.play();
    shoots.setVolume(0.3);
  }
}
function spawnEnemy() {
  if (frameCount %  Math.round(random(10,100))=== 0) {
    x = random(200, 1400);
    y = random(-20, -100)
   
    var enemy = createSprite(x, y);
    enemy.addImage("enemy",enemyImg);
    enemy.addImage("blast",blastImg);
    enemy.velocityY +=(5+getFrameRate()/60)
    enemy.lifetime = 300
    enemysGroup.add(enemy)
  }

}
function spawnfun() {
  if (frameCount % 700 === 0) {
    x = random(200, 1400);
    y = random(-20, -100)
    
    var fun = createSprite(x, y);
    fun.addImage(funImg);
    fun.velocityY +=(5+getFrameRate()/60)
    fun.lifetime = 300
    funsGroup.add(fun)
  }
}

function spawnfireballs() {

    x = pc.x;
    y = pc.y;
    
    var fireball = createSprite(x, y);
    fireball.addImage(ballImg);
    fireball.velocityY =-150;
    fireball.lifetime = 300;
    fireball.scale=0.2;
    fireballsGroup.add(fireball);

}