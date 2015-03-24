window.onload = function() {
    
    "use strict";
    
    var game = new Phaser.Game( 1200, 800, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
		game.load.spritesheet( 'phonesprite', 'assets/phone.png', 200,343 );
		game.load.tilemap( 'level', 'assets/mylevel3.csv', null, Phaser.Tilemap.CSV );
		game.load.image( 'bg', 'assets/BG3.png' );
		game.load.image( 'road', 'assets/clouds.png' )
		game.load.audio('clunk', 'assets/clunk.ogg');
		game.load.audio('music', 'assets/12-tripod.ogg');
		game.load.audio('vroom', 'assets/vroom.ogg');
		game.load.audio('victory', 'assets/victory.ogg');
		game.load.audio('lose', 'assets/lose.ogg');
		game.load.audio('meow','assets/meow.ogg');
		game.load.spritesheet('cats', 'assets/catmech.png', 545, 600);
		game.load.audio('pew','assets/pew.ogg');
		game.load.image('tiles', 'assets/tiles.png');
		game.load.spritesheet('tiles2', 'assets/tiles2.png');
		game.load.audio('ow','assets/ow.ogg');
		game.load.spritesheet('laser','assets/laser.png',400,400);
		game.load.audio('kshhh', 'assets/kshhh.ogg');
    }
    
	//VARS
	var wave;
	var kshhh;
	var ow;
	var pew;
	var shootR;
	var shootL;
	var shootW;
	var win;
	var music;
	var vroom;
    var mech;
	var mechOn = false;
	var floor;
	var map;
	var cursors;
	var jump;
	var height = false;
	var jumping = false;
	var jumps = 0;
	var loop = 1;
	var phone2;
	var phone3;
	var phone4;
	var phone5;
	var mechswitch = true;
	var currentPos;
	var count = 0;
	var tenth = 0;
	var clunk;
	var doublejump = false;
	var bg;
	var road;
	var lose;
	var cooldown = 0;
	var meow;
	var level;
	var layer;
	var killed2 = false;
	var killed3 = false;
	var killed4 = false;
	var killed5 = false;
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
	var wavepos = 0;
	var timer2 = 0;
	var timer3 = 0;
	var timer4 = 0;
	var timer5 = 0;
	var mechposx =0;
	var S;
	var dashing;
    function create() {
	 game.physics.startSystem(Phaser.Physics.ARCADE);
	 //game.physics.startSystem(Phaser.Physics.P2JS);
		bg = game.add.tileSprite(0, 0, 12000, 10000, 'tiles');
		bg.fixedToCamera=true;
		road = game.add.tileSprite(0, 0, 12000, 10000, 'road');
		
		//game.world.setBounds(0, 0, 2400, 12000);
		level = game.add.tilemap('level',45,45,50,50);//,16,16);//,game.world.centerX,game.world.centerY);
		
		//level.setCollisionBetween(1,51 );
		level.setCollision(50,level);
		layer = level.createLayer(0);
		layer.resizeWorld();
		level.addTilesetImage(level,'bg',1,1,0,0,0);
		level.addTilesetImage(layer,'tiles2',45,45,0,0,50);
		//level.animations.add('tilemove',[0,1],4);
		//level.animations.play('tilemove');
		//layer.width = 2000;
		
		//level.setCollision(50,0);
		game.physics.arcade.enable(level);
		
		//layer.debug = true;
		//game.physics.arcade.convertTilemap(level, layer);
		
		//PROJECTILE
		proj = game.add.sprite(0,0,'laser');
		game.physics.enable( proj, Phaser.Physics.ARCADE );
		proj.width = 50;
		proj.height = 50;
		proj.exists = false;
		
		//Wave
		wave = game.add.sprite(0,0,'laser');
		game.physics.enable( wave, Phaser.Physics.ARCADE );
		wave.width = 40;
		wave.height = 200;
		wave.exists = false;
		
		
        // MECH
        mech = game.add.sprite( game.world.centerX - 800 , 0, 'cats' );
		mech.width = 190;
		mech.height = 190;
		//mech.body.x = -10000;
        // so it will be truly centered.
		//mech.animations.add('phonesprite', true);
		
        mech.anchor.setTo( -0, -0 );
		
        game.physics.enable( mech );
		game.physics.arcade.collide(mech, layer);
		game.physics.arcade.TILE_BIAS = 40;
		
		game.physics.arcade.gravity.y = 2050;
		
		mech.animations.add('stand',[0]);
		mech.animations.add('hover', [1,2],7,true);
		mech.animations.add('boost',[3,4],10, true);
		mech.animations.add('boost2',[5,6],12, true);
		
		
		
		
		//PHONES
		phone2 = game.add.sprite( mech.body.x - 1000, -1000, 'phonesprite' );
		game.physics.enable( phone2, Phaser.Physics.ARCADE );
		phone2.body.collideWorldBounds = true;
		phone2.anchor.setTo( 0, -2 );
		phone2.width = 100;
		phone2.height = 200;
		
		phone3 = game.add.sprite( mech.body.x + 1000, -1000, 'phonesprite' );
		game.physics.enable( phone3, Phaser.Physics.ARCADE );
		phone3.body.collideWorldBounds = true;
		phone3.anchor.setTo( 0, -2 );
		phone3.width = 100;
		phone3.height = 200;
		
		phone4 = game.add.sprite( mech.body.x + 500, -1000, 'phonesprite' );
		game.physics.enable( phone4, Phaser.Physics.ARCADE );
		phone4.body.collideWorldBounds = true;
		phone4.anchor.setTo( 0, -2 );
		phone4.width = 100;
		phone4.height = 200;
		
		phone5 = game.add.sprite( mech.body.x - 500, -1000, 'phonesprite' );
		game.physics.enable( phone5, Phaser.Physics.ARCADE );
		phone5.body.collideWorldBounds = true;
		phone5.anchor.setTo( 0, -2 );
		phone5.width = 100;
		phone5.height = 200;
		//phone5.body.gravity = 200;
		
        mech.body.collideWorldBounds = true;
		//PHONE COLLISION
		//phone2.body.immovable= true;
		//phone3.body.immovable= true;
		//phone4.body.immovable= true;
		//phone5.body.immovable= true;
		
		//AUDIO
		pew = game.add.audio('pew',0.08);
		pew.allowMultiple = true;
		clunk = game.add.audio('clunk',0.2);
		vroom = game.add.audio('vroom',0.25);
		music = game.add.audio('music',true);
		win = game.add.audio('victory',3);
		lose = game.add.audio('lose');
		meow = game.add.audio('meow',0.15);
		ow = game.add.audio('ow', 0.2);
		kshhh = game.add.audio('kshhh',0.2);
		//music.play();
		//CONTROLS
		
		cursors = game.input.keyboard.createCursorKeys();
		jump = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		shootR = game.input.keyboard.addKey(Phaser.Keyboard.D);
		shootL = game.input.keyboard.addKey(Phaser.Keyboard.A);
		shootW = game.input.keyboard.addKey(Phaser.Keyboard.W);
		S = game.input.keyboard.addKey(Phaser.Keyboard.S);
		//game.camera.follow(mech);
		//phone5.kill();
		//phone4.kill();
		//phone2.kill();
		//phone3.kill();
		//ANIMATIONS
		phone2.animations.add('walk',[0,1,2],3,true);
		phone4.animations.add('walk',[0,1,2],3,true);
		phone3.animations.add('walk',[0,1,2],3,true);
		phone5.animations.add('walk',[0,1,2],3,true);
		phone2.animations.add('die',[3,4],3,true);
		phone4.animations.add('die',[3,4],3,true);
		phone3.animations.add('die',[3,4],3,true);
		phone5.animations.add('die',[3,4],3,true);
		proj.animations.add('laser',[0,1],20,true);
		wave.animations.add('laser',[0,1],20,true);
		game.camera.follow(mech);
		
		
		
		//TEXT
		//text = game.add.text( 25, 25, "Fuel:" + fuel);
		//text.fixedToCamera = true;
		//text.inputEnabled = true;
		//controlsText = game.add.text( 25, 100, "Space: hover \n Up & Space: Boost \n Down & Space: Super Boost" );
		//controlstext.fixedToCamera = true;
		//controlstext.inputEnabled = true;
    }
    
    function update() {
	//wave.body.x -= mechposx - mech.body.x;
	//mechposx = mech.body.x;
	wave.body.velocity.x = mech.body.velocity.x + 2000;
	if (jump.isDown && !kshhh.isPlaying){
		kshhh.play();
		}
	else if(!jump.isDown){
		kshhh.stop();
		}
	road.x -= 1;
	//ANIMATION START
		if (jump.isDown && cooldown == 0){
			mech.animations.play('hover');
			}
		else if (cooldown == 0){
			mech.animations.play('stand');
			}
		if (shooting){
			proj.animations.play('laser');
			}
		//updateText();
	
		//COLLISION
		//PHONE DEATH
		timer2 -=1;
		if (killed2 && timer2 == 0){
			killed2 = false;
			phone2.body.y -= 1000;
			}
		timer3 -=1;
		if (killed3 && timer3 == 0){
			killed3 = false;
			phone3.body.y -= 1000;
			}
		timer4 -=1;
		if (killed4 && timer4 == 0){
			killed4 = false;
			phone4.body.y -= 1000;
			}
		timer5 -=1;
		if (killed5 && timer5 == 0){
			killed5 = false;
			phone5.body.y -= 1000;
			}
		if ( !killed2){
		phone2.animations.play('walk');
		//game.physics.arcade.collide(proj, phone2)
		game.physics.arcade.collide(proj, phone2);
		}
		if ( !killed3){
		phone3.animations.play('walk');
		game.physics.arcade.collide(proj, phone3)
		}
		if ( !killed4){
		phone4.animations.play('walk');
		game.physics.arcade.collide(proj, phone4)
		}
		if ( !killed5){
		phone5.animations.play('walk');
		game.physics.arcade.collide(proj, phone5)
		}
		if(!dashing){game.physics.arcade.collide(mech, layer);}
		game.physics.arcade.collide(phone2, layer);
		game.physics.arcade.collide(phone3, layer);
		game.physics.arcade.collide(phone4, layer);
		game.physics.arcade.collide(phone5, layer);
		
		
		
			if (!killed2 && game.physics.arcade.collide(proj, phone2)){
			shooting = false;
			proj.exists = false;
			killed2 = true;
			timer2 = 80;
			phone2.animations.play('die');
			ow.play();
			}
			if (!killed3 && game.physics.arcade.collide(proj, phone3)){
			shooting = false;
			proj.exists = false;
			killed3 = true;
			timer3 = 80;
			phone3.animations.play('die');
			ow.play();
			}
			if (!killed4 && game.physics.arcade.collide(proj, phone4)){
			shooting = false;
			proj.exists = false;
			killed4 = true;
			timer4 = 80;
			phone4.animations.play('die');
			ow.play();
			}
			if (!killed5 && game.physics.arcade.collide(proj, phone5)){
			shooting = false;
			proj.exists = false;
			killed5 = true;
			timer5 = 80;
			phone5.animations.play('die');
			ow.play();
			}
			//Killing Wave
			if (!killed2 && game.physics.arcade.collide(wave, phone2)){
			shootingW = false;
			wave.exists = false;
			killed2 = true;
			timer2 = 80;
			phone2.animations.play('die');
			ow.play();
			}
			if (!killed3 && game.physics.arcade.collide(wave, phone3)){
			shootingW = false;
			wave.exists = false;
			killed3 = true;
			timer3 = 80;
			phone3.animations.play('die');
			ow.play();
			}
			if (!killed4 && game.physics.arcade.collide(wave, phone4)){
			shootingW = false;
			wave.exists = false;
			killed4 = true;
			timer4 = 80;
			phone4.animations.play('die');
			ow.play();
			}
			if (!killed5 && game.physics.arcade.collide(wave, phone5)){
			shootingW = false;
			wave.exists = false;
			killed5 = true;
			timer5 = 80;
			phone5.animations.play('die');
			ow.play();
			}
			//Killing Dash
		//	if (!killed2 ){
		//	game.physics.arcade.collide(phone2, mech);
		//}
		
		//if (!killed3){
		//	game.physics.arcade.collide(phone3, mech);
		//}
		//if (!killed4){
	//		game.physics.arcade.collide(phone4, mech);
		//}
		//if (!killed5){
		//	game.physics.arcade.collide(phone5, mech);
		//}
			if (!killed2 && !dashing){
				game.physics.arcade.collide(mech,phone2);
				}
			else if (!killed2 && dashing && game.physics.arcade.collide(mech, phone2)){
			
			killed2 = true;
			timer2 = 80;
			phone2.animations.play('die');
			ow.play();
			}
			
			if (!killed3 && !dashing){
				game.physics.arcade.collide(mech,phone3);
				}
			else if (!killed3 && dashing && game.physics.arcade.collide(mech, phone3)){
			
			killed3 = true;
			timer3 = 80;
			phone3.animations.play('die');
			ow.play();
			}
			if (!killed4 && !dashing){
				game.physics.arcade.collide(mech,phone4);
				}
			else if (!killed4 && dashing && game.physics.arcade.collide(mech, phone4)){
			
			killed4 = true;
			timer4 = 80;
			phone4.animations.play('die');
			ow.play();
			}
			if (!killed5 && !dashing){
				game.physics.arcade.collide(mech,phone5);
				}
			else if (!killed5 && dashing && game.physics.arcade.collide(mech, phone5)){
			
			killed5 = true;
			timer5 = 80;
			phone5.animations.play('die');
			ow.play();
			}
		
		
	//PHONE VELOCITY CONTROL
	if (phone2.body.blocked.left){
		velo2 =200;
		}
	else if (phone2.body.blocked.right){
		velo2 = -200;
		}
		if (phone3.body.blocked.left){
		velo3 = 500;
		}
	else if (phone3.body.blocked.right){
		velo3 = -500;
		}
		if (phone4.body.blocked.left){
		velo4 = 500;
		}
	else if (phone4.body.blocked.right){
		velo4 = -500;
		}
		if (phone5.body.blocked.left){
		velo5 = 700;
		}
	else if (phone5.body.blocked.right){
		velo5 = -700;
		}
		phone2.body.velocity.x = velo2;
		phone3.body.velocity.x = velo3;
		phone4.body.velocity.x = velo4;
		phone5.body.velocity.x = velo5;
		
			
	
	//	bug fix
		if (tenth > 4){
			tenth = 4;
		
		}
		mechOn = false;
		if(mech.body.y < 10){
			mech.body.y = 20;
			}
		if (mech.body.y < 500 && !win.isPlaying){
			//win.play();
			}
		//game.camera.y = mech.body.y - 550;		
		//controlling different speeds
		//phone2.body.velocity.y = -150 * (tenth +1);
		//phone3.body.velocity.y = -150 * (tenth +1);
		//phone4.body.velocity.y = -170 * (tenth +1);
		//phone5.body.velocity.y = -170 * (tenth +1);
		//phone2.body.velocity.x = 95 * (tenth +1);
		//phone3.body.velocity.x = -75 * (tenth +1);
		//phone4.body.velocity.x = 75 * (tenth +1);
		//phone5.body.velocity.x = -95 * (tenth +1);
		
		// wall scrolling
		
		//reuse mechs
		
		
		mech.animations.play('fly');
       
		
		
		
		// checking if mech is moving left or right, and if the player wants to accellerate
		if (mech.body.velocity.x < 0 && shootL.isDown && mech.body.velocity.x > -1200 && jump.isDown
		|| mech.body.velocity.x < 0 && shootL.isDown && mech.body.velocity.x > -300){
			mech.body.velocity.x *= 1.1;
			if (mech.body.velocity.y == 0){
			}
			}
		if (mech.body.velocity.x < 0 && !cursors.left.isDown){
			mech.body.velocity.x *= 0.95;
			}
		
		if (mech.body.velocity.x > 0 && shootR.isDown && mech.body.velocity.x < 1200 && jump.isDown
		|| mech.body.velocity.x > 0 && shootR.isDown && mech.body.velocity.x < 300){
		mech.body.velocity.x *= 1.1;
		if (mech.body.velocity.y == 0){
		}
		}
		if (mech.body.velocity.x > 0 && !shootR.isDown){
			mech.body.velocity.x *= 0.95;
			if (mech.body.velocity.y == 0){
			}
			}
		
		if (shootL.isDown && mech.body.velocity.x >= -50)
		{
			mech.body.velocity.x =-175;
		}
		
		if (shootR.isDown && mech.body.velocity.x <= 50)
		{
			mech.body.velocity.x=175;
		}
		//PHONE DAMAGE
		if (phone2.body.touching.up){
			//phone2.animations.play('die');
			//mechOn = true;
			//killed2 = true;
			if(!clunk.isPlaying){
				clunk.play();
				}
			}
		if (phone3.body.touching.up){
			//phone3.animations.play('die');
			//killed3 = true;
			if(!clunk.isPlaying){
				clunk.play();
				}
			mechOn = true;
			}
		if (phone5.body.touching.up){
			//phone5.animations.play('die');
			//killed5 = true;
			if(!clunk.isPlaying){
				clunk.play();
				}
			mechOn = true;
		}
		if (phone4.body.touching.up){
			//phone4.animations.play('die');
			//killed4 = true;
			if(!clunk.isPlaying){
				clunk.play();
				};
			mechOn = true;
		}
		if (mechOn){
			mech.body.y -=10;
			}
		//SHOOTING
		
		if (shooting && (mech.body.x < proj.body.x - 600 || mech.body.x > proj.body.x + 600) || projpos < proj.body.y -500){
			shooting = false;
			proj.exists = false;
			}
		if (cursors.right.isDown && !shooting){
			proj.exists = true;
			proj.body.x = mech.body.x;
			proj.body.y = mech.body.y + 50;
			proj.body.velocity.y = 0;
			proj.body.velocity.x = mech.body.velocity.x + 2000;
			projpos = proj.body.y;
			shooting = true;
			proj.animations.play('laser');
			pew.play();
			}
		if (cursors.left.isDown && !shooting){
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
			//Wave
			wave.body.y = mech.body.y;
			if (shootingW && (mech.body.x < wave.body.x - 250 || wavepos > wave.body.x + 250)){
			shootingW = false;
			wave.exists = false;
			}
		if (cursors.up.isDown && !shootingW){
			wave.exists = true;
			wave.body.x = mech.body.x -200;
			wave.body.y = mech.body.y ;
			wave.body.velocity.y = 0;
			wave.body.velocity.x = 1000;
			wavepos = wave.body.x;
			shootingW = true;
			wave.animations.play('laser');
			pew.play();
			}
			// JUMP
		if (jump.isDown && cooldown == 0){ //&& mech.body.onFloor() || jump.isDown && mech.body.touching.down){
        //mech.body.velocity.y = -250;
		mech.body.velocity.y = -5;
		if(!vroom.isPlaying){
		//vroom.play();
		}
		doublejump = true;
    }
		if (cooldown != 0){
			cooldown -= 1;
			
			}
			//BOOST
			if (cooldown == 0){
				dashing = false;
				}
		if (shootW.isDown && cooldown == 0 ){
			fuel -= 30;
			mech.body.velocity.y = -200;
			mech.body.velocity.y *= 5;
			mech.body.velocity.x *= 1.3;
			cooldown = 25;
			doublejump = false;
			vroom.play();
			mech.animations.play('boost');
		}
		if ( S.isDown && cooldown == 0){
			fuel -= 50;
			mech.body.velocity.y = -250;
			mech.body.velocity.y *= 8;
			mech.body.velocity.x *= 2;
			cooldown = 40;
			doublejump = false;
			meow.play();
			mech.animations.play('boost2');
		}
		if (dashing){
			mech.body.velocity.y = -35;
			}
		if ( cursors.down.isDown && cooldown == 0){
			fuel -= 50;
			
			if (mech.body.velocity.x > 0){
				mech.body.velocity.x = 4000;
				}
			else{
				mech.body.velocity.x = -4000;
				}
				dashing = true;
			cooldown = 60;
			meow.play();
			mech.animations.play('boost2');
			}
			
		if ( mech.body.velocity.y >-1 && fuel < 99){
			fuel+=1;
			}
		else if (fuel > -10){
			fuel -=1;
			}
		
		}
		//function updateText(){
		//	text.setText ("Fuel:" + fuel );
			
		//	}
}
