var babyObj = function(){
    this.x;
    this.y;
    this.angle;

    this.babyTailTimer;
    this.babyTailCount;

    this.babyEyeTimer;
    this.babyEyeCount;
    this.babyEyeInterval;

    this.babyBodyTimer;
    this.babyBodyCount;

}
babyObj.prototype.init = function(){
    this.x = canWidth * 0.5 - 50;
    this.y = canHeight * 0.5 - 50;
    this.angle = 0;

    this.babyTailTimer = 0;
    this.babyTailCount = 0;

    this.babyEyeTimer = 0;
    this.babyEyeCount = 0;
    this.babyEyeInterval = 1000;

    this.babyBodyTimer = 0;
    this.babyBodyCount = 0;
}
babyObj.prototype.draw = function(){
    //lerp x,y
    this.x = lerpDistance(mom.x, this.x, 0.98);
    this.y = lerpDistance(mom.y, this.y, 0.98);
    //lerp angle
    var deltaX = mom.x - this.x;
    var deltaY = mom.y - this.y;
    var beta = Math.atan2(deltaY, deltaX) + Math.PI;
    this.angle = lerpAngle(beta, this.angle, 0.5);
    //小鱼尾巴动画
    this.babyTailTimer += deltaTime;
    if(this.babyTailTimer > 50){
        this.babyTailCount = (this.babyTailCount + 1) % 8;
        this.babyTailTimer %= 50;
    }
    //小鱼眼睛动画
    this.babyEyeTimer += deltaTime;
    if(this.babyEyeTimer > this.babyEyeInterval){
        this.babyEyeCount = (this.babyEyeCount + 1) % 2;
        this.babyEyeTimer %= this.babyEyeInterval;
        if(this.babyEyeCount == 0){
            this.babyEyeInterval = Math.random() * 1500 + 2000;
        }else{
            this.babyEyeInterval = 200;
        }
    }
    //小鱼身体变白
    this.babyBodyTimer += deltaTime;
    if(this.babyBodyTimer > 300){
        this.babyBodyCount += 1;
        this.babyBodyTimer %= 300;
        if(this.babyBodyCount > 19){
            this.babyBodyCount = 19;
            //game over
            data.gameOver = true;
        }
    }
    ctx1.save();
    ctx1.translate(this.x, this.y);
    ctx1.rotate(this.angle);
    var babyTailCount = this.babyTailCount;
    ctx1.drawImage(babyTail[babyTailCount], - babyTail[babyTailCount].width * 0.5 + 24, - babyTail[babyTailCount].height * 0.5);
    var babyBodyCount = this.babyBodyCount;
    ctx1.drawImage(babyBody[this.babyBodyCount], -babyBody[this.babyBodyCount].width * 0.5, - babyBody[this.babyBodyCount].height * 0.5);
    var babyEyeCount = this.babyEyeCount;
    ctx1.drawImage(babyEye[babyEyeCount], - babyEye[babyEyeCount].width * 0.5, - babyEye[babyEyeCount].height * 0.5);
    ctx1.restore();
}