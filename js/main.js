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
		game.load.spritesheet('cats', 'assets/catsheet3.png', 362, 400);
    }
    
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
	var velo4 = 110;
	var velo5 = 110;
    function create() {
	 game.physics.startSystem(Phaser.Physics.ARCADE);
	 //game.physics.startSystem(Phaser.Physics.P2JS);
		bg = game.add.tileSprite(0, 0, 12000, 10000, 'bg');
		//bg.fixedToCamera=true;
		road = game.add.tileSprite(0, 0, 1200, 10000, 'road');
		level = game.add.tilemap('level');//,16,16);//,game.world.centerX,game.world.centerY);
		level.addTilesetImage('phonesprite');
		//level.setCollisionBetween(1,51 );
		level.setCollision(50,level);
		layer = level.createLayer(0);
		//layer.width = 2000;
		
		//level.setCollision(50,0);
		game.physics.arcade.enable(level);
		
		//layer.debug = true;
		//game.physics.arcade.convertTilemap(level, layer);
		game.world.setBounds(0, 0, 2400, 12000);
        // Create a sprite at the center of the screen using the 'mechsprite' image.
        mech = game.add.sprite( game.world.centerX - 800 , 0, 'cats' );
		mech.width = 130;
		mech.height = 130;
		//mech.body.x = -10000;
        // so it will be truly centered.
		//mech.animations.add('phonesprite', true);
		
        mech.anchor.setTo( -0, -0 );
		
        game.physics.enable( mech );
		game.physics.arcade.collide(mech, layer);
		game.physics.arcade.TILE_BIAS = 40;
		
		game.physics.arcade.gravity.y = 2050;
		
		mech.animations.add('fly', [0,1,2],7,true);
		mech.animations.add('boost',[3,4],7, true);
		mech.animations.add('boost2',[4],7, true);
		
		
		
		
		// creating npc phones
		phone2 = game.add.sprite( mech.body.x - 1000, 0, 'phonesprite' );
		game.physics.enable( phone2, Phaser.Physics.ARCADE );
		phone2.body.collideWorldBounds = true;
		phone2.anchor.setTo( 0, -2 );
		phone2.width = 100;
		phone2.height = 200;
		
		phone3 = game.add.sprite( mech.body.x + 1000, 0, 'phonesprite' );
		game.physics.enable( phone3, Phaser.Physics.ARCADE );
		phone3.body.collideWorldBounds = true;
		phone3.anchor.setTo( 0, -2 );
		phone3.width = 100;
		phone3.height = 200;
		
		phone4 = game.add.sprite( mech.body.x + 500, 0, 'phonesprite' );
		game.physics.enable( phone4, Phaser.Physics.ARCADE );
		phone4.body.collideWorldBounds = true;
		phone4.anchor.setTo( 0, -2 );
		phone4.width = 100;
		phone4.height = 200;
		
		phone5 = game.add.sprite( mech.body.x - 500, 0, 'phonesprite' );
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
		
		
		clunk = game.add.audio('clunk');
		vroom = game.add.audio('vroom');
		music = game.add.audio('music',true);
		win = game.add.audio('victory',3);
		lose = game.add.audio('lose');
		meow = game.add.audio('meow');
		music.play();
		cursors = game.input.keyboard.createCursorKeys();
		jump = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		//game.camera.follow(mech);
		//phone5.kill();
		//phone4.kill();
		//phone2.kill();
		//phone3.kill();
		phone2.animations.add('walk',[0,1,2],3,true);
		phone4.animations.add('walk',[0,1,2],3,true);
		phone3.animations.add('walk',[0,1,2],3,true);
		phone5.animations.add('walk',[0,1,2],3,true);
		phone2.animations.add('die',[3,4],3,true);
		phone4.animations.add('die',[3,4],3,true);
		phone3.animations.add('die',[3,4],3,true);
		phone5.animations.add('die',[3,4],3,true);
		game.camera.follow(mech);
		
		
		//TEXT
		text = game.add.text( 25, 25, "Fuel:" + fuel);
		text.fixedToCamera = true;
		text.inputEnabled = true;
		controlsText = game.add.text( 100, 25, "Space: hover \n Up & Space: Boost \n Down & Space: Super Boost" );
		controlstext.fixedToCamera = true;
		controlstext.inputEnabled = true;
    }
    
    function update() {
	updateText();
		//COLLISION
		game.physics.arcade.collide(mech, layer);
		game.physics.arcade.collide(phone2, layer);
		game.physics.arcade.collide(phone3, layer);
		game.physics.arcade.collide(phone4, layer);
		game.physics.arcade.collide(phone5, layer);
		if (!killed2){
			game.physics.arcade.collide(phone2, mech);
		}
		if (!killed3){
			game.physics.arcade.collide(phone3, mech);
		}
		if (!killed4){
			game.physics.arcade.collide(phone4, mech);
		}
		if (!killed5){
			game.physics.arcade.collide(phone5, mech);
		}
	//PHONE VELOCITY CONTROL
	if (phone2.body.blocked.left){
		velo2 =500;
		}
	else if (phone2.body.blocked.right){
		velo2 = -500;
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
		velo5 = 500;
		}
	else if (phone5.body.blocked.right){
		velo5 = -500;
		}
		phone2.body.velocity.x = velo2;
		phone3.body.velocity.x = velo3;
		phone4.body.velocity.x = velo4;
		phone5.body.velocity.x = velo5;
		
		//PHONE DEATH
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
		if ( phone2.body.x > 900){
			phone2.body.x = 0;
			}
		if ( phone3.body.x < 200){
			phone3.body.x = 1100;
			}
		if ( phone4.body.x > 900){
			phone4.body.x = 0;
			}
		if ( phone5.body.x < 200){
			phone5.body.x = 1100;
			}
		//kill mechs at height
		if (phone2.body.y < 500){
			//phone2.kill();
			}
		if (phone3.body.y < 500){
			//phone3.kill();
			}
		if (phone4.body.y < 500){
			//phone4.kill();
			}
		if (phone5.body.y < 500){
			//phone5.kill();
			}
		//reuse mechs
		if (mech.body.y < phone2.body.y - 2500 || mech.body.y > phone2.body.y + 1500){
			phone2.animations.play('die');
			
			phone2.body.y = mech.body.y - 600;
			
			}
		if (mech.body.y < phone3.body.y - 2500 || mech.body.y > phone3.body.y + 1500){
		phone3.animations.play('walk');
			phone3.body.y = mech.body.y - 600 ;
			
			
			}
		if (mech.body.y < phone4.body.y - 2500 || mech.body.y > phone4.body.y + 1500){
		phone4.animations.play('walk');
			phone4.body.y = mech.body.y- 800 ;
			count +=1;
			tenth+=1;
			
			
			
			}
		if (mech.body.y < phone5.body.y - 2500 || mech.body.y > phone5.body.y + 1500){
		phone5.animations.play('walk');
			phone5.body.y = mech.body.y - 900;
			
			
			}
		
		mech.animations.play('fly');
       
		
		
		
		// checking if mech is moving left or right, and if the player wants to accellerate
		if (mech.body.velocity.x < 0 && cursors.left.isDown && mech.body.velocity.x > -500){
			mech.body.velocity.x *= 1.1;
			if (mech.body.velocity.y == 0){
			}
			}
		if (mech.body.velocity.x < 0 && !cursors.left.isDown){
			mech.body.velocity.x *= 0.95;
			if (mech.body.velocity.y == 0){
			}
			}
		
		if (mech.body.velocity.x > 0 && cursors.right.isDown && mech.body.velocity.x < 500){
		mech.body.velocity.x *= 1.1;
		if (mech.body.velocity.y == 0){
		}
		}
		if (mech.body.velocity.x > 0 && !cursors.right.isDown){
			mech.body.velocity.x *= 0.95;
			if (mech.body.velocity.y == 0){
			}
			}
		
		if (cursors.left.isDown && mech.body.velocity.x >= -50)
		{
			mech.body.velocity.x =-175;
		}
		
		if (cursors.right.isDown && mech.body.velocity.x <= 50)
		{
			mech.body.velocity.x=175;
		}
		//PHONE DAMAGE
		if (phone2.body.touching.up){
			phone2.animations.play('die');
			//mechOn = true;
			killed2 = true;
			if(!clunk.isPlaying){
				clunk.play();
				}
			}
		if (phone3.body.touching.up){
			phone3.animations.play('die');
			killed3 = true;
			if(!clunk.isPlaying){
				clunk.play();
				}
			mechOn = true;
			}
		if (phone5.body.touching.up){
			phone5.animations.play('die');
			killed5 = true;
			if(!clunk.isPlaying){
				clunk.play();
				}
			mechOn = true;
		}
		if (phone4.body.touching.up){
			phone4.animations.play('die');
			killed4 = true;
			if(!clunk.isPlaying){
				clunk.play();
				};
			mechOn = true;
		}
		if (mechOn){
			mech.body.y -=10;
			}
			// starting a jump
		if (jump.isDown && cooldown == 0){ //&& mech.body.onFloor() || jump.isDown && mech.body.touching.down){
        //mech.body.velocity.y = -250;
		mech.body.velocity.y = -5;
		if(!vroom.isPlaying){
		//vroom.play();
		}
		doublejump = true;
    }
		if (cooldown != 0){
			
			if (mech.body.velocity.y < -2000){
				mech.animations.play('boost');
				}
			else{
				mech.animations.play('boost2');
				}
			cooldown -= 1;
			
			}
		else{
			mech.animations.play('fly');
			}
			//BOOST
		if (doublejump && cursors.up.isDown && cooldown == 0 ){
			fuel -= 30;
			mech.body.velocity.y -= 200;
			mech.body.velocity.y *= 5;
			mech.body.velocity.x *= 1.3;
			cooldown = 25;
			doublejump = false;
			vroom.play();
		}
		if (doublejump && cursors.down.isDown && cooldown == 0){
			fuel -= 50;
			mech.body.velocity.y -= 250;
			mech.body.velocity.y *= 6;
			mech.body.velocity.x *= 2;
			cooldown = 60;
			doublejump = false;
			meow.play();
		}
		if ( mech.body.velocity.y >-1 && fuel < 99){
			fuel+=1;
			}
		else if (fuel > -10){
			fuel -=1;
			}
		
		}
		function updateText(){
			text.setText ("Fuel:" + fuel );
			
			}
}
