/*
kintone カスタマイズビュー用お手軽ゲームサンプル用JS
*/

(function () {
    "use strict";
	
	var images_url = 'https://kintone-azure.azurewebsites.net/images/';
 	
	function go_play(e) {
	    enchant(); // initialize
		var game = new Core(800, 600); // game stage
		game.preload(images_url + 'kintoun7.png');
		game.preload(images_url + 'kintoun8.png');
		game.preload(images_url + 'kumo.png'); // 
		game.preload(images_url + 'doukumo.png'); 
		game.preload(images_url + 'arrow1.png');
		//game.preload(images_url + 'pyo1.mp3'); 

//スピード設定用パラメーター
		game.fps = 20;
		var kumo_speed = 50;
		var neko_speed = 10;
		var teki_speed = 20;
		var arrow_speed = 30;
			
		game.rootScene.backgroundColor="#a0d8ef";
		game.onload = function(){
  	      var yoro1 = new Sprite(312, 282);yoro1.scale(0.5, 0.5);
  		  yoro1.image = game.assets[images_url+'kintoun7.png'];
  		  yoro1.x = 20;  yoro1.y = 220;
  	      var yoro2 = new Sprite(312, 282);yoro2.scale(0.5, 0.5);
  		  yoro2.image = game.assets[images_url+'kintoun8.png'];
  		  yoro2.x = 20;yoro2.y = 220;
  	      var kumo = new Sprite(122, 46);kumo.scale(0.7, 0.7);
  		  kumo.image = game.assets[images_url+'kumo.png'];
  		  kumo.visible = false;
  	      var teki1 = new Sprite(176, 67);teki1.scale(1, 1);
  		  teki1.image = game.assets[images_url+'doukumo.png'];
  		  teki1.x = 600;  teki1.y = 300;

  	      var arrow1 = new Sprite(167, 52);arrow1.scale(0.5, 0.5);
  		  arrow1.image = game.assets[images_url+'arrow1.png'];
  		  arrow1.x = 600;  teki1.y = 300;

  		  game.keybind(32, 'space'); //スペースキーをバインド
  		  
		  kumo.addEventListener('enterframe', function() {
	  		  kumo.x += kumo_speed;
	  		  if(kumo.x > 800) kumo.visible = false;
	        });

		  teki1.addEventListener('enterframe', function() {
	  		  teki1.y += teki_speed;
	  		  if(teki1.y > 500 || teki1.y < 10) teki_speed *= -1;
	        });
	        
		  arrow1.addEventListener('enterframe', function() {
	  		  arrow1.x -= arrow_speed;
	  		  if(arrow1.x < 0) {
					arrow1.x = teki1.x;arrow1.y = teki1.y;
				}
	        });

  		game.rootScene.addChild(yoro1);
		game.rootScene.addChild(kumo);
		game.rootScene.addChild(teki1);
		game.rootScene.addChild(arrow1);

//矢印キーでメインキャラ移動
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
			
//スペースキーで雲発射
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
//一定間隔で敵の矢を発射


		
    	};
	
		game.start(); // start your game!

	}
 
    kintone.events.on('app.record.index.show', go_play);

})();
