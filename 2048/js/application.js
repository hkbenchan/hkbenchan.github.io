// Wait till the browser is ready to render the game (avoids glitches)
var gameManager;
window.requestAnimationFrame(function () {
  gameManager = new GameManager(4, KeyboardInputManager, HTMLActuator, LocalScoreManager);
});


function wholeRun(callback) {
	gameManager.move(0);
	setTimeout(function(){
		gameManager.move(1);
		setTimeout(function(){
			gameManager.move(2);
			setTimeout(function(){
				gameManager.move(3);
				setTimeout(function(){
					callback(null);
				}, 250);
			}, 250);
		}, 250);
	}, 250);
}

var startPlaying = function(limit) {
	var	i = 0;
	var internalLoop = function() {
		wholeRun(function() {
			i++;
			if (i < limit) {
				internalLoop();
			}
		});
	}
	internalLoop();
}

