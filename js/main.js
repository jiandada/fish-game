var can1;
var can2;

var ctx1;
var ctx2;

var lastTime;
var deltaTime;

var canWidth;
var canHeight;

var bgPic = new Image();

var ane; 
var fruit;
var mom;

var mx; //鼠标坐标
var my;

var baby;
//定义尾巴数组
var babyTail = [];
var bigTail = [];
//眨眼睛
var babyEye = [];
var bigEye = [];
//小鱼身体变白
var babyBody = [];
var bigBodyOra = [];
var bigBodyBlue = [];

var data;
var wave;
var halo;

var dust;
var dustPic = [];

document.body.onload = game;
function game(){
    init();
    lastTime = Date.now();
    gameloop();
}

function init(){
    //获得canvans context
    can1 = document.getElementById("canvas1");  //fish dust ui circle
    ctx1 = can1.getContext('2d');
    ctx1.font = '30px Verdana';
    ctx1.textAlign = 'center'
    can2 = document.getElementById("canvas2");  //background ane fruit
    ctx2 = can2.getContext('2d');
    
    can1.addEventListener('mousemove',onMouseMove,false);
   
    bgPic.src = "./src/background.jpg";


    canWidth = can1.width;
    canHeight = can1.height;

    mx = canWidth * 0.5;
    my = canHeight * 0.5;
    
    ane = new aneObj();
    ane.init();

    fruit = new fruitObj();
    fruit.init();

    mom = new momObj();
    mom.init();

    baby = new babyObj();
    baby.init();

    for(var i = 0; i < 8; i++){
        babyTail[i] = new Image();
        babyTail[i].src = './src/babyTail'+ i +'.png';
    }
    for(var i = 0; i < 8; i++){
        bigTail[i] = new Image()
        bigTail[i].src = './src/bigTail'+ i +'.png';
    }
    for(var i = 0; i < 2; i++){
        babyEye[i] = new Image();
        babyEye[i].src = './src/babyEye'+ i +'.png';
    }
    for(var i = 0; i < 2; i++){
        bigEye[i] = new Image();
        bigEye[i].src = './src/bigEye'+ i +'.png';
    }
    for(var i = 0; i < 20; i++){
        babyBody[i] = new Image();
        babyBody[i].src = './src/babyFade'+ i +'.png';
    }
    for(var i = 0; i < 8; i++){
        bigBodyOra[i] = new Image();
        bigBodyBlue[i] = new Image();
        bigBodyOra[i].src = './src/bigSwim'+ i +'.png';
        bigBodyBlue[i].src = './src/bigSwimBlue'+ i +'.png';
    }
    for(var i = 0; i < 7; i++){
        dustPic[i] = new Image();
        dustPic[i].src = './src/dust'+ i +'.png';
    }
    data = new dataObj();
    data.init();

    wave = new waveObj();
    wave.init();

    halo = new haloObj();
    halo.init();

    dust = new dustObj();
    dust.init();
}

function gameloop(){
    //游戏循环
    window.requestAnimFrame(gameloop);
    var now = Date.now();
    deltaTime = now - lastTime;
    if(deltaTime > 40) deltaTime = 40;
    lastTime = now;

    drawBackground();
    ane.draw();
    fruit.draw();
    fruitMonitor();
    //画布2每次循环加载都会被大背景覆盖全部，所以不用清除画布。
    ctx1.clearRect(0, 0, canWidth, canHeight);
    mom.draw();
    momFruitCollision();
    momBabyCollision();
    baby.draw();
    data.draw();
    wave.draw();
    halo.draw();
    dust.draw();
}

function onMouseMove(e){
    if(!data.gameOver){
        if(e.offSetX || e.layerX){
            mx = e.offSetX == undefined ? e.layerX : e.offSetX;
            my = e.offSetY == undefined ? e.layerY : e.offSetY;
        }
    }
}