(function () {
    "use strict";
 	
	function go_play(e) {
	    enchant(); // initialize
		var game = new Core(800, 600); // game stage
		game.preload('http://kintone.labo365.net/images/kintoun7.png'); // preload image
		game.preload('http://kintone.labo365.net/images/kintoun8.png'); // preload image
		game.preload('http://kintone.labo365.net/images/kumo.png'); // preload image
		game.preload('http://kintone.labo365.net/images/doukumo.png'); // preload image
		game.preload('http://kintone.labo365.net/images/arrow1.png'); // preload image


//スピード設定用パラメーター
		game.fps = 20;
		var kumo_speed = 50;
		var neko_speed = 10;
		var teki_speed = 20;
		var arrow_speed = 30;
			
		game.rootScene.backgroundColor="#a0d8ef";
		game.onload = function(){
  	      var yoro1 = new Sprite(312, 282);yoro1.scale(0.5, 0.5);
  		  yoro1.image = game.assets['http://kintone.labo365.net/images/kintoun7.png'];
  		  yoro1.x = 20;  yoro1.y = 220;
  	      var yoro2 = new Sprite(312, 282);yoro2.scale(0.5, 0.5);
  		  yoro2.image = game.assets['http://kintone.labo365.net/images/kintoun8.png'];
  		  yoro2.x = 20;yoro2.y = 220;
  	      var kumo = new Sprite(122, 46);kumo.scale(0.7, 0.7);
  		  kumo.image = game.assets['http://kintone.labo365.net/images/kumo.png'];
  		  kumo.visible = false;
  	      var teki1 = new Sprite(176, 67);teki1.scale(1, 1);
  		  teki1.image = game.assets['http://kintone.labo365.net/images/doukumo.png'];
  		  teki1.x = 600;  teki1.y = 300;

  	      var arrow1 = new Sprite(167, 52);arrow1.scale(0.5, 0.5);
  		  arrow1.image = game.assets['http://kintone.labo365.net/images/arrow1.png'];
  		  arrow1.x = 600;  teki1.y = 300;
  		  arrow1.visible = false;

  		  game.keybind(32, 'space'); //スペースキーをバインド
  		  
  		  yoro1.addEventListener('touchstart', function() {
	  		  game.rootScene.removeChild(yoro1);	  		  
	  		  game.rootScene.addChild(yoro2);
	        });
	        
		  yoro2.addEventListener('touchstart', function() {
	  		  game.rootScene.removeChild(yoro2);
	  		  game.rootScene.addChild(yoro1);
	        });

		  kumo.addEventListener('enterframe', function() {
	  		  kumo.x += kumo_speed;
	  		  if(kumo.x > 800) kumo.visible = false;
	        });

		  teki1.addEventListener('enterframe', function() {
	  		  teki1.y += teki_speed;
	  		  if(teki1.y > 500 || teki1.y < 10) teki_speed *= -1;
	        });
	        
		  arrow1.tl.moveTo(teki1.x,teki1.y)
		  	.moveTo(0,teki1.y,60)
			.delay(200)
			.loop();	        

  		game.rootScene.addChild(yoro1);
		game.rootScene.addChild(kumo);
		game.rootScene.addChild(teki1);
		game.rootScene.addChild(arrow1);

	      game.rootScene.addEventListener('enterframe', function() {
            if (game.input.up) {
                yoro1.y-= neko_speed;yoro2.y = yoro1.y;
            }
            if (game.input.down) {
                yoro1.y+=neko_speed;yoro2.y = yoro1.y;
            }
            if (game.input.right) {
                yoro1.x+=neko_speed;yoro2.x=yoro1.x;
            }
            if (game.input.left) {
                yoro1.x-=neko_speed;yoro2.x=yoro1.x;
            }

			});
			game.addEventListener('spacebuttondown', function(){
	            game.rootScene.removeChild(yoro1);	  		  
				game.rootScene.addChild(yoro2);

                kumo.x = yoro1.x + 200;kumo.y = yoro1.y+150;
                kumo.visible = true;

			});
			game.addEventListener('spacebuttonup', function(){

 	            game.rootScene.removeChild(yoro2);	  		  

				game.rootScene.addChild(yoro1);

			});

		
    	};
	
		game.start(); // start your game!

	}
 
    kintone.events.on('app.record.index.show', go_play);

})();
