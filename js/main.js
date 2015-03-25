window.onload = function() {
    
    "use strict";
    
    var game = new Phaser.Game( 1200, 800, Phaser.CANVAS, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
		game.load.spritesheet( 'phonesprite', 'assets/phone.png', 200,343 );
		game.load.tilemap( 'level', 'assets/mylevel4.csv', null, Phaser.Tilemap.CSV );
		game.load.image( 'bg', 'assets/BG3.png' );
		game.load.image( 'road', 'assets/clouds2.png' )
		game.load.audio('clunk', 'assets/clunk.ogg');
		game.load.audio('music', 'assets/gargos.mp3');
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
		game.load.image('splode', 'assets/explosion.png');
    }
    
	//VARS
	var wave;
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
	var boosting;
	var Fbomb;
	var shootR;
	var shootL;
	var shootW;
	var splode;
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
		//EXPLOSIONS
		splode = game.add.sprite(300,0,'splode');
		game.physics.enable(splode, Phaser.Physics.ARCADE);
		splode.width = 650;
		splode.height = 800;
		splode.alpha = 0.01;
		splode.fixedToCamera = true;
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
        mech = game.add.sprite( 200 , 2250, 'cats' );
		mech.width = 190;
		mech.height = 190;
		//mech.body.x = -10000;
        // so it will be truly centered.
		//mech.animations.add('phonesprite', true);
		
        mech.anchor.setTo( 0.5, 0.5 );
		
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
		phone2.anchor.setTo(0.5,0.5);
		phone2.width = 100;
		phone2.height = 200;
		//phone2 = makePhone(1000, -1000);
		
		phone3 = game.add.sprite( mech.body.x + 1000, 2200, 'phonesprite' );
		game.physics.enable( phone3, Phaser.Physics.ARCADE );
		phone3.body.collideWorldBounds = true;
		phone3.anchor.setTo(0.5,0.5);
		phone3.width = 100;
		phone3.height = 200;
		
		phone4 = game.add.sprite( mech.body.x + 500, 2200, 'phonesprite' );
		game.physics.enable( phone4, Phaser.Physics.ARCADE );
		phone4.body.collideWorldBounds = true;
		phone4.anchor.setTo(0.5,0.5);
		phone4.width = 100;
		phone4.height = 200;
		
		phone5 = game.add.sprite( mech.body.x - 500, -1000, 'phonesprite' );
		game.physics.enable( phone5, Phaser.Physics.ARCADE );
		phone5.body.collideWorldBounds = true;
		phone5.anchor.setTo(0.5,0.5);
		phone5.width = 100;
		phone5.height = 200;
		//phone5.body.gravity = 200;
		
        mech.body.collideWorldBounds = true;
		
		//AUDIO
		pew = game.add.audio('pew',0.08);
		pew.allowMultiple = true;
		clunk = game.add.audio('clunk',0.2);
		vroom = game.add.audio('vroom',0.25);
		music = game.add.audio('music',0.2,true );
		win = game.add.audio('victory',3);
		lose = game.add.audio('lose');
		meow = game.add.audio('meow',0.15);
		ow = game.add.audio('ow', 0.2);
		ow.allowMultiple = true;
		kshhh = game.add.audio('kshhh',0.2);
		music.play();
		//CONTROLS
		
		cursors = game.input.keyboard.createCursorKeys();
		jump = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		boostR = game.input.keyboard.addKey(Phaser.Keyboard.D);
		boostL = game.input.keyboard.addKey(Phaser.Keyboard.A);
		boostUp = game.input.keyboard.addKey(Phaser.Keyboard.W);
		shootR = game.input.keyboard.addKey(Phaser.Keyboard.L);
		shootL = game.input.keyboard.addKey(Phaser.Keyboard.J);
		shootW = game.input.keyboard.addKey(Phaser.Keyboard.I);
		S = game.input.keyboard.addKey(Phaser.Keyboard.S);
		Fbomb = game.input.keyboard.addKey(Phaser.Keyboard.F);
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
	if(Fbomb.isDown){
		killed2 = true;
		killed3 = true;
		killed4 = true;
		killed5 = true;
		splode.alpha = 1;
		phone2.animations.play('die');
		phone3.animations.play('die');
		phone4.animations.play('die');
		phone5.animations.play('die');
		timer2 = 80;
		timer3 = 80;
		timer4 = 80;
		timer5 = 80;
		ow.play();
		ow.play();
		}
	wave.body.velocity.x = mech.body.velocity.x + 2000;
	if (boostL.isDown){
		mech.scale.x = -.35;
		}
	if (boostR.isDown){
		mech.scale.x = .35;
		}
	if (jump.isDown && !kshhh.isPlaying){
		kshhh.play();
		}
	else if(!jump.isDown){
		kshhh.stop();
		}
	
	//ANIMATION START
	//splode.body.x = mech.body.x - 200;
	//splode.body.y = mech.body.y - 450;
	if (splode.alpha > 0){
		splode.alpha -=0.01;
	}
	else{splode.alpha = 0;}
	road.x -= 1;
		if (jump.isDown && cooldown == 0){
			mech.animations.play('hover');
			}
		else if (cooldown == 0){
			mech.animations.play('stand');
			}
		if (shooting){
			proj.animations.play('laser');
			}
	
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
		}
		if ( !killed3){
		phone3.animations.play('walk');
		}
		if ( !killed4){
		phone4.animations.play('walk');
		}
		if ( !killed5){
		phone5.animations.play('walk');
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
		
		mechOn = false;
		
		//reuse mechs
		
		
		mech.animations.play('fly');
       
		
		// checking if mech is moving left or right, and if the player wants to accelerate
		if (mech.body.velocity.x < 0 && boostL.isDown && mech.body.velocity.x > -1200 && jump.isDown
		|| mech.body.velocity.x < 0 && boostL.isDown && mech.body.velocity.x > -300){
			mech.body.velocity.x *= 1.1;
		}
		if (mech.body.velocity.x < 0 && !boostL.isDown){
			mech.body.velocity.x *= 0.95;
		}
		if (mech.body.velocity.x > 0 && boostR.isDown && mech.body.velocity.x < 1200 && jump.isDown
		|| mech.body.velocity.x > 0 && boostR.isDown && mech.body.velocity.x < 300){
		mech.body.velocity.x *= 1.1;
		}
		if (mech.body.velocity.x > 0 && !boostR.isDown){
			mech.body.velocity.x *= 0.95;
		}
		
		if (boostL.isDown && mech.body.velocity.x >= -50)
		{
			mech.body.velocity.x =-175;
		}
		
		if (boostR.isDown && mech.body.velocity.x <= 50)
		{
			mech.body.velocity.x=175;
		}
		//PHONE DAMAGE
		if (phone2.body.touching.up){
			if(!clunk.isPlaying){
				clunk.play();
				}
			}
		if (phone3.body.touching.up){
			if(!clunk.isPlaying){
				clunk.play();
				}
			mechOn = true;
			}
		if (phone5.body.touching.up){
			if(!clunk.isPlaying){
				clunk.play();
				}
			mechOn = true;
		}
		if (phone4.body.touching.up){
			if(!clunk.isPlaying){
				clunk.play();
				};
			mechOn = true;
		}
		if (mechOn){
			mech.body.y -=10;
			}
		//SHOOTING
		
		if (shooting && (projpos < proj.body.x - 1600 || projpos > proj.body.x + 1600) || mech.body.y < proj.body.y -350){
			shooting = false;
			proj.exists = false;
			}
		if (shootR.isDown && !shooting){
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
		if (shootL.isDown && !shooting){
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
		if (shootW.isDown && !shootingW){
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
			boosting = false;
			}
		if (boostUp.isDown ){
			fuel -= 30;
			mech.body.velocity.y = -200;
			mech.body.velocity.y *= 5;
			//mech.body.velocity.x *= 1.3;
			cooldown = 25;
			doublejump = false;
			vroom.play();
			mech.animations.play('boost');
		}
		if (S.isDown ){
			fuel -= 30;
			mech.body.velocity.y = 200;
			mech.body.velocity.y *= 5;
			//mech.body.velocity.x *= 1.3;
			cooldown = 25;
			doublejump = false;
			vroom.play();
			mech.animations.play('boost');
		}
		if ( cursors.up.isDown ){
			fuel -= 50;
			mech.body.velocity.y = -350;
			mech.body.velocity.y *= 7;
			mech.body.velocity.x *= 2;
			cooldown = 40;
			doublejump = false;
			meow.play();
			mech.animations.play('boost2');
			dashing = true;
			boosting = true;
		}
		if ( cursors.down.isDown ){
			fuel -= 50;
			mech.body.velocity.y = 350;
			mech.body.velocity.y *= 7;
			mech.body.velocity.x *= 2;
			cooldown = 40;
			doublejump = false;
			meow.play();
			mech.animations.play('boost2');
			dashing = true;
			boosting = true;
		}
		//Dash
		if (dashing){
			if (!boosting){
			mech.body.velocity.y -= 35;
			}
			}
		if (  cooldown == 0){
			if (cursors.right.isDown){
				mech.body.velocity.x = 4000;
				dashing = true;
				cooldown = 20;
				meow.play();
				mech.animations.play('boost2');
				}
			else if (cursors.left.isDown){
				mech.body.velocity.x = -4000;
				dashing = true;
				cooldown = 20;
				meow.play();
				mech.animations.play('boost2');
				}
			}
		}
		//function makePhone(x,y){
		//	var phone;
		//	phone = game.add.sprite( x, y, 'phonesprite' );
		//	game.physics.enable( phone2, Phaser.Physics.ARCADE );
		//	phone.body.collideWorldBounds = true;
		//	phone.anchor.setTo(0.5,0.5);
		//	phone.width = 100;
		//	phone.height = 200;
		//	return phone;
		//}
}