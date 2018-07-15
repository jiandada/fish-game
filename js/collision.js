//大鱼和果实的碰撞检测
function momFruitCollision(){
    if(!data.gameOver){
        for(var i = 0 ; i < fruit.num ; i ++){
            if(fruit.alive[i]){
                var l = calLength2(mom.x, mom.y, fruit.x[i], fruit.y[i]);
                if(l < 625){
                    fruit.dead(i)  //果实消失
                    data.fruitNum ++;
                    mom.bigBodyCount ++
                    if(mom.bigBodyCount > 7){
                        mom.bigBodyCount = 7;
                    }
                    if(fruit.fruitType[i] == 'blue'){
                        data.double = 2;
                    }
                    //白圈产生
                    wave.born(fruit.x[i], fruit.y[i]);
                }
            }
        }
    }
}
//大鱼小鱼碰撞检测
function momBabyCollision(){
    if(data.fruitNum > 0 && !data.gameOver){
        var l = calLength2(mom.x, mom.y, baby.x, baby.y);
        if(l < 900){
            //baby recover
            baby.babyBodyCount = 0;
            mom.bigBodyCount = 0;
            //addScore update
            data.addScore();
            //halo born
            halo.born(baby.x, baby.y);
        }
    }
}