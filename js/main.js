window.onload = function() {
    
    "use strict";
    
    var game = new Phaser.Game( 1400, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
		game.load.image( 'phonesprite', 'assets/cat.png' );
		game.load.tilemap( 'level', 'assets/racetrack3.csv', null, Phaser.Tilemap.CSV );
		game.load.image( 'bg', 'assets/BGcar3.png' );
		//game.load.image( 'road', 'assets/clouds2.png' )
		//game.load.audio('clunk', 'assets/clunk.ogg');
		game.load.audio('music', 'assets/12-tripod.ogg');
		//game.load.audio('vroom', 'assets/vroom.ogg');
		game.load.audio('victory', 'assets/victory.ogg');
		game.load.audio('lose', 'assets/lose.ogg');
		game.load.audio('meow','assets/meow.ogg');
		game.load.spritesheet('cats', 'assets/caryou.png', 594, 400);
		game.load.audio('pew','assets/pew.ogg');
		game.load.image('tiles', 'assets/tilesn.png');
		game.load.image('danger', 'assets/tiles3Bn.png');
		game.load.spritesheet('tiles2', 'assets/tiles3Bn.png');
		game.load.spritesheet('tiles3', 'assets/tiles4.png', 45, 45);
		game.load.audio('ow','assets/ow.ogg');
		game.load.spritesheet('laser','assets/laser.png',400,400);
		game.load.audio('kshhh', 'assets/kshhh.ogg');
		game.load.audio('ending','assets/Super Mario World Ending.ogg');
		//game.load.image('splode', 'assets/explosion.png');
		game.load.image('road', 'assets/road.png');
    }
    
	//VARS
	var touchr =false;
	var touchl=false;
	var touchu = false;
	var touchd=false;
	var road;
	var winText = false;
	var BIG = false;
	var bounceUpgrade;
	var ending;
	var kshhh;
	var ow;
	var pew;
	var boostR;
	var boostL;
	var boostUp;
	var win;
	var music;
	var vroom;
    var mech;
	var floor;
	var map;
	var cursors;
	var jump;
	var height = false;
	var jumping = false;
	var jumps = 0;
	var loop = 1;
	var phone2;
	var speedUpgrade;
	var drillUpgrade;
	var goal;
	var mechswitch = true;
	var currentPos;
	var count = 0;
	var tenth = 0;
	//var clunk;
	var doublejump = false;
	var bg;
	var road;
	var lose;
	var cooldown = 0;
	var meow;
	var level;
	var layer;
	var layer2;
	var layer3;
	var level3;
	//var killed2 = false;
	//var killed3 = false;
	//var killed4 = false;
	//var killed5 = false;
	var fuel= 100;
	var text;
	var controlstext;
	var velo2 = 110;
	var velo3 = 110;
	var velo4 = 210;
	var velo5 = 310;
	var shooting = false;
	var shootingW = false;
	var proj;
	var projpos = 0;
	//var timer2 = 0;
	//var timer3 = 0;
	//var timer4 = 0;
	//var timer5 = 0;
	var mechposx =0;
	var S;
	var dashing;
	var faster;
	var boosting;
	var Fbomb;
	//var shootR;
	//var shootL;
	//var shootW;
	//var splode;
	//var superboostUp;
	//var superboostD;
	//var superboostL;
	//var superboostR;
	var current;
	var level2;
	var blessed = false;
	var blessing;
	var score = 1499;
    function create() {
	 game.physics.startSystem(Phaser.Physics.ARCADE);
	 
	 //game.physics.startSystem(Phaser.Physics.P2JS);
		bg = game.add.tileSprite(0, 0, 12000, 10000, 'bg');
		bg.fixedToCamera=true;
		//road = game.add.tileSprite(0, 0, 12000, 10000, 'road');
		
		//game.world.setBounds(0, 0, 2400, 12000);
		//level2 = game.add.tilemap('level',45,45,50,50);
		level = game.add.tilemap('level',45,45,50,50);//,16,16);//,game.world.centerX,game.world.centerY);
		
		//level.setCollisionBetween(1,51 );
		//layer3 = level3.createLayer('hah');
		//level3.setCollision(75,layer3);
		//level3.addTilesetImage(level,'danger',1,1,0,0,75);
		
		//level2.setCollision(50,layer2);
		
		//layer2 = level2.createLayer(0);
		//level2.addTilesetImage(level,'tiles',1,1,0,0,0);
		layer = level.createLayer(0);
		
		game.physics.arcade.enable(level);
		//game.physics.arcade.enable(level2);
		//game.physics.arcade.enable(layer2);
		//game.physics.arcade.enable(layer);
		level.setCollisionBetween(1,51,layer);
		level.setCollision(24,false,layer);
		level.setCollision(25,false,layer);
		//level.setCollision(75,layer2);
		layer.resizeWorld();
		level.addTilesetImage(layer,'tiles',1,1,0,0,0);
		level.addTilesetImage(layer,'tiles',45,45,0,0,24);
		level.addTilesetImage(layer,'tiles2',45,45,0,0,25);
		level.addTilesetImage(layer,'tiles3',45,45,0,0,50);
		level.addTilesetImage(layer,'danger',45,45,0,0,75);
		level.collisionLayer = layer;
		//road = game.add.tileSprite(0, 0, 1200, 400, 'road');
		
		//layer2.debug = true;
		//layer2.resizeWorld();
		//level.addTilesetImage(level,'bg',1,1,0,0,0);
		//level.addTilesetImage(layer2,'tiles2',45,45,0,0,25);
		//level.addTilesetImage(layer2,'tiles3',45,45,0,0,50);
		//level.animations.add('tilemove',[0,1],4);
		//level.animations.play('tilemove');
		//layer.width = 2000;
		
		
		//level.setCollision(50,0);
		
		//game.physics.arcade.enable(level2);
		//game.physics.arcade.enable(level3);
		
		//layer.debug = true;
		//game.physics.arcade.convertTilemap(level, layer);
		//EXPLOSIONS
		//splode = game.add.sprite(300,0,'splode');
		//game.physics.enable(splode, Phaser.Physics.ARCADE);
		//splode.width = 650;
		//splode.height = 800;
		//splode.alpha = 0.01;
		//splode.fixedToCamera = true;
		//PROJECTILE
		proj = game.add.sprite(0,0,'laser');
		game.physics.enable( proj, Phaser.Physics.ARCADE );
		proj.width = 50;
		proj.height = 50;
		proj.exists = false;
		
		
		
		
        // MECH
        mech = game.add.sprite( 200 , 1100, 'cats' );
		mech.width = 90;
		mech.height = 120;
		//mech.body.x = -10000;
        // so it will be truly centered.
		//mech.animations.add('phonesprite', true);
		
        mech.anchor.setTo( 0.5, 0.5 );
		
        game.physics.enable( mech );
		//mech.body.bounce.y = 10;
		//mech.body.bounce.x = 10;
		//game.physics.arcade.collide(mech, layer);
		//game.physics.arcade.collide(mech, layer2);
		//mech.body.acceleration.y = 2000;
		
		game.physics.arcade.TILE_BIAS = 40;
		
		game.physics.arcade.gravity.y = 0;
		mech.body.gravity.y = 8000;
		
		
		
		
		
		//PHONES
		phone2 = game.add.sprite( mech.body.x + 50, 1100, 'phonesprite' );
		game.physics.enable( phone2, Phaser.Physics.ARCADE );
		phone2.body.collideWorldBounds = true;
		phone2.anchor.setTo(0.5,0.5);
		phone2.width = 400;
		phone2.height = 400;
		phone2.body.immovable = true;
		phone2.body.moves = false;
		//phone2 = makePhone(1000, -1000);
		
		bounceUpgrade = game.add.sprite( mech.body.x + 300, 1250, 'laser' );
		game.physics.enable( bounceUpgrade, Phaser.Physics.ARCADE );
		bounceUpgrade.body.collideWorldBounds = true;
		bounceUpgrade.anchor.setTo(0.5,0.5);
		bounceUpgrade.width = 50;
		bounceUpgrade.height = 50;
		
		speedUpgrade = game.add.sprite( mech.body.x + 4450, 1500, 'laser' );
		game.physics.enable( speedUpgrade, Phaser.Physics.ARCADE );
		speedUpgrade.body.collideWorldBounds = true;
		speedUpgrade.anchor.setTo(0.5,0.5);
		speedUpgrade.width = 50;
		speedUpgrade.height = 50;
		
		drillUpgrade = game.add.sprite( mech.body.x + 5200, 2000, 'laser' );
		game.physics.enable( drillUpgrade, Phaser.Physics.ARCADE );
		drillUpgrade.body.collideWorldBounds = true;
		drillUpgrade.anchor.setTo(0.5,0.5);
		drillUpgrade.width = 50;
		drillUpgrade.height = 50;
		
		goal = game.add.sprite( mech.body.x + 3200 , mech.body.y +2700, 'laser' );
		game.physics.enable( goal, Phaser.Physics.ARCADE );
		goal.body.collideWorldBounds = true;
		goal.anchor.setTo(0.5,0.5);
		goal.width = 50;
		goal.height = 50;
		//goal.body.gravity = 200;
		
		blessing = game.add.sprite( mech.body.x + 2450, mech.body.y + 1050, 'laser' );
		game.physics.enable( blessing, Phaser.Physics.ARCADE );
		blessing.body.collideWorldBounds = true;
		blessing.anchor.setTo(0.5,0.5);
		blessing.width = 50;
		blessing.height = 50;
		
        mech.body.collideWorldBounds = true;
		
		//AUDIO
		pew = game.add.audio('pew',0.08);
		pew.allowMultiple = true;
		//clunk = game.add.audio('clunk',0.2);
		//vroom = game.add.audio('vroom',0.25);
		music = game.add.audio('music',0.4,true );
		win = game.add.audio('victory',1);
		lose = game.add.audio('lose');
		meow = game.add.audio('meow',0.6);
		ow = game.add.audio('ow', 0.5);
		ow.allowMultiple = true;
		kshhh = game.add.audio('kshhh',0.5);
		ending = game.add.audio('ending',0.5,true);
		music.play();
		//CONTROLS
		
		cursors = game.input.keyboard.createCursorKeys();
		jump = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		boostR = game.input.keyboard.addKey(Phaser.Keyboard.D);
		boostL = game.input.keyboard.addKey(Phaser.Keyboard.A);
		boostUp = game.input.keyboard.addKey(Phaser.Keyboard.W);
		S = game.input.keyboard.addKey(Phaser.Keyboard.S);
	
		//ANIMATIONS
		phone2.animations.add('walk',[0,1,2],3,true);
		bounceUpgrade.animations.add('bounce',[1],1,true);
		bounceUpgrade.animations.play('bounce',[1],1,true);
		drillUpgrade.animations.add('flash',[0,1],20,true);
		speedUpgrade.animations.add('flash',[0,1],20,true);
		drillUpgrade.animations.play('flash');
		speedUpgrade.animations.play('flash');
		blessing.animations.add('flash',[0,1],20,true);
		blessing.animations.play('flash');
		goal.animations.add('walk',[0,1,2],3,true);
		phone2.animations.add('die',[3,4],3,true);
		//drillUpgrade.animations.add('die',[3,4],3,true);
		//speedUpgrade.animations.add('die',[3,4],3,true);
		goal.animations.add('die',[3,4],3,true);
		proj.animations.add('laser',[0,1],20,true);
		mech.animations.add('move',[0,1,2],7, true);
		mech.animations.add('spike',[3,4,5],7, true);
		mech.animations.play('move');
		game.camera.follow(mech);
		
		var style = { font: "35px Verdana", fill: "#000000", align: "center" };
        
		text = game.add.text( 20, 20, "Score: "+score , style );
		text.fixedToCamera = true;
		text.inputEnabled = true;
    }
    
    function update() {
	text.setText("Score: "+score );
	dashing = true;
	if (!winText){
		score -=1;
		}
	else{
		text.width = 500;
		text.height = 500;
		}
	//Text
	if (winText){
		updateText();
		}
	//SPRITE MOVEMENT
	if (!BIG){
	//if (mech.body.velocity.x < 0){
	if (boostL.isDown){
		mech.scale.x = -.25;
		}
	//if (mech.body.velocity.x > 0){
	if (boostR.isDown){
		mech.scale.x = .25;
		}
	if (mech.body.velocity.y < 0 && !touchd){
		mech.rotation = 20;
		if (mech.scale.x == -.25){
			mech.rotation = -20;
			}
		}
	else if (mech.body.velocity.y > 0 && !touchd){
		mech.rotation = -20;
		if (mech.scale.x == -.25){
			mech.rotation = -20;
			}
		
		}
	
	else {
		mech.rotation = 0;
		}
	}
	
	
	//ANIMATION START
	
	
		//COLLISION
		if (!BIG && game.physics.arcade.collide(mech, level.collisionLayer)){
		
		if (mech.body.blocked.down ){
			touchd = true;
		}
		if (mech.body.blocked.right && mech.body.blocked.down){
			mech.body.velocity.y -= 2000;
			mech.body.velocity.x += 2000;
		}
		if (mech.body.blocked.left  && mech.body.blocked.down){
			mech.body.velocity.y -= 2000;
			mech.body.velocity.x -= 2000;
		}
		if (!mech.body.blocked.down){
			touchd = false;
			}
			}
		//game.physics.arcade.collide(phone2, layer);
		//game.physics.arcade.collide(speedUpgrade, layer);
		//game.physics.arcade.collide(drillUpgrade, layer);
		//game.physics.arcade.collide(goal, layer);
		
		
		
		//SHOOTING
		
		if (shooting && (projpos < proj.body.x - 300 || projpos > proj.body.x + 300) || mech.body.y < proj.body.y -350){
			shooting = false;
			proj.exists = false;
			}
		if (jump.isDown && !shooting && mech.scale.x == .25 && blessed){
			proj.exists = true;
			proj.body.x = mech.body.x;
			proj.body.y = mech.body.y + 50;
			proj.body.velocity.y = 0;
			proj.body.velocity.x = mech.body.velocity.x + 2000;
			projpos = proj.body.x;
			shooting = true;
			proj.animations.play('laser');
			pew.play();
			}
		if (jump.isDown && !shooting && mech.scale.x == -.25 && blessed){
			proj.exists = true;
			proj.body.x = mech.body.x;
			proj.body.y = mech.body.y + 50;
			proj.body.velocity.y = 0;
			proj.body.velocity.x = mech.body.velocity.x - 2000;
			projpos = proj.body.x;
			shooting = true;
			pew.play();
			proj.animations.play('laser');
			}
			
			// JUMP
		if (jump.isDown && cooldown == 0){ //&& mech.body.onFloor() || jump.isDown && mech.body.touching.down){
        //mech.body.velocity.y = -250;
		if (touchd){
			mech.body.velocity.y = -2750;
			}
		touchu = false;
		touchd = false;
		touchl = false;
		touchr = false;
		
		if(!pew.isPlaying){
		pew.play();
		}
    }
		
		if (!boostUp.isDown && !S.isDown){
			mech.body.velocity.y *= .9;
			mech.body.acceleration.y = 0;
			mech.rotation = 0;
			}
		if (!boostL.isDown && !boostR.isDown){
			mech.body.velocity.x *= .9;
			mech.body.acceleration.x = 0;
			}
			//BOOST
		if (cooldown == 0){
			boosting = false;
			}
		if (boostUp.isDown){
			fuel -= 30;
						
		}
		if (S.isDown ){
			fuel -= 30;
			
		}
		if (boostL.isDown ){
			fuel -= 30;
			if (mech.body.velocity.x <= 1100){
			mech.body.acceleration.x =-4500;
			mech.body.maxVelocity.x = 1750;
			if(faster){
			mech.body.acceleration.x = -6000;
			mech.body.maxVelocity.x = 3100;
				}
			}
			else { mech.body.velocity.x *= .5;
			kshhh.play()}
			
			//mech.body.acceleration.y = 60;
			
			//mech.body.velocity.x *= 1.3;
			//cooldown = 5;
			doublejump = false;
		}
		if (boostR.isDown ){
			fuel -= 30;
			if (mech.body.velocity.x >= -1100){
			mech.body.acceleration.x =4500;
			mech.body.maxVelocity.x = 1750;
			if(faster){
				mech.body.acceleration.x = 6000;
				mech.body.maxVelocity.x = 3100;
				}
			}
			
			else { mech.body.velocity.x *= .5;
			kshhh.play()}
			//mech.body.velocity.x *= 1.3;
			//cooldown = 5;
			doublejump = false;
			//vroom.play();
			mech.animations.play('boost');
		}
		
		//Dash
		
		if (game.physics.arcade.overlap(mech,drillUpgrade)){
				dashing = true;
				kshhh.play();
				mech.body.velocity.y -= 3000;
				}
		if (game.physics.arcade.overlap(mech,speedUpgrade)){
			faster = true;
			kshhh.play();
			speedUpgrade.kill();
			text.alpha = 100;
			}
		if (game.physics.arcade.overlap(mech,bounceUpgrade)){
			kshhh.play();
			mech.body.velocity.y -= 3000;
			}
		if (game.physics.arcade.collide(mech,goal)){
			mech.width *= 5;
			mech.height *= 5;
			mech.rotation = 0;
			if (score >0){
				win.play();
				}
			else{
				lose.play();
				}
			BIG = true;
			goal.kill();
			music.stop();
			ending.play();
			winText = true;
			text.x = mech.body.x -300;
			text.y = mech.body.y-300;
			text.alpha = 100;
			}
		if (game.physics.arcade.overlap(mech,blessing)){
				blessed = true;
				kshhh.play();
				mech.body.x = goal.body.x - 1000;
				mech.body.y = goal.body.y - 200;
			}
		
		if (game.physics.arcade.collide(mech,phone2)){
			
				if (mech.body.velocity.x > 0){
					mech.body.velocity.x -=11100;
					}
				else{
					mech.body.velocity.x += 11100;
					}
				
			}
			phone2.kill();
		if (game.physics.arcade.collide(proj,phone2)){
			ow.play()
				text.setText ("KO");
				text.x = phone2.body.x + 200;
				text.y = phone2.body.y;
				text.alpha = 100;
				text.width *= 2;
				text.height *= 2;
			phone2.kill();
			//proj.kill();
			proj.exists = false;
			shooting = false;
			
			}
		if (winText == false && !music.isPlaying){
			music.play();
			}
		}
		
		function updateText(){
				//text.setText("You Win");
				//text.height += 15;
				//text.width += 15;
			
			}
}
