BowlingGame = (function(){
	var cls = function(){
		this.rolls = [];
		this.currentRoll = 0;

		this.ThrownBall = function(pinThrown){
			this.rolls[this.currentRoll++]= pinThrown;	
		};	

		this.CalculateScore = function(){
			var score = 0;
			var frameIndex = 0;
			var self=this;
			
		    var sumOfBallsInFrame = function(){
				return self.rolls[frameIndex] + self.rolls[frameIndex + 1]; 
			}
			
			var spareBonus = function(){
				
				return self.rolls[frameIndex + 2];
			}
			
			var strikeBonus = function() {
				
				return self.rolls[frameIndex + 1] + self.rolls[frameIndex + 2];
			}

			var isStrike = function() {
				return self.rolls[frameIndex] === 10;
			}

			var isSpare = function() {
				return self.rolls[frameIndex] + self.rolls[frameIndex + 1] === 10;
			}

			for (var frame = 0; frame < 10; frame++) {
				if (isStrike()) {
					score += 10 + strikeBonus();
					frameIndex++;
				} else if (isSpare()) {
					score += 10 + spareBonus();
					frameIndex += 2;
				} else {
					score += sumOfBallsInFrame();
					frameIndex += 2;
				}
			}

			var response = { 	score: score
							}
			
			EventBus.dispatch("throw_event_response",this, response);	
		};
				
		// Constructor
		for (var ball = 0; ball < 21; ball++){
			this.rolls[ball]=0;
		}
	    EventBus.addEventListener("throw_event", this.ThrownBall, this);

	};
	
	return cls;
})();