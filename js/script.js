var canvasBG = document.getElementById('canvasBG'),
	ctxBg = canvasBg.getContext('2d'),
	canvasEntities = document.getElementById('canvasEntities'),
	ctxEntities = canvasEntities.getContext('2d'),
	canvasWidth = canvasBg.width,
	canvasHeight = canvasBg.height,
	isPlaying = false;
	player1 = new Player(),
	enemies = [],
	numEnemies = 5,
	enemy1 = new Enemy(),
	bullet = new Bullet(), 
	bullets = [],
	requestAnimFrame = window.requestAnimationFrame ||
                       window.webkitRequestAnimationFrame ||
                       window.mozRequestAnimationFrame ||
                       window.oRequestAnimationFrame ||
                       window.msRequestAnimationFrame ||
                       function(callback) {
                            window.setTimeout(callback, 1000 / 60);
                       };

imgSprite = new Image();
imgSprite.src = "assets/images/sprite.png";
imgSprite.addEventListener('load', init, false);

function init() {
	begin();
	document.addEventListener('keydown', function(e) {checkKey(e, true);}, false);
    document.addEventListener('keyup', function(e) {checkKey(e, false);}, false); //Using anonymous function 
    isPlaying = true; 
    loop();
};

function begin() {
	  ctxBg.drawImage(imgSprite, 0 , 0, 181, 102, 0, 0, canvasWidth, canvasHeight);
};

function loop() {
	if(isPlaying) {
		update();	//make sure you call update before you draw on the canvas	
		draw();     // because update clears the canvas. 
		requestAnimFrame(loop);
	}
};

function update() {
	clearCtx(ctxEntities);
	player1.update();
	enemy1.update();
};

function draw() {
	player1.draw();
	enemy1.draw(); 
};

function clearCtx(ctx) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
}

/*------------------------ PLAYER 
*/

function Player() {
	this.srcX = 0;
	this.srcY = 102;
	this.width = 49;
	this.height = 35; //
	this.drawX = 450;
	this.drawY = 476;
	this.speed = 10;
	this.isLeftKey = false;
	this.isRightKey = false;
	this.isSpacebar = false;
	this.isShooting = false;
	var numBullets = 10;
	this.bullets = [];
	var bullet = new Bullet();
	this.currentBullet = 0; 
	for (var i = 0; i < numBullets; i++) {
		this.bullets[this.bullets.length] = new Bullet();
	};
};

Player.prototype.draw = function() {
	ctxEntities.drawImage(imgSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
};

Player.prototype.update = function() {
	this.checkDirection();
	this.checkShooting();
};

Player.prototype.checkDirection = function() {
	if(this.isLeftKey) {
		this.drawX = this.drawX - this.speed;
	} else if (this.isRightKey) {
		this.drawX = this.drawX + this.speed;
	}
};

Player.prototype.checkShooting = function() {
	if(this.isSpacebar && !this.isShooting) {
		this.isShooting = true;
		this.bullets[this.currentBullet].fire(450, 450); 
        this.currentBullet++;
        if(this.currentBullet >= 0) {
        	this.currentBullet = 0;
        }
        this.isShooting = false;
	} 
};

Player.prototype.updateAllBullets = function() {
	for (var i = 0; i < this.bullets.length; i++) {
		if (this.bullets[i].isFlying) {
			this.bullets[i].update();
			console.log('i update');
		};
	};
};

Player.prototype.drawAllBullets = function() {
	for (var i = 0; i < this.bullets.length; i++) {
		if (this.bullets[i].isFlying) {
			this.bullets[i].draw();
			console.log('i drew');
		};
	};
};


/* ----------------- ENEMIES
*/

function Enemy() {
	this.srcX = 50,
	this.srcY = 102,
	this.width = 24,
	this.height = 36,
	this.drawX = 450,
	this.drawY = 0;
	this.speed = 4;
	var that = this;
};



Enemy.prototype.draw = function() {
	ctxEntities.drawImage(imgSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
	
};

Enemy.prototype.update = function() {
	this.checkDirection();
};

Enemy.prototype.checkDirection = function() {
	this.drawY = this.drawY += this.speed;
};


/* ----------------- Bullets
*/

function Bullet() {
	this.srcX = 73,
	this.srcY = 102,
	this.width = 8,
	this.height = 11,
	this.drawX = 20,
	this.drawY = 20,
	this.speed = 4 ,
	this.isFlying = false;
};

Bullet.prototype.draw = function() {
	ctxEntities.drawImage(imgSprite, this.srcX, this.srcY, this.width, this.height, this.drawX, this.drawY, this.width, this.height);
};

Bullet.prototype.update = function() {
	this.drawY = this.drawY -= this.speed;
};

Bullet.prototype.fire = function(startX, startY) {
	this.drawX = this.startX;
	this.drawY = this.startY;
	this.isFlying = true;
	console.log('i fired');
};



/* ----------------- KEYBOARD EVENTS 
*/



function checkKey(e, value) {
	 var keyID = e.keyCode || e.which; // for different browsers
	 if (keyID === 65) {
	 	player1.isLeftKey = value;
	 	e.preventDefault();
	 }
	 if (keyID === 68) {
	 	player1.isRightKey = value;
	 	e.preventDefault();
	 }
	 if (keyID === 32) {
	 	player1.isSpacebar = value;
	 	e.preventDefault();
	 }
	 
}




/* ----------------- MISC
*/









