Main = (function (){
	
	
	var _BowlingGame = new BowlingGame();
	var className = "Main";
	
	var ThrowResponse = function(event,response){

		$("#result").text(response.score);				
			
	};		
		
	var Start = function(pin){	
			EventBus.addEventListener("throw_event_response", ThrowResponse, this);	
			_BowlingGame.ThrownBall(pin);				
			_BowlingGame.CalculateScore();
			
		};		
	
	return {
		Start : Start,
		className : className
	};
	
})();