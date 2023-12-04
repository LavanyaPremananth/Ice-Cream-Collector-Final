/*

COURSEWORK 2.2 GAME PROJECT SUBMISSION [002]

*/

/*
IN THIS GAME PROJECT I HAVE ADDED EXTENSIONS THAT INCLUDES SOUNDS, PLATFORMS, AND ENEMIES. I HAVE ENHANCED THE GAME BY SDDING SOUND EFFECTS WHEN MY CHARACTER JUMPS, FALLS INTO THE CANYON AND WHEN THE LEVEL COMPLETES. I HAVE ALSO ADDED PLATFORMS WHERE THE CHARACTER CAN JUMP ONTO WHEN THERE IS A ENEMY OR A CANYON BENEATH. ONE DIFFICULTY THAT I FACED DURING THE CONSTRUCTION OF THIS GAME WAS WHEN IMPLEMENTING THE SCENERAY. ENSURING THAT THEY DO NOT OVERLAP AND THEY ARE CONSTRUCTED USING FOR LOOP WAS TEDIOUS FOR ME. ADDITIONALLY, IMPLEMENTING THE CHECK FUNCTION WAS CHALLENGING. HOWEVER, WITH MULTIPLE ATTEMPTS AND GUIDES FROM TEACHERS AND THE INTERNET IT WAS MANAGEABLE. ONE THING THAT I LEARNED THROUGH THIS GAME PROJECT WAS PERSERVERANCE. MOROVER, I ALSO LEARNDED HOW TO ADD EFFECTIVE EXTENSIONS AND THE WAYS THAT I COULD IMPROVE MY GAME THAT BOOSTED MY CREATIVE THINKING SKILLS. 
*/



//BACKGROUND VARIABLES 
var floorPos_y;
var scrollPos;

const drops =[];

//SCENERY VARIABLES
var clouds;
var mountains;
var trees_x;
var collectables;
var canyons;

//GAME CHARACTER VARIABLES 
var gameChar_x;
var gameChar_y;
var gameChar_width;
var gameChar_world_x;

//ENEMIES
var enemies;
var hitByEnemy;

//GAMING VARIABLES 
var game_score;
var flagpole;
var lives;
var platforms;
var onPlatform;

var isLeft;
var isRight;
var isFalling;
var isPlummeting;

var mySound;

function setup(){
    createCanvas(1024,576);
    floorPos_y = height * 3/4;
    
    
    //BACKGROUND GRADIENT
    c1 = color(63, 191, 191);
    c2 = color(255);
    
    //SNOW
    for(let x = 0; x < width; x++){
    drops[x] = random(height);
    }
    
    //NO. OF LIVES
    lives = 3;
    
    startGame();
}

function startGame(){
    gameChar_x = width/2;
	gameChar_y = floorPos_y;
    gameChar_width = 50;
    
    //GAME SCORE
    game_score = 0;
    
    //BACKGROUND SCROLLING
    scrollPos = 0;
    
    //GAME CHARACTER'S WORLD
    gameChar_world_x = gameChar_x;
    
    //BOOLIAN VARIABLES T0 CONTROL THE MOVEMENT OF THE GAME CHARACTER.
    isLeft       = false;
    isRight      = false;
    isFalling    = false;
    isPlummeting = false;
    
    //PLATFORM
    onPlatform = false;
     
    //HIT BY ENEMY
    hitByEnemy = false;
    
    //ARRAYS OF SCENERY OBJECTS
    clouds = [{pos_x:-100,pos_y:150, size:30},
              {pos_x:200, pos_y:50,  size:30},
              {pos_x:500, pos_y:100, size:20},
              {pos_x:800, pos_y:70,  size:35}
             ];
    
    mountains = [{pos_x:50,   pos_y:floorPos_y, height:320, width:300},
                 {pos_x:200,  pos_y:floorPos_y, height:400, width:500},
                 {pos_x:600,  pos_y:floorPos_y, height:200, width:300},
                 {pos_x:1000, pos_y:floorPos_y, height:320, width:450},
                 {pos_x:1400, pos_y:floorPos_y, height:400, width:500},
                 {pos_x:1800, pos_y:floorPos_y, height:200, width:450},
                 {pos_x:2200, pos_y:floorPos_y, height:350, width:450},
                 {pos_x:2600, pos_y:floorPos_y, height:200, width:300}
                ];
    
    trees_x = [-50, 350, 1400, 2000,];
    
    collectables = [];
    initCollectables();
    
        
    canyons = [{x_pos:80,   width:100},
               {x_pos:800,  width:100},
               {x_pos:1500, width:100}
              ];
    
    flagpole = {x_pos: 2500, isReached: false};
    
    leaves = [{x_pos: flagpole.x_pos - 5,  y_pos: floorPos_y - 10},
              {x_pos: flagpole.x_pos + 15, y_pos: floorPos_y - 30},
              {x_pos: flagpole.x_pos - 5,  y_pos: floorPos_y - 60},
              {x_pos: flagpole.x_pos + 15, y_pos: floorPos_y - 100},
              {x_pos: flagpole.x_pos - 5,  y_pos: floorPos_y - 130},
              {x_pos: flagpole.x_pos + 15, y_pos: floorPos_y - 160},
              {x_pos: flagpole.x_pos - 5,  y_pos: floorPos_y - 190}
             ];
  
    enemies = [];
    enemies.push(new Enemy(400,floorPos_y-10, 100));
    enemies.push(new Enemy(1200,floorPos_y-10,100));
    
    platforms = [];
    platforms.push(createPlatform(1000,floorPos_y - 100, 100));
     platforms.push(createPlatform(1200,floorPos_y - 200, 100));
    platforms.push(createPlatform(400,floorPos_y - 100, 100));
    platforms.push(createPlatform(600,floorPos_y - 200, 100));
    platforms.push(createPlatform(-400,floorPos_y - 100, 100));
    platforms.push(createPlatform(-500,floorPos_y - 200, 100));

}

    //UPDATE THE REAL POSITION OF THE GAME CHAR FOR COLLISION DETECTION
    gameChar_world_x = gameChar_x - scrollPos;

//-------------------------------------------------------------------------------------

function preload() {
  soundFormats('wav');
    levelComplete = loadSound('assets/level-complete.wav');
    gamePoints = loadSound('assets/collectables.wav');
    jump = loadSound('assets/jump.wav');
    canyonFall = loadSound('assets/canyon-fall.wav');
}



function draw(){
        
    //BACKGROUND GRADIENT EFFECT
    backgroundGradient();
    
    //BACKGROUND SNOW EFFECT
    snowEffect();
    
    //GROUND
    noStroke();
	fill(41,79,79);
	rect(0, floorPos_y, width, height - floorPos_y);
    
    //PUSH & TRANSLATE
    push(); 

    //CHANGE OF ORIGIN
    translate(scrollPos,0); 

    //DRAW MOUNTAINS
    drawmountains();

    //ANIMATE CLOUDS
    animateClouds();
    
    //DRAW CLOUDS
    drawclouds();

    //DRAW TREES
    drawtrees_x();

    //DRAW CANYONS
    drawCanyons();

    //DRAW COLLECTABLES
    drawCollectables();

    //DRAW FLAGPOLE
    drawFlagpole();
    
    //CHECK FLAGPOLE
    checkFlagpole();

    //DRAW ENEMIES
    drawEnemies();
    
    //DRAW PLATFORMS
    drawPlatforms();

    //POP BACK THE ORIGIN
    pop();

    //DRAW LIFE TOKENS
    drawLifeTokens();

    //CHECK IF PLAYER DIE
    checkPlayerDie();
    
    //DRAW GAMECHAR 
    drawGameChar();
    
    //DRAW GAMESCORE
    drawGameScore();
    
    //GAME OVER
    var isGameOver = checkIsGameOver()
    if(isGameOver == true){
        drawGameOver();
        return;
    }
    
    if(hitByEnemy == true){
        if(lives>0){
            startGame();
        }
        return;
    }
    
//-------------------------------------------------------------------------------------
    
    //CONDITIONAL STATEMENTS TO MOVE THE GAME CHAR
    if(isPlummeting){
        gameChar_y +=10;
        checkPlayerDie();
        return;
    }
    if(gameChar_y < floorPos_y){ 
        isFalling = true;
    }
    else{
        isFalling = false;
    }
    //IF GAMECHAR IS WITHIN THE ORIGINAL FRAME
    if(isLeft == true){
        if(gameChar_x > width*0.2)
        {
            gameChar_x -= 5;
        }
    //TRANSLATE DRAWING TOWARDS RIGHT
    else{
        scrollPos += 5;
    }
}
     //IF GAMECHAR IS WITHIN THE ORIGINAL FRAME
    else if(isRight == true){
        if(gameChar_x < width*0.8)
        {
            gameChar_x +=5;
        }
    
    //TRANSLATE DRAWING TOWARDS LEFT
    else{
        scrollPos -=5;
        }
    }
    
    //UPDATE THE REAL POSITION OF THE GAMECHAR FOR COLLISION DETECTION
    gameChar_world_x = gameChar_x - scrollPos;
    
    //CHECK IF GAME CHAR IN RANGE OF COLLECTABLES
    checkIfGameCharInCollectablesRange();
    
    //CHECK IF GAME CHAR IS OVER CANYONS
    checkIfGameCharIsOverCanyons();
    
    //CHECK IF GAME CHAR IN CONTACT WITH ENEMIES
    checkIfGameCharInContactWithEnemies();
    
    //CHECK IF GAME CHAR IS ABOVE ANY PLATFORMS
    checkIfCharacterIsAboveAnyPlatfroms();
}

//-------------------------------------------------------------------------------------

//BACKGROUND GRADIENT EFFECT
function backgroundGradient(){
    for(let y = 0; y < height; y++){
        n = map(y,0,height,0,1);
        let newc = lerpColor(c1,c2,n);
        stroke(newc);
        line(0,y,width, y);
    }
}

//BACKGROUND SNOW EFFECT
function snowEffect(){
    for(let x = 0; x < drops.length; x++){
        strokeWeight(2);
        drops[x] += random(1);
        if(drops[x] > height){
            drops[x] = 0;
        }
        point(x, drops[x]);
    }
}

//DRAW GAMECHAR 
function drawGameChar(){
    if(onPlatform && isLeft){
        drawIsLeft();
    }
    else if(onPlatform && isRight){
        drawIsRight();
    }
    else if(isLeft && isFalling)
    {
        drawIsLeftAndIsFalling();
    }
    else if(isRight && isFalling)
    {    
        drawIsRightAndISFalling();
    }
    else if(isLeft)
    {
        drawIsLeft();
    }
    else if(isRight)
    {
        drawIsRight();
    }
    else if(onPlatform){
        drawStandingFront();
    }
    else if(isFalling || isPlummeting)
    {
        drawIsFallingOrIsPlummeting();
    }
    else
    {
        drawStandingFront();
    }
}

//-------------------------------------------------------------------------------------

//DRAW GAMESCORE
function drawGameScore(){
    fill(139,0,0);
    rect(5,10,100,30);
    
    textSize(20);
    strokeWeight(3);
    fill(255);
    text("Score:" +game_score,20,35);
}

//DRAW LIFE TOKENS
function drawLifeTokens(){
    fill(0);
    for(var i = 0; i < lives; i++){
        stroke(0);
      fill(0);
    //Right ear
      ellipse(40*i + 900 - 12, 56 - 46,10,10);
    //Left ear
      ellipse(40*i + 900 + 12, 56 - 46,10,10);
    //Body
      fill(0);
      ellipse(40*i + 900,56 - 20,32,28);
      fill(255)
      ellipse(40*i + 900,56 - 20,22,18);
    //Head
      ellipse(40*i + 900,56 - 39,27,22);
    //Nose
      noStroke();
      fill(0);
      ellipse(40*i + 900,56 - 36,8,4);
    //Right eye
      noStroke();
      fill(0);
      ellipse(40*i + 900 - 5, 56 - 43,5,5);
      fill(255);
      ellipse(40*i + 900 - 4, 56 - 44,2,2);
    //Left eye
      noStroke();
      fill(0);
      ellipse(40*i + 900 + 5, 56 - 43,5,5);
      fill(255);
      ellipse(40*i + 900 + 4, 56 - 44,2,2);
    //Right leg
      noStroke();
      fill(0);
      ellipse(40*i + 900 - 7, 56 - 6,12,12)
      fill(255);
      ellipse(40*i + 900 - 6, 56 - 5,7,8)
    //Left leg
      noStroke();
      fill(0);
      ellipse(40*i + 900 + 7, 56 - 6,12,12)
      fill(255);
      ellipse(40*i + 900 + 6, 56 - 5,7,8)
    }
}



//CHECK IF PLAYER DIE
function checkPlayerDie(){
    //PLAYER FALLS INTO CANYON
    if(gameChar_y > height || hitByEnemy){
        if(lives > 0){
            startGame();
        }
    }
}

//DRAW FLAGPOLE - BAMBOO POLE
function drawFlagpole(){
    for(var i = 0; i < leaves.length; i++){
        //DRAW BAMBOO LEAVES
        noStroke();
        fill(110,154,66);
        push();
        translate(leaves[i].x_pos, leaves[i].y_pos);
        rotate(90);
        ellipse(0,0,20,12);
        pop(0);
        
        //DRAW BAMBOO
        fill(44,103,5);
        rect(flagpole.x_pos,floorPos_y-200,10,200);

        stroke(226,219,172);
        line(flagpole.x_pos,floorPos_y-150,flagpole.x_pos+10,floorPos_y-150);
        line(flagpole.x_pos,floorPos_y-100,flagpole.x_pos+10,floorPos_y-100);
        line(flagpole.x_pos,floorPos_y-50, flagpole.x_pos+10,floorPos_y-50);

        stroke(0);
        strokeWeight(3);
        fill(255,0,0);
        
        //DRAW FLAG
        if(flagpole.isReached){
        fill(128,0,0);
        noStroke();
        rect(flagpole.x_pos+10,floorPos_y-195,40,20);
        }
        else{
        fill(128,0,0);
        noStroke();
        rect(flagpole.x_pos+10,floorPos_y-25,40,20);
        }
    }
}

//CHECKFLAGPOLE
function checkFlagpole(){
    if(flagpole.isReached == false){
        var d = dist(gameChar_world_x,gameChar_y,flagpole.x_pos,floorPos_y);
        if(d < 10){
            flagpole.isReached = true;
            levelComplete.play();
        }
    }
}

//CHECK IF GAME OVER
function checkIsGameOver(){
    var gameOver = false;
    
    if(lives < 1 || flagpole.isReached){
        
        gameOver = true;
    }
    return gameOver;
}

//DRAW GAME OVER 
function drawGameOver(){
    fill(0);
    textSize(50);
    
    if(lives > 0){
        text("Level Complete!",300,height/2);
        text("Press space to continue.",170, height/2 + 50);
    }
    else{
        text("You Lose!",300,height/2);
        text("Press space to continue.",170,height/2 + 50);
    }
}

//-------------------------------------------------------------------------------------

//IMPLEMENT ENEMY
function Enemy(x,y,range){
    this.x = x;
    this.y = y;
    this.range = range;
    
    this.currentX = x;
    this.inc = 1;
    
    this.update = function(){
        this.currentX += this.inc;
        if(this.currentX > this.x + this.range){
            this.inc = -1;
        }
        else if(this.cuurentX < this.x){
            this.inc = 1;
        }
    }
    
    this.draw = function(){
        this.update();
        fill(255,0,0);
        ellipse(this.currentX,this.y,20,20);
    }
    
    this.checkContact = function(gc_x, gc_y){
        var d = dist(gc_x,gc_y,this.currentX,this.y);
        if(d<20){
            return true;
        }
        return false;
    }
}

//DRAW ENEMIES
function drawEnemies(){
    for(var i = 0; i<enemies.length;i++){
        enemies[i].draw();
    }
}

//CHECK IF GAME CHAR IN CONTACT WITH ENEMIES
function checkIfGameCharInContactWithEnemies(){
    if(checkIsGameOver()){
        return;
    }
    for(var i = 0; i < enemies.length; i++){
        var isContact = enemies[i].checkContact(gameChar_world_x,gameChar_y);
        if(isContact){
            hitByEnemy=true;
            lives--;
            break;
            
        }
    }
}

//PLATFORM FUNCTION
function drawPlatforms(){
    for(var i = 0; i < platforms.length; i++){
        platforms[i].draw();
    }
}

//CREATE PLATFORM
function createPlatform(x,y,length){
    var p = {
        x:x,
        y:y,
        length:length,
        draw: function(){
            fill(41,79,79); 
            rect(this.x, this.y, this.length, 20);
        },
        checkContact: function(gc_x, gc_y){
            //CHECK FOR X AXIS
            if(gc_x + 20 > this.x && gc_x < this.x + 20 + this.length){
                //CHECK FOR Y AXIS - GAME CHAR IS ON PLATFORM
                var d = this.y - gc_y;
                if(d>=0 && d<1){
                    return true
                }
            }
            return false;
        }
    }
    return p;
}

//CHECK IF GAME CHAR IS ABOVE ANY PLATFORMS
function checkIfCharacterIsAboveAnyPlatfroms(){
    if(isFalling){
        var isContact = false;
        onPlatform = false;
        for(var i = 0; i < platforms.length; i++){
            isContact = platforms[i].checkContact(gameChar_world_x,gameChar_y);
            if(isContact){
                onPlatform = true;
                break;
            }
        }
        if(!isContact){
            gameChar_y += 1;
        }
    }
} 

//-------------------------------------------------------------------------------------

//DRAW MOUNTAINS
function drawmountains(){
    for(var i = 0; i < mountains.length; i++){
        mountain_x1 = mountains[i].pos_x;
        mountain_y1 = mountains[i].pos_y;
        mountain_x2 = mountains[i].width/2 + mountain_x1;
        mountain_y2 = mountain_y1 - mountains[i].height;
        mountain_x3 = mountains[i].width/2 + mountain_x1;
        mountain_y3 = mountain_y1;
        
        mountain_x4 = mountains[i].width + mountain_x1;
        mountain_y4 = mountain_y1; 
        
        noStroke();
        
        fill( 253, 245, 230);
        triangle(mountain_x3,mountain_y3,mountain_x2,mountain_y2,mountain_x4, mountain_y4);
        
        fill(250, 235, 215);
        triangle(mountain_x1,mountain_y1,mountain_x2,mountain_y2,mountain_x3, mountain_y3);
        
        fill(255, 228, 181);
        triangle(mountain_x1+500,mountain_y1,mountain_x2+500,mountain_y2+100,mountain_x4+500,mountain_y4);        
        
    }
}

//ANIMATE CLOUDS
function animateClouds(){
    clouds[0].pos_x = clouds[0].pos_x + 0.3; 
    clouds[1].pos_x = clouds[1].pos_x + 0.3;
    clouds[2].pos_x = clouds[2].pos_x + 0.3;
    clouds[3].pos_x = clouds[3].pos_x + 0.3;}

//DRAW CLOUDS
function drawclouds(){
    for(var i = 0; i < clouds.length; i++){
    fill(255);
    ellipse(clouds[i].pos_x,   clouds[i].pos_y,clouds[i].size+30,clouds[i].size+30);
    ellipse(clouds[i].pos_x-30,clouds[i].pos_y,clouds[i].size+20,clouds[i].size+20);
    ellipse(clouds[i].pos_x+30,clouds[i].pos_y,clouds[i].size+20,clouds[i].size+20);
    }
}

//DRAW TREES
function drawtrees_x(){
    for(var i = 0; i < trees_x.length; i++){
        noStroke();
        fill(139,69,19);
        rect(trees_x[i],floorPos_y-100,50,100);
        
        noStroke();
        fill(32,178,170);
        triangle(trees_x[i]-50, floorPos_y-100,
                 trees_x[i]+25, floorPos_y-180,
                 trees_x[i]+100,floorPos_y-100);

        triangle(trees_x[i]-50, floorPos_y-50,
                 trees_x[i]+25, floorPos_y-130,
                 trees_x[i]+100,floorPos_y-50);

        triangle(trees_x[i]-50, floorPos_y-150,
                 trees_x[i]+25, floorPos_y-230,
                 trees_x[i]+100,floorPos_y-150);
    }
}

//DRAW CANYONS
function drawCanyons(){
    for(var i = 0;i <canyons.length; i++){
        var canyon = canyons[i];
        drawCanyon(canyon);
    }
}
function drawCanyon(canyon){
    fill(175, 238, 238);
    rect(canyon.x_pos,floorPos_y,canyon.width,height-floorPos_y);
}

//CHECK IF GAME CHAR IS OVER CANYONS
function checkIfGameCharIsOverCanyons(){
    for(var i = 0; i < canyons.length; i++){
        var canyon = canyons[i];
        checkIfGameCharIsOverCanyon(canyon);
    }
}
function checkIfGameCharIsOverCanyon(canyon){
        //check if game char is on the floor
        console.log(gameChar_x);
        var cond1 = gameChar_y == floorPos_y
        //check if game char is from the left of canyon
        var cond2 = gameChar_world_x - gameChar_width/2>(canyon.x_pos)
        //check if game char is from the right of canyon
        var cond3 = gameChar_world_x + gameChar_width/2<(canyon.x_pos + canyon.width)
        //check if game char is over the canyon 
        if(cond1 && cond2 && cond3)
            {
                isPlummeting = true;
                //DECREMENT LIVES
                lives--;
                canyonFall.play();
            }
}

//DRAW COLLECTABLES 

function initCollectables(){
    for(var i = 0; i < 25; i++){
        var r_x_pos = random(-2000,2000);
        var collectable = {x_pos: r_x_pos, y_pos: floorPos_y, size: 30, isFound: false}
        if(!isCollectableOnCanyon(collectable)){
            collectables.push(collectable);
        }
    }
}

function isCollectableOnCanyon(collectable){
    var onCanyon = false;
    for(i in canyons){
        var x1_limit = canyons[i].x_pos  - collectables.size;
        var x2_limit = canyons[i].x_pos + canyons[i].width;
        if(collectables.x_pos > x1_limit && collectables.x_pos < x2_limit){
            onCanyon = true;
            break;
        }
    }
    return onCanyon;
}

function drawCollectables(){
    for(var i = 0; i < collectables.length; i++){
        var collectable = collectables[i];
        drawCollectable(collectable);
    }
}
function drawCollectable(collectable){
    if(collectable.isFound == false){
        noStroke();
        fill(105,105,105)
        
        triangle(collectable.x_pos-12,collectable.y_pos-20,
                 collectable.x_pos,collectable.y_pos,
                 collectable.x_pos+12, collectable.y_pos-20);
        
        noStroke();
        fill(216, 191, 216);
        ellipse(collectable.x_pos,collectable.y_pos - 28,collectable.size);
    }
}

//CHECK IF GAME CHAR IN RANGE OF COLLECTABLES
function checkIfGameCharInCollectablesRange(){
    for(var i = 0; i < collectables.length; i++){
        var collectable = collectables[i];
        checkIfGameCharInCollectableRange(collectable);
    }
}

function checkIfGameCharInCollectableRange(collectable){
    var d = dist(gameChar_world_x,gameChar_y,collectable.x_pos,collectable.y_pos)
    if(collectable.isFound == false){
            if(d<20){
        collectable.isFound = true; 
        gamePoints.play();
        game_score++;
            }
    }
}

//-------------------------------------------------------------------------------------

function keyPressed(){   
// if statements to control the animation of the character when keys are pressed.
    if(keyCode == 37)
    {
        isLeft = true;
    }
    else if(keyCode == 39)
    {
        isRight = true;
    }
    else if(keyCode == 32)
    {
        if(gameChar_y >= floorPos_y || onPlatform)
        {
            gameChar_y -=150;
            jump.play(); 
        }
    }
}

function keyReleased(){    
// if statements to control the animation of the character when keys are released.
    if(keyCode == 37)
    {
        isLeft = false;
    }
    else if(keyCode == 39)
    {
        isRight = false;
    }
}

//-------------------------------------------------------------------------------------

//DRAWING OF GAME CHARACTER
function drawIsLeftAndIsFalling(){
    //Body
      stroke(0);
      fill(0);
      ellipse(gameChar_x,gameChar_y - 20 ,32,28);
      fill(255)
      ellipse(gameChar_x - 6,gameChar_y - 20 ,18,24);
    //Head
      ellipse(gameChar_x,gameChar_y - 39 ,25,22);
    //Right ear
      stroke(255);
      fill(0);
      ellipse(gameChar_x -1 , gameChar_y - 53,10,10);
      ellipse(gameChar_x + 3, gameChar_y - 50,10,10);
    //Right leg
      noStroke();
      fill(0);
      ellipse(gameChar_x + 1, gameChar_y - 6,12,12)
      fill(255);
      ellipse(gameChar_x-3, gameChar_y - 5,3,7)
    //Right eye
      noStroke();
      fill(0);
      ellipse(gameChar_x - 7, gameChar_y - 40,5,5);
      fill(255);
      ellipse(gameChar_x - 6, gameChar_y - 41,2,2);
}
    
function drawIsRightAndISFalling(){
    //Body
      stroke(0);
      fill(0);
      ellipse(gameChar_x,gameChar_y - 20,32,28);
      fill(255)
      ellipse(gameChar_x + 6,gameChar_y - 20,18,24);
    //Head
      ellipse(gameChar_x,gameChar_y - 39,25,22);
    //Left ear
      stroke(255);
      fill(0);
      ellipse(gameChar_x + 3, gameChar_y - 53,10,10);
      ellipse(gameChar_x -1 , gameChar_y - 50,10,10);
    //Left leg
      noStroke();
      fill(0);
      ellipse(gameChar_x + 1, gameChar_y - 6,12,12)
      fill(255);
      ellipse(gameChar_x+3, gameChar_y - 5,3,7)
    //Right eye
      noStroke();
      fill(0);
      ellipse(gameChar_x + 7, gameChar_y - 40,5,5);
      fill(255);
      ellipse(gameChar_x + 6, gameChar_y - 41,2,2);
}

function drawIsLeft(){
    //Body
      stroke(0);
      fill(0);
      ellipse(gameChar_x,gameChar_y - 20,32,28);
      fill(255)
      ellipse(gameChar_x - 6,gameChar_y - 20,18,24);
    //Head
      ellipse(gameChar_x,gameChar_y - 39,25,22);
    //right ear
      stroke(255);
      fill(0);
      ellipse(gameChar_x -1 , gameChar_y - 53,10,10);
      ellipse(gameChar_x + 3, gameChar_y - 50,10,10);
    //right leg
      noStroke();
      fill(0);
      ellipse(gameChar_x + 1, gameChar_y - 6,12,12)
      fill(255);
      ellipse(gameChar_x-3, gameChar_y - 5,3,7)
    //right eye
      noStroke();
      fill(0);
      ellipse(gameChar_x - 7, gameChar_y - 40,5,5);
      fill(255);
      ellipse(gameChar_x - 6, gameChar_y - 41,2,2);
}
    
function drawIsRight(){
    //Body
      stroke(0);
      fill(0);
      ellipse(gameChar_x,gameChar_y - 20,32,28);
      fill(255)
      ellipse(gameChar_x + 6,gameChar_y - 20,18,24);
    //Head
      ellipse(gameChar_x,gameChar_y - 39,25,22);
    //Left ear
      stroke(255);
      fill(0);
      ellipse(gameChar_x + 3, gameChar_y - 53,10,10);
      ellipse(gameChar_x -1 , gameChar_y - 50,10,10);
    //Left leg
      noStroke();
      fill(0);
      ellipse(gameChar_x + 1, gameChar_y - 6,12,12)
      fill(255);
      ellipse(gameChar_x+3, gameChar_y - 5,3,7)
    //Left eye
      noStroke();
      fill(0);
      ellipse(gameChar_x + 7, gameChar_y - 40,5,5);
      fill(255);
      ellipse(gameChar_x + 6, gameChar_y - 41,2,2);
}

function drawIsFallingOrIsPlummeting(){
      stroke(0);
      fill(0);
    //Right ear
      ellipse(gameChar_x - 12, gameChar_y - 46,10,10);
    //Left ear
      ellipse(gameChar_x + 12, gameChar_y - 46,10,10);  
    //Body
      fill(0);
      ellipse(gameChar_x,gameChar_y - 20 ,32,28);
      fill(255)
      ellipse(gameChar_x,gameChar_y - 20 ,22,18);

    //Head
      ellipse(gameChar_x,gameChar_y - 39 ,27,22);  
    //Nose
      noStroke();
      fill(0);
      ellipse(gameChar_x,gameChar_y - 36,8,4);  
    //Right eye
      noStroke();
      fill(0);
      ellipse(gameChar_x - 5, gameChar_y - 43, 5,5);
      fill(255);
      ellipse(gameChar_x - 4, gameChar_y - 44,2,2);
    //Left eye
      noStroke();
      fill(0);
      ellipse(gameChar_x + 5, gameChar_y - 43, 5,5);
      fill(255);
      ellipse(gameChar_x + 4, gameChar_y - 44,2,2);
    //Right leg
      noStroke();
      fill(0);
      ellipse(gameChar_x - 7, gameChar_y - 6,12,12)
      fill(255);
      ellipse(gameChar_x - 6, gameChar_y - 5,7,8)
    //Left leg
      noStroke();
      fill(0);
      ellipse(gameChar_x + 7, gameChar_y - 6,12,12)
      fill(255);
      ellipse(gameChar_x + 6, gameChar_y - 5,7,8)
}

function drawStandingFront(){
      stroke(0);
      fill(0);
    //Right ear
      ellipse(gameChar_x - 12, gameChar_y - 46,10,10);
    //Left ear
      ellipse(gameChar_x + 12, gameChar_y - 46,10,10);
    //Body
      fill(0);
      ellipse(gameChar_x,gameChar_y - 20,32,28);
      fill(255)
      ellipse(gameChar_x,gameChar_y - 20,22,18);
    //Head
      ellipse(gameChar_x,gameChar_y - 39,27,22);
    //Nose
      noStroke();
      fill(0);
      ellipse(gameChar_x,gameChar_y - 36,8,4);
    //Right eye
      noStroke();
      fill(0);
      ellipse(gameChar_x - 5, gameChar_y - 43,5,5);
      fill(255);
      ellipse(gameChar_x - 4, gameChar_y - 44,2,2);
    //Left eye
      noStroke();
      fill(0);
      ellipse(gameChar_x + 5, gameChar_y - 43,5,5);
      fill(255);
      ellipse(gameChar_x + 4, gameChar_y - 44,2,2);
    //Right leg
      noStroke();
      fill(0);
      ellipse(gameChar_x - 7, gameChar_y - 6,12,12)
      fill(255);
      ellipse(gameChar_x - 6, gameChar_y - 5,7,8)
    //Left leg
      noStroke();
      fill(0);
      ellipse(gameChar_x + 7, gameChar_y - 6,12,12)
      fill(255);
      ellipse(gameChar_x + 6, gameChar_y - 5,7,8)
}


















