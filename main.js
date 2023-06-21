var game = {
    score: 0,
    totalScore: 0,
    totalClicks: 0,
    clickValue: 1,
    version: 0.000,

    addToScore: function(amount) {
       this.score += amount;
       this.totalScore += amount;
       display.updateScore();
    },

     getScorePerSecond: function() {
      var scorePerSecond = 0;
      for (i = 0; i < building.name.length; i++) {
        scorePerSecond += building.income[i] * building.count[i];
      }
      return scorePerSecond;
    }
  };

    var building = {
     name: [
         "5 String Bass",
         "7 String Bass",
         "10 String Bass",
         "12 String Bass"
        ],
     image: [
      "5sg.png",
      "7sg.png",
      "10sg.png",
      "12sg.png"
     ],
     count: [0, 0, 0, 0],
     income: [
      1,
      15,
      65,
      125

     ],
     cost: [
      15,
      100,
      650,
      1250
     ],

     purchase: function(index) {
      if(game.score >= this.cost[index]) {
        game.score -= this.cost[index];
        this.count[index]++;
        this.cost[index] = Math.ceil(this.cost[index] * 1.10);
        display.updateScore();
        display.updateShop();
      }
     }
  };

    var display ={
      updateScore: function() {
        document.getElementById("score").innerHTML = game.score;
        document.getElementById("scorepersecond").innerHTML = game.getScorePerSecond();
        document.title = game.score + " strings - Bass Guitar Clicker"
      },

      updateShop: function() {
        document.getElementById("shopContainer").innerHTML = "";
        for (i = 0; i < building.name.length; i++) {
          document.getElementById("shopContainer").innerHTML += '<table class="shopButton unselectable" onclick="building.purchase('+i+')"><tr><td id="image"><img src="images/'+building.image[i]+'"></td><td id="nameAndCost"><p>'+building.name[i]+'</p><p><span>'+building.cost[i]+'</span> strings</p></td><td id="amount"><span>'+building.count[i]+'</span></td></table>';
        }
      }
    };

    function saveGame() {
             var gameSave = {
              score: game.score,
              totalScore: game.totalScore,
              totalClicks: game.totalClicks,
              clickValue: game.clickValue,
              version: game.version,
              buildingCount: game.buildingCount,
              buildingIncome: game.buildingIncome,
              buildingCost: game.buildingCost
    };
    localStorage.setItem("gameSave", JSON.stringify(gameSave));
    }
  
    function loadGame() {
      var savedGame = JSON.parse(localStorage.getItem("gamesave"));
      if (localStorage.getItem("gamSave") !== null)  {
        if (typeof savedGame.score !== "undefined") game.score = savedGame.score;
        if (typeof savedGame.totalScore !== "undefined") game.totalScore = savedGame.totalScore;
        if (typeof savedGame.totalClicks !== "undefined") game.totalClicks = savedGame.totlaClicks;
        if (typeof savedGame.clickValue !== "undefined") game.clickValue = savedGame.clickValue;
        if (typeof savedGame.buildingCount !== "undefined") {
          for (i = 0; i < savedGame.buildingCount.length; i++) {
            building.count[i] = savedGame.buildingCount[i];
          }
        }
        

        if (typeof savedGame.buildingCount !== "undefined") {
          for (i = 0; i < savedGame.buildingCount.length; i++) {
            building.count[i] = savedGame.buildingCount[i];

      }
    }

    if (typeof savedGame.buildingCount !== "undefined") {
          for (i = 0; i < savedGame.buildingCount.length; i++) {
            building.count[i] = savedGame.buildingCount[i];

      }
    }

    if (typeof savedGame.buildingCount !== "undefined") {
          for (i = 0; i < savedGame.buildingCount.length; i++) {
            building.count[i] = savedGame.buildingCount[i];

      }
    }
  }
}

function resetGame() {
if (confirm("Are you sure you want to reset your game")) {
var gameSave = {};
localStorage.setItem("gameSave", JSON.stringify(gameSave));
location.reload();
}
 }

    window.onload = function() {
      loadGame();
      display.updateScore();
      display.updateShop();
    };

    setInterval (function() {
      game.score += game.getScorePerSecond();
      game.totalScore += game.getScorePerSecond();
      display.updateScore();
    }, 1000); // 1000ms = 1 second

    setInterval(function() {
saveGame();
 }, 30000); // 30,000 milliseconds = 30 seconds

 document.addEventListener("keydown", function(event) {
  if (event.ctrlKey && event.wich == 83) { //ctrl + s
    event.preventDefault();
    saveGame();
  }
 }, false);